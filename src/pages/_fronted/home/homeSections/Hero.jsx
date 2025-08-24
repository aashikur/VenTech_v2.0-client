// src/features/home/components/Hero.jsx
// Core conversion Hero for BloodAid (React + Tailwind + DaisyUI)
// - Wrapper: w-full -> container -> content
// - CTAs: Primary (Search Donors), Secondary (Create Request, role-aware)
// - Trust strip: donors, hospitals, fulfilled
// - Uses Link from "react-router" per your requirement

import { Link } from "react-router";
import { useMemo } from "react";
import AuthProvider from "@/providers/AuthProvider";
import useRole from "@/hooks/useRole";

export default function Hero() {
//   const { user } = AuthProvider();
//   const role  = useRole();

const user = false;
const role = "donor";


  const createHref = useMemo(() => {
    const target = "/dashboard/donor/requests/create";
    if (user) return target;
    const returnTo = encodeURIComponent(target);
    return `/login?returnTo=${returnTo}`;
  }, [user, role]);

  return (
    <section className="w-full">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div
          className="
            relative overflow-hidden rounded-3xl
            border border-neutral-200/60 bg-white/80 p-6 md:p-10
            shadow-[0_10px_30px_rgba(0,0,0,.08)] backdrop-blur
            dark:border-white/10 dark:bg-white/5 dark:shadow-[0_20px_60px_rgba(225,29,72,.12)]
          "
        >
          {/* Soft gradient glow */}
          <div className="pointer-events-none absolute -right-14 -top-12 h-56 w-56 rounded-full bg-rose-500/20 blur-3xl dark:bg-rose-500/30" />

          <div className="grid gap-8 lg:grid-cols-2 items-center">
            {/* Left: copy + CTAs */}
            <div>
              <p className="text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                Make every drop count
              </p>
              <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
                Join as a donor or request blood—fast, safe, reliable.
              </h1>
              <p className="mt-3 max-w-xl text-neutral-700 dark:text-neutral-300">
                We connect donors and hospitals with patients in need across Bangladesh.
                Find help in minutes and track every step with confidence.
              </p>

              {/* CTAs */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  to="/donors"
                  className="
                    btn btn-lg border-0 text-white
                    bg-gradient-to-r from-[#FF4D67] to-[#B80D2D]
                    shadow-[0_10px_40px_rgba(184,13,45,0.35)]
                    hover:brightness-105 active:scale-[.98]
                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-400/50
                  "
                >
                  <IconSearch className="w-4 h-4" />
                  Search Donors
                </Link>

                <Link
                  to={createHref}
                  className="
                    btn btn-lg btn-outline
                    border-neutral-300 text-neutral-800 hover:bg-neutral-100
                    dark:border-white/20 dark:text-neutral-100 dark:hover:bg-white/10
                  "
                  title={user ? "Create a new donation request" : "Login to create a request"}
                >
                  <IconPlus className="w-4 h-4" />
                  Create Request
                </Link>
              </div>

              {/* Trust strip */}
              <div className="mt-6 grid grid-cols-3 gap-3 text-sm">
                <TrustItem kpi="500+" label="Active donors" />
                <TrustItem kpi="30+" label="Hospitals" />
                <TrustItem kpi="1,200+" label="Requests fulfilled" />
              </div>
            </div>

            {/* Right: visual card */}
            <div className="relative">
              <div className="absolute -right-6 -top-6 h-48 w-48 rounded-full bg-rose-400/30 blur-3xl dark:bg-rose-500/30" />
              <div
                className="
                  relative rounded-2xl border
                  border-neutral-200/60 bg-white/80 p-6
                  shadow-2xl backdrop-blur
                  dark:border-white/10 dark:bg-white/5 dark:shadow-[0_20px_80px_rgba(225,29,72,.15)]
                "
              >
                <div
                  className="
                    aspect-[16/10] w-full grid place-items-center
                    rounded-xl border border-neutral-200/70
                    text-neutral-600 dark:border-white/10 dark:text-neutral-300
                  "
                >
                  Illustration / Lottie
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="badge badge-ghost">Privacy‑aware</span>
                  <span className="badge badge-primary">Verified requests</span>
                  <span className="badge badge-success">Real‑time updates</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </section>
  );
}

/* -------- Small inline pieces -------- */

function TrustItem({ kpi, label }) {
  return (
    <div
      className="
        rounded-xl px-3 py-4 text-center
        border border-neutral-200/60 bg-white/70 shadow-sm
        dark:border-white/10 dark:bg-white/5
      "
    >
      <div className="text-2xl font-semibold">{kpi}</div>
      <div className="text-xs text-neutral-600 dark:text-neutral-400">{label}</div>
    </div>
  );
}

function IconSearch(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function IconPlus(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}