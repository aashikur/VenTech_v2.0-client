// src/features/test/Test.jsx
// Tailwind + DaisyUI style reference for BloodAid (no in-page theme switch)
// - Section wrapper pattern: w-full -> container -> content
// - Next-level gradients, clean glow effects, consistent surfaces
// - Works with your global dark mode (dark: classes), and DaisyUI components
import { useEffect, useRef, useState } from "react";

export default function Test() {
  const rootRef = useRef(null);

  // Your brand tokens (reference)
  const BRAND = {
    primary: "#E11D48", // crimson
    gradient: "linear-gradient(135deg, #FF4D67 0%, #B80D2D 100%)", // CTA gradient
  };

  // Optional: read DaisyUI theme CSS variables and show hex for reference
  const themeVars = useThemeVars(rootRef, [
    ["--p", "Primary"],
    ["--s", "Secondary"],
    ["--a", "Accent"],
    ["--n", "Neutral"],
    ["--in", "Info"],
    ["--su", "Success"],
    ["--wa", "Warning"],
    ["--er", "Error"],
    ["--b1", "Base-100"],
    ["--b2", "Base-200"],
    ["--b3", "Base-300"],
    ["--bc", "Base Content"],
  ]);

  return (
    <main
      ref={rootRef}
      className="
        w-full min-h-screen overflow-x-hidden
        bg-neutral-50 text-neutral-900
        dark:bg-neutral-950 dark:text-neutral-100
        selection:bg-rose-500/20
      "
    >
      {/* SECTION: Hero header with premium gradient + glow */}
      <section className="w-full relative">
        {/* soft background glow */}
        <div
          className="pointer-events-none absolute inset-0 -z-10
                     bg-[radial-gradient(80%_60%_at_85%_10%,rgba(255,77,103,0.25),transparent_60%)]
                     dark:bg-[radial-gradient(80%_60%_at_85%_10%,rgba(255,77,103,0.15),transparent_60%)]"
        />
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="py-10 md:py-14">
            <div className="
              relative rounded-3xl
              border border-white/60 shadow-[0_10px_30px_rgba(0,0,0,0.10)]
              bg-white/80 backdrop-blur
              dark:bg-white/5 dark:border-white/10 dark:shadow-[0_10px_40px_rgba(225,29,72,0.10)]
              p-6 md:p-10
            ">
              {/* subtle top gradient bar */}
              <div
                className="absolute inset-x-0 -top-[1px] h-[2px] rounded-t-3xl"
                style={{ background: BRAND.gradient }}
              />
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-xs tracking-wider uppercase text-neutral-600 dark:text-neutral-300/80">
                    Design System • BloodAid
                  </p>
                  <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
                    UI Style Guide & Next‑Level Components
                  </h1>
                  <p className="mt-3 text-neutral-600 dark:text-neutral-300">
                    Premium gradients, clean glow, and consistent surfaces for blood donation UX.
                    Copy the patterns below into your actual components.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <GButton size="lg">
                      <IconSearch className="w-4 h-4" />
                      Search Donors
                    </GButton>
                    <button
                      className="btn btn-outline btn-lg border-neutral-300 text-neutral-800
                                 hover:bg-neutral-100
                                 dark:border-white/20 dark:text-neutral-100 dark:hover:bg-white/10"
                    >
                      Create Request
                    </button>
                    <button className="btn btn-ghost btn-lg">Ghost</button>
                  </div>

                  <div className="mt-6 grid grid-cols-3 gap-3">
                    <Stat label="Active Donors" value="500+" />
                    <Stat label="Lives Saved" value="675+" />
                    <Stat label="Hospitals" value="30+" />
                  </div>
                </div>

                {/* Illustration panel */}
                <div className="relative">
                  <div
                    className="absolute -right-6 -top-6 w-56 h-56 rounded-full blur-3xl opacity-50
                               bg-rose-400/40 dark:bg-rose-500/30"
                  />
                  <div
                    className="relative rounded-2xl border
                               border-neutral-200/60 bg-white shadow-2xl
                               dark:border-white/10 dark:bg-white/5 dark:shadow-[0_20px_80px_rgba(225,29,72,0.15)]
                               p-6"
                  >
                    <div className="aspect-[16/10] w-full rounded-xl border border-neutral-200/70 dark:border-white/10
                                    bg-gradient-to-br from-neutral-50 to-neutral-100
                                    dark:from-white/10 dark:to-white/5
                                    flex items-center justify-center text-sm text-neutral-500 dark:text-neutral-300">
                      Illustration / Lottie
                    </div>

                    <div className="mt-4 flex gap-2">
                      <span className="badge badge-ghost">AABB-aligned</span>
                      <span className="badge badge-primary">500+ donors</span>
                      <span className="badge badge-success">Verified</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* SECTION: Brand & Colors */}
      <Section title="Brand & Colors">
        <div className="grid lg:grid-cols-3 gap-4">
          <ColorSwatch
            label="Brand (Crimson)"
            chip="custom"
            previewStyle={{ backgroundColor: BRAND.primary }}
            code={BRAND.primary}
          />
          <ColorSwatch
            label="CTA Gradient"
            chip="custom"
            previewStyle={{ background: BRAND.gradient }}
            code="linear-gradient(135deg, #FF4D67, #B80D2D)"
          />
          <ColorInfo
            label="Glow Recommendation"
            code="shadow-[0_20px_60px_rgba(225,29,72,0.25)] / ring-1 ring-rose-400/20"
          />

          {/* DaisyUI theme variables (reads current theme) */}
          {themeVars.map((c) => (
            <ColorSwatch
              key={c.var}
              label={c.label}
              chip={c.var}
              previewStyle={{ background: `hsl(var(${c.var}))` }}
              code={`${c.hex || ""} | hsl(var(${c.var})) ${c.raw ? `= ${c.raw}` : ""}`}
            />
          ))}
        </div>
      </Section>

      {/* SECTION: Typography */}
      <Section title="Typography">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
              Display
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold">H1 · Join as a Donor</h1>
            <h2 className="text-3xl font-semibold">H2 · Find donors near you</h2>
            <h3 className="text-2xl font-semibold">H3 · Urgent requests</h3>
          </div>
          <div className="space-y-3">
            <p>
              Body · We connect donors and hospitals with patients in need. Clear and accessible on
              both light and dark themes.
            </p>
            <p className="text-neutral-600 dark:text-neutral-300">
              Muted · Use for helper text and secondary details.
            </p>
            <a className="link link-primary" href="#">
              Inline Link
            </a>
            <div className="text-xs text-neutral-500 dark:text-neutral-400">Small · Labels</div>
          </div>
        </div>
      </Section>

      {/* SECTION: Spacing */}
      <Section title="Spacing Scale (4px base)">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[4, 8, 12, 16, 24, 32, 48, 64].map((px) => (
            <div
              key={px}
              className="card border border-neutral-200/70 bg-white/70 backdrop-blur shadow-sm
                         dark:border-white/10 dark:bg-white/5 dark:shadow-md"
            >
              <div className="card-body gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">Spacing</span>
                  <code className="text-xs">{px}px</code>
                </div>
                <div className="w-full rounded-md bg-neutral-200 dark:bg-white/10" style={{ height: `${px}px` }} />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* SECTION: Buttons */}
      <Section title="Buttons">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <GButton size="lg">
              <IconSearch className="w-4 h-4" />
              Search a Donor
            </GButton>
            <button className="btn btn-secondary btn-lg">Secondary</button>
            <button className="btn btn-outline btn-lg">Outline</button>
            <button className="btn btn-ghost btn-lg">Ghost</button>
            <button className="btn btn-success btn-lg">Success</button>
            <button className="btn btn-error btn-lg">Error</button>
          </div>

          <div className="flex flex-wrap gap-3">
            <GButton size="md">Medium</GButton>
            <button className="btn btn-outline btn-md">Medium</button>
            <button className="btn btn-ghost btn-md">Medium</button>
            <button className="btn btn-neutral btn-md">Neutral</button>
          </div>

          <div className="flex flex-wrap gap-3">
            <GButton size="sm">Small</GButton>
            <button className="btn btn-outline btn-sm">Small</button>
            <button className="btn btn-ghost btn-sm">Small</button>
            <button className="btn btn-disabled btn-sm" disabled>
              Disabled
            </button>
          </div>
        </div>
      </Section>

      {/* SECTION: Badges */}
      <Section title="Badges">
        <div className="flex flex-wrap gap-2">
          <div className="badge badge-primary">Primary</div>
          <div className="badge badge-secondary">Secondary</div>
          <div className="badge badge-accent">Accent</div>
          <div className="badge badge-info">Info</div>
          <div className="badge badge-success">Success</div>
          <div className="badge badge-warning">Warning</div>
          <div className="badge badge-error">Error</div>
          <div className="badge">Neutral</div>
        </div>
      </Section>

      {/* SECTION: Inputs */}
      <Section title="Inputs">
        <div className="grid md:grid-cols-2 gap-4">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Full Name</span>
            </div>
            <input type="text" placeholder="e.g., Aashikur Rahman" className="input input-bordered w-full" />
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Email</span>
            </div>
            <input type="email" placeholder="you@bloodaid.com" className="input input-bordered w-full" />
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Blood Group</span>
            </div>
            <select className="select select-bordered w-full">
              <option value="">Select...</option>
              {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">District</span>
            </div>
            <input type="text" placeholder="Dhaka" className="input input-bordered w-full" />
          </label>

          <label className="form-control w-full md:col-span-2">
            <div className="label">
              <span className="label-text">Message</span>
            </div>
            <textarea rows={4} placeholder="Type your message..." className="textarea textarea-bordered w-full" />
          </label>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <GButton size="md">
            <IconSend className="w-4 h-4" />
            Send
          </GButton>
          <button className="btn btn-outline btn-md">Cancel</button>
          <div className="ml-auto flex items-center gap-2 text-sm">
            <input type="checkbox" className="toggle toggle-primary" />
            Subscribe
          </div>
        </div>
      </Section>

      {/* SECTION: Cards + Glow surfaces */}
      <Section title="Cards, Glow & Radius">
        <div className="grid md:grid-cols-3 gap-4">
          <GlowCard>
            <p className="text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400">Card</p>
            <h3 className="text-xl font-semibold">Default Surface</h3>
            <p className="text-neutral-700 dark:text-neutral-300">
              Clean surface for content. Great for lists and simple blocks.
            </p>
            <div className="mt-3 flex gap-2">
              <span className="badge">Meta</span>
              <span className="badge badge-success">Status</span>
            </div>
          </GlowCard>

          <GlowCard elevated>
            <p className="text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400">Card</p>
            <h3 className="text-xl font-semibold">Elevated (Glow)</h3>
            <p className="text-neutral-700 dark:text-neutral-300">
              Stronger depth with rose glow shadow for emphasis.
            </p>
            <div className="mt-3">
              <button className="btn btn-ghost btn-sm">Action</button>
            </div>
          </GlowCard>

          <GlowCard outlined>
            <p className="text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400">Card</p>
            <h3 className="text-xl font-semibold">Outlined</h3>
            <p className="text-neutral-700 dark:text-neutral-300">Visible border for data-heavy UIs.</p>
            <div className="mt-3">
              <button className="btn btn-outline btn-sm">Manage</button>
            </div>
          </GlowCard>
        </div>
      </Section>

      {/* SECTION: Request Card Preview */}
      <Section title="Request Card (Preview)">
        <div className="grid md:grid-cols-2 gap-4">
          <RequestCard
            type="O+"
            district="Dhaka"
            upazila="Dhanmondi"
            needBy="Aug 22, 2025"
            urgent
          />
          <RequestCard
            type="A-"
            district="Chattogram"
            upazila="Pahartali"
            needBy="Aug 24, 2025"
          />
        </div>
      </Section>

      {/* SECTION: Mini Section Demo */}
      <Section title="Mini Section Demo">
        <div className="grid lg:grid-cols-2 gap-6">
          <div
            className="relative rounded-3xl p-6 md:p-8 overflow-hidden
                       border border-neutral-200/60 bg-white shadow-[0_20px_60px_rgba(0,0,0,.08)]
                       dark:border-white/10 dark:bg-white/5 dark:shadow-[0_20px_80px_rgba(225,29,72,.15)]"
          >
            <div
              className="pointer-events-none absolute -inset-x-10 -top-10 h-40 opacity-60 blur-2xl
                         bg-[radial-gradient(80%_60%_at_20%_0%,rgba(255,77,103,0.35),transparent_60%)]"
            />
            <p className="text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
              Make every drop count
            </p>
            <h2 className="text-3xl font-semibold">Join as a donor or request blood—fast, safe, reliable.</h2>
            <p className="mt-2 text-neutral-700 dark:text-neutral-300">
              We connect donors and hospitals with patients in need across Bangladesh.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <GButton>
                <IconSearch className="w-4 h-4" />
                Search Donors
              </GButton>
              <button className="btn btn-outline">Create Request</button>
            </div>

            <div className="stats stats-vertical lg:stats-horizontal shadow mt-6">
              <div className="stat">
                <div className="stat-title">Active Donors</div>
                <div className="stat-value text-primary">500+</div>
              </div>
              <div className="stat">
                <div className="stat-title">Lives Saved</div>
                <div className="stat-value text-secondary">675+</div>
              </div>
              <div className="stat">
                <div className="stat-title">Hospitals</div>
                <div className="stat-value text-accent">30+</div>
              </div>
            </div>
          </div>

          <div
            className="relative rounded-3xl p-6 md:p-8 overflow-hidden
                       border border-neutral-200/60 bg-white shadow-[0_20px_60px_rgba(0,0,0,.08)]
                       dark:border-white/10 dark:bg-white/5 dark:shadow-[0_20px_80px_rgba(225,29,72,.15)]"
          >
            <div className="relative z-10">
              <div className="card bg-white/70 backdrop-blur border border-neutral-200/60 shadow-lg
                              dark:bg-white/10 dark:border-white/10 dark:shadow-[0_10px_50px_rgba(225,29,72,.15)]">
                <div className="card-body">
                  <h3 className="card-title">Preview Panel</h3>
                  <p className="text-neutral-700 dark:text-neutral-300">
                    Drop an illustration or Lottie here. This surface uses soft glass + glow.
                  </p>
                  <div className="card-actions">
                    <button className="btn btn-ghost btn-sm">Replace</button>
                    <button className="btn btn-outline btn-sm">Upload</button>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-xs text-neutral-600 dark:text-neutral-400">
                Gradient: linear-gradient(135deg, #FF4D67 → #B80D2D)
              </div>
            </div>
            <div
              className="pointer-events-none absolute inset-0 opacity-40
                         bg-[radial-gradient(60%_80%_at_80%_20%,rgba(255,77,103,.35),transparent_55%)]"
            />
          </div>
        </div>
      </Section>

      {/* SECTION: Footer tokens */}
      <section className="w-full py-8">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div
            className="rounded-2xl border border-neutral-200/60 bg-white/70 backdrop-blur p-4
                       shadow-sm text-sm text-neutral-700
                       dark:border-white/10 dark:bg-white/5 dark:text-neutral-300"
          >
            <span className="badge badge-ghost mr-2">Radius: 0.75rem+ (rounded-2xl/3xl)</span>
            <span className="badge badge-ghost mr-2">Glow: shadow-[0_20px_80px_rgba(225,29,72,.15)]</span>
            <span className="badge badge-ghost mr-2">Brand: #E11D48</span>
            <span className="badge badge-ghost">Use dark: classes for theme</span>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ---------------- In-file helpers/components ---------------- */

function Section({ title, children }) {
  return (
    <section className="w-full py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-4">
          <div className="text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
            Section
          </div>
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        <div
          className="rounded-3xl p-6 md:p-8
                     border border-neutral-200/60 bg-white/80 backdrop-blur shadow-[0_10px_30px_rgba(0,0,0,.08)]
                     dark:border-white/10 dark:bg-white/5 dark:shadow-[0_20px_60px_rgba(225,29,72,.12)]"
        >
          {children}
        </div>
      </div>
    </section>
  );
}

function GButton({ size = "md", children }) {
  const sizes = {
    sm: "btn-sm",
    md: "btn-md",
    lg: "btn-lg",
  }[size];
  return (
    <button
      className={[
        "btn border-0 text-white",
        sizes,
        // Gradient + glow
        "bg-gradient-to-r from-[#FF4D67] to-[#B80D2D]",
        "shadow-[0_8px_30px_rgba(184,13,45,0.35)]",
        "hover:brightness-105 active:scale-[.98]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-400/50",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function GlowCard({ children, elevated, outlined }) {
  return (
    <div
      className={[
        "rounded-2xl p-6",
        "border bg-white/80 backdrop-blur",
        "border-neutral-200/60 shadow-sm",
        "dark:bg-white/5 dark:border-white/10",
        elevated ? "shadow-[0_20px_80px_rgba(225,29,72,.15)]" : "dark:shadow-md",
        outlined ? "border-neutral-300 dark:border-white/20" : "",
      ].join(" ")}
    >
      {children}
    </div>
  );
}

function RequestCard({ type, district, upazila, needBy, urgent }) {
  return (
    <div
      className="card border border-neutral-200/60 bg-white/80 backdrop-blur shadow-sm
                 dark:border-white/10 dark:bg-white/5 dark:shadow-[0_10px_40px_rgba(225,29,72,.12)]"
    >
      <div className="card-body">
        <div className="flex items-center justify-between">
          <h4 className="card-title text-2xl">{type}</h4>
          {urgent && (
            <div className="badge gap-1 text-white bg-gradient-to-r from-[#FF4D67] to-[#B80D2D] border-0">
              <IconAlert className="w-3.5 h-3.5" />
              Urgent
            </div>
          )}
        </div>
        <div className="text-sm text-neutral-700 dark:text-neutral-300">
          {district}, {upazila}
        </div>
        <div className="text-xs text-neutral-500 dark:text-neutral-400">Need by: {needBy}</div>
        <div className="card-actions justify-end pt-2">
          <button className="btn btn-link btn-sm p-0">View details →</button>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div
      className="rounded-xl px-3 py-4 text-center
                 border border-neutral-200/60 bg-white/70 shadow-sm
                 dark:border-white/10 dark:bg-white/5"
    >
      <div className="text-2xl font-semibold">{value}</div>
      <div className="text-xs text-neutral-600 dark:text-neutral-400">{label}</div>
    </div>
  );
}

function ColorSwatch({ label, previewStyle, code, chip }) {
  return (
    <button
      type="button"
      onClick={() => copyToClipboard(code)}
      className="group flex items-center gap-4 rounded-2xl
                 border border-neutral-200/60 bg-white/80 backdrop-blur p-3 text-left
                 hover:bg-white dark:hover:bg-white/10
                 dark:border-white/10 dark:bg-white/5"
      title="Click to copy"
    >
      <div
        className="h-12 w-12 rounded-xl border border-neutral-200/60 shadow-inner
                   dark:border-white/10"
        style={previewStyle}
      />
      <div className="flex-1">
        <div className="font-semibold">{label}</div>
        <div className="text-xs text-neutral-600 dark:text-neutral-400 truncate">{code}</div>
      </div>
      <div className="badge badge-ghost">{chip}</div>
    </button>
  );
}

function ColorInfo({ label, code }) {
  return (
    <div
      className="rounded-2xl border border-neutral-200/60 bg-white/80 backdrop-blur p-3
                 dark:border-white/10 dark:bg-white/5"
    >
      <div className="font-semibold">{label}</div>
      <div className="text-xs text-neutral-600 dark:text-neutral-400">{code}</div>
    </div>
  );
}

/* ---------------- Theme var helpers (read DaisyUI HSL to hex) ---------------- */

function useThemeVars(ref, entries) {
  const [values, setValues] = useState([]);
  useEffect(() => {
    if (!ref.current) return;
    const style = getComputedStyle(ref.current);
    const result = entries.map(([v, label]) => {
      const raw = style.getPropertyValue(v).trim(); // "350 96% 52%"
      const hex = hslTripletToHex(raw);
      return { var: v, label, raw, hex };
    });
    setValues(result);
  }, [ref, entries]);
  return values;
}

function hslTripletToHex(raw) {
  if (!raw) return "";
  const nums = raw.match(/[\d.]+/g);
  if (!nums || nums.length < 3) return "";
  const [h, s, l] = nums.map(Number);
  return hslToHex(h, s, l);
}
function hslToHex(h, s, l) {
  s /= 100; l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const toHex = (x) => Math.round(255 * x).toString(16).padStart(2, "0");
  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
}

async function copyToClipboard(text) {
  try { await navigator.clipboard.writeText(text); } catch {}
}

/* ---------------- Tiny inline icons ---------------- */

function IconSearch(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function IconSend(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M5 12l14-7-4 14-3.5-5L5 12z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconAlert(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    </svg>
  );
}