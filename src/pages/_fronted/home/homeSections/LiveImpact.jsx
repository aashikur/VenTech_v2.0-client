// src/features/home/components/LiveImpact.jsx
// FIXED: Moved useCountUpNumber calls to the top level to obey the Rules ofHooks.

import { useEffect, useMemo, useState } from "react";

export default function LiveImpact({
  statsEndpoint = "/admin-dashboard-stats",
  hospitalsEndpoint = "/hospitals?verified=true",
}) {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [raw, setRaw] = useState(null);
  const [verifiedHospitals, setVerifiedHospitals] = useState(0);
  const [updatedAt, setUpdatedAt] = useState(null);

  async function load() {
    // This function remains the same
    setLoading(true);
    setErr("");
    try {
      const [sRes, hRes] = await Promise.allSettled([
        fetch(statsEndpoint),
        fetch(hospitalsEndpoint),
      ]);

      if (sRes.status === "fulfilled" && sRes.value.ok) {
        const s = await sRes.value.json();
        setRaw(s);
      } else {
        setRaw(null);
      }

      if (hRes.status === "fulfilled" && hRes.value.ok) {
        const hJson = await hRes.value.json();
        const count = Array.isArray(hJson)
          ? hJson.filter((i) => i.verified).length
          : typeof hJson?.total === "number"
          ? hJson.total
          : Array.isArray(hJson?.items)
          ? (hJson.items.filter((i) => i.verified).length || hJson.items.length)
          : 0;
        setVerifiedHospitals(count);
      } else {
        setVerifiedHospitals(0);
      }

      setUpdatedAt(new Date());
    } catch (e) {
      setErr("Failed to load live stats");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [statsEndpoint, hospitalsEndpoint]);

  const { livesSaved, activeDonors, requestsFulfilled, hospitals } = useMemo(
    () => mapMetrics(raw, verifiedHospitals),
    [raw, verifiedHospitals]
  );

  // ====================================================================
  // THE FIX: Call all hooks unconditionally at the top level.
  // ====================================================================
  const livesSavedCount = useCountUpNumber(livesSaved);
  const activeDonorsCount = useCountUpNumber(activeDonors);
  const requestsFulfilledCount = useCountUpNumber(requestsFulfilled);
  const hospitalsCount = useCountUpNumber(hospitals);
  // ====================================================================

  return (
    <section className="w-full">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-neutral-200/60 bg-white/80 p-6 md:p-8 shadow-[0_10px_30px_rgba(0,0,0,.06)] backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-[0_20px_60px_rgba(225,29,72,.12)]">
          <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-rose-500/20 blur-3xl dark:bg-rose-500/30" />

          <div className="relative mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400">Live impact</p>
              <h2 className="text-2xl md:text-3xl font-semibold">Every drop making a difference</h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                Real-time snapshot from our community and partners.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={load}
                className="btn btn-ghost btn-sm"
                title="Refresh stats"
              >
                <IconRefresh className="w-4 h-4" />
                Refresh
              </button>
            </div>
          </div>

          {err && (
            <div className="alert alert-warning mb-4">
              <span>{err}</span>
            </div>
          )}

          <div className="stats stats-vertical lg:stats-horizontal bg-base-100 border border-base-300/40 shadow">
            {loading ? (
              <>
                <SkeletonStat />
                <SkeletonStat />
                <SkeletonStat />
                <SkeletonStat />
              </>
            ) : (
              <>
                {/* Use the variables that hold the hook results */}
                <StatCard
                  icon={<IconHeart className="w-6 h-6 text-rose-600 dark:text-rose-400" />}
                  label="Lives saved"
                  value={livesSavedCount}
                  accent="text-primary"
                />
                <StatCard
                  icon={<IconUsers className="w-6 h-6 text-sky-600 dark:text-sky-400" />}
                  label="Active donors"
                  value={activeDonorsCount}
                  accent="text-secondary"
                />
                <StatCard
                  icon={<IconCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />}
                  label="Requests fulfilled"
                  value={requestsFulfilledCount}
                />
                <StatCard
                  icon={<IconHospital className="w-6 h-6 text-violet-600 dark:text-violet-400" />}
                  label="Verified hospitals"
                  value={hospitalsCount}
                  accent="text-accent"
                />
              </>
            )}
          </div>

          <div className="mt-2 text-right text-xs text-neutral-500 dark:text-neutral-400">
            {updatedAt ? `Last updated: ${updatedAt.toLocaleTimeString()}` : "—"}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------- Mapping backend -> UI metrics --------------- */
function mapMetrics(s, hospitalsVerified) {
  if (!s) {
    return {
      livesSaved: 0,
      activeDonors: 0,
      requestsFulfilled: 0,
      hospitals: hospitalsVerified || 0,
    };
  }
  const activeDonors =
    s.totalDonors ??
    s.activeDonors ??
    s.totalUsers ??
    0;

  const requestsFulfilled =
    s.requestsFulfilled ??
    s.totalRequestFulfilled ??
    (typeof s.totalRequest === "number" ? Math.round(s.totalRequest * 0.7) : 0);

  const livesSaved =
    s.livesSaved ??
    Math.max(requestsFulfilled, 0);

  const hospitals =
    s.hospitalsVerified ??
    hospitalsVerified ??
    0;

  return { livesSaved, activeDonors, requestsFulfilled, hospitals };
}

/* --------------- Stat card + skeleton --------------- */

function StatCard({ icon, label, value, accent = "" }) {
  return (
    <div className="stat">
      <div className="stat-figure">{icon}</div>
      <div className="stat-title">{label}</div>
      <div className={`stat-value ${accent}`}>{formatNumber(value)}</div>
    </div>
  );
}

function SkeletonStat() {
  return (
    <div className="stat">
      <div className="stat-figure">
        <div className="skeleton h-8 w-8 rounded-full" />
      </div>
      <div className="stat-title">
        <div className="skeleton h-3 w-28 rounded" />
      </div>
      <div className="stat-value">
        <div className="skeleton h-7 w-20 rounded" />
      </div>
    </div>
  );
}

/* --------------- Tiny count-up hook --------------- */

function useCountUpNumber(target, duration = 900) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf, start;
    const from = 0;
    const to = Number(target || 0);
    const step = (t) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / duration);
      const val = Math.floor(from + (to - from) * easeOutQuad(p));
      setN(val);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return n;
}
function easeOutQuad(x) {
  return 1 - (1 - x) * (1 - x);
}

/* --------------- Small helpers --------------- */

function formatNumber(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return String(n);
}

/* --------------- Inline icons --------------- */

function IconRefresh(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M4 4v6h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 10a8 8 0 0 0-14-4M4 14a8 8 0 0 0 14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function IconHeart(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.1 21.3l-.1.1-.1-.1C7.14 17.36 4 14.5 4 11.28 4 9 5.79 7 8.15 7c1.3 0 2.6.62 3.35 1.61C12.25 7.62 13.55 7 14.85 7 17.21 7 19 9 19 11.28c0 3.22-3.14 6.08-6.9 10.02z" />
    </svg>
  );
}
function IconUsers(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" />
      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
function IconCheck(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconHospital(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7v10M7 12h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}