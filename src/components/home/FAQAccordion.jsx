import { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { FaRegSmileBeam } from "react-icons/fa"; // Demo icon

const faqs = [
  {
    question: "Is the blood donation process painful?",
    answer:
      "You may feel a slight pinch, but most donors experience little or no pain. If you need extra support, you can bring a friend or family member with you.",
  },
  {
    question: "What if I am afraid of needles?",
    answer:
      "It's normal to feel nervous! Our staff are trained to make you comfortable and support you throughout the process.",
  },
  {
    question: "How do I know if I can donate?",
    answer:
      "You can check our eligibility guidelines or contact us for a quick assessment before donating.",
  },
  {
    question: "Will I need blood after donating?",
    answer:
      "No, your body quickly replaces the donated blood. You may rest and drink fluids after donation.",
  },
  {
    question: "How often can I donate blood?",
    answer:
      "You can donate whole blood every 3-4 months. For plasma or platelets, the interval is shorter.",
  },
];

export default function FAQWithCharacter() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <div className="relative dark:bg-[#393053] py-12 px-4 md:px-6 lg:px-8 rounded-[40px] w-full sm:rounded-[60px] lg:rounded-[100px]  mx-auto my-12">
      <div className="flex max-w-[1500px] mx-auto flex-col md:flex-row items-center gap-10">
        {/* Left: Accordion */}
        <div className="w-full md:w-1/2 z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-left text-[#c30027] mb-8">
            Still have <span className="text-black dark:text-white">questions?</span>
          </h2>
          <div className="flex flex-col gap-4 text-[0.9rem]">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className={`rounded-xl transition shadow bg-white dark:bg-[#18122B] ${
                  openIdx === idx
                    ? "border-2 border-[#fcacbc] dark:border-gray-800"
                    : "border border-gray-200 dark:border-gray-700"
                }`}
              >
                <button
                  className="w-full flex justify-between items-center px-5 py-4 font-semibold text-left text-[#c30027] dark:text-white focus:outline-none"
                  onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
                >
                  <span>{faq.question}</span>
                  <span className="text-2xl text-[#b9b9b9]">
                    {openIdx === idx ? "−" : "+"}
                  </span>
                </button>
                {openIdx === idx && (
                  <div className="px-5 pb-4 text-gray-700 dark:text-[#a3a3a3] text-sm">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-start mt-8">
            <button
              className="px-6 py-2 flex items-center gap-3 rounded-full bg-[#c30027] text-white font-semibold hover:bg-red-700 transition"
              onClick={() => (window.location.href = "/contact")}
            >
              Have some Questions? <BsArrowRight />
            </button>
          </div>
        </div>

        {/* Right: Character image (hidden on mobile) */}
        <div className="hidden opacity-70 md:flex justify-center w-full md:w-1/2 z-10">
          <img className="max-w-80" src="/logo/faq-1.png" alt="FAQ Character" />
        </div>

        {/* Watermark-style background logo */}
        <img
          src="/logo/faq-5.png"
          className="absolute max-w-30 inline-block sm:hidden  sm:max-w-96 opacity-10 top-0 right-0 sm:left-0 z-0  sm:bottom-0"
          alt="Background Logo"
        />
                <img
          src="/logo/faq-5.png"
          className="absolute max-w-30 hidden sm:inline-block  sm:max-w-96 opacity-10 bottom-0 left-0"
          alt="Background Logo"
        />
      </div>
    </div>
  );
}
