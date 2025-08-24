import { useState, useContext } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { AuthContext } from "@/providers/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "@/hooks/axiosPublic";

export default function FundingForm() {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 1. Create payment intent
    const { data } = await axiosPublic.post("/create-payment-intent", { amount: Number(amount) });
    const clientSecret = data.clientSecret;

    // 2. Confirm card payment
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: user?.displayName || user?.email || "Anonymous",
          email: user?.email || "anonymous@bloodaid.com",
        },
      },
    });

    if (result.error) {
      Swal.fire("Error!", result.error.message, "error");
      setLoading(false);
      return;
    }

    if (result.paymentIntent.status === "succeeded") {
      // 3. Save funding record
      await axiosPublic.post("/fundings", {
        userName: user?.displayName || user?.email || "Anonymous",
        userEmail: user?.email || "anonymous@bloodaid.com",
        amount: Number(amount),
        fundingDate: new Date(),
        paymentId: result.paymentIntent.id,
        status: "succeeded",
      });
      Swal.fire("Thank you!", "Your fund has been received.", "success");
      setAmount("");
      elements.getElement(CardElement).clear();
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mx-auto bg-white dark:bg-[#18122B] rounded-2xl shadow p-6 mb-8">
      <h2 className="text-lg opacity-70 font-bold  text-[#c30027] mb-4">✅ Support BloodAid. Become a Contributor.</h2>
      <input
        type="number"
        min="1"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
        required
        className="w-full px-3 py-2 rounded-lg  bg-[#FDEDF3] dark:bg-[#393053] outline-none mb-4"
      />
      <CardElement className="p-3 rounded-lg  bg-[#FDEDF3] dark:bg-[#393053] mb-4" />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full btn  cursor-pointer py-6 rounded-full bg-gradient-to-r from-red-700 to-red-500 text-white font-semibold hover:bg-[#a80020] transition"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
}