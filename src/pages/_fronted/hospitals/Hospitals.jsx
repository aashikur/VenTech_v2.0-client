// src/features/public/Hospitals.jsx
// Frontend-only demo. Replace MOCK_HOSPITALS with your API data later.
import { useEffect, useMemo, useState } from "react";

export default function Hospitals() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState(MOCK_HOSPITALS);

  // Filters
  const [district, setDistrict] = useState("");
  const [q, setQ] = useState("");
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  useEffect(() => {
    // Simulate loading for demo; replace with your axios call to GET /hospitals
    const t = setTimeout(() => {
      setItems(MOCK_HOSPITALS);
      setLoading(false);
    }, 400);
    return () => clearTimeout(t);
  }, []);

  const districts = useMemo(
    () => Array.from(new Set(items.map((h) => h.district))).sort(),
    [items]
  );

  const filtered = useMemo(() => {
    let list = items;
    if (district) list = list.filter((h) => h.district === district);
    if (verifiedOnly) list = list.filter((h) => h.verified);
    if (q) {
      const s = q.toLowerCase();
      list = list.filter((h) =>
        [h.name, h.address, h.district, h.upazila]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(s)
      );
    }
    // Sort: verified first, then name
    return [...list].sort((a, b) => {
      if (a.verified !== b.verified) return a.verified ? -1 : 1;
      return a.name.localeCompare(b.name);
    });
  }, [items, district, q, verifiedOnly]);

  const verifiedCount = useMemo(() => items.filter((h) => h.verified).length, [items]);

  return (
    <main className="w-full">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Hero + Filters */}
        <section className="w-full py-8 md:py-10">
          <div className="relative overflow-hidden rounded-3xl border border-neutral-200/60 bg-white/80 p-6 md:p-8 shadow-[0_10px_30px_rgba(0,0,0,.06)] backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-[0_20px_60px_rgba(225,29,72,.12)]">
            <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-rose-500/20 blur-3xl dark:bg-rose-500/30" />
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400">Partners</p>
                  <h1 className="text-3xl md:text-4xl font-semibold">Partner Hospitals</h1>
                  <p className="text-neutral-700 dark:text-neutral-300">
                    Browse verified hospitals and contact them directly.
                  </p>
                </div>
                <div className="rounded-xl border border-neutral-200/60 bg-white/70 px-4 py-2 text-sm shadow-sm dark:border-white/10 dark:bg-white/10">
                  <span className="mr-3">Total: {items.length}</span>
                  <span className="text-emerald-600 dark:text-emerald-400">Verified: {verifiedCount}</span>
                </div>
              </div>

              {/* Filters */}
              <div className="grid gap-3 md:grid-cols-3">
                <label className="form-control">
                  <div className="label">
                    <span className="label-text">District</span>
                  </div>
                  <select
                    className="select select-bordered"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                  >
                    <option value="">All districts</option>
                    {districts.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="form-control md:col-span-2">
                  <div className="label">
                    <span className="label-text">Search</span>
                  </div>
                  <div className="join w-full">
                    <input
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      className="input input-bordered join-item w-full"
                      placeholder="Search by name, address or area"
                    />
                    <button className="btn btn-primary join-item">Search</button>
                  </div>
                </label>

                <label className="flex items-center gap-2 md:col-span-3">
                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    checked={verifiedOnly}
                    onChange={(e) => setVerifiedOnly(e.target.checked)}
                  />
                  <span className="text-sm text-neutral-700 dark:text-neutral-300">Only show verified hospitals</span>
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* List/Grid */}
        <section className="w-full py-6">
          {loading ? (
            <SkeletonGrid />
          ) : filtered.length ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((h) => (
                <HospitalCard key={h.id} h={h} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-neutral-200/60 bg-white/80 p-10 text-center text-neutral-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-neutral-300">
              No hospitals match your filters.
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

/* -------------------- Card + UI pieces (same file) -------------------- */

function HospitalCard({ h }) {
  return (
    <article className="card bg-base-100 border border-base-300/40 shadow hover:shadow-lg transition">
      <div className="card-body">
        <div className="flex items-center justify-between gap-2">
          <h3 className="card-title text-lg">{h.name}</h3>
          {h.verified ? (
            <span className="badge badge-success">Verified</span>
          ) : (
            <span className="badge">Unverified</span>
          )}
        </div>

        <p className="text-sm text-base-content/70">
          {h.district}
          {h.upazila ? `, ${h.upazila}` : ""}
        </p>
        <p className="text-xs text-base-content/60">{h.address || "—"}</p>

        {h.departments?.length ? (
          <div className="mt-2 flex flex-wrap gap-2">
            {h.departments.slice(0, 3).map((d) => (
              <span key={d} className="badge badge-ghost">{d}</span>
            ))}
            {h.departments.length > 3 && (
              <span className="badge badge-ghost">+{h.departments.length - 3}</span>
            )}
          </div>
        ) : null}

        <div className="card-actions justify-end pt-2">
          {h.phone && (
            <a className="btn btn-outline btn-sm" href={`tel:${normalizePhone(h.phone)}`}>
              Call
            </a>
          )}
          {h.website && (
            <a
              className="btn btn-ghost btn-sm"
              href={normalizeUrl(h.website)}
              target="_blank"
              rel="noreferrer"
            >
              Website
            </a>
          )}
          <a
            className="btn btn-ghost btn-sm"
            href={mapsUrl(h.address || `${h.upazila || ""} ${h.district}`)}
            target="_blank"
            rel="noreferrer"
          >
            Directions
          </a>
          <a className="btn btn-primary btn-sm" href={`/hospitals/${h.id}`}>
            View details
          </a>
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

function normalizeUrl(url = "") {
  if (!url) return "#";
  if (!/^https?:\/\//i.test(url)) return `https://${url}`;
  return url;
}
function normalizePhone(p = "") {
  return p.replace(/\s+/g, "");
}
function mapsUrl(addr = "") {
  return `https://www.google.com/maps?q=${encodeURIComponent(addr)}`;
}

/* ----------------------------- Mock Data ----------------------------- */

const MOCK_HOSPITALS = [
  {
    id: "h-001",
    name: "CityCare Hospital",
    district: "Dhaka",
    upazila: "Dhanmondi",
    address: "House 12, Road 7, Dhanmondi",
    phone: "+8801712345678",
    website: "citycare.example.com",
    verified: true,
    departments: ["Emergency", "Surgery", "Blood Bank"],
  },
  {
    id: "h-002",
    name: "Metro Hospital",
    district: "Chattogram",
    upazila: "Pahartali",
    address: "34 Pahartali, Chattogram",
    phone: "+8801812345678",
    website: "https://metro.example.com",
    verified: false,
    departments: ["Emergency", "Cardiology"],
  },
  {
    id: "h-003",
    name: "GreenLife Medical",
    district: "Dhaka",
    upazila: "Mirpur",
    address: "Mirpur-10, Dhaka",
    phone: "+8801912345678",
    website: "greenlife.example.com",
    verified: true,
    departments: ["Emergency", "Hematology", "Radiology", "ICU"],
  },
  {
    id: "h-004",
    name: "Sylhet Medical Center",
    district: "Sylhet",
    upazila: "Amberkhana",
    address: "Amberkhana, Sylhet",
    phone: "+8801711111111",
    website: "",
    verified: false,
    departments: ["Blood Bank", "General"],
  },
  {
    id: "h-005",
    name: "Raj Central Hospital",
    district: "Rajshahi",
    upazila: "Boalia",
    address: "Boalia, Rajshahi",
    phone: "+8801712222222",
    website: "https://rajcentral.example.com",
    verified: true,
    departments: ["Emergency", "Hematology"],
  },
  {
    id: "h-006",
    name: "Khulna Health Clinic",
    district: "Khulna",
    upazila: "Sonadanga",
    address: "Sonadanga, Khulna",
    phone: "+8801713333333",
    website: "khulnahealth.example.com",
    verified: true,
    departments: ["Emergency", "Surgery"],
  },
];