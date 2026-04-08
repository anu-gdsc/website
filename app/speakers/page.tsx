import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
import Container from "@/components/ui/container";
import PageHero from "@/components/layout/page-hero";
import { speakers } from "@/data/speakers";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gdganu.com";

export const metadata: Metadata = {
  title: "Speakers",
  description:
    "Meet the speakers at GDSC ANU 2026. Industry leaders from Google, Red Hat, and AWS covering AI, multiagent systems, cloud engineering, career development, and open source — at ANU Canberra, October 2026.",
  alternates: {
    canonical: `${siteUrl}/speakers`,
  },
  openGraph: {
    title: "Speakers | GDSC ANU 2026",
    description:
      "Harshil Siyani, Anupam Phogat, Dave Hall, Paul Wayper and more — industry voices covering AI, cloud, open source and career growth at GDSC ANU, October 2026.",
    url: `${siteUrl}/speakers`,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GDSC ANU 2026 Speakers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Speakers | GDSC ANU 2026",
    description:
      "Meet the speakers at GDSC ANU — AI, cloud, open source, and career sessions at ANU Canberra, October 2026.",
    images: ["/og-image.png"],
  },
};

const colorBorder = {
  blue: "bg-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.55)]",
  green: "bg-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.55)]",
  yellow: "bg-yellow-400/40 shadow-[0_0_30px_rgba(250,204,21,0.55)]",
  red: "bg-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.55)]",
};

const categoryColor = {
  blue: "border-[#4285F4]/30 bg-[#4285F4]/10 text-[#93C5FD]",
  green: "border-[#34A853]/30 bg-[#34A853]/10 text-[#9AE6B4]",
  yellow: "border-[#FBBC05]/30 bg-[#FBBC05]/10 text-[#FDE68A]",
  red: "border-[#EA4335]/30 bg-[#EA4335]/10 text-[#FCA5A5]",
};

const speakerListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "GDSC ANU 2026 Speakers",
  url: `${siteUrl}/speakers`,
  numberOfItems: speakers.length,
  itemListElement: speakers.map((speaker, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Person",
      name: speaker.name,
      jobTitle: speaker.role,
      worksFor: { "@type": "Organization", name: speaker.company },
      description: speaker.bio,
    },
  })),
};

export default function SpeakersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakerListSchema) }}
      />

      <PageHero
        eyebrow="Speakers"
        title="The people shaping GDSC ANU 2026."
        description="Engineers, architects, and practitioners from Google, Red Hat, and the AWS community — covering AI, cloud, open source, and the real skills that matter after graduation."
      />

      {/* Speaker cards */}
      <section className="border-b border-white/10 bg-black py-20 md:py-28">
        <Container>
          <div className="grid gap-8 md:grid-cols-2">
            {speakers.map((speaker) => (
              <article
                key={speaker.name}
                className={`rounded-[2rem] p-[2px] ${colorBorder[speaker.color]}`}
              >
                <div className="flex h-full flex-col rounded-[1.875rem] bg-black p-6 md:flex-row md:gap-7">
                  {/* Photo */}
                  <div className="shrink-0">
                    <img
                      src={speaker.image}
                      alt={`${speaker.name} — ${speaker.role} at ${speaker.company}`}
                      className="h-56 w-full rounded-2xl object-cover md:h-full md:w-44"
                    />
                  </div>

                  {/* Info */}
                  <div className="mt-5 flex flex-col md:mt-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-semibold ${categoryColor[speaker.color]}`}
                      >
                        {speaker.category}
                      </span>
                    </div>

                    <h2 className="mt-3 text-2xl font-semibold text-white">{speaker.name}</h2>
                    <p className="mt-1 text-sm text-white/55">
                      {speaker.role} · {speaker.company}
                    </p>

                    <p className="mt-4 text-sm leading-7 text-white/65 grow">{speaker.bio}</p>

                    <div className="mt-6 flex items-center gap-3">
                      {speaker.linkedin && speaker.linkedin !== "#" && (
                        <a
                          href={speaker.linkedin}
                          target="_blank"
                          rel="noreferrer noopener"
                          aria-label={`${speaker.name} on LinkedIn`}
                          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/5"
                        >
                          <LinkedInIcon className="h-4 w-4" />
                          LinkedIn
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Sessions */}
      <section className="border-b border-white/10 bg-zinc-950 py-20 md:py-28">
        <Container>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/55">
            Sessions
          </p>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold text-white md:text-5xl">
            What you'll hear on the day
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-white/65">
            Four focused sessions spanning AI systems, cloud pragmatism, industry realities, and the
            open source ecosystem.
          </p>

          <ol className="mt-12 space-y-4" aria-label="Event sessions">
            {speakers.map((speaker, i) => (
              <li
                key={speaker.name}
                className="grid gap-4 rounded-2xl border border-white/10 bg-black/60 p-6 transition hover:border-white/20 sm:grid-cols-[3rem_1fr_auto]"
              >
                <span className="text-4xl font-semibold tabular-nums text-white/15 leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="text-lg font-semibold leading-snug text-white">{speaker.topic}</p>
                  <p className="mt-1 text-sm text-white/50">
                    {speaker.name} · {speaker.company}
                  </p>
                </div>
                <span
                  className={`self-start rounded-full border px-3 py-1 text-xs font-semibold ${categoryColor[speaker.color]}`}
                >
                  {speaker.category}
                </span>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-black py-20 md:py-28">
        <Container>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 md:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(66,133,244,0.16),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(52,168,83,0.14),transparent_25%)]" />
            <div className="relative max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/55">
                October 2026 · ANU Campus, Canberra
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-white md:text-5xl">
                Hear them speak in person.
              </h2>
              <p className="mt-4 text-base leading-7 text-white/70 md:text-lg">
                Register now to secure your spot at GDSC ANU 2026 and get direct access to these
                sessions, workshops, and the people behind them.
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
                  href="/#schedule"
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
