// src/features/public/Urgent.jsx
// Demo-only: frontend React + Tailwind (no API). Replace mockData with your API later.
import React, { useMemo, useState } from "react";

const BLOOD_TYPES = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
const DISTRICTS = ["Dhaka", "Chattogram", "Sylhet", "Rajshahi", "Khulna"];

export default function Urgent() {
  const [district, setDistrict] = useState("");
  const [blood, setBlood] = useState("");
  const [showHeatmap, setShowHeatmap] = useState(true);

  // Demo data: replace with your API responses
  const requests = useMemo(() => mockRequests, []);
  const filtered = useMemo(
    () =>
      requests
        .filter((r) => (!district || r.district === district) && (!blood || r.bloodGroup === blood))
        .sort((a, b) => priorityScore(b) - priorityScore(a) || new Date(a.needBy) - new Date(b.needBy)),
    [requests, district, blood]
  );

  // Build shortage summary for "Top shortages" and (optional) mini heatmap
  const { rows, topShortages } = useMemo(() => buildShortageSummary(requests, district), [requests, district]);

  // Top urgent chips (first 3 items by priority)
  const topChips = useMemo(() => filtered.slice(0, 3), [filtered]);

  return (
    <main className="w-full">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Header / Filters */}
        <section className="w-full py-8 md:py-10">
          <div className="relative rounded-3xl border border-neutral-200/60 bg-white/80 backdrop-blur shadow-[0_10px_30px_rgba(0,0,0,.08)] dark:border-white/10 dark:bg-white/5 dark:shadow-[0_20px_60px_rgba(225,29,72,.12)] p-6 md:p-8">
            <div className="absolute -top-8 -right-10 h-40 w-40 rounded-full bg-rose-500/20 blur-3xl dark:bg-rose-500/30" />
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                  Emergency Board
                </p>
                <h1 className="text-3xl md:text-4xl font-semibold">Urgent needs right now</h1>
                <p className="text-neutral-700 dark:text-neutral-300">
                  See where blood is most needed and jump straight to those requests.
                </p>
              </div>

              <div className="flex flex-col lg:flex-row gap-3">
                <FilterSelect
                  value={district}
                  onChange={setDistrict}
                  label="District"
                  placeholder="All districts"
                  options={DISTRICTS}
                />
                <FilterSelect
                  value={blood}
                  onChange={setBlood}
                  label="Blood Group"
                  placeholder="All groups"
                  options={BLOOD_TYPES}
                />
                <div className="flex items-end gap-2">
                  <GradientButton onClick={() => {}} className="min-w-[160px]">
                    Apply Filters
                  </GradientButton>
                  <button
                    onClick={() => {
                      setDistrict("");
                      setBlood("");
                    }}
                    className="rounded-full border border-neutral-200/60 bg-white px-4 py-2 text-sm hover:bg-neutral-50 dark:border-white/15 dark:bg-white/10 dark:hover:bg-white/15"
                  >
                    Reset
                  </button>
                </div>
                <div className="flex items-end gap-3 ml-auto">
                  <label className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
                    <input
                      type="checkbox"
                      className="h-4 w-4 accent-rose-600"
                      checked={showHeatmap}
                      onChange={(e) => setShowHeatmap(e.target.checked)}
                    />
                    Show heatmap
                  </label>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">Last updated: 2 min ago</span>
                </div>
              </div>

              {/* Top urgent chips */}
              {topChips.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {topChips.map((r) => (
                    <UrgentChip key={r.id} r={r} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Shortage snapshot */}
        <section className="w-full py-6">
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Top shortages list */}
            <div className="lg:col-span-2 rounded-2xl border border-neutral-200/60 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
              <div className="mb-3">
                <h2 className="text-xl font-semibold">Top shortages</h2>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Click a row to view filtered requests.
                </p>
              </div>
              <ul className="divide-y divide-neutral-200/70 dark:divide-white/10">
                {topShortages.slice(0, 6).map((it) => (
                  <li key={`${it.district}-${it.bloodGroup}`} className="py-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center justify-center rounded-lg bg-rose-500/10 px-2.5 py-1 text-sm font-semibold text-rose-600 dark:text-rose-300">
                          {it.bloodGroup}
                        </span>
                        <div>
                          <div className="font-medium">{it.district}</div>
                          <div className="text-xs text-neutral-600 dark:text-neutral-400">
                            {it.openRequests} open · {it.soon24} need in 24h
                          </div>
                        </div>
                      </div>
                      <ScorePill score={it.score} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mini heatmap grid (optional) */}
            <div className="lg:col-span-3 rounded-2xl border border-neutral-200/60 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Heatmap by district</h2>
                <div className="text-xs text-neutral-600 dark:text-neutral-400">Darker = more urgent</div>
              </div>

              {showHeatmap ? (
                <div className="w-full overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr>
                        <th className="text-left py-2 pr-2 font-semibold">District</th>
                        {BLOOD_TYPES.map((t) => (
                          <th key={t} className="px-1 py-2 text-center font-semibold">
                            {t}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row) => (
                        <tr key={row.district} className="border-t border-neutral-200/70 dark:border-white/10">
                          <td className="py-2 pr-2">{row.district}</td>
                          {BLOOD_TYPES.map((t) => (
                            <td key={t} className="px-1 py-2 text-center">
                              <HeatmapCell score={row.scores[t]} />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-sm text-neutral-600 dark:text-neutral-400">Heatmap is hidden.</div>
              )}
            </div>
          </div>
        </section>

        {/* Urgent requests list */}
        <section className="w-full py-8">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold">Most urgent requests</h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">Sorted by urgency and need-by time.</p>
          </div>

          {filtered.length ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((r) => (
                <UrgentCard key={r.id} r={r} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-neutral-200/60 bg-white/80 p-8 text-center text-neutral-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-neutral-300">
              No urgent requests match your filters.
            </div>
          )}
        </section>

        {/* Final CTAs */}
        <section className="w-full py-10">
          <div className="flex flex-wrap gap-3">
            <GradientButton>Search Donors</GradientButton>
            <button className="rounded-full border border-neutral-200/60 bg-white px-5 py-3 font-medium shadow-sm hover:bg-neutral-50 dark:border-white/15 dark:bg-white/10 dark:hover:bg-white/15">
              Create Request
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

/* ------------------------ UI bits (in-file) ------------------------ */

function FilterSelect({ value, onChange, label, placeholder, options }) {
  return (
    <label className="flex flex-col gap-1 min-w-[220px]">
      <span className="text-xs text-neutral-600 dark:text-neutral-400">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl border border-neutral-200/60 bg-white px-4 py-2.5 text-sm shadow-sm outline-none ring-0 focus:border-rose-300 focus:ring-2 focus:ring-rose-200 dark:border-white/15 dark:bg-white/10 dark:text-neutral-100 dark:focus:border-rose-400/40 dark:focus:ring-rose-400/20"
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function GradientButton({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={[
        "inline-flex items-center justify-center rounded-full px-5 py-3 font-medium text-white",
        "bg-gradient-to-r from-[#FF4D67] to-[#B80D2D]",
        "shadow-[0_10px_40px_rgba(184,13,45,0.35)] hover:brightness-105 active:scale-[.98]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-400/50",
        className,
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function ScorePill({ score }) {
  const theme = scoreColor(score);
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold"
      style={{
        background: theme.bg,
        color: theme.fg,
      }}
    >
      {score}/100
    </span>
  );
}

function HeatmapCell({ score = 0 }) {
  const style = heatmapStyle(score);
  return (
    <div
      className="mx-auto w-16 rounded-md text-center text-xs font-semibold transition hover:scale-[1.03] focus:scale-[1.03]"
      style={style}
      title={`Urgency score: ${score}`}
      role="gridcell"
      aria-label={`Score ${score}`}
    >
      {score}
    </div>
  );
}

function UrgentChip({ r }) {
  const urgency = (r.urgency || "low").toUpperCase();
  return (
    <span className="relative inline-flex items-center gap-2 rounded-full border border-rose-400/30 bg-rose-500/10 px-3 py-1.5 text-sm font-medium text-rose-700 shadow-sm dark:border-rose-300/20 dark:bg-rose-500/15 dark:text-rose-200">
      <span className="inline-block h-2 w-2 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,.8)]" />
      {r.bloodGroup} · {r.district} · {urgency}
    </span>
  );
}

function UrgentCard({ r }) {
  const needBy = new Date(r.needBy);
  const urgency = r.urgency || "low";
  const score = priorityScore(r);

  return (
    <article
      className="relative rounded-2xl border border-neutral-200/60 bg-white/80 p-5 shadow-sm backdrop-blur transition hover:shadow-lg dark:border-white/10 dark:bg-white/5"
      aria-labelledby={`req-${r.id}`}
    >
      <div className="absolute -inset-1 -z-10 rounded-2xl bg-gradient-to-br from-rose-500/0 via-rose-500/0 to-rose-500/0 opacity-0 blur-2xl transition-opacity hover:opacity-30" />
      <div className="mb-3 flex items-center justify-between">
        <h3 id={`req-${r.id}`} className="text-xl font-semibold">
          {r.bloodGroup}
        </h3>
        <ScorePill score={Math.min(100, score * 10)} />
      </div>
      <p className="text-sm text-neutral-700 dark:text-neutral-300">
        {r.district}
        {r.upazila ? `, ${r.upazila}` : ""} • {r.hospital}
      </p>
      <p className="text-xs text-neutral-500 dark:text-neutral-400">Need by: {formatDateTime(needBy)}</p>

      <div className="mt-3 flex items-center justify-between">
        <span className={urgencyBadge(urgency)}>{urgency.toUpperCase()}</span>
        <div className="flex gap-2">
          <button className="rounded-full border border-neutral-200/60 bg-white/80 px-3 py-2 text-sm hover:bg-neutral-50 dark:border-white/15 dark:bg-white/10 dark:hover:bg-white/15">
            View details
          </button>
          <GradientButton>Offer to donate</GradientButton>
        </div>
      </div>
    </article>
  );
}

/* ------------------------ Helpers & Mock Data ------------------------ */

function priorityScore(item) {
  // Simple: urgency weight + time boost (higher = more urgent)
  const w = item.urgency === "high" ? 3 : item.urgency === "med" ? 2 : 1;
  const hours = (new Date(item.needBy) - new Date()) / 36e5;
  const t = hours <= 24 ? 2 : hours <= 72 ? 1 : 0;
  return w + t; // 1..5
}

function heatmapStyle(score) {
  // 0..100 → light to dark rose. Keep text readable.
  const light = 96 - Math.min(80, (score / 100) * 72); // 96 → 16
  const darkText = light < 55;
  return {
    background: `hsl(350 90% ${light}%)`,
    color: darkText ? "white" : "hsl(350 60% 25%)",
    padding: "6px 8px",
  };
}

function scoreColor(score) {
  if (score >= 80) return { bg: "rgba(225,29,72,.9)", fg: "#fff" }; // deep rose
  if (score >= 60) return { bg: "rgba(225,29,72,.7)", fg: "#fff" };
  if (score >= 40) return { bg: "rgba(225,29,72,.25)", fg: "hsl(350 60% 25%)" };
  return { bg: "rgba(225,29,72,.12)", fg: "hsl(350 60% 25%)" };
}

function urgencyBadge(level) {
  const base = "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold";
  if (level === "high") return `${base} bg-rose-600 text-white`;
  if (level === "med") return `${base} bg-amber-500 text-white`;
  return `${base} bg-emerald-500 text-white`;
}

function formatDateTime(d) {
  return d.toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

function buildShortageSummary(requests, districtFilter) {
  // Build rows for heatmap and a flat list for "Top shortages"
  const rowsMap = new Map();
  const flat = [];

  // Initialize rows
  const districts = [...new Set(requests.map((r) => r.district))].filter(
    (d) => !districtFilter || d === districtFilter
  );
  districts.forEach((d) =>
    rowsMap.set(d, {
      district: d,
      scores: Object.fromEntries(BLOOD_TYPES.map((t) => [t, 0])),
      counters: Object.fromEntries(BLOOD_TYPES.map((t) => [t, { open: 0, soon24: 0 }])),
    })
  );

  // Tally scores
  const now = new Date();
  const soon24 = new Date(now.getTime() + 24 * 3600 * 1000);

  for (const r of requests) {
    if (districtFilter && r.district !== districtFilter) continue;
    const row = rowsMap.get(r.district);
    if (!row) continue;

    const p = priorityScore(r); // 1..5
    const scoreAdd = p * 10; // 10..50 increments
    row.scores[r.bloodGroup] = Math.min(100, row.scores[r.bloodGroup] + scoreAdd);

    // Counters for the list
    const c = row.counters[r.bloodGroup];
    c.open += 1;
    if (new Date(r.needBy) <= soon24) c.soon24 += 1;
  }

  const rows = Array.from(rowsMap.values());

  // Flatten to list for "Top shortages"
  for (const row of rows) {
    for (const bt of BLOOD_TYPES) {
      const s = row.scores[bt];
      const { open, soon24 } = row.counters[bt];
      if (s > 0) {
        flat.push({
          district: row.district,
          bloodGroup: bt,
          score: s,
          openRequests: open,
          soon24,
        });
      }
    }
  }
  flat.sort((a, b) => b.score - a.score || b.openRequests - a.openRequests);

  // Sort heatmap rows by total open
  rows.sort((a, b) => sumValues(b.counters) - sumValues(a.counters));

  return { rows, topShortages: flat };
}

function sumValues(countersByType) {
  return Object.values(countersByType).reduce((acc, c) => acc + c.open, 0);
}

/* ------------------------ Mock Requests (demo) ------------------------ */
// Create consistent demo data using now + offsets
const now = Date.now();
const h = (n) => new Date(now + n * 3600 * 1000).toISOString();

const mockRequests = [
  { id: "1", bloodGroup: "O+", district: "Dhaka", upazila: "Dhanmondi", hospital: "CityCare", urgency: "high", needBy: h(6) },
  { id: "2", bloodGroup: "A-", district: "Chattogram", upazila: "Pahartali", hospital: "Metro Hospital", urgency: "med", needBy: h(10) },
  { id: "3", bloodGroup: "B+", district: "Dhaka", upazila: "Mirpur", hospital: "GreenLife", urgency: "high", needBy: h(20) },
  { id: "4", bloodGroup: "AB-", district: "Sylhet", upazila: "Amberkhana", hospital: "Sylhet Med", urgency: "low", needBy: h(40) },
  { id: "5", bloodGroup: "O-", district: "Rajshahi", upazila: "Boalia", hospital: "Central Hosp", urgency: "high", needBy: h(8) },
  { id: "6", bloodGroup: "A+", district: "Khulna", upazila: "Sonadanga", hospital: "Khulna Med", urgency: "med", needBy: h(18) },
  { id: "7", bloodGroup: "B-", district: "Dhaka", upazila: "Uttara", hospital: "Apollo", urgency: "high", needBy: h(12) },
  { id: "8", bloodGroup: "O+", district: "Chattogram", upazila: "Kotwali", hospital: "Chattogram Gen", urgency: "high", needBy: h(4) },
  { id: "9", bloodGroup: "AB+", district: "Sylhet", upazila: "Zindabazar", hospital: "People's Hosp", urgency: "med", needBy: h(70) },
  { id: "10", bloodGroup: "A+", district: "Dhaka", upazila: "Banani", hospital: "United Hosp", urgency: "low", needBy: h(55) },
  { id: "11", bloodGroup: "O-", district: "Khulna", upazila: "Khalishpur", hospital: "Southern Clinic", urgency: "high", needBy: h(16) },
  { id: "12", bloodGroup: "B+", district: "Rajshahi", upazila: "Rajpara", hospital: "Raj Hosp", urgency: "med", needBy: h(28) },
];