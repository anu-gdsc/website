import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin, Users, Lightbulb, Sparkles } from "lucide-react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gdganu.com";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about GDSC ANU 2026 — a student-led developer event at the Australian National University featuring talks, workshops, and community sessions across AI, cloud, web, and product.",
  alternates: {
    canonical: `${siteUrl}/about`,
  },
  openGraph: {
    title: "About | GDSC ANU 2026",
    description:
      "A student-led developer event at ANU Canberra, October 2026. Talks, workshops, networking, and community moments across AI, cloud, web, and product.",
    url: `${siteUrl}/about`,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "About GDSC ANU 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About | GDSC ANU 2026",
    description:
      "A student-led developer event at ANU Canberra, October 2026 — talks, workshops, and community sessions.",
    images: ["/og-image.png"],
  },
};

import Container from "@/components/ui/container";
import SectionTitle from "@/components/ui/section-title";
import PageHero from "@/components/layout/page-hero";

const highlights = [
  {
    icon: Users,
    title: "Built for student builders",
    description:
      "Designed for students, developers, designers, and aspiring founders who want to learn, connect, and build with intention.",
  },
  {
    icon: Lightbulb,
    title: "Practical learning first",
    description:
      "Expect talks, workshops, and conversations focused on real tools, workflows, ideas, and execution rather than surface-level inspiration.",
  },
  {
    icon: Sparkles,
    title: "Community-powered energy",
    description:
      "Meet peers, chapter members, mentors, and industry voices in a space designed to spark momentum beyond a single event day.",
  },
];

const expectations = [
  "Talks and sessions across AI, cloud, web, product, and developer growth",
  "Hands-on workshops designed to be practical and beginner-friendly",
  "Opportunities to meet peers, organisers, mentors, and guest speakers",
  "A high-energy student community environment with real conversations",
];

const audience = [
  "ANU students exploring software, design, product, AI, or startups",
  "Beginners looking for a welcoming entry point into developer communities",
  "Intermediate builders who want practical exposure to tools and workflows",
  "Students interested in networking, projects, collaboration, and growth",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the Event"
        title="A student-led developer event designed for learning, building, and community."
        description="GDSC ANU brings together students, developers, designers, and builders for a day shaped around practical insights, meaningful conversations, and momentum that lasts beyond the event itself."
      />

      <section className="border-b border-white/10 bg-black py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <SectionTitle
                eyebrow="Overview"
                title="More than a campus tech event"
                description="This is a space for ambitious students to learn from industry voices, explore modern technology, discover new pathways, and connect with a wider builder community."
              />

              <div className="mt-8 space-y-5 text-sm leading-7 text-white/70 md:text-base">
                <p>
                  GDSC ANU exists to create meaningful opportunities for students who want to go
                  beyond theory and engage with the real worlds of technology, product thinking,
                  collaboration, and innovation.
                </p>
                <p>
                  The event is designed to bring together a broad mix of attendees, from curious
                  beginners to experienced student builders, through sessions that are accessible,
                  relevant, and grounded in real practice.
                </p>
                <p>
                  Whether someone attends to learn, network, explore new domains, or find their
                  next project collaborator, the goal is the same: create a high-quality experience
                  that feels energising, useful, and community-led.
                </p>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
              <h3 className="text-xl font-semibold text-white">Event snapshot</h3>

              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/40 p-4">
                  <CalendarDays className="mt-0.5 h-5 w-5 text-white/70" />
                  <div>
                    <p className="text-sm font-medium text-white">Date</p>
                    <p className="mt-1 text-sm text-white/65">To be announced</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/40 p-4">
                  <MapPin className="mt-0.5 h-5 w-5 text-white/70" />
                  <div>
                    <p className="text-sm font-medium text-white">Location</p>
                    <p className="mt-1 text-sm text-white/65">Australian National University</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/40 p-4">
                  <Users className="mt-0.5 h-5 w-5 text-white/70" />
                  <div>
                    <p className="text-sm font-medium text-white">Audience</p>
                    <p className="mt-1 text-sm text-white/65">
                      Students, developers, designers, and builders
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-white/10 bg-zinc-950 py-20 md:py-28">
        <Container>
          <SectionTitle
            eyebrow="Why this event"
            title="Built to create momentum, not just attendance"
            description="The event is structured to help people leave with more clarity, stronger connections, and practical ideas they can act on."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-3xl border border-white/10 bg-black p-6 transition hover:border-white/20 hover:bg-white/[0.03]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                    <Icon className="h-5 w-5 text-white/75" />
                  </div>

                  <h3 className="mt-5 text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/70">{item.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="border-b border-white/10 bg-black py-20 md:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
              <h2 className="text-2xl font-semibold text-white">What to expect</h2>

              <ul className="mt-6 space-y-4">
                {expectations.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-7 text-white/70">
                    <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-[linear-gradient(90deg,#4285F4,#EA4335,#FBBC05,#34A853)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
              <h2 className="text-2xl font-semibold text-white">Who should attend</h2>

              <ul className="mt-6 space-y-4">
                {audience.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-7 text-white/70">
                    <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-white/60" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-zinc-950 py-20 md:py-28">
        <Container>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 md:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(66,133,244,0.16),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(52,168,83,0.14),transparent_25%)]" />

            <div className="relative max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/55">
                Ready to join
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-white md:text-5xl">
                Explore the event, meet the community, and be part of the day.
              </h2>
              <p className="mt-4 text-base leading-7 text-white/70 md:text-lg">
                Discover the speaker lineup, view the schedule, and register when applications go
                live.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
                >
                  Register Interest
                  <ArrowRight className="h-4 w-4" />
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
        </Container>
      </section>
    </>
  );
}