// src/features/home/components/UrgentNearYou.jsx
// FIXED: Combined state to prevent "bouncing" between skeleton and content.
// Follows your project conventions (useAxiosPublic, useDistrictUpazila, etc.)

import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router"; // Standard import for modern React Router
import useAxiosPublic from "@/hooks/axiosPublic";
import useDistrictUpazila from "@/hooks/useDistrictUpazila";

export default function UrgentNearYou({
  endpoint = "/public-donation-requests",
  limit = 6,
}) {
  const axiosPublic = useAxiosPublic();
  const { districts, getUpazilasByDistrict } = useDistrictUpazila();

  // Consolidated state to prevent UI bouncing
  const [state, setState] = useState({
    loading: true,
    error: null,
    requests: [],
  });

  // Filters
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");

  const upazilaOptions = useMemo(
    () => getUpazilasByDistrict(district),
    [district, getUpazilasByDistrict]
  );

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      try {
        const { data } = await axiosPublic.get(endpoint);
        if (active) {
          // Atomically update state to prevent flicker
          setState({
            loading: false,
            error: null,
            requests: Array.isArray(data) ? data : [],
          });
        }
      } catch (e) {
        if (active) {
          setState({
            loading: false,
            error: "Failed to load urgent requests",
            requests: [], // Ensure a consistent state on error
          });
        }
      }
    };

    fetchData();

    // Cleanup function to prevent state updates on unmounted component
    return () => {
      active = false;
    };
  }, [axiosPublic, endpoint]);

  const filtered = useMemo(() => {
    // Filter by location
    let list = state.requests.filter((r) => {
      const okDistrict = !district || r.district === district;
      const okUpazila = !upazila || r.upazila === upazila;
      return okDistrict && okUpazila;
    });

    // Only open requests (if field exists)
    list = list.filter((r) =>
      r.donationStatus ? ["pending", "inprogress"].includes(r.donationStatus) : true
    );

    // High urgency first; if less than limit, include medium by needBy soonest
    const high = list.filter((r) => (r.urgency || "").toLowerCase() === "high");
    const med = list.filter((r) => (r.urgency || "").toLowerCase() === "med" || (r.urgency || "").toLowerCase() === "medium");

    high.sort(sortByNeedBy);
    med.sort(sortByNeedBy);

    const top = [...high, ...med].slice(0, limit);
    return top;
  }, [state.requests, district, upazila, limit]);

  return (
    <section className="w-full py-8 md:py-10">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-neutral-200/60 bg-white/80 p-6 md:p-8 shadow-[0_10px_30px_rgba(0,0,0,.06)] backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-[0_20px_60px_rgba(225,29,72,.12)]">
          <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-rose-500/20 blur-3xl dark:bg-rose-500/30" />
          <div className="relative">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400">Faster help</p>
                <h2 className="text-2xl md:text-3xl font-semibold">Urgent near you</h2>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  High‑priority requests filtered by your location.
                </p>
              </div>
              <Link
                to="/urgent"
                className="btn border-0 text-white bg-gradient-to-r from-[#FF4D67] to-[#B80D2D] shadow-[0_10px_30px_rgba(184,13,45,.35)] hover:brightness-105"
              >
                See all urgent
              </Link>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <label className="form-control">
                <div className="label">
                  <span className="label-text">District</span>
                </div>
                <select
                  value={district}
                  onChange={(e) => {
                    setDistrict(e.target.value);
                    setUpazila("");
                  }}
                  className="select select-bordered"
                >
                  <option value="">All districts</option>
                  {districts.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="form-control">
                <div className="label">
                  <span className="label-text">Upazila</span>
                </div>
                <select
                  value={upazila}
                  onChange={(e) => setUpazila(e.target.value)}
                  className="select select-bordered"
                  disabled={!district}
                >
                  <option value="">{district ? "All upazilas" : "Select district first"}</option>
                  {upazilaOptions.map((u) => (
                    <option key={u.id} value={u.name}>
                      {u.name}
                    </option>
                  ))}
                </select>
              </label>

              <div className="form-control">
                <div className="label">
                  <span className="label-text">Quick tip</span>
                </div>
                <div className="input input-bordered flex items-center gap-2 text-sm text-base-content/70">
                  <span className="inline-block h-2 w-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,.7)]" />
                  High urgency appears first
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grid - FIXED: removed the "hidden" class */}
        <div className="mt-6">
          {state.loading ? (
            <SkeletonGrid />
          ) : state.error ? (
            <div className="alert alert-warning">
              <span>{state.error}</span>
            </div>
          ) : filtered.length ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((r) => (
                <UrgentCard key={r._id || r.id} r={r} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-neutral-200/60 bg-white/80 p-8 text-center text-neutral-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-neutral-300">
              No urgent requests match your filters.
              <div className="mt-3 flex items-center justify-center gap-2">
                <Link to="/urgent" className="btn btn-ghost btn-sm">View all urgent</Link>
                <Link to="/donation-requests" className="btn btn-outline btn-sm">Browse all requests</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* -------------------- Card + UI pieces (same file) -------------------- */

function UrgentCard({ r }) {
  const needBy = r.needBy ? new Date(r.needBy) : null;
  const urgency = (r.urgency || "low").toLowerCase();

  return (
    <article className="card bg-base-100 border border-base-300/40 shadow hover:shadow-lg transition">
      <div className="card-body">
        <div className="mb-1 flex items-center justify-between gap-2">
          <h3 className="card-title text-2xl">{r.bloodGroup || "—"}</h3>
          <span className={urgencyBadge(urgency)}>{urgency.toUpperCase()}</span>
        </div>
        <p className="text-sm text-base-content/70">
          {r.district}
          {r.upazila ? `, ${r.upazila}` : ""} • {r.hospital || "Hospital"}
        </p>
        <p className="text-xs text-base-content/60">
          Need by: {needBy ? formatDateTime(needBy) : "—"}
        </p>
        <div className="card-actions justify-end pt-2">
          <Link to={`/donation-requests/${r._id || r.id}`} className="btn btn-link btn-sm p-0">
            View details →
          </Link>
        </div>
      </div>
    </article>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-40 rounded-2xl bg-base-200 animate-pulse" />
      ))}
    </div>
  );
}

/* ----------------------------- Helpers ----------------------------- */

function sortByNeedBy(a, b) {
  const ta = a.needBy ? new Date(a.needBy).getTime() : Infinity;
  const tb = b.needBy ? new Date(b.needBy).getTime() : Infinity;
  return ta - tb;
}

function formatDateTime(d) {
  return d.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function urgencyBadge(level) {
  const base = "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold";
  if (level === "high") return `${base} bg-rose-600 text-white`;
  if (level === "med" || level === "medium") return `${base} bg-amber-500 text-white`;
  return `${base} bg-emerald-500 text-white`;
}