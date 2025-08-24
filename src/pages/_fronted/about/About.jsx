// src/features/public/About.jsx
// Frontend-only About page (Tailwind + DaisyUI). Dark/light friendly.
// Sections: Hero, Mission & What We Do, Impact Stats, How It Works, Values,
// Team, Timeline, Partners, FAQ, Final CTA.

import { useEffect, useState } from "react";

export default function About() {
  // Demo stats — replace with your API (GET /admin-dashboard-stats)
  const [stats, setStats] = useState({
    livesSaved: 675,
    activeDonors: 500,
    requestsFulfilled: 1200,
    hospitalsVerified: 30,
  });

  useEffect(() => {
    // Example to wire later:
    // const res = await axios.get("/admin-dashboard-stats");
    // setStats({
    //   livesSaved: res.data?.totalRequest ?? 0, // or your own metric
    //   activeDonors: res.data?.totalUsers ?? 0,
    //   requestsFulfilled: res.data?.totalRequest ?? 0,
    //   hospitalsVerified: 30, // from /hospitals?verified=true count
    // });
  }, []);

  return (
    <main className="w-full">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Hero */}
        <section className="w-full py-10 md:py-14">
          <div className="relative overflow-hidden rounded-3xl border border-neutral-200/60 bg-white/80 p-6 md:p-10 shadow-[0_10px_30px_rgba(0,0,0,.08)] backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-[0_20px_60px_rgba(225,29,72,.12)]">
            <div className="pointer-events-none absolute -right-14 -top-12 h-56 w-56 rounded-full bg-rose-500/20 blur-3xl dark:bg-rose-500/30" />
            <div className="grid gap-8 lg:grid-cols-2 items-center relative">
              <div>
                <p className="text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                  About BloodAid
                </p>
                <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
                  Powered by donors, guided by care
                </h1>
                <p className="mt-3 text-neutral-700 dark:text-neutral-300 max-w-xl">
                  BloodAid connects patients, donors, volunteers, and hospitals to
                  make every life‑saving drop reach the right place at the right time.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <GradientButton href="/donors">Search Donors</GradientButton>
                  <a
                    className="rounded-full border border-neutral-200/60 bg-white px-5 py-3 font-medium shadow-sm hover:bg-neutral-50 dark:border-white/15 dark:bg-white/10 dark:hover:bg-white/15"
                    href="/contact"
                  >
                    Contact Us
                  </a>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -right-6 -top-6 h-48 w-48 rounded-full bg-rose-400/30 blur-3xl dark:bg-rose-500/30" />
                <div className="relative rounded-2xl border border-neutral-200/60 bg-white/80 p-6 shadow-2xl dark:border-white/10 dark:bg-white/5">
                  <div className="aspect-[16/10] w-full grid place-items-center rounded-xl border border-neutral-200/70 text-neutral-600 dark:border-white/10 dark:text-neutral-300">
                    Illustration / Photo
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="badge badge-primary">Community-first</span>
                    <span className="badge badge-success">Verified partners</span>
                    <span className="badge badge-ghost">Privacy-aware</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission + What we do */}
        <section className="w-full py-6">
          <div className="grid gap-6 md:grid-cols-2">
            <GlowCard>
              <h2 className="text-xl font-semibold">Our mission</h2>
              <p className="mt-2 text-neutral-700 dark:text-neutral-300">
                Create a reliable, safe, and fast path from donor to bedside, reducing
                shortages and making blood access simple and fair for everyone.
              </p>
              <ul className="mt-3 list-disc pl-5 text-neutral-700 dark:text-neutral-300">
                <li>Mobilize donors and communities</li>
                <li>Support hospitals with verified requests</li>
                <li>Enable volunteers to coordinate effectively</li>
              </ul>
            </GlowCard>
            <GlowCard>
              <h2 className="text-xl font-semibold">What we do</h2>
              <ul className="mt-2 space-y-2 text-neutral-700 dark:text-neutral-300">
                <li>• Match donors with urgent requests in minutes</li>
                <li>• Verify and prioritize requests with volunteers</li>
                <li>• Host and promote blood drives across districts</li>
                <li>• Share safety, eligibility, and aftercare guides</li>
              </ul>
            </GlowCard>
          </div>
        </section>

        {/* Stats */}
        <section className="w-full py-6">
          <div className="stats stats-vertical lg:stats-horizontal shadow bg-base-100 border border-base-300/40">
            <div className="stat">
              <div className="stat-title">Lives saved</div>
              <div className="stat-value text-primary">{stats.livesSaved}+</div>
            </div>
            <div className="stat">
              <div className="stat-title">Active donors</div>
              <div className="stat-value text-secondary">{stats.activeDonors}+</div>
            </div>
            <div className="stat">
              <div className="stat-title">Requests fulfilled</div>
              <div className="stat-value">{stats.requestsFulfilled}+</div>
            </div>
            <div className="stat">
              <div className="stat-title">Hospitals verified</div>
              <div className="stat-value text-accent">{stats.hospitalsVerified}+</div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="w-full py-8">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold">How BloodAid works</h2>
            <p className="text-sm text-base-content/70">Simple, safe, and privacy‑aware.</p>
          </div>
          <ul className="steps steps-vertical lg:steps-horizontal">
            <li className="step step-primary">Create a request / Search donors</li>
            <li className="step step-primary">Get verified and matched</li>
            <li className="step">Donate safely & update status</li>
          </ul>
        </section>

        {/* Values */}
        <section className="w-full py-8">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold">Our values</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {VALUES.map((v) => (
              <GlowCard key={v.title}>
                <div className="text-2xl">{v.icon}</div>
                <h3 className="mt-2 text-lg font-semibold">{v.title}</h3>
                <p className="text-sm text-neutral-700 dark:text-neutral-300">{v.text}</p>
              </GlowCard>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="w-full py-8">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold">Team</h2>
            <p className="text-sm text-base-content/70">Builders, coordinators, and community heroes.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((t) => (
              <article key={t.name} className="card bg-base-100 border border-base-300/40 shadow hover:shadow-lg transition">
                <div className="card-body">
                  <div className="flex items-center gap-4">
                    <div className="avatar">
                      <div className="w-14 rounded-full ring ring-primary/30 ring-offset-2">
                        <img alt="avatar" src={t.avatar} />
                      </div>
                    </div>
                    <div>
                      <h3 className="card-title text-lg">{t.name}</h3>
                      <p className="text-sm text-base-content/70">{t.role}</p>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-base-content/70">{t.bio}</p>
                  <div className="card-actions justify-end">
                    <a className="btn btn-ghost btn-sm" href={t.link} target="_blank" rel="noreferrer">
                      Connect
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="w-full py-8">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold">Our journey</h2>
          </div>
          <div className="rounded-2xl border border-base-300/40 bg-base-100 p-4 shadow">
            <ul className="timeline timeline-vertical">
              {TIMELINE.map((e, i) => (
                <li key={e.title}>
                  <div className="timeline-start text-sm">{e.date}</div>
                  <div className="timeline-middle">
                    <div className={`badge ${e.badge}`} title={e.title} />
                  </div>
                  <div className="timeline-end">
                    <div className="card bg-base-100 border border-base-300/40 shadow-sm">
                      <div className="card-body py-3">
                        <h3 className="font-semibold">{e.title}</h3>
                        <p className="text-sm text-base-content/70">{e.text}</p>
                      </div>
                    </div>
                  </div>
                  {i !== TIMELINE.length - 1 && <hr />}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Partners */}
        <section className="w-full py-8">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold">Partners</h2>
            <p className="text-sm text-base-content/70">Hospitals and organizations supporting our mission.</p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {PARTNERS.map((p) => (
              <div
                key={p}
                className="grid h-16 place-items-center rounded-xl border border-base-300/40 bg-base-100 text-sm text-base-content/70 shadow-sm"
              >
                {p}
              </div>
            ))}
          </div>
          <div className="mt-4">
            <a className="btn btn-outline" href="/hospitals">View hospitals</a>
          </div>
        </section>

        {/* FAQ */}
        <section className="w-full py-8">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold">FAQ</h2>
          </div>
          <div className="space-y-3">
            {FAQ.map((f) => (
              <div key={f.q} className="collapse collapse-plus bg-base-100 border border-base-300/40">
                <input type="checkbox" />
                <div className="collapse-title text-lg font-medium">{f.q}</div>
                <div className="collapse-content text-sm text-base-content/70">{f.a}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="w-full py-10">
          <div className="relative overflow-hidden rounded-3xl border border-neutral-200/60 bg-white/80 p-6 md:p-8 shadow-[0_10px_30px_rgba(0,0,0,.06)] backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-[0_20px_60px_rgba(225,29,72,.12)]">
            <div className="pointer-events-none absolute -left-12 -bottom-10 h-56 w-56 rounded-full bg-rose-500/20 blur-3xl dark:bg-rose-500/30" />
            <div className="grid gap-4 lg:grid-cols-2 items-center relative">
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold">Make every drop count</h2>
                <p className="text-neutral-700 dark:text-neutral-300">
                  Join our donor network or sponsor a drive.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 lg:justify-end">
                <GradientButton href="/register">Join as Donor</GradientButton>
                <a className="btn btn-ghost" href="/sponsor">Sponsor a Drive</a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

/* ---------------- Helpers & UI bits (in-file) ---------------- */

function GlowCard({ children }) {
  return (
    <div className="rounded-2xl border border-neutral-200/60 bg-white/80 p-6 shadow-sm backdrop-blur hover:shadow-[0_20px_80px_rgba(225,29,72,.12)] transition dark:border-white/10 dark:bg-white/5">
      {children}
    </div>
  );
}

function GradientButton({ href = "#", children }) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center rounded-full px-5 py-3 font-medium text-white bg-gradient-to-r from-[#FF4D67] to-[#B80D2D] shadow-[0_10px_40px_rgba(184,13,45,0.35)] hover:brightness-105 active:scale-[.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-400/50"
    >
      {children}
    </a>
  );
}

/* ---------------- Content data (edit freely) ---------------- */

const VALUES = [
  { icon: "❤️", title: "Human-first", text: "We design around people, not just data." },
  { icon: "✅", title: "Safety", text: "Eligibility, hygiene, and transparency come first." },
  { icon: "⚡", title: "Speed", text: "Urgent requests get matched fast and accurately." },
  { icon: "🔒", title: "Privacy", text: "Contacts are masked until you choose to share." },
  { icon: "🤝", title: "Trust", text: "Verified partners and community-driven reviews." },
  { icon: "🌍", title: "Access", text: "Built for all districts and devices." },
];

const TEAM = [
  {
    name: "Aashikur",
    role: "Founder & Lead",
    bio: "Focuses on experience, reliability, and partnerships.",
    avatar: "https://i.pravatar.cc/120?img=11",
    link: "#",
  },
  {
    name: "Tanvir",
    role: "Volunteer Lead",
    bio: "Verifies requests and coordinates community drives.",
    avatar: "https://i.pravatar.cc/120?img=22",
    link: "#",
  },
  {
    name: "Sadia",
    role: "Hospital Liaison",
    bio: "Keeps partner hospitals engaged and verified.",
    avatar: "https://i.pravatar.cc/120?img=33",
    link: "#",
  },
];

const TIMELINE = [
  { date: "2024 Q1", title: "Prototype", text: "First MVP and internal tests.", badge: "badge-info" },
  { date: "2024 Q2", title: "Public beta", text: "Opened donor search and requests.", badge: "badge-primary" },
  { date: "2024 Q3", title: "Verified partners", text: "Onboarded hospitals and volunteers.", badge: "badge-success" },
  { date: "2025", title: "Scaling", text: "Expanding drives and district coverage.", badge: "badge-neutral" },
];

const PARTNERS = ["CityCare", "Metro Health", "GreenLife", "North Uni", "TechPark", "Khulna Health"];

const FAQ = [
  { q: "Is my contact public?", a: "No. We mask contact info. You control what you share and with whom." },
  { q: "How do I become a donor?", a: "Register, set your blood group and location, and mark availability. You’ll see matches when needed." },
  { q: "Who verifies requests?", a: "Volunteers and partner hospitals review and verify details for safety." },
  { q: "Can I organize a blood drive?", a: "Yes—contact us or use the Volunteer tools to create and manage a drive." },
];