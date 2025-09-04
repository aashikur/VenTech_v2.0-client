// import { loadStripe } from "@stripe/stripe-js";
import SupportBloodAid from "@/components/shared/Sponsor";

// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
// const stripePromise = 'code'
// console.log(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)


export default function FundingPage() {

  return (
    <div className="">
      <SupportBloodAid/>
    </div>
  );
}