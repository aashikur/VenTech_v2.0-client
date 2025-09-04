// src/features/home/components/FaqStrip.jsx
// Home section: FAQ Strip
// - Purpose: Answer common objections and build trust quickly.
// - Content: 4-6 accordions for the most frequent questions.
// - Uses Tailwind + DaisyUI, dark/light friendly.

import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import { Link } from "react-router"; // Or "react-router" if that's your setup

export default function FaqStrip() {
  return (
    <Section
      title={'Frequently Asked Questions'}
      subtitle={'Quick Answers'}
      id={'faq'}
      viewAll={'View Full FAQ'}
      description={'Everything you need to know before you donate or request.'}
      className="">
      <div>

        {/* Accordion List */}
        <div className="mt-6 grid gap-3 lg:grid-cols-2">
          {FAQ_DATA.map((item, index) => (
            <div
              key={index}
              className="collapse collapse-plus bg-base-100 border border-base-300/40"
            >
              <input type="checkbox" name={`faq-accordion-${index}`} />
              <div className="collapse-title text-lg font-medium">
                {item.question}
              </div>
              <div className="collapse-content text-sm text-base-content/80">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ----------------------------- Content Data ----------------------------- */
// Edit your questions and answers here easily.
const FAQ_DATA = [
  {
    question: "What is VenTech?",
    answer:
      "VenTech is a multi-vendor e-commerce platform designed to help businesses easily set up and manage their online stores. Vendors can showcase products, track sales, and reach customers, while buyers enjoy a seamless shopping experience.",
  },
  {
    question: "How do I become a vendor on VenTech?",
    answer:
      "Simply register for a vendor account, submit the required business details, and once approved, you can start uploading your products. Our vendor dashboard makes it easy to manage inventory, orders, and customer interactions.",
  },
  {
    question: "Is there a fee to sell on VenTech?",
    answer:
      "VenTech offers flexible pricing models. Some plans may include a small commission per sale, while others provide subscription-based options for unlimited listings. Check our pricing page for details.",
  },
  {
    question: "How do customers pay for products?",
    answer:
      "VenTech supports multiple secure payment gateways, including credit/debit cards, mobile banking, and digital wallets. Payments are processed safely, and vendors receive payouts on a scheduled basis.",
  },
  {
    question: "Can I track my orders and sales?",
    answer:
      "Yes, every vendor has access to a real-time dashboard where you can view sales analytics, track order status, manage returns, and monitor customer feedback all in one place.",
  },
  {
    question: "Does VenTech provide customer support?",
    answer:
      "Absolutely. Both vendors and customers can reach out to our support team 24/7 for assistance. We also provide learning resources, FAQs, and onboarding help for new vendors.",
  },
];
