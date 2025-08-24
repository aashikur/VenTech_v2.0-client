// src/features/home/components/FaqStrip.jsx
// Home section: FAQ Strip
// - Purpose: Answer common objections and build trust quickly.
// - Content: 4-6 accordions for the most frequent questions.
// - Uses Tailwind + DaisyUI, dark/light friendly.

import { Link } from "react-router"; // Or "react-router" if that's your setup

export default function FaqStrip() {
  return (
    <section className="w-full py-8 md:py-10">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
              Quick Answers
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-300">
              Everything you need to know before you donate or request.
            </p>
          </div>
          <Link to="/faq" className="btn btn-outline">
            View Full FAQ
          </Link>
        </div>

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
    </section>
  );
}

/* ----------------------------- Content Data ----------------------------- */
// Edit your questions and answers here easily.
const FAQ_DATA = [
  {
    question: "Is the blood donation process painful?",
    answer:
      "You may feel a slight pinch when the needle is inserted, but most donors experience little to no pain. The life-saving impact far outweighs the momentary discomfort. Our partner centers use trained professionals to ensure you're as comfortable as possible.",
  },
  {
    question: "What if I'm afraid of needles?",
    answer:
      "It's a very common fear. We recommend looking away during the needle insertion, listening to music, or chatting with the staff. Remember, your bravery for a few moments can give someone a lifetime.",
  },
  {
    question: "How do I know if I can donate?",
    answer:
      "Generally, you must be in good health, weigh at least 50 kg (110 lbs), and be between 18-65 years old. Certain medical conditions or medications may affect eligibility. Check our full eligibility guide for details.",
  },
  {
    question: "What should I do after donating?",
    answer:
      "After donating, rest for 10-15 minutes and have the provided snacks and refreshments. Avoid heavy lifting or strenuous activity for the rest of the day. Drink plenty of fluids, especially water, to help your body replenish.",
  },
];