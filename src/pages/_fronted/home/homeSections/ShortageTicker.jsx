// src/features/home/components/ShortageTicker.jsx
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";

const BLOOD_TYPES = ["A+","A-","B+","B-","O+","O-","AB+","AB-"];
const LS_KEY = "bloodaid_ticker_dismissed_at";

export default function ShortageTicker({
  endpoint = "/stats/shortage",
  maxItems = 8,
  sticky = false, // set true if you want it to stick below navbar
}) {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [visible, setVisible] = useState(() => !shouldHideToday());

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(endpoint);
        if (!res.ok) throw new Error("No shortage endpoint");
        const data = await res.json();
        if (active) setRows(Array.isArray(data) ? data : []);
      } catch {
        if (active) setRows(MOCK_SHORTAGE); // fallback
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [endpoint]);

  const items = useMemo(() => flattenShortages(rows, maxItems), [rows, maxItems]);

  if (!visible) return null;

  return (
    <section
      className={[
        "w-full",
        sticky ? "sticky top-14 z-40" : "", // adjust top to your header height
      ].join(" ")}
      aria-label="Shortage ticker"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="relative overflow-hidden rounded-2xl border border-neutral-200/60 bg-white/80 shadow-[0_10px_30px_rgba(0,0,0,.06)] backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-[0_20px_60px_rgba(225,29,72,.12)]">
          {/* subtle gradient glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_90%_10%,rgba(255,77,103,0.20),transparent_60%)] dark:bg-[radial-gradient(80%_60%_at_90%_10%,rgba(255,77,103,0.15),transparent_60%)]" />

          <div className="relative flex items-stretch gap-3 pl-3">
            {/* Left label + CTA */}
            <div className="hidden sm:flex items-center gap-2 py-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-rose-500 text-white shadow">
                <IconAlert />
              </span>
              <span className="text-sm font-medium">Urgent now</span>
              <span className="mx-2 h-5 w-px bg-neutral-300/60 dark:bg-white/20" />
              <Link to="/urgent" className="btn btn-xs md:btn-sm btn-primary rounded-full">
                View urgent
              </Link>
            </div>

            {/* Ticker */}
            <Ticker loading={loading} items={items} />

            {/* Dismiss */}
            <button
              type="button"
              aria-label="Dismiss"
              className="ml-auto mr-1 my-1 rounded-full px-2 py-1 text-xs text-neutral-600 hover:bg-white/60 dark:text-neutral-300 dark:hover:bg-white/10"
              onClick={() => {
                localStorage.setItem(LS_KEY, new Date().toDateString());
                setVisible(false);
              }}
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>

      {/* keyframes for marquee */}
      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}

/* ----------------- Subcomponents ----------------- */

function Ticker({ loading, items }) {
  if (loading) {
    return (
      <div className="flex-1 overflow-hidden">
        <div className="flex items-center gap-2 py-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-7 w-40 rounded-full bg-neutral-200 dark:bg-white/10 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (!items?.length) {
    return (
      <div className="flex-1 py-2 text-sm text-neutral-600 dark:text-neutral-300">
        No urgent shortages at the moment.
      </div>
    );
  }

  // Duplicate list for seamless loop
  const loopItems = [...items, ...items];

  return (
    <div className="relative flex-1 overflow-hidden">
      <div
        className="flex min-w-max gap-2 py-2 pr-6"
        style={{
          animation: "ticker 24s linear infinite",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = "paused")}
        onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = "running")}
      >
        {loopItems.map((it, idx) => (
          <Chip key={`${it.district}-${it.blood}-${idx}`} district={it.district} blood={it.blood} score={it.score} />
        ))}
      </div>
    </div>
  );
}

function Chip({ district, blood, score }) {
  return (
    <Link
      to={`/donation-requests?blood=${encodeURIComponent(blood)}&district=${encodeURIComponent(district)}&sort=urgency`}
      className="group relative inline-flex items-center gap-2 rounded-full border border-rose-300/30 bg-rose-500/10 px-3 py-1.5 text-sm font-medium text-rose-700 shadow-sm hover:bg-rose-500/15 dark:border-rose-300/20 dark:bg-rose-500/15 dark:text-rose-200"
      title={`View ${blood} requests in ${district}`}
    >
      <span className="inline-flex h-2 w-2 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,.8)]" />
      <span className="font-semibold">{blood}</span>
      <span>· {district}</span>
      <span className="ml-1 rounded-full bg-rose-500/20 px-2 py-0.5 text-xs text-rose-700 dark:text-rose-200">
        {score}
      </span>
    </Link>
  );
}

/* ----------------- Helpers ----------------- */

function flattenShortages(rows, maxItems) {
  // rows: [{ district, scores: { 'A+': 72, ... } }]
  const combos = [];
  for (const r of rows || []) {
    for (const bt of BLOOD_TYPES) {
      const score = Number(r?.scores?.[bt] ?? 0);
      if (score > 0) combos.push({ district: r.district, blood: bt, score });
    }
  }
  combos.sort((a, b) => b.score - a.score);
  return combos.slice(0, maxItems);
}

function shouldHideToday() {
  try {
    const v = localStorage.getItem(LS_KEY);
    return v && v === new Date().toDateString();
  } catch {
    return false;
  }
}

/* ----------------- Icons ----------------- */
function IconAlert() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
      <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    </svg>
  );
}

/* ----------------- Fallback demo data ----------------- */
const MOCK_SHORTAGE = [
  { district: "Dhaka", scores: { "O+": 92, "A-": 64, "B+": 40, "AB-": 25 } },
  { district: "Chattogram", scores: { "O+": 76, "A-": 55, "AB-": 20 } },
  { district: "Khulna", scores: { "O-": 84, "A+": 35 } },
  { district: "Sylhet", scores: { "B+": 58, "AB+": 22 } },
];