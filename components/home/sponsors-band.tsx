"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Mic2, Users2, Wrench } from "lucide-react";
import Container from "@/components/ui/container";
import SectionHead from "@/components/ui/section-head";
import { FadeIn } from "@/components/motion/fade-in";
import { CONTACT_EMAIL } from "@/data/site";

type Sponsor = { name: string; type?: string; logo?: string; website?: string };

const PERKS = [
  { icon: Users2, title: "Meet the talent", body: "Get in front of motivated ANU students before everyone else does.", color: "#4285F4" },
  { icon: Wrench, title: "Run a workshop", body: "Teach your stack. Students leave having built with it.", color: "#34A853" },
  { icon: Mic2, title: "Back an event", body: "Put your name on a talk series, a workshop night or our flagship event.", color: "#EA4335" },
];

// TODO(content): the two real affiliations are shown until sponsor logos exist (from Sanity or /public/sponsors).
const AFFILIATIONS: Sponsor[] = [{ name: "Google Developer Groups" }, { name: "Australian National University" }];

export default function SponsorsBand({ sponsors }: { sponsors: Sponsor[] }) {
  const partners = sponsors.length ? sponsors : AFFILIATIONS;
  const open = Math.max(2, 5 - partners.length); // empty slots that invite a new partner

  return (
    <section id="sponsors" data-nav-tone="light" className="relative scroll-mt-20 bg-paper py-24 text-ink md:py-32">
      <Container>
        <SectionHead
          tone="light"
          index="07"
          eyebrow="Sponsors"
          title="Backed by people who"
          accent="back builders."
          description="Our partners make workshops free, events feed people and projects possible. Here's who's with us, and where you could be."
          color="#FBBC05"
        />

        {/* Partner wall */}
        <FadeIn delay={0.1} className="mt-12">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
            {partners.map((s) => {
              const inner = s.logo ? (
                <Image src={s.logo} alt={s.name} width={140} height={56} className="max-h-12 w-auto object-contain" />
              ) : (
                <span className="px-3 text-center font-[family-name:var(--font-google)] text-sm font-semibold leading-tight">{s.name}</span>
              );
              const cls =
                "flex h-28 items-center justify-center rounded-2xl border border-ink/10 bg-white transition hover:-translate-y-1 hover:shadow-lg";
              return s.website ? (
                <a key={s.name} href={s.website} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
              ) : (
                <div key={s.name} className={cls}>{inner}</div>
              );
            })}
            {Array.from({ length: open }).map((_, i) => (
              <a
                key={i}
                href={`mailto:${CONTACT_EMAIL}?subject=Sponsoring%20GDG%20ANU`}
                className="label-mono flex h-28 items-center justify-center rounded-2xl border border-dashed border-ink/25 text-[10px] text-ink/45 transition hover:border-ink/50 hover:bg-white/60 hover:text-ink"
              >
                Your logo here
              </a>
            ))}
          </div>
        </FadeIn>

        {/* Sponsor us */}
        <FadeIn delay={0.1} className="mt-16">
          <div className="relative overflow-hidden rounded-[2rem] bg-ink p-8 text-white md:p-12">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(50%_70%_at_100%_0%,rgba(251,188,5,0.2),transparent),radial-gradient(50%_70%_at_0%_100%,rgba(66,133,244,0.2),transparent)]"
            />
            <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-center">
              <div>
                <p className="label-mono text-white/45">Sponsor us</p>
                <h3 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">
                  Meet ANU&apos;s next generation of{" "}
                  <span className="accent-text">engineers.</span>
                </h3>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={`mailto:${CONTACT_EMAIL}?subject=Sponsoring%20GDG%20ANU`}
                    className="group inline-flex items-center gap-2 rounded-full bg-paper px-6 py-3.5 text-sm font-semibold text-ink transition hover:bg-white active:scale-[0.97]"
                  >
                    Become a sponsor
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </a>
                  <Link
                    href="/sponsors"
                    className="rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold transition hover:border-white/40 hover:bg-white/5 active:scale-[0.97]"
                  >
                    Partnership details
                  </Link>
                </div>
              </div>

              <ul className="grid gap-3 sm:grid-cols-3">
                {PERKS.map(({ icon: Icon, title, body, color }) => (
                  <li key={title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                    <Icon className="h-5 w-5" style={{ color }} />
                    <p className="mt-4 text-base font-semibold">{title}</p>
                    <p className="mt-1.5 text-sm leading-6 text-white/55">{body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
