import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "@/hooks/axiosPublic";
import { AuthContext } from "@/providers/AuthProvider";

const stripePromise = loadStripe(
  "pk_test_51J4nbqCGTM1umYl0bvwI8l4BHSMvlKFTOod82ROvWoNHrslcwHRK52oVCYBvK1Dg4wPYEurWWHUZOZ4N4fNLMBn900Nw60Bq4q"
);

const CheckoutForm = ({ amount, handleRequest }) => {
  const { user } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const axios = useAxiosPublic();

  useEffect(() => {
    if (amount > 0)
      // Call backend to get client secret
      axios
        .post("/create-payment-intent", {
          amount,
          user: { name: user.displayName, email: user.email },
        })
        .then(({ data }) => setClientSecret(data.clientSecret));
  }, [amount]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      console.error(result.error.message);
    } else if (result.paymentIntent.status === "succeeded") {
      handleRequest();
      alert("Payment successful!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button
        className="p-2 bg-green-600 mt-2 rounded-xl"
        type="submit"
        disabled={!stripe}
      >
        Request
      </button>
    </form>
  );
};

const StripeWrapper = ({ amount, handleRequest }) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm handleRequest={handleRequest} amount={amount} />
  </Elements>
);

export default StripeWrapper;
