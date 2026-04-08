import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3, MapPin, Mic, Users } from "lucide-react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gdscanu.com.au";

export const metadata: Metadata = {
  title: "Schedule",
  description:
    "Explore the GDSC ANU 2026 event schedule — keynotes, talks, hands-on workshops, networking, and community sessions across a full day at ANU Canberra, October 2026.",
  alternates: {
    canonical: `${siteUrl}/schedule`,
  },
  openGraph: {
    title: "Schedule | GDSC ANU 2026",
    description:
      "A full day of keynotes, talks, workshops, and community moments at GDSC ANU 2026, ANU Canberra, October 2026.",
    url: `${siteUrl}/schedule`,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GDSC ANU 2026 Schedule",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Schedule | GDSC ANU 2026",
    description:
      "GDSC ANU 2026 event schedule — keynotes, workshops, networking, and community sessions at ANU Canberra.",
    images: ["/og-image.png"],
  },
};

import Container from "@/components/ui/container";
import SectionTitle from "@/components/ui/section-title";
import PageHero from "@/components/layout/page-hero";

const dayInfo = [
  {
    icon: CalendarDays,
    label: "Date",
    value: "To be announced",
  },
  {
    icon: Clock3,
    label: "Format",
    value: "Full-day event",
  },
  {
    icon: MapPin,
    label: "Venue",
    value: "Australian National University",
  },
];

const timeline = [
  {
    time: "09:00 AM",
    title: "Registration and Welcome",
    type: "Arrival",
    description:
      "Check in, explore the venue, meet other attendees, and settle in before the opening begins.",
  },
  {
    time: "10:00 AM",
    title: "Opening Keynote",
    type: "Keynote",
    description:
      "A big-picture session to set the tone for the day with ideas around technology, builders, and community.",
  },
  {
    time: "11:00 AM",
    title: "Talk Sessions Across Core Tracks",
    type: "Talks",
    description:
      "Parallel sessions across AI, cloud, web, product, and developer growth with practical insights for students.",
  },
  {
    time: "12:30 PM",
    title: "Lunch and Networking",
    type: "Networking",
    description:
      "Take a break, meet speakers and peers, and continue conversations in a more informal setting.",
  },
  {
    time: "01:30 PM",
    title: "Hands-on Workshops",
    type: "Workshop",
    description:
      "Interactive sessions focused on tools, workflows, and building with guided support from organisers and speakers.",
  },
  {
    time: "03:30 PM",
    title: "Panel or Community Session",
    type: "Discussion",
    description:
      "A collaborative session on careers, projects, open source, and what it means to grow in developer communities.",
  },
  {
    time: "04:30 PM",
    title: "Closing Remarks",
    type: "Closing",
    description:
      "A wrap-up on key themes from the day, next steps, and ways to stay involved with the GDSC ANU community.",
  },
];

const tracks = [
  {
    title: "AI and Machine Learning",
    description:
      "Practical sessions on modern AI tooling, experimentation, real-world applications, and student-led innovation.",
  },
  {
    title: "Cloud and DevOps",
    description:
      "Understand how products are deployed, scaled, and maintained using production-minded engineering practices.",
  },
  {
    title: "Web and Product",
    description:
      "Explore frontend craft, product thinking, UX, and how strong digital experiences are designed and built.",
  },
  {
    title: "Career and Community",
    description:
      "Learn through conversations on growth, collaboration, open source, and navigating opportunities as a student.",
  },
];

function getTypeStyles(type: string) {
  switch (type) {
    case "Keynote":
      return "bg-white text-black";
    case "Workshop":
      return "border border-[#34A853]/30 bg-[#34A853]/10 text-[#9AE6B4]";
    case "Networking":
      return "border border-[#FBBC05]/30 bg-[#FBBC05]/10 text-[#FDE68A]";
    case "Talks":
      return "border border-[#4285F4]/30 bg-[#4285F4]/10 text-[#93C5FD]";
    case "Discussion":
      return "border border-[#EA4335]/30 bg-[#EA4335]/10 text-[#FCA5A5]";
    default:
      return "border border-white/15 bg-white/5 text-white/70";
  }
}

export default function SchedulePage() {
  return (
    <>
      <PageHero
        eyebrow="Schedule"
        title="A full day designed to keep the energy and momentum high."
        description="Explore the event flow, session rhythm, and the kinds of experiences attendees can expect across talks, workshops, and community moments."
      />

      <section className="border-b border-white/10 bg-black py-20 md:py-28">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {dayInfo.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/50">
                    <Icon className="h-5 w-5 text-white/75" />
                  </div>

                  <p className="mt-5 text-sm font-medium text-white/60">{item.label}</p>
                  <p className="mt-2 text-lg font-semibold text-white">{item.value}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="border-b border-white/10 bg-zinc-950 py-20 md:py-28">
        <Container>
          <SectionTitle
            eyebrow="Agenda"
            title="Sample event timeline"
            description="An outline of the day's flow. Final session titles, timings, and speaker assignments will be confirmed and updated closer to the event."
          />

          <div className="mt-12 space-y-5">
            {timeline.map((item) => (
              <div
                key={item.time + item.title}
                className="grid gap-5 rounded-[2rem] border border-white/10 bg-black p-6 md:grid-cols-[140px_1fr] md:p-8"
              >
                <div className="text-sm font-semibold tracking-wide text-white/55">
                  {item.time}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getTypeStyles(
                        item.type
                      )}`}
                    >
                      {item.type}
                    </span>
                  </div>

                  <p className="mt-3 max-w-3xl text-sm leading-7 text-white/70 md:text-base">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-white/10 bg-black py-20 md:py-28">
        <Container>
          <SectionTitle
            eyebrow="Session themes"
            title="Built around the tracks students care about most"
            description="The day can be structured around focused tracks so attendees can explore topics that match their interests, goals, and level of experience."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {tracks.map((track) => (
              <div
                key={track.title}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-white/20 hover:bg-white/[0.06]"
              >
                <div className="mb-5 h-2 w-16 rounded-full bg-[linear-gradient(90deg,#4285F4,#EA4335,#FBBC05,#34A853)]" />
                <h3 className="text-xl font-semibold text-white">{track.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/70">{track.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-white/10 bg-zinc-950 py-20 md:py-28">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-[2rem] border border-white/10 bg-black p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                <Mic className="h-5 w-5 text-white/75" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-white">Talks that stay practical</h3>
              <p className="mt-3 text-sm leading-7 text-white/70">
                Prioritise sessions that move beyond theory and give attendees ideas, examples, and
                frameworks they can actually apply.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-black p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                <Users className="h-5 w-5 text-white/75" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-white">Networking built into the day</h3>
              <p className="mt-3 text-sm leading-7 text-white/70">
                Create deliberate moments for attendees to meet peers, organisers, and guest
                speakers instead of leaving connection entirely to chance.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-black p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                <Clock3 className="h-5 w-5 text-white/75" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-white">A flow that feels balanced</h3>
              <p className="mt-3 text-sm leading-7 text-white/70">
                Mix talks, workshops, break periods, and community moments so the event remains
                engaging, energised, and easy to follow throughout the day.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-black py-20 md:py-28">
        <Container>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 md:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(66,133,244,0.16),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(234,67,53,0.14),transparent_25%)]" />

            <div className="relative max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/55">
                Next step
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-white md:text-5xl">
                See who is speaking and get ready to join the day.
              </h2>
              <p className="mt-4 text-base leading-7 text-white/70 md:text-lg">
                Explore the speaker lineup or head to registration when the event form is live.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/speakers"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
                >
                  Explore Speakers
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/register"
                  className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
                >
                  Register Interest
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}