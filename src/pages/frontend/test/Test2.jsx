// test2.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";

// Utility: Count up on view
function useCountUp(target = 0, duration = 900) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const start = performance.now();
            const animate = (ts) => {
              const p = Math.min(1, (ts - start) / duration);
              setValue(Math.floor(p * target));
              if (p < 1) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
            io.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);
  return { ref, value };
}

// Simple Toast system (DaisyUI "toast")
function useToasts() {
  const [toasts, setToasts] = useState([]);
  const push = (msg, type = "info", timeout = 2400) => {
    const id = crypto.randomUUID();
    setToasts((t) => [...t, { id, msg, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), timeout);
  };
  const Toasts = () => (
    <div className="toast toast-top toast-end z-50">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`alert ${
            t.type === "success"
              ? "alert-success"
              : t.type === "error"
              ? "alert-error"
              : "alert-info"
          } shadow-lg`}
        >
          <span>{t.msg}</span>
        </div>
      ))}
    </div>
  );
  return { push, Toasts };
}

// Small building blocks
const Section = ({ id, title, subtitle, children }) => (
  <section id={id} className="space-y-6">
    <header>
      <h2 className="text-2xl font-bold">{title}</h2>
      {subtitle && <p className="text-base-content/60">{subtitle}</p>}
    </header>
    {children}
  </section>
);

const Swatch = ({ color, label }) => (
  <div className="flex flex-col items-center gap-2">
    <div className="h-12 w-full rounded-lg shadow-sm" style={{ background: color }} />
    <span className="text-xs text-base-content/70">{label}</span>
  </div>
);

const BrandGradientBtn = ({ className = "", children, ...props }) => (
  <button
    className={
      "btn border-0 text-white hover:brightness-105 " +
      "bg-gradient-to-r from-rose-500 via-rose-600 to-red-600 " +
      "shadow-[0_10px_30px_rgba(225,29,72,0.35)] " +
      className
    }
    {...props}
  >
    {children}
  </button>
);

const Pill = ({ children, className = "" }) => (
  <div className={`badge badge-ghost border-base-300 ${className}`}>{children}</div>
);

const Glow = ({ className = "" }) => (
  <div
    className={
      "pointer-events-none absolute -z-10 blur-3xl opacity-50 " + className
    }
    style={{
      background:
        "radial-gradient(56rem 56rem at 10% -10%, rgba(244,63,94,0.18) 0%, transparent 40%), radial-gradient(40rem 40rem at 90% -20%, rgba(225,29,72,0.16) 0%, transparent 45%)",
    }}
  />
);

