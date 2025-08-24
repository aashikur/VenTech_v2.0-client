// src/features/home/components/PartnersTestimonials.jsx
// FIXED: Combined state to prevent "bouncing" between skeleton and content.

import { useEffect, useState } from "react";
import { Link } from "react-router"; // Using react-router-dom which is standard
import useAxiosPublic from "@/hooks/axiosPublic";

export default function PartnersTestimonials({
  partnersEndpoint = "/hospitals?verified=true&limit=6",
  testimonialsEndpoint = "/testimonials?limit=3", // A new endpoint you can create
}) {
  const axiosPublic = useAxiosPublic();
  const [state, setState] = useState({
    loading: true,
    error: null,
    partners: [],
    testimonials: [],
  });

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      try {
        const [pRes, tRes] = await Promise.allSettled([
          axiosPublic.get(partnersEndpoint),
          axiosPublic.get(testimonialsEndpoint),
        ]);

        if (!active) return; // Prevent state update if component unmounted

        // Determine final data, using mocks as fallback on failure
        const finalPartners =
          pRes.status === "fulfilled"
            ? pRes.value.data?.items || pRes.value.data || []
            : MOCK_PARTNERS;

        const finalTestimonials =
          tRes.status === "fulfilled"
            ? tRes.value.data?.items || tRes.value.data || []
            : MOCK_TESTIMONIALS;

        // Atomically update state in a single call to prevent bouncing
        setState({
          loading: false,
          error: null,
          partners: finalPartners,
          testimonials: finalTestimonials,
        });
      } catch (err) {
        if (active) {
          // Handle critical errors if Promise.allSettled itself fails
          setState({
            loading: false,
            error: "Failed to load community proof",
            partners: MOCK_PARTNERS,
            testimonials: MOCK_TESTIMONIALS,
          });
        }
      }
    };

    fetchData();

    // Cleanup function to prevent memory leaks
    return () => {
      active = false;
    };
  }, [axiosPublic, partnersEndpoint, testimonialsEndpoint]);

  return (
    <section className="w-full py-8 md:py-10">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-5">
          {/* Left: Partners */}
          <div className="lg:col-span-2">
            <PartnersSection loading={state.loading} items={state.partners} />
          </div>

          {/* Right: Testimonials */}
          <div className="lg:col-span-3">
            <TestimonialsSection loading={state.loading} items={state.testimonials} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- Sub-Sections (in-file) -------------------- */

function PartnersSection({ loading, items }) {
  return (
    <div className="h-full rounded-3xl border border-neutral-200/60 bg-white/80 p-6 shadow-[0_10px_30px_rgba(0,0,0,.06)] backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-[0_20px_60px_rgba(225,29,72,.12)]">
      <p className="text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400">Trusted By</p>
      <h2 className="text-2xl font-semibold">Our Partners</h2>
      <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
        Verified hospitals and organizations supporting our mission to save lives.
      </p>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonLogo key={i} />)
          : items.map((p) => <PartnerLogo key={p._id || p.id} p={p} />)}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Link to="/hospitals" className="btn btn-outline btn-sm">View all partners</Link>
        <Link to="/contact" className="btn btn-ghost btn-sm">Become a partner</Link>
      </div>
    </div>
  );
}

