// src/features/public/Drives.jsx
import { useMemo, useState } from "react";

const DISTRICTS = ["Dhaka", "Chattogram", "Sylhet", "Rajshahi", "Khulna"];

export default function Drives() {
  const [district, setDistrict] = useState("");
  const [month, setMonth] = useState(""); // "2025-09"
  const [q, setQ] = useState("");

  const events = useMemo(() => MOCK_EVENTS, []);
  const filtered = useMemo(() => {
    return events
      .filter((e) => (district ? e.district === district : true))
      .filter((e) => (month ? e.startAt.slice(0, 7) === month : true))
      .filter((e) =>
        q
          ? [e.title, e.hostOrg, e.location, e.district, e.upazila]
              .join(" ")
              .toLowerCase()
              .includes(q.toLowerCase())
          : true
      )
      .sort((a, b) => new Date(a.startAt) - new Date(b.startAt));
  }, [events, district, month, q]);

  const byMonth = useMemo(() => groupByMonth(filtered), [filtered]);

  return (
    <main className="w-full">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Header / Filters */}
        <section className="w-full py-8 md:py-10">
          <div className="relative rounded-3xl border border-base-300/40 bg-base-100 p-6 md:p-8 shadow">
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-base-content/60">Community</p>
                <h1 className="text-3xl md:text-4xl font-semibold">Blood Drives & Events</h1>
                <p className="text-base-content/70">Find upcoming drives near you. RSVP and add to your calendar.</p>
              </div>

              <div className="grid md:grid-cols-4 gap-3">
                <label className="form-control">
                  <div className="label"><span className="label-text">District</span></div>
                  <select className="select select-bordered" value={district} onChange={(e) => setDistrict(e.target.value)}>
                    <option value="">All districts</option>
                    {DISTRICTS.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </label>

                <label className="form-control">
                  <div className="label"><span className="label-text">Month</span></div>
                  <input type="month" className="input input-bordered" value={month} onChange={(e) => setMonth(e.target.value)} />
                </label>

                <label className="form-control md:col-span-2">
                  <div className="label"><span className="label-text">Search</span></div>
                  <div className="join w-full">
                    <input
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      className="input input-bordered join-item w-full"
                      placeholder="Search by title, host, or location"
                    />
                    <button className="btn btn-primary join-item">Search</button>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline by month */}
        <section className="w-full py-6">
          {Object.keys(byMonth).length === 0 ? (
            <EmptyState />
          ) : (
            <div className="space-y-6">
              {Object.entries(byMonth).map(([monthLabel, items]) => (
                <div key={monthLabel} className="rounded-2xl border border-base-300/40 bg-base-100 p-4 shadow">
                  <h2 className="text-xl font-semibold mb-3">{monthLabel}</h2>

                  <ul className="timeline timeline-vertical">
                    {items.map((e, idx) => (
                      <li key={e.id}>
                        <div className="timeline-start text-sm">{formatDay(e.startAt)}</div>
                        <div className="timeline-middle">
                          <div className={`badge ${statusBadgeClass(e.status)}`} title={e.status} />
                        </div>
                        <div className="timeline-end">
                          <EventCard e={e} />
                        </div>
                        {idx !== items.length - 1 && <hr />}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

/* =============== Components =============== */

function EventCard({ e }) {
  const start = new Date(e.startAt);
  const end = new Date(e.endAt);
  const range = formatDateRange(start, end);

  return (
    <div className="card bg-base-100 border border-base-300/40 shadow-sm">
      <div className="card-body py-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="font-semibold text-lg">{e.title}</h3>
            <p className="text-sm text-base-content/70">{range} • {e.location}</p>
            <p className="text-xs text-base-content/60">Host: {e.hostOrg} • {e.district}{e.upazila ? `, ${e.upazila}` : ""}</p>
          </div>
          <div className="flex items-center gap-2">
            {e.featured && <span className="badge badge-primary">Featured</span>}
            {e.verified && <span className="badge badge-success">Verified</span>}
          </div>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="badge">{e.capacity - e.bookedCount} slots left</span>
          {e.tags?.map((t) => <span key={t} className="badge badge-ghost">{t}</span>)}
        </div>

        <div className="card-actions justify-end pt-2">
          <a className="btn btn-ghost btn-sm" target="_blank" rel="noreferrer" href={googleMapsUrl(e.address || e.location)}>
            Get directions
          </a>
          <button className="btn btn-outline btn-sm" onClick={() => downloadICS(e)}>Add to calendar</button>
          <a className="btn btn-ghost btn-sm" target="_blank" rel="noreferrer" href={googleCalendarUrl(e)}>
            Google Calendar
          </a>
          <button className="btn btn-primary btn-sm">
            {e.canRSVP ? "RSVP" : "Login to RSVP"}
          </button>
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-base-300/40 bg-base-100 p-10 text-center shadow">
      <h3 className="text-lg font-semibold">No drives match your filters</h3>
      <p className="text-sm text-base-content/70">Try a different month or district.</p>
    </div>
  );
}

/* =============== Helpers =============== */

function groupByMonth(list) {
  const map = {};
  for (const e of list) {
    const d = new Date(e.startAt);
    const key = d.toLocaleString(undefined, { month: "long", year: "numeric" });
    (map[key] ||= []).push(e);
  }
  return map;
}
function formatDay(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}
function formatDateRange(start, end) {
  const sameDay = start.toDateString() === end.toDateString();
  if (sameDay) {
    return `${start.toLocaleDateString(undefined, { month: "short", day: "numeric" })} • ${timeHM(start)}–${timeHM(end)}`;
  }
  return `${start.toLocaleDateString()} ${timeHM(start)} → ${end.toLocaleDateString()} ${timeHM(end)}`;
}
function timeHM(d) {
  return d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
}
function statusBadgeClass(status) {
  switch (status) {
    case "open": return "badge-success";
    case "scheduled": return "badge-info";
    case "closed": return "badge-ghost";
    case "canceled": return "badge-error";
    case "completed": return "badge-neutral";
    default: return "badge-ghost";
  }
}
function googleMapsUrl(addr) {
  return `https://www.google.com/maps?q=${encodeURIComponent(addr)}`;
}
function googleCalendarUrl(e) {
  const start = gcalDate(e.startAt);
  const end = gcalDate(e.endAt);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: e.title,
    dates: `${start}/${end}`,
    details: `${e.hostOrg} • ${e.location}`,
    location: e.address || e.location,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
function gcalDate(iso) {
  // yyyymmddThhmmssZ (UTC) — for demo, we keep local; adjust as needed
  const d = new Date(iso);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
}
function downloadICS(e) {
  const start = new Date(e.startAt);
  const end = new Date(e.endAt);
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//BloodAid//Drives//EN",
    "BEGIN:VEVENT",
    `UID:${e.id}@bloodaid`,
    `DTSTAMP:${gcalDate(new Date().toISOString())}`,
    `DTSTART:${gcalDate(e.startAt)}`,
    `DTEND:${gcalDate(e.endAt)}`,
    `SUMMARY:${escapeICS(e.title)}`,
    `DESCRIPTION:${escapeICS(`${e.hostOrg} • ${e.location}`)}`,
    `LOCATION:${escapeICS(e.address || e.location)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `${e.title.replace(/\s+/g, "_")}.ics`;
  a.click();
  URL.revokeObjectURL(a.href);
}
function escapeICS(s = "") {
  return s.replace(/,/g, "\\,").replace(/;/g, "\\;").replace(/\n/g, "\\n");
}

/* =============== Mock Data =============== */
const now = new Date();
const addDays = (n, h = 10) => {
  const d = new Date(now);
  d.setDate(d.getDate() + n);
  d.setHours(h, 0, 0, 0);
  return d.toISOString();
};
const MOCK_EVENTS = [
  {
    id: "drv-001",
    title: "Campus Blood Drive – North University",
    startAt: addDays(3, 10),
    endAt: addDays(3, 16),
    district: "Dhaka",
    upazila: "Dhanmondi",
    location: "North University Auditorium",
    address: "123 Dhanmondi 27, Dhaka",
    hostOrg: "North Uni Rotaract",
    capacity: 120,
    bookedCount: 68,
    status: "open",
    verified: true,
    featured: true,
    tags: ["campus", "community"],
    canRSVP: true,
  },
  {
    id: "drv-002",
    title: "Corporate Drive – TechPark",
    startAt: addDays(10, 9),
    endAt: addDays(10, 15),
    district: "Dhaka",
    upazila: "Banani",
    location: "TechPark Tower, Level 5",
    address: "Banani, Dhaka",
    hostOrg: "TechPark CSR",
    capacity: 200,
    bookedCount: 150,
    status: "scheduled",
    verified: true,
    tags: ["corporate"],
    canRSVP: false,
  },
  {
    id: "drv-003",
    title: "Community Drive – Chattogram City",
    startAt: addDays(14, 10),
    endAt: addDays(14, 14),
    district: "Chattogram",
    upazila: "Kotwali",
    location: "City Hall",
    address: "Kotwali, Chattogram",
    hostOrg: "City Volunteers",
    capacity: 100,
    bookedCount: 40,
    status: "open",
    verified: false,
    tags: ["community"],
    canRSVP: true,
  },
  {
    id: "drv-004",
    title: "Khulna Central Drive",
    startAt: addDays(25, 10),
    endAt: addDays(25, 15),
    district: "Khulna",
    upazila: "Sonadanga",
    location: "Central Field",
    address: "Sonadanga, Khulna",
    hostOrg: "Khulna Health",
    capacity: 160,
    bookedCount: 80,
    status: "open",
    verified: true,
    tags: ["community"],
    canRSVP: true,
  },
];