export default function Test2() {
  // DaisyUI theme toggle
  const [theme, setTheme] = useState("light"); // 'light' | 'dark'
  useEffect(() => {
    // Apply theme at root of this page section
    const root = document.getElementById("test2-root");
    if (root) root.setAttribute("data-theme", theme);
  }, [theme]);

  const { push: pushToast, Toasts } = useToasts();

  const [tab, setTab] = useState("list");
  const [modalOpen, setModalOpen] = useState(false);

  const lives = useCountUp(1200);
  const donors = useCountUp(500);
  const hospitals = useCountUp(30);

  return (
    <div id="test2-root" className="min-h-screen bg-base-200">
      {/* NAVBAR */}
      <div className="navbar bg-base-100 sticky top-0 z-40 border-b border-base-300/60 backdrop-blur">
        <div className="flex-1">
          <a href="#top" className="btn btn-ghost text-xl gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl text-white font-bold bg-gradient-to-br from-rose-500 to-red-600 shadow-md">
              BA
            </span>
            BloodAid — UI Reference
          </a>
        </div>
        <div className="flex-none gap-2">
          <div className="hidden md:flex items-center gap-2">
            <a href="#tokens" className="btn btn-ghost btn-sm">Tokens</a>
            <a href="#type" className="btn btn-ghost btn-sm">Type</a>
            <a href="#buttons" className="btn btn-ghost btn-sm">Buttons</a>
            <a href="#cards" className="btn btn-ghost btn-sm">Cards</a>
            <a href="#faq" className="btn btn-ghost btn-sm">FAQ</a>
          </div>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
          >
            {theme === "light" ? "Dark" : "Light"}
          </button>
          <BrandGradientBtn className="btn-sm">
            Call to action
          </BrandGradientBtn>
        </div>
      </div>

      {/* Announcement */}
      <div className="alert shadow-sm rounded-none bg-gradient-to-r from-rose-600 to-red-600 text-white">
        <div>
          <span>Love BloodAid? Help us save more lives.</span>
          <a href="#cta" className="link link-hover ml-2 text-white/90">Become a sponsor →</a>
        </div>
      </div>

      {/* HERO */}
      <div className="relative">
        <Glow className="inset-0" />
        <div className="hero py-16 bg-base-200">
          <div className="hero-content flex-col lg:flex-row-reverse gap-12 max-w-7xl">
            <div className="mockup-window border bg-base-300 max-w-lg w-full shadow-xl">
              <div className="bg-base-100 p-6">
                <div className="skeleton h-40 w-full rounded-xl"></div>
              </div>
            </div>
            <div className="max-w-xl">
              <p className="text-sm font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-wide">
                Become a Donor
              </p>
              <h1 className="text-5xl font-bold mt-2">
                Join as a Donor
              </h1>
              <p className="py-4 text-base-content/70">
                Be a hero. Your blood can save lives today. Check your eligibility and find verified requests near you.
              </p>
              <div className="flex flex-wrap gap-3">
                <BrandGradientBtn className="btn-lg">Become a Donor</BrandGradientBtn>
                <button className="btn btn-outline btn-lg">Find urgent requests</button>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="stat place-items-center shadow-sm rounded-2xl bg-base-100">
                  <div className="stat-title">Lives Saved</div>
                  <div ref={lives.ref} className="stat-value text-3xl tabular-nums">
                    {lives.value.toLocaleString()}
                  </div>
                </div>
                <div className="stat place-items-center shadow-sm rounded-2xl bg-base-100">
                  <div className="stat-title">Active Donors</div>
                  <div ref={donors.ref} className="stat-value text-3xl tabular-nums">
                    {donors.value.toLocaleString()}
                  </div>
                </div>
                <div className="stat place-items-center shadow-sm rounded-2xl bg-base-100">
                  <div className="stat-title">Hospitals</div>
                  <div ref={hospitals.ref} className="stat-value text-3xl tabular-nums">
                    {hospitals.value.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* CONTENT */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-10 space-y-16">
        {/* TOKENS */}
        <Section
          id="tokens"
          title="Design Tokens"
          subtitle="Brand palette, neutrals, semantic colors, radii, shadows."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <div className="card bg-base-100 shadow-md">
              <div className="card-body">
                <h3 className="card-title">Brand</h3>
                <div className="grid grid-cols-5 gap-2">
                  <Swatch color="#FFE6E9" label="50" />
                  <Swatch color="#FFD2D8" label="100" />
                  <Swatch color="#FF9CA8" label="300" />
                  <Swatch color="#FF354D" label="500" />
                  <Swatch color="#E11937" label="600" />
                </div>
                <p className="text-xs text-base-content/60 mt-2">
                  Use 500/600 for actions; 50/100 for surfaces.
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-md">
              <div className="card-body">
                <h3 className="card-title">Neutrals</h3>
                <div className="grid grid-cols-6 gap-2">
                  <Swatch color="#F9FAFB" label="50" />
                  <Swatch color="#F3F4F6" label="100" />
                  <Swatch color="#E5E7EB" label="200" />
                  <Swatch color="#D1D5DB" label="300" />
                  <Swatch color="#4B5563" label="600" />
                  <Swatch color="#111827" label="900" />
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-md">
              <div className="card-body">
                <h3 className="card-title">Semantic</h3>
                <div className="flex flex-wrap gap-2">
                  <div className="badge badge-success">Success</div>
                  <div className="badge badge-warning">Warning</div>
                  <div className="badge badge-error">Error</div>
                  <div className="badge badge-info">Info</div>
                </div>
                <p className="text-xs text-base-content/60 mt-2">Match messages to color.</p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-md">
              <div className="card-body">
                <h3 className="card-title">Radii & Shadows</h3>
                <div className="flex items-end gap-4">
                  <div className="w-16 h-10 bg-base-200 rounded-lg shadow"></div>
                  <div className="w-16 h-10 bg-base-200 rounded-xl shadow"></div>
                  <div className="w-16 h-10 bg-base-200 rounded-2xl shadow-lg"></div>
                  <div className="w-16 h-10 bg-base-200 rounded-full shadow-xl"></div>
                </div>
                <p className="text-xs text-base-content/60 mt-2">Cards: 16–20px radius; Pills: full.</p>
              </div>
            </div>
          </div>
        </Section>

        {/* TYPE */}
        <Section id="type" title="Typography scale" subtitle="Headlines with strong hierarchy; friendly body copy.">
          <div className="card bg-base-100 shadow-md">
            <div className="card-body space-y-2">
              <h1 className="text-5xl font-bold">H1 — Your blood can save a life today</h1>
              <h2 className="text-4xl font-semibold">H2 — Find urgent requests near you</h2>
              <h3 className="text-3xl font-semibold">H3 — Safer, faster donations</h3>
              <h4 className="text-2xl font-semibold">H4 — Eligibility & Safety</h4>
              <p className="text-lg text-base-content/80">
                Body L — Reassuring and action-forward. Keep line length to ~65 characters.
              </p>
              <p className="text-base text-base-content/70">Body M — Default text size for most content.</p>
              <p className="text-sm text-base-content/60">Body S — Use for metadata and captions.</p>
              <p className="text-xs uppercase tracking-wide text-base-content/50">Overline — Section label</p>
            </div>
          </div>
        </Section>

        {/* BUTTONS + BADGES */}
        <Section id="buttons" title="Buttons & Badges" subtitle="Primary, secondary, ghost, semantic, sizes, loading and gradient.">
          <div className="card bg-base-100 shadow-md">
            <div className="card-body space-y-4">
              <div className="flex flex-wrap gap-3 items-center">
                <BrandGradientBtn className="btn-lg">Primary Gradient</BrandGradientBtn>
                <button className="btn btn-primary btn-lg">Primary</button>
                <button className="btn btn-outline btn-lg">Secondary</button>
                <button className="btn btn-ghost btn-lg">Ghost</button>
                <button className="btn btn-success btn-lg">Success</button>
                <button className="btn btn-error btn-lg">Danger</button>
                <button className="btn btn-primary btn-lg loading">Loading</button>
              </div>
              <div className="flex flex-wrap gap-3 items-center">
                <button className="btn btn-primary btn-md">Medium</button>
                <button className="btn btn-outline btn-sm">Small</button>
                <button className="btn btn-ghost btn-sm">Ghost Small</button>
                <button className="btn btn-success btn-sm">Save</button>
                <button className="btn btn-error btn-sm">Delete</button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Pill>New</Pill>
                <div className="badge badge-primary">Verified</div>
                <div className="badge badge-warning">Pending</div>
                <div className="badge badge-error">Urgent</div>
                <div className="badge">Neutral</div>
              </div>
            </div>
          </div>
        </Section>

        {/* FORMS */}
        <Section id="forms" title="Forms" subtitle="Inputs, selects, textarea, toggle, checkbox, radio and filters.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card bg-base-100 shadow-md">
              <div className="card-body space-y-4">
                <div className="form-control">
                  <label className="label"><span className="label-text">Full name</span></label>
                  <input type="text" placeholder="e.g., Ahsikur Rahman" className="input input-bordered" />
                  <label className="label"><span className="label-text-alt text-base-content/60">Shown on your donor profile.</span></label>
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text">Email</span></label>
                  <input type="email" placeholder="you@email.com" className="input input-bordered" />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text">Subject</span></label>
                  <select className="select select-bordered">
                    <option>General question</option>
                    <option>Become a donor</option>
                    <option>Hospital partnership</option>
                  </select>
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text">Message</span></label>
                  <textarea className="textarea textarea-bordered" rows={4} placeholder="How can we help?"></textarea>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <label className="label cursor-pointer gap-3">
                    <input type="checkbox" className="checkbox checkbox-primary" defaultChecked />
                    <span className="label-text">I agree to the terms</span>
                  </label>
                  <label className="label cursor-pointer gap-2">
                    <input type="radio" name="role" className="radio radio-primary" defaultChecked />
                    <span className="label-text">Donor</span>
                  </label>
                  <label className="label cursor-pointer gap-2">
                    <input type="radio" name="role" className="radio radio-primary" />
                    <span className="label-text">Hospital</span>
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="toggle toggle-primary" />
                  <span className="text-sm">Available to donate</span>
                </div>
                <div className="flex items-center gap-3">
                  <BrandGradientBtn onClick={() => pushToast("Message sent! We'll reply soon.", "success")}>
                    Send message
                  </BrandGradientBtn>
                  <button className="btn btn-outline">Cancel</button>
                </div>
              </div>
            </div>

            {/* Search + Filters */}
            <div className="card bg-base-100 shadow-md">
              <div className="card-body space-y-4">
                <div className="join w-full">
                  <input className="input input-bordered join-item w-full" placeholder="Search requests, hospitals, blood type..." />
                  <button className="btn btn-outline join-item">Search</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["A+","A-","B+","B-","O+","O-","AB+","AB-"].map((t) => (
                    <div key={t} className="badge badge-ghost border-base-300">{t}</div>
                  ))}
                  <div className="badge">Urgent only</div>
                  <div className="badge">Within 10km</div>
                </div>
                <label className="label"><span className="label-text">Distance (km)</span></label>
                <input type="range" min={1} max={50} defaultValue={10} className="range range-primary" />
                <div className="grid grid-cols-2 gap-3">
                  <button className="btn btn-outline">Reset</button>
                  <BrandGradientBtn>Apply Filters</BrandGradientBtn>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* CARDS & LIST */}
        <Section id="cards" title="Request Cards & Lists" subtitle="Status pill, blood type badge, urgency meter, distance, CTA">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Request card */}
            <div className="card bg-base-100 shadow-lg hover:shadow-xl transition relative">
              <div className="absolute -top-16 right-10 h-40 w-40 rounded-full blur-3xl opacity-20 bg-gradient-to-br from-rose-500 to-red-600"></div>
              <div className="card-body gap-4 relative">
                <div className="flex items-start justify-between">
                  <div className="flex flex-wrap gap-2">
                    <div className="badge badge-error">Urgent</div>
                    <div className="badge badge-primary badge-outline">Verified Hospital</div>
                  </div>
                  <Pill>12 km</Pill>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">A+ Blood Needed — City Medical Center</h3>
                    <p className="text-sm text-base-content/70">Patient: Female, 28 • Needed by: Today 6 PM</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-extrabold text-rose-600">A+</div>
                    <div className="text-xs text-base-content/60">2 bags</div>
                  </div>
                </div>
                <div>
                  <progress className="progress progress-error w-full" value="70" max="100"></progress>
                  <p className="text-xs text-base-content/60 mt-1">Urgency 70% • Contact hospital to schedule</p>
                </div>
                <div className="card-actions">
                  <BrandGradientBtn onClick={() => setModalOpen(true)}>Donate</BrandGradientBtn>
                  <button className="btn btn-outline">Details</button>
                  <button
                    className="btn btn-ghost"
                    onClick={() => {
                      navigator.clipboard?.writeText("City Medical Center, 123 Main St");
                      pushToast("Address copied", "success");
                    }}
                  >
                    Copy address
                  </button>
                </div>
              </div>
            </div>

            {/* List/Map Tabs */}
            <div className="card bg-base-100 shadow-md">
              <div className="card-body space-y-4">
                <div role="tablist" className="tabs tabs-boxed">
                  <button
                    role="tab"
                    className={`tab ${tab === "list" ? "tab-active" : ""}`}
                    onClick={() => setTab("list")}
                  >
                    List
                  </button>
                  <button
                    role="tab"
                    className={`tab ${tab === "map" ? "tab-active" : ""}`}
                    onClick={() => setTab("map")}
                  >
                    Map
                  </button>
                </div>
                {tab === "list" ? (
                  <div className="space-y-3">
                    <div className="p-4 border border-base-300 rounded-xl flex items-center justify-between">
                      <div>
                        <div className="font-medium">O- Blood • Mercy Hospital</div>
                        <div className="text-xs text-base-content/60">2.5 km • Needed within 24 hrs</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="badge badge-error">Urgent</div>
                        <BrandGradientBtn className="btn-sm">Donate</BrandGradientBtn>
                      </div>
                    </div>
                    <div className="p-4 border border-base-300 rounded-xl flex items-center justify-between">
                      <div>
                        <div className="font-medium">AB+ Blood • City Clinic</div>
                        <div className="text-xs text-base-content/60">6.1 km • Needed in 48 hrs</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="badge badge-outline">Verified</div>
                        <button className="btn btn-outline btn-sm">Details</button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="h-56 rounded-xl bg-[url('https://images.unsplash.com/photo-1502920917128-1aa500764b2c?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center"></div>
                    <p className="text-xs text-base-content/60">Map placeholder — integrate an actual map later.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Section>

        {/* HOW IT WORKS / WIZARD */}
        <Section id="steps" title="How It Works — Wizard" subtitle="Use as onboarding or eligibility check.">
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="badge badge-success">Step 1</div>
                  <div className="text-sm font-medium">Check eligibility</div>
                </div>
                <div className="text-sm text-base-content/60">Step 2 of 4</div>
              </div>
              <progress className="progress progress-primary w-full" value="50" max="100"></progress>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="form-control">
                  <label className="label"><span className="label-text">Age</span></label>
                  <select className="select select-bordered">
                    <option>18–25</option>
                    <option>26–35</option>
                    <option>36–45</option>
                    <option>46+</option>
                  </select>
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text">Weight (kg)</span></label>
                  <input className="input input-bordered" type="number" placeholder="e.g., 60" />
                </div>
                <div className="md:col-span-2">
                  <label className="label"><span className="label-text">Have you donated in the last 3 months?</span></label>
                  <div className="join">
                    <button className="btn btn-outline join-item">Yes</button>
                    <button className="btn btn-outline join-item">No</button>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-between">
                <button className="btn btn-ghost">Back</button>
                <div className="flex gap-2">
                  <button className="btn btn-outline">Save draft</button>
                  <BrandGradientBtn>Continue</BrandGradientBtn>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* FAQ */}
        <Section id="faq" title="FAQ — Accordion" subtitle="Two-column layout on desktop.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card bg-base-100 shadow-md">
              <div className="card-body">
                <div className="collapse collapse-arrow border border-base-300">
                  <input type="checkbox" />
                  <div className="collapse-title text-md font-medium">
                    Is the blood donation process painful?
                  </div>
                  <div className="collapse-content text-sm">
                    <p>You may feel a slight pinch, but most donors experience little or no pain. Bring a friend if you want support.</p>
                  </div>
                </div>
                <div className="collapse collapse-arrow border border-base-300">
                  <input type="checkbox" />
                  <div className="collapse-title text-md font-medium">
                    What if I am afraid of needles?
                  </div>
                  <div className="collapse-content text-sm">
                    <p>Tell our staff. We’ll guide you step-by-step and help you relax.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-md">
              <div className="card-body">
                <div className="collapse collapse-arrow border border-base-300">
                  <input type="checkbox" />
                  <div className="collapse-title text-md font-medium">
                    How do I know if I can donate?
                  </div>
                  <div className="collapse-content text-sm">
                    <p>Use the eligibility check. Typically: age 18+, weight 50kg+, no recent tattoos (3–6 months), good health.</p>
                  </div>
                </div>
                <div className="collapse collapse-arrow border border-base-300">
                  <input type="checkbox" />
                  <div className="collapse-title text-md font-medium">
                    Will I need blood after donating?
                  </div>
                  <div className="collapse-content text-sm">
                    <p>Most donors recover quickly. Hydrate, eat well, and rest for the day.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button className="btn btn-outline">See all FAQs</button>
        </Section>

        {/* TESTIMONIALS + PARTNERS */}
        <Section id="social" title="Testimonials & Partners">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card bg-base-100 shadow-md">
              <div className="card-body gap-4">
                <div className="flex items-center gap-4">
                  <div className="avatar placeholder">
                    <div className="bg-rose-200 dark:bg-rose-300 text-rose-700 rounded-full w-12">
                      <span>D</span>
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">Donor</div>
                    <div className="text-sm text-base-content/60">Verified</div>
                  </div>
                </div>
                <p className="text-base-content/80">
                  “The alerts helped me respond to a nearby request the same day. The process was fast and safe.”
                </p>
                <div className="rating rating-sm rating-half">
                  {[...Array(5)].map((_, i) => (
                    <input
                      key={i}
                      type="radio"
                      name="rating-10"
                      className="bg-yellow-400 mask mask-star-2"
                      readOnly
                      checked={i === 4}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-md">
              <div className="card-body">
                <p className="text-sm font-semibold mb-3">Trusted by leading hospitals</p>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 opacity-80">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-12 rounded-lg bg-base-200 border border-base-300"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* CONTACT */}
        <Section id="contact" title="Contact us">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="card bg-base-100 shadow-md">
              <div className="card-body">
                <h3 className="card-title">Support</h3>
                <p className="text-base-content/70 text-sm">We reply within 24 hours.</p>
                <div className="text-sm mt-2">
                  <div>Email: <a className="link link-primary">info@bloodaid.com</a></div>
                  <div>WhatsApp: +000 123 456</div>
                </div>
              </div>
            </div>

            <form
              className="card lg:col-span-2 bg-base-100 shadow-md"
              onSubmit={(e) => {
                e.preventDefault();
                pushToast("Message sent! We’ll reply soon.", "success");
              }}
            >
              <div className="card-body space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label"><span className="label-text">Full Name</span></label>
                    <input className="input input-bordered" placeholder="Your name" />
                  </div>
                  <div className="form-control">
                    <label className="label"><span className="label-text">Email</span></label>
                    <input className="input input-bordered" type="email" placeholder="you@email.com" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label"><span className="label-text">Subject</span></label>
                    <select className="select select-bordered">
                      <option>General</option>
                      <option>Partnership</option>
                      <option>Technical issue</option>
                    </select>
                  </div>
                  <div className="form-control">
                    <label className="label"><span className="label-text">Phone (optional)</span></label>
                    <input className="input input-bordered" placeholder="+880..." />
                  </div>
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text">Message</span></label>
                  <textarea className="textarea textarea-bordered" rows={4} placeholder="Write your message..." />
                </div>
                <div className="flex items-center justify-between">
                  <label className="label cursor-pointer gap-2">
                    <input type="checkbox" className="checkbox checkbox-primary" defaultChecked />
                    <span className="label-text">Email me a copy</span>
                  </label>
                  <BrandGradientBtn type="submit">Send Message</BrandGradientBtn>
                </div>
              </div>
            </form>
          </div>
        </Section>

        {/* CTA */}
        <Section id="cta" title="CTA Banner">
          <div className="card bg-base-100 shadow-md">
            <div className="card-body md:flex md:items-center md:justify-between gap-4 bg-gradient-to-br from-base-100 to-base-200">
              <div>
                <h3 className="text-3xl font-bold">Get alerts for your blood type</h3>
                <p className="text-base-content/70 mt-2">
                  We’ll notify you when verified requests match your profile.
                </p>
              </div>
              <div className="join">
                <input className="input input-bordered join-item" type="email" placeholder="you@email.com" />
                <BrandGradientBtn className="join-item">Subscribe</BrandGradientBtn>
              </div>
            </div>
          </div>
        </Section>

        {/* FEEDBACK */}
        <Section id="feedback" title="Feedback components">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="card bg-base-100 shadow-md">
              <div className="card-body space-y-3">
                <div className="alert alert-success">Success: Operation completed.</div>
                <div className="alert alert-warning">Warning: Donor inactive.</div>
                <div className="alert alert-error">Error: Something went wrong.</div>
                <div className="flex gap-2">
                  <button className="btn btn-outline btn-sm" onClick={() => pushToast("Saved successfully", "success")}>Show toast</button>
                  <button className="btn btn-outline btn-sm" onClick={() => pushToast("Network error, try again", "error")}>Show error toast</button>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-md">
              <div className="card-body space-y-3">
                <h3 className="font-semibold">Modal</h3>
                <BrandGradientBtn onClick={() => setModalOpen(true)}>Open modal</BrandGradientBtn>
                <p className="text-sm text-base-content/60">Use for confirmation or short forms.</p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-md">
              <div className="card-body space-y-3">
                <h3 className="font-semibold">Skeleton & Empty states</h3>
                <div className="animate-pulse space-y-2">
                  <div className="h-4 bg-base-300 rounded"></div>
                  <div className="h-4 bg-base-300 rounded w-5/6"></div>
                  <div className="h-24 bg-base-300 rounded"></div>
                </div>
                <div className="p-6 rounded-xl bg-base-100 border border-dashed text-center">
                  <p className="text-base-content/60">No requests yet. Try changing filters.</p>
                  <button className="btn btn-outline btn-sm mt-3">Reset filters</button>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </main>

      {/* FOOTER */}
      <footer className="bg-base-100 border-t border-base-300">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-white font-bold bg-gradient-to-br from-rose-500 to-red-600 shadow-md">BA</div>
              <p className="text-sm text-base-content/70 mt-3">
                BloodAid — Connecting donors and saving lives. Your support makes a difference every day.
              </p>
            </div>
            <div>
              <div className="font-semibold mb-3">Navigation</div>
              <ul className="space-y-2 text-sm">
                <li><a className="link link-hover">Home</a></li>
                <li><a className="link link-hover">Donation Requests</a></li>
                <li><a className="link link-hover">Blog</a></li>
                <li><a className="link link-hover">Dashboard</a></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold mb-3">Company</div>
              <ul className="space-y-2 text-sm">
                <li><a className="link link-hover">About</a></li>
                <li><a className="link link-hover">Contact</a></li>
                <li><a className="link link-hover">Privacy</a></li>
                <li><a className="link link-hover">Terms</a></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold mb-3">Connect</div>
              <div className="flex gap-2">
                <div className="badge">FB</div>
                <div className="badge">IG</div>
                <div className="badge">X</div>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t text-xs text-base-content/50">
            © 2025 BloodAid. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Mobile sticky CTA */}
      <div className="md:hidden fixed bottom-4 inset-x-0 px-4">
        <div className="rounded-2xl shadow-xl bg-base-100 border border-base-300 p-3 flex items-center justify-between">
          <div className="text-sm"><b>Emergency?</b> See urgent requests near you</div>
          <BrandGradientBtn className="btn-sm">Open</BrandGradientBtn>
        </div>
      </div>

      {/* Toasts */}
      <Toasts />

      {/* Modal */}
      <dialog className={`modal ${modalOpen ? "modal-open" : ""}`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm donation</h3>
          <p className="py-2 text-base-content/70">
            Do you want to proceed and contact City Medical Center?
          </p>
          <div className="modal-action">
            <button className="btn btn-ghost" onClick={() => setModalOpen(false)}>Cancel</button>
            <BrandGradientBtn
              onClick={() => {
                setModalOpen(false);
                pushToast("Hospital has been notified. Thank you!", "success");
              }}
            >
              Confirm
            </BrandGradientBtn>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop" onClick={() => setModalOpen(false)}>
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
