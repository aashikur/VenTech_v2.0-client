import { BiArrowFromRight } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import { FaEnvelope, FaLinkedin, FaDiscord, FaFacebook, FaXTwitter, FaHeart } from "react-icons/fa6";
import FundingForm from "./funding/FundingForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import FundingPage from "@/pages/_fronted/funding/FundingPage";
import { FaCcMastercard } from "react-icons/fa";
import FundingTable from "./funding/FundingTable";
import Swal from "sweetalert2";

const handleComingSoon = () => {
  Swal.fire({
    title: 'Info',
    text: 'Coming soon',
    icon: 'info',
    confirmButtonText: 'Okay',
    customClass: {
      popup:
        '',
      confirmButton:
        'mt-4 bg-gradient-to-tr from-red-500 via-orange-600 to-yellow-500 hover:brightness-110 text-white px-6 py-2 rounded-full font-semibold transition-all',
    },
    buttonsStyling: false,
    backdrop: 'bg-black/50 backdrop-blur-sm',
  });
};
const contacts = [
  {
    name: "LinkedIn",
    desc: "Professional networking and updates",
    icon: <FaLinkedin className="text-[#0A66C2] text-2xl" />,
    link: "https://linkedin.com/",
  },
  {
    name: "Discord",
    desc: "Join our community for real-time discussions",
    icon: <FaDiscord className="text-[#5865F2] text-2xl" />,
    link: "https://discord.com/",
  },
  {
    name: "Facebook",
    desc: "Follow for updates and behind-the-scenes content",
    icon: <FaFacebook className="text-[#1877F3] text-2xl" />,
    link: "https://facebook.com/",
  },
  {
    name: "X (Twitter)",
    desc: "Latest thoughts and health insights",
    icon: <FaXTwitter className="text-black dark:text-white text-2xl" />,
    link: "https://twitter.com/",
  },
];
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const SponsorBloodAid = () => {
  return (
    <div className="min-h-screen   bg-gradient-to-br from-red-50 via-pink-100 to-white dark:from-[#18122B] dark:via-[#393053] dark:to-[#18122B] flex flex-col items-center py-12 px-2">
      {/* <h1 className="text-3xl md:text-5xl font-extrabold text-center text-[#c30027] mb-2"> */}
      <h1 className="block bg-gradient-to-r from-red-500 via-orange-500 to-yellow-600 bg-clip-text text-transparent font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center animate-text">
        Help Keep <span className="">BloodAid</span> Alive
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-200 text-center mb-2">
        Your support helps us save more lives and grow the BloodAid community.
      </p>
      <p className="text-base text-gray-500 dark:text-gray-400 text-center mb-8">
        Reach out or connect with us on any platform below!
      </p>

      {/* Email Card */}
      <div className="w-full max-w-4xl bg-white/80 dark:bg-[#18122B]/80 backdrop-blur-md rounded-2xl shadow-lg p-6 mb-8 flex flex-col items-center border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-2">
          <FaEnvelope className="text-[#c30027] text-xl" />
          <span className="font-semibold text-lg text-[#c30027]">Get in Touch</span>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-3 text-center">
          Ready to sponsor, partner, or have questions? Let’s connect!
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <button className="btn items-center  justify-center bg-gradient-to-tr from-red-500 via-orange-500 to-yellow-600 text-white px-6 py-2 rounded-full font-semibold  hover:bg-[#a80020] hover:text-white transition" onClick={() => document.getElementById('my_modal_3').showModal()}><FaCcMastercard className="" />
            Support Funding Now</button>
          <a
            href="mailto:bloodaid.team@email.com"
            className="flex items-center gap-2 hover:text-white hover:border-transparent border-gray-500 border text-gray-500 px-6 py-2 rounded-full  hover:bg-[#a80020] transition"
          >
            <FaEnvelope classname="" /> bloodaid.team@email.com
          </a>
        </div>
      </div>

      {/* Modal for the POP FUNDING FORM  */}
      <dialog id="my_modal_3" className="modal px-0 dark:bg-[#18122B]">
        <div className="modal-box px-0  dark:bg-[#18122B]">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <Elements className="w-full bg-red-50" stripe={stripePromise}>
            <FundingForm />
          </Elements>

          <div className="divider px-4"><span className="text-gray-500 dark:text-gray-400">or</span></div>
          <div className="px-4 w-full flex flex-row justify-center gap-4">
            <div onClick={handleComingSoon} className="border flex-1 border-red-200 rounded-lg flex items-center bg-gray-200 opacity-70 transition duration-300 hover:opacity-100">  <img className="" src="/logo/bank-bkash.png" alt="bkash-logo" /> </div>
            <div className="border flex-1 border-red-200 rounded-lg flex items-center bg-gray-200 opacity-70 transition duration-300 hover:opacity-100">  <img className="" src="/logo/bank-nagod.png" alt="nagod-logo" />  </div>
            <div className="border flex-1 border-red-200 rounded-lg flex items-center bg-gray-200 opacity-70 transition duration-300 hover:opacity-100">  <img className="p-4" src="/logo/bank-rocket.png" alt="rocket-logo" /> </div>
          </div>
        </div>
      </dialog >

      {/* Funding Table */}
      <div className=" w-full max-w-4xl bg-white/80 opacity-90 dark:bg-[#18122B]/80 backdrop-blur-md rounded-2xl shadow-lg p-6 mb-8 flex flex-col items-center border border-gray-200 dark:border-gray-700" >
        <FundingTable />
      </div >


      {/* Social Cards */}
      <div div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-8" >
        {
          contacts.map((c) => (
            <div
              key={c.name}
              className="bg-white/80 dark:bg-[#18122B]/80 backdrop-blur-md rounded-2xl shadow p-6 flex flex-col border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center gap-3 mb-2">
                {c.icon}
                <span className="font-semibold text-lg">{c.name}</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{c.desc}</p>
              <a
                href={c.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-[#c30027] text-[#c30027] font-semibold hover:bg-[#FDEDF3] transition w-fit"
              >
                Connect <span aria-hidden><BsArrowRight /></span>
              </a>
            </div>
          ))
        }
      </div >

      <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
        Thank you for considering supporting <span className="text-[#c30027] font-semibold">BloodAid</span> <FaHeart className="inline text-[#c30027]" />
      </p>
    </div >
  );
};

export default SponsorBloodAid;