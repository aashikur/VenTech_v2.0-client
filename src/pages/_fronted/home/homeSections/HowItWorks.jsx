// src/features/home/components/HowItWorks.jsx
// Home section: How It Works
// - Purpose: Reduce friction by showing a simple 3-step process.
// - Uses Tailwind + DaisyUI's "steps" component.

import { Link } from "react-router";

export default function HowItWorks() {
  return (
    <section className="w-full py-8 md:py-10">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-4 text-center">
          <p className="text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
            Simple & Transparent
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold">
            How BloodAid Works
          </h2>
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
            A straightforward path from need to relief in three simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-6 rounded-3xl border border-neutral-200/60 bg-white/80 p-6 md:p-8 shadow-[0_10px_30px_rgba(0,0,0,.06)] backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-[0_20px_60px_rgba(225,29,72,.12)]">
          <ul className="steps steps-vertical lg:steps-horizontal w-full">
            <li data-content="✓" className="step step-primary">
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <span className="font-semibold">Step 1: Create or Search</span>
                <span className="text-xs text-base-content/70">
                  Patients create a request, or donors search for needs.
                </span>
              </div>
            </li>
            <li data-content="✓" className="step step-primary">
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <span className="font-semibold">Step 2: Get Verified & Matched</span>
                <span className="text-xs text-base-content/70">
                  Volunteers verify requests, and our system finds the best matches.
                </span>
              </div>
            </li>
            <li data-content="✓" className="step step-primary">
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <span className="font-semibold">Step 3: Donate & Update</span>
                <span className="text-xs text-base-content/70">
                  Donors connect with patients to donate safely and update the status.
                </span>
              </div>
            </li>
          </ul>
        </div>

        <div className="mt-6 text-center">
          <Link to="/how-it-works" className="btn btn-outline">
            Learn More About the Process
          </Link>
        </div>
      </div>
    </section>
  );
}