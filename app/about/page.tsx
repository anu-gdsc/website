import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin, Users, Zap, Mic, Code2, Handshake } from "lucide-react";

import Container from "@/components/ui/container";
import PageHero from "@/components/layout/page-hero";
import { FadeIn } from "@/components/motion/fade-in";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";
import Team from "@/components/sections/team";
import { getTeamMembers } from "@/sanity/lib/queries";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gdganu.com";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about GDG ANU 2026 — a student-led developer event at the Australian National University.",
  alternates: { canonical: `${siteUrl}/about` },
  openGraph: {
    title: "About | GDG ANU 2026",
    description: "A student-led developer event at ANU Canberra, October 2026.",
    url: `${siteUrl}/about`,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "About GDG ANU 2026" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About | GDG ANU 2026",
    description: "A student-led developer event at ANU Canberra, October 2026.",
    images: ["/og-image.png"],
  },
};

// ── Snapshot tiles ────────────────────────────────────────────────────
const SNAPSHOT = [
  { icon: CalendarDays, label: "Date",      value: "October 2026",          color: "#4285F4" },
  { icon: MapPin,       label: "Location",  value: "ANU Campus, Canberra",  color: "#EA4335" },
  { icon: Users,        label: "Audience",  value: "Students & Builders",   color: "#FBBC05" },
  { icon: Zap,          label: "Format",    value: "Talks + Workshops",     color: "#34A853" },
];

// ── What you'll get ───────────────────────────────────────────────────
const PILLARS = [
  { icon: Mic,      label: "Talks",        desc: "Industry voices on AI, cloud, product, and the web.",    color: "#4285F4" },
  { icon: Code2,    label: "Workshops",    desc: "Hands-on sessions with real tools, beginner-friendly.",  color: "#34A853" },
  { icon: Handshake,label: "Community",    desc: "Meet peers, mentors, & members face to face.",  color: "#EA4335" },
];

export default async function AboutPage() {
  const members = await getTeamMembers();

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────── */}
      <PageHero
        eyebrow="About"
        title="A student-led dev event built for builders."
        description="GDG ANU brings together students, developers, and designers for a day of talks, workshops, and real community — all on campus."
      />

      {/* ── Snapshot + Pillars ────────────────────────────── */}
      <section className="border-b border-white/10 bg-black py-16 md:py-20">
        <Container>
          {/* 4-cell snapshot strip */}
          <StaggerContainer className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {SNAPSHOT.map(({ icon: Icon, label, value, color }) => (
              <StaggerItem key={label}>
                <div className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-xl"
                    style={{ background: `${color}18` }}
                  >
                    <Icon className="h-4 w-4" style={{ color }} />
                  </div>
                  <p className="text-[11px] font-medium uppercase tracking-widest text-white/35">
                    {label}
                  </p>
                  <p className="text-sm font-semibold leading-tight text-white">{value}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* 3 pillars */}
          <StaggerContainer className="mt-6 grid gap-3 sm:grid-cols-3">
            {PILLARS.map(({ icon: Icon, label, desc, color }) => (
              <StaggerItem key={label}>
                <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <div
                    className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                    style={{ background: `${color}18` }}
                  >
                    <Icon className="h-4 w-4" style={{ color }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{label}</p>
                    <p className="mt-1 text-xs leading-6 text-white/50">{desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* ── Team ──────────────────────────────────────────── */}
      <Team members={members} />

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="bg-black py-16 md:py-20">
        <Container>
          <FadeIn>
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 md:p-12">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(66,133,244,0.14),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(52,168,83,0.12),transparent_30%)]" />
              <div className="relative max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/45">
                  Join us
                </p>
                <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
                  Be part of the day.
                </h2>
                <p className="mt-3 text-base leading-7 text-white/60">
                  Explore the lineup, check the schedule, and register when applications go live.
                </p>
                <div className="mt-7 flex flex-wrap gap-4">
                  <Link
                    href="/register"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
                  >
                    Register Interest <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/schedule"
                    className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
                  >
                    View Schedule
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
