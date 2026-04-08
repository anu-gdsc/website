import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Clock3,
  ExternalLink,
  MapPin,
  Ticket,
  Users,
} from "lucide-react";

import Container from "@/components/ui/container";
import SectionTitle from "@/components/ui/section-title";
import PageHero from "@/components/layout/page-hero";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gdscanu.com.au";

export const metadata: Metadata = {
  title: "Register",
  description:
    "Register for GDSC ANU 2026 — a flagship student developer event at ANU Canberra, October 2026. Secure your spot for talks, workshops, and networking across AI, cloud, web, and product.",
  alternates: {
    canonical: `${siteUrl}/register`,
  },
  openGraph: {
    title: "Register | GDSC ANU 2026",
    description:
      "Secure your spot at GDSC ANU 2026 — talks, workshops, and networking across AI, cloud, web, and product. ANU Canberra, October 2026.",
    url: `${siteUrl}/register`,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GDSC ANU 2026 Register",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Register | GDSC ANU 2026",
    description:
      "Register for GDSC ANU 2026 and secure your spot at ANU Canberra, October 2026.",
    images: ["/og-image.png"],
  },
};

const eventDetails = [
  {
    icon: CalendarDays,
    label: "Date",
    value: "To be announced",
  },
  {
    icon: Clock3,
    label: "Time",
    value: "Full-day experience",
  },
  {
    icon: MapPin,
    label: "Venue",
    value: "Australian National University",
  },
];

const perks = [
  "Access to curated talks, sessions, and hands-on workshops",
  "Opportunities to connect with peers, organisers, and guest speakers",
  "Exposure to practical topics across AI, cloud, web, product, and community",
  "A chance to discover projects, collaborations, and future chapter activities",
];

const steps = [
  {
    title: "Review the event details",
    description:
      "Get familiar with the event format, audience, and what the day is designed to offer before you register.",
  },
  {
    title: "Complete the registration form",
    description:
      "Head to the Hellorubric registration form, fill in your details, and confirm your attendance with a few quick questions.",
  },
  {
    title: "Watch for confirmation and updates",
    description:
      "After registering, attendees can receive confirmation details and future updates around timing, speakers, and logistics.",
  },
];

const attendeeFit = [
  "Students interested in software, product, AI, design, cloud, or startups",
  "Beginners looking for an accessible entry point into the tech community",
  "Builders who want practical exposure, networking, and collaboration",
  "Students excited to learn from speakers and engage with the GDSC ANU chapter",
];

const miniFaqs = [
  {
    q: "Do I need prior experience?",
    a: "No. The event can support a mix of beginners, intermediate learners, and more experienced student builders.",
  },
  {
    q: "Is this only for ANU students?",
    a: "The event is primarily organised for ANU students, but all Canberra-based students and tech enthusiasts are welcome to attend.",
  },
  {
    q: "Will there be workshops as well as talks?",
    a: "Yes. The structure is designed to support both practical workshops and speaker-led sessions.",
  },
  {
    q: "Where will registration happen?",
    a: "Registration is open on the Hellorubric platform. Click the Register Now button on this page to get started.",
  },
];

