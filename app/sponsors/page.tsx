import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Handshake,
  Megaphone,
} from "lucide-react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gdganu.com";

export const metadata: Metadata = {
  title: "Sponsors & Partners",
  description:
    "Meet the sponsors and partners backing GDSC ANU 2026. Partner with us to connect with student developers and the tech community at ANU Canberra, October 2026.",
  alternates: {
    canonical: `${siteUrl}/sponsors`,
  },
  openGraph: {
    title: "Sponsors & Partners | GDSC ANU 2026",
    description:
      "The sponsors and partners powering GDSC ANU 2026. Connect with student developers and the tech community at ANU Canberra.",
    url: `${siteUrl}/sponsors`,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GDSC ANU 2026 Sponsors & Partners",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sponsors & Partners | GDSC ANU 2026",
    description:
      "Partners backing GDSC ANU 2026 — connect with student developers at ANU Canberra, October 2026.",
    images: ["/og-image.png"],
  },
};

import Container from "@/components/ui/container";
import SectionTitle from "@/components/ui/section-title";
import PageHero from "@/components/layout/page-hero";

type SponsorTier = {
  name: string;
  description: string;
  perks: string[];
};

type Sponsor = {
  name: string;
  type: string;
};

const sponsorTiers: SponsorTier[] = [
  {
    name: "Title Partner",
    description:
      "The primary event partner with high-visibility placement across the website, event branding, and core communications.",
    perks: [
      "Top-tier logo placement across key event surfaces",
      "Strong brand visibility before and during the event",
      "Priority mention in selected event communications",
      "Deeper association with the event experience and student community",
    ],
  },
  {
    name: "Ecosystem Partner",
    description:
      "Ideal for companies, institutions, and communities that want meaningful visibility and engagement with attendees.",
    perks: [
      "Logo placement on partner sections and event materials",
      "Visibility across student-facing event touchpoints",
      "Association with community and learning outcomes",
      "Opportunity to support talks, sessions, or attendee experiences",
    ],
  },
  {
    name: "Community Partner",
    description:
      "A good fit for student groups, local communities, and ecosystem supporters who want to contribute to the event’s reach and energy.",
    perks: [
      "Partner logo presence on the website and event ecosystem section",
      "Recognition as a community enabler",
      "Opportunity to support community-building and outreach",
      "Alignment with student-first learning and collaboration",
    ],
  },
];

const currentPartners: Sponsor[] = [
  { name: "Google", type: "Title Partner" },
  { name: "Australian National University", type: "Institutional Partner" },
  { name: "Startup Partner", type: "Ecosystem Partner" },
  { name: "Community Partner", type: "Community Partner" },
  { name: "Tech Sponsor", type: "Support Partner" },
  { name: "Design Partner", type: "Creative Partner" },
];

const partnerListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "GDSC ANU 2026 Sponsors & Partners",
  url: `${siteUrl}/sponsors`,
  numberOfItems: 2,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Organization",
        name: "Google",
        url: "https://about.google",
        description: "Title Partner of GDSC ANU 2026",
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Organization",
        name: "Australian National University",
        url: "https://www.anu.edu.au",
        description: "Institutional Partner of GDSC ANU 2026",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Canberra",
          addressRegion: "ACT",
          postalCode: "2601",
          addressCountry: "AU",
        },
      },
    },
  ],
};

const reasons = [
  {
    icon: Handshake,
    title: "Meaningful student reach",
    description:
      "Connect with highly engaged students, builders, and future talent in a setting shaped around learning, energy, and participation.",
  },
  {
    icon: Megaphone,
    title: "Brand visibility with context",
    description:
      "Your brand appears within a thoughtful, high-quality event environment rather than as a disconnected logo placement.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Longer-term ecosystem value",
    description:
      "Partnership can go beyond a single event and support relationships with student communities, organisers, and future initiatives.",
  },
];

const sponsorBenefits = [
  "Brand visibility across event-facing digital and physical touchpoints",
  "Association with learning, innovation, and student community building",
  "Opportunities to support sessions, workshops, or attendee experiences",
  "A stronger presence within the university and developer ecosystem",
];

function tierAccent(name: string) {
  switch (name) {
    case "Title Partner":
      return "bg-[linear-gradient(90deg,#4285F4,#EA4335,#FBBC05,#34A853)]";
    case "Ecosystem Partner":
      return "bg-[linear-gradient(90deg,rgba(66,133,244,0.9),rgba(52,168,83,0.9))]";
    default:
      return "bg-white/20";
  }
}

