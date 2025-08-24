// src/features/home/components/SafetyEligibility.jsx
// Home section: Safety & Eligibility
// - Purpose: Build confidence and reduce fear with clear, actionable tips.
// - Content: Mini-cards for key requirements and aftercare.

import { Link } from "react-router";

const SAFETY_TIPS = [
  {
    icon: "✅",
    title: "Eligibility Checklist",
    text: "Must be 18-65, weigh over 50kg, and be in good health.",
    ctaText: "Full Checklist",
    ctaLink: "/eligibility",
  },
  {
    icon: "💧",
    title: "Hydrate Well",
    text: "Drink plenty of water before and after your donation.",
    ctaText: "Learn More",
    ctaLink: "/blog/donation-preparation", // Example link
  },
  {
    icon: "🍎",
    title: "Eat a Healthy Meal",
    text: "Have a nutritious meal a few hours before donating.",
    ctaText: "See Tips",
    ctaLink: "/blog/donation-preparation", // Example link
  },
  {
    icon: "🆔",
    title: "Bring an ID",
    text: "A valid photo ID is required to verify your identity.",
    ctaText: "Why?",
    ctaLink: "/faq",
  },
];

export default function SafetyEligibility() {
  return (
    <section className="w-full py-8 md:py-10 bg-base-200/50 dark:bg-base-300/20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-4 text-center">
          <p className="text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
            Your Health First
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold">
            Safety & Eligibility
          </h2>
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
            We prioritize your well-being. Here’s what you need to know.
          </p>
        </div>

        {/* Mini-Cards */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SAFETY_TIPS.map((tip) => (
            <div
              key={tip.title}
              className="card h-full bg-base-100 border border-base-300/40 shadow-lg text-center"
            >
              <div className="card-body">
                <div className="mx-auto text-4xl">{tip.icon}</div>
                <h3 className="card-title justify-center">{tip.title}</h3>
                <p className="text-sm text-base-content/70">{tip.text}</p>
                <div className="card-actions justify-center pt-2">
                   <Link to={tip.ctaLink} className="btn btn-ghost btn-sm">
                      {tip.ctaText}
                   </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Link to="/eligibility" className="btn btn-primary">
            Take the Quick Eligibility Quiz
          </Link>
        </div>
      </div>
    </section>
  );
}