export default function RegisterPage() {
  return (
    <>
      <PageHero
        eyebrow="Register"
        title="Join the GDSC ANU event and secure your place early."
        description="Everything attendees need before signing up, from event details and expectations to registration flow and common questions."
      />

      <section className="border-b border-white/10 bg-black py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-start">
            <div>
              <SectionTitle
                eyebrow="Registration overview"
                title="A simple, clear path to joining the event"
                description="Everything you need to know before signing up — event details, what to expect, and a straightforward registration process."
              />

              <div className="mt-8 space-y-5 text-sm leading-7 text-white/70 md:text-base">
                <p>
                  GDSC ANU is designed for students who want more than just a passive event
                  experience. The focus is on practical exposure, relevant ideas, and a strong
                  sense of community throughout the day.
                </p>
                <p>
                  Whether someone is attending to explore technology, meet like-minded peers, hear
                  from industry voices, or discover opportunities for collaboration, the event is
                  structured to feel accessible, energising, and worth showing up for.
                </p>
                <p>
                  Registration should be straightforward. Give attendees the key details, reinforce
                  what they will gain, and make the next step obvious.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="https://campus.hellorubric.com/?s=9746"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
                >
                  Register Now
                  <ExternalLink className="h-4 w-4" />
                </a>

                <Link
                  href="/schedule"
                  className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
                >
                  View Schedule
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
              <h3 className="text-xl font-semibold text-white">Event details</h3>

              <div className="mt-6 space-y-4">
                {eventDetails.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/40 p-4"
                    >
                      <Icon className="mt-0.5 h-5 w-5 text-white/70" />
                      <div>
                        <p className="text-sm font-medium text-white">{item.label}</p>
                        <p className="mt-1 text-sm text-white/65">{item.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 rounded-2xl border border-white/10 bg-black/40 p-5">
                <p className="text-sm font-medium text-white">Registration is open</p>
                <p className="mt-2 text-sm leading-7 text-white/65">
                  Register via Hellorubric to secure your spot. Spots are limited — sign up early
                  to avoid missing out.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-white/10 bg-zinc-950 py-20 md:py-28">
        <Container>
          <SectionTitle
            eyebrow="Why register"
            title="What attendees get from the experience"
            description="A day designed to be genuinely useful — practical sessions, real connections, and ideas you can act on."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {perks.map((item) => (
              <div
                key={item}
                className="flex items-start gap-4 rounded-3xl border border-white/10 bg-black p-6"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                  <BadgeCheck className="h-5 w-5 text-white/75" />
                </div>
                <p className="text-sm leading-7 text-white/70">{item}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-white/10 bg-black py-20 md:py-28">
        <Container>
          <SectionTitle
            eyebrow="How it works"
            title="A simple registration journey"
            description="Keep the process light, clear, and easy to follow."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/50 text-sm font-semibold text-white/80">
                  0{index + 1}
                </div>

                <h3 className="mt-5 text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/70">{step.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-white/10 bg-zinc-950 py-20 md:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-white/10 bg-black p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                <Users className="h-5 w-5 text-white/75" />
              </div>
              <h2 className="mt-5 text-2xl font-semibold text-white">Who should register</h2>

              <ul className="mt-6 space-y-4">
                {attendeeFit.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-7 text-white/70">
                    <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-[linear-gradient(90deg,#4285F4,#EA4335,#FBBC05,#34A853)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-black p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                <Ticket className="h-5 w-5 text-white/75" />
              </div>
              <h2 className="mt-5 text-2xl font-semibold text-white">What to prepare</h2>

              <ul className="mt-6 space-y-4 text-sm leading-7 text-white/70">
                <li className="flex items-start gap-3">
                  <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-white/60" />
                  <span>Basic attendee information for the registration form</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-white/60" />
                  <span>Your preferred contact email for updates and event communication</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-white/60" />
                  <span>Interest areas if you want to tailor workshops or session demand later</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-white/60" />
                  <span>Any accessibility or logistics information you may want to collect</span>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-white/10 bg-black py-20 md:py-28">
        <Container>
          <SectionTitle
            eyebrow="Quick answers"
            title="Common questions before signing up"
            description="A compact FAQ helps remove last-minute friction and uncertainty."
          />

          <div className="mt-12 space-y-4">
            {miniFaqs.map((faq) => (
              <div key={faq.q} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <h3 className="text-lg font-semibold text-white">{faq.q}</h3>
                <p className="mt-3 text-sm leading-7 text-white/70">{faq.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-zinc-950 py-20 md:py-28">
        <Container>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 md:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(66,133,244,0.16),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(52,168,83,0.14),transparent_25%)]" />

            <div className="relative max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/55">
                Final step
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-white md:text-5xl">
                Ready to be part of the event?
              </h2>
              <p className="mt-4 text-base leading-7 text-white/70 md:text-lg">
                Register when the form goes live and stay updated on speakers, timings, and event
                announcements.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="https://campus.hellorubric.com/?s=9746"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
                >
                  Register Now
                  <ArrowRight className="h-4 w-4" />
                </a>

                <Link
                  href="/faq"
                  className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
                >
                  Read FAQ
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}