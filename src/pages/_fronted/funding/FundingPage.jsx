import FundingForm from "@/components/funding/FundingForm";
import FundingTable from "@/components/funding/FundingTable";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import SupportBloodAid from "@/components/SponsorBloodAid";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
// const stripePromise = 'code'
// console.log(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)


export default function FundingPage() {

  return (
    <div className="">
      {/* <h2 className="text-2xl font-bold text-[#c30027] mb-6 text-center">Support BloodAid</h2>
    <Elements stripe={stripePromise}> 
        <FundingForm />
        </Elements>
      <div className="mt-10">
        <FundingTable />
      </div> */}
      <SupportBloodAid/>
    </div>
  );
}