function TestimonialsSection({ loading, items }) {
  return (
    <div className="h-full rounded-3xl border border-neutral-200/60 bg-white/80 p-6 shadow-[0_10px_30px_rgba(0,0,0,.06)] backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-[0_20px_60px_rgba(225,29,72,.12)]">
      <p className="text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400">Community Voices</p>
      <h2 className="text-2xl font-semibold">What people are saying</h2>

      <div className="carousel-center carousel mt-4 w-full space-x-4 rounded-box bg-base-200/40 p-4 dark:bg-base-300/20">
        {loading ? (
          <SkeletonTestimonial />
        ) : items && items.length > 0 ? (
          items.map((t, idx) => (
            <div key={t._id || idx} id={`slide${idx}`} className="carousel-item">
              <TestimonialCard t={t} />
            </div>
          ))
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-base-content/70">
            No testimonials yet.
          </div>
        )}
      </div>

      {/* Carousel navigation */}
      {items && items.length > 1 && (
        <div className="mt-3 flex justify-center gap-2 py-2">
          {items.map((_, idx) => (
            <a key={idx} href={`#slide${idx}`} className="btn btn-xs">
              {idx + 1}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

/* -------------------- UI Pieces (in-file) -------------------- */

function PartnerLogo({ p }) {
  return (
    <div className="grid h-16 place-items-center rounded-xl border border-base-300/40 bg-base-100 text-center text-sm font-medium text-base-content/70 shadow-sm transition hover:border-primary/20 hover:shadow-md">
      {p.logoUrl ? (
        <img src={p.logoUrl} alt={p.name} className="h-8 object-contain" />
      ) : (
        <span>{p.name}</span>
      )}
    </div>
  );
}

function TestimonialCard({ t }) {
  return (
    <figure className="card h-full w-80 bg-base-100 shadow-xl">
      <div className="card-body">
        <IconQuote className="h-6 w-6 text-primary/40" />
        <blockquote className="text-base-content/80">"{t.quote}"</blockquote>
        <figcaption className="mt-3 flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img alt={t.authorName} src={t.authorAvatar} />
            </div>
          </div>
          <div>
            <div className="font-semibold">{t.authorName}</div>
            <div className="text-xs text-base-content/60">{t.authorRole}</div>
          </div>
        </figcaption>
      </div>
    </figure>
  );
}

function SkeletonLogo() {
  return <div className="h-16 rounded-xl bg-base-200 animate-pulse" />;
}

function SkeletonTestimonial() {
  return (
    <div className="card w-80 bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="skeleton mb-3 h-4 w-1/4 rounded"></div>
        <div className="skeleton mb-1 h-3 w-full rounded"></div>
        <div className="skeleton mb-1 h-3 w-full rounded"></div>
        <div className="skeleton h-3 w-3/4 rounded"></div>
        <div className="mt-3 flex items-center gap-3">
          <div className="skeleton h-10 w-10 shrink-0 rounded-full"></div>
          <div className="flex-1 space-y-2">
            <div className="skeleton h-3 w-1/2 rounded"></div>
            <div className="skeleton h-2 w-1/3 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function IconQuote(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M6 17h3l2-4V7H5v6h3l-2 4zm8 0h3l2-4V7h-6v6h3l-2 4z" />
    </svg>
  );
}

/* ----------------------------- Mock Data ----------------------------- */

const MOCK_PARTNERS = [
  { _id: "h-001", name: "CityCare Hospital", verified: true },
  { _id: "h-002", name: "GreenLife Medical", verified: true },
  { _id: "h-003", name: "Raj Central", verified: true },
  { _id: "h-004", name: "North University", verified: true },
  { _id: "h-005", name: "TechPark CSR", verified: true },
  { _id: "h-006", name: "Community Trust", verified: true },
];

const MOCK_TESTIMONIALS = [
  {
    _id: "t-001",
    quote: "Finding a donor for my father was incredibly stressful until I found BloodAid. We got a match in under an hour. Truly life-saving.",
    authorName: "Fatima Ahmed",
    authorRole: "Patient's Daughter",
    authorAvatar: "https://i.pravatar.cc/80?img=33",
  },
  {
    _id: "t-002",
    quote: "As a regular donor, the app makes it easy to see when I'm eligible and find urgent requests near me. The process is seamless.",
    authorName: "Rahim Khan",
    authorRole: "Verified Donor",
    authorAvatar: "https://i.pravatar.cc/80?img=11",
  },
  {
    _id: "t-003",
    quote: "Our hospital relies on BloodAid to quickly connect with donors during emergencies. The volunteer verification is a game-changer.",
    authorName: "Dr. Salma Chowdhury",
    authorRole: "ER Doctor, CityCare Hospital",
    authorAvatar: "https://i.pravatar.cc/80?img=22",
  },
];