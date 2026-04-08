import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail, ShieldCheck, Ticket } from "lucide-react";

import Container from "@/components/ui/container";
import SectionTitle from "@/components/ui/section-title";
import PageHero from "@/components/layout/page-hero";
import FAQAccordion from "@/components/sections/faq-accordion";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gdscanu.com.au";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about GDSC ANU 2026 — registration, attendance, what to expect, logistics, and more. ANU Canberra, October 2026.",
  alternates: {
    canonical: `${siteUrl}/faq`,
  },
  openGraph: {
    title: "FAQ | GDSC ANU 2026",
    description:
      "Everything you need to know before attending GDSC ANU 2026 — registration, schedule, logistics, and more.",
    url: `${siteUrl}/faq`,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GDSC ANU 2026 FAQ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ | GDSC ANU 2026",
    description:
      "Common questions about GDSC ANU 2026 — registration, schedule, logistics, and more.",
    images: ["/og-image.png"],
  },
};

export default function FAQPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Questions, answered before the event day."
        description="Everything attendees usually want to know before registering or showing up — from logistics and registration to what the day will actually look like."
      />

      <section className="border-b border-white/10 bg-black py-20 md:py-28">
        <Container>
          <SectionTitle
            eyebrow="Quick clarity"
            title="Everything attendees usually ask first"
            description="Organised answers make the event feel easier to understand and more trustworthy."
          />

          <div className="mt-12">
            <FAQAccordion />
          </div>
        </Container>
      </section>

      <section className="border-b border-white/10 bg-zinc-950 py-20 md:py-28">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-[2rem] border border-white/10 bg-black p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                <Ticket className="h-5 w-5 text-white/75" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-white">Reduce hesitation</h3>
              <p className="mt-3 text-sm leading-7 text-white/70">
                A clear FAQ helps students understand the event faster and removes common
                uncertainties before they decide to register.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-black p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                <ShieldCheck className="h-5 w-5 text-white/75" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-white">Build trust</h3>
              <p className="mt-3 text-sm leading-7 text-white/70">
                Good event communication signals organisation, seriousness, and care for the
                attendee experience from the first interaction.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-black p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                <Mail className="h-5 w-5 text-white/75" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-white">Reach us directly</h3>
              <p className="mt-3 text-sm leading-7 text-white/70">
                For anything not covered here, reach out to the GDSC ANU team on Instagram or
                through the GDG community page.
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
                Still curious?
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-white md:text-5xl">
                Explore the registration page or reach out to the organisers.
              </h2>
              <p className="mt-4 text-base leading-7 text-white/70 md:text-lg">
                Move forward with confidence by reviewing registration details or reaching out with
                any unanswered questions.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
                >
                  Go to Register
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <a
                  href="https://www.instagram.com/gdg_anu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
                >
                  Contact on Instagram
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
