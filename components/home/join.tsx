"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/container";
import SectionHead from "@/components/ui/section-head";
import { FadeIn } from "@/components/motion/fade-in";
import { roles, type Role } from "@/data/roles";
import { APPLY_URL, INSTAGRAM_URL } from "@/data/site";

export default function Join() {
  return (
    <section id="join" className="relative scroll-mt-20 overflow-hidden bg-ink py-24 md:py-32">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(50%_40%_at_50%_0%,rgba(66,133,244,0.16),transparent)]"
      />
      <Container>
        <div className="relative">
          <SectionHead
            index="06"
            eyebrow="Join the team"
            title="Come build the club"
            accent="with us."
            description="You don't need to be a developer, a final-year or 'experienced'. Bring curiosity and a bit of time, and we'll bring the mentors, the projects and the friends."
            color="#4285F4"
          />

          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {roles.map((r, i) => (
              <FadeIn key={r.team} delay={(i % 3) * 0.08}>
                <RoleCard role={r} index={i} />
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.1} className="mt-10">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 md:p-12">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(60%_80%_at_0%_0%,rgba(66,133,244,0.22),transparent),radial-gradient(50%_70%_at_100%_100%,rgba(251,188,5,0.16),transparent)]"
              />
              <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                <div className="max-w-xl">
                  <h3 className="text-3xl font-bold leading-tight md:text-4xl">
                    Not sure where you fit?{" "}
                    <span className="accent-text">Come say hi.</span>
                  </h3>
                  <p className="mt-3 text-base leading-7 text-white/60">
                    Tell us what you&apos;re into and we&apos;ll point you to a team. Applications take five minutes.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={APPLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full bg-paper px-7 py-3.5 text-sm font-semibold text-ink transition hover:bg-white active:scale-[0.97]"
                  >
                    Apply now
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </a>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold transition hover:border-white/40 hover:bg-white/5 active:scale-[0.97]"
                  >
                    DM us on Instagram
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}

/** Card with a cursor-following glow in the team's colour. */
function RoleCard({ role, index }: { role: Role; index: number }) {
  const onMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <a
      href={APPLY_URL}
      target="_blank"
      rel="noopener noreferrer"
      onPointerMove={onMove}
      style={{ "--c": role.color } as React.CSSProperties}
      className="group relative flex h-full min-h-[260px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-ink-2 p-6 transition duration-300 hover:-translate-y-1 hover:border-white/25"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
        style={{ background: "radial-gradient(260px circle at var(--mx,50%) var(--my,50%), color-mix(in srgb, var(--c) 22%, transparent), transparent 70%)" }}
      />
      <div className="relative flex items-center justify-between">
        <span className="label-mono text-[10px] text-white/35">0{index + 1}</span>
        <ArrowUpRight className="h-4 w-4 text-white/30 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
      </div>
      <h3 className="relative mt-8 flex items-center gap-2.5 text-2xl font-semibold">
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: role.color }} />
        {role.team}
      </h3>
      <p className="relative mt-2 text-sm leading-6 text-white/55">{role.tagline}</p>
      <div className="relative mt-auto flex flex-wrap gap-1.5 pt-6">
        {role.gain.map((g) => (
          <span key={g} className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-white/65">
            {g}
          </span>
        ))}
      </div>
    </a>
  );
}