export default function SponsorsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(partnerListSchema) }}
      />
      <PageHero
        eyebrow="Sponsors & Partners"
        title="Backed by institutions, communities, and ecosystem partners."
        description="The organisations, institutions, and communities backing GDSC ANU 2026 — helping create a student event that's practical, high-quality, and built to last."
      />

      <section className="border-b border-white/10 bg-black py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <SectionTitle
                eyebrow="Partnership overview"
                title="A strong event is rarely built alone"
                description="Sponsors and partners help create the scale, quality, and energy that make a student event feel real, credible, and impactful."
              />

              <div className="mt-8 space-y-5 text-sm leading-7 text-white/70 md:text-base">
                <p>
                  GDSC ANU is designed to bring together students, developers, designers, and
                  builders through an event experience centred on practical learning, real
                  conversations, and community momentum.
                </p>
                <p>
                  Sponsors and ecosystem partners can play an important role in supporting that
                  experience, whether through visibility, community enablement, workshops, sessions,
                  event support, or strategic collaboration.
                </p>
                <p>
                  This page is built to showcase current partners while also making the website
                  ready for future sponsorship conversations and outreach.
                </p>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
              <h3 className="text-xl font-semibold text-white">Why partner with the event</h3>

              <ul className="mt-6 space-y-4">
                {sponsorBenefits.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-7 text-white/70">
                    <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-[linear-gradient(90deg,#4285F4,#EA4335,#FBBC05,#34A853)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-2xl border border-white/10 bg-black/40 p-5">
                <p className="text-sm font-medium text-white">Interested in partnering?</p>
                <p className="mt-2 text-sm leading-7 text-white/65">
                  Reach out via Instagram or the GDG community page to start a conversation about
                  sponsorship and partnership opportunities.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-white/10 bg-zinc-950 py-20 md:py-28">
        <Container>
          <SectionTitle
            eyebrow="Current partners"
            title="Showcase the organisations backing the event"
            description="Google and ANU are confirmed partners. Additional ecosystem and community partners will be announced closer to the event."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3">
            {currentPartners.map((partner) => (
              <div
                key={partner.name}
                className="rounded-[2rem] border border-white/10 bg-black p-6 transition hover:border-white/20 hover:bg-white/[0.03]"
              >
                <div className="flex aspect-[16/10] items-center justify-center rounded-[1.5rem] border border-white/10 bg-white/[0.04]">
                  <span className="text-sm font-medium text-white/75">{partner.name}</span>
                </div>

                <div className="mt-5">
                  <h3 className="text-lg font-semibold text-white">{partner.name}</h3>
                  <p className="mt-2 text-sm text-white/60">{partner.type}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-white/10 bg-black py-20 md:py-28">
        <Container>
          <SectionTitle
            eyebrow="Sponsorship tiers"
            title="A flexible structure for different kinds of support"
            description="Three partnership tiers designed for different levels of involvement — from title visibility to community and ecosystem support."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {sponsorTiers.map((tier) => (
              <div
                key={tier.name}
                className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6"
              >
                <div className={`h-2 w-20 rounded-full ${tierAccent(tier.name)}`} />

                <h3 className="mt-5 text-2xl font-semibold text-white">{tier.name}</h3>
                <p className="mt-3 text-sm leading-7 text-white/70">{tier.description}</p>

                <ul className="mt-6 space-y-4">
                  {tier.perks.map((perk) => (
                    <li
                      key={perk}
                      className="flex items-start gap-3 text-sm leading-7 text-white/70"
                    >
                      <BadgeCheck className="mt-1 h-4 w-4 shrink-0 text-white/70" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-white/10 bg-zinc-950 py-20 md:py-28">
        <Container>
          <SectionTitle
            eyebrow="Why it matters"
            title="Partnership that feels relevant, not decorative"
            description="The best event partnerships strengthen the attendee experience while also creating authentic visibility for the organisations involved."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {reasons.map((item) => {
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

      <section className="bg-black py-20 md:py-28">
        <Container>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 md:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(66,133,244,0.16),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(52,168,83,0.14),transparent_25%)]" />

            <div className="relative max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/55">
                Become a partner
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-white md:text-5xl">
                Support the event and help shape a stronger student experience.
              </h2>
              <p className="mt-4 text-base leading-7 text-white/70 md:text-lg">
                Start a conversation around sponsorship, ecosystem collaboration, or community
                support for the event.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="https://www.instagram.com/gdg_anu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
                >
                  Contact on Instagram
                  <ArrowRight className="h-4 w-4" />
                </a>

                <a
                  href="https://gdg.community.dev/gdg-on-campus-the-australian-national-university-canberra-australia/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
                >
                  GDG Community Page
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}