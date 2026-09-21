"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Container from "@/components/ui/container";
import SectionHead from "@/components/ui/section-head";
import Counter from "@/components/ui/counter";
import { FadeIn } from "@/components/motion/fade-in";
import { mission, vision } from "@/data/about";
import { values } from "@/data/roles";
import { STATS } from "@/data/site";

const TABS = [
  { id: "mission", label: "Mission", color: "#4285F4" },
  { id: "vision", label: "Vision", color: "#EA4335" },
  { id: "values", label: "Values", color: "#34A853" },
] as const;
type TabId = (typeof TABS)[number]["id"];

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

export default function Mission() {
  const [tab, setTab] = useState<TabId>("mission");
  const active = TABS.find((t) => t.id === tab)!;

  return (
    <section id="about" data-nav-tone="light" className="relative scroll-mt-20 bg-paper py-24 text-ink md:py-32">
      <Container>
        <SectionHead
          tone="light"
          index="01"
          eyebrow="About us"
          title="Closing the gap between"
          accent="classroom and industry."
          color="#4285F4"
        />

        <FadeIn delay={0.1} className="mt-8 max-w-3xl">
          <p className="text-lg leading-9 text-ink/70 md:text-xl md:leading-10">
            We&apos;re a student-run chapter of Google Developer Groups on campus. We pair{" "}
            <mark className="hl hl-blue">hands-on workshops</mark> with{" "}
            <mark className="hl hl-yellow">real projects</mark> and a community that&apos;s{" "}
            <mark className="hl hl-green">open to every degree and every level</mark>. So
            learning to build feels like something you do with friends, not homework.
          </p>
        </FadeIn>

        {/* Mission / Vision / Values */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:mt-20 md:grid-cols-[260px_1fr] md:gap-10">
          <div role="tablist" aria-label="Mission, vision and values" className="flex gap-2 md:flex-col md:gap-1">
            {TABS.map((t, i) => {
              const on = t.id === tab;
              return (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setTab(t.id)}
                  className={`group relative flex min-w-0 flex-1 items-center gap-3 rounded-2xl px-3 py-3 text-left transition sm:px-4 md:flex-none md:py-4 ${
                    on ? "bg-ink text-white" : "text-ink/45 hover:bg-ink/5 hover:text-ink"
                  }`}
                >
                  <span className="label-mono hidden text-[10px] opacity-60 sm:inline">0{i + 1}</span>
                  <span className="font-[family-name:var(--font-google)] text-lg font-semibold md:text-2xl">
                    {t.label}
                  </span>
                  <span
                    className={`ml-auto hidden h-2 w-2 rounded-full transition-transform md:block ${on ? "scale-100" : "scale-0"}`}
                    style={{ background: t.color }}
                  />
                </button>
              );
            })}
          </div>

          <div className="relative min-h-[300px] overflow-hidden rounded-[2rem] border border-ink/10 bg-white/60 p-7 md:p-12">
            <div
              aria-hidden="true"
              className="absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-25 blur-3xl transition-colors duration-500"
              style={{ background: active.color }}
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                role="tabpanel"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="relative"
              >
                {tab === "mission" && <Statement text={mission} />}
                {tab === "vision" && <Statement text={vision} />}
                {tab === "values" && (
                  <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
                    {values.map((v, i) => (
                      <div key={v.title}>
                        <p className="label-mono" style={{ color: v.color }}>0{i + 1}</p>
                        <h3 className="mt-2 text-xl font-semibold">{v.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-ink/60">{v.body}</p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Stats */}
        <dl className="mt-16 grid grid-cols-2 gap-y-10 border-t border-dashed border-ink/20 pt-10 md:mt-20 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="md:border-l md:border-dashed md:border-ink/20 md:pl-8 md:first:border-l-0 md:first:pl-0">
              <dt className="label-mono flex items-center gap-2 text-ink/50">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.color }} />
                {s.label}
              </dt>
              <dd className="mt-3 font-[family-name:var(--font-google)] text-5xl font-bold tracking-tight md:text-6xl">
                <Counter value={s.value} suffix={s.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}

function Statement({ text }: { text: string }) {
  return (
    <p className="font-[family-name:var(--font-google)] text-2xl font-medium leading-snug tracking-tight md:text-4xl md:leading-[1.2]">
      {text}
    </p>
  );
}
