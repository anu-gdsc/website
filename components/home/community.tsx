"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Instagram, Users } from "lucide-react";
import Container from "@/components/ui/container";
import SectionHead from "@/components/ui/section-head";
import { FadeIn } from "@/components/motion/fade-in";
import { GDG_COMMUNITY_URL, INSTAGRAM_URL } from "@/data/site";

// TODO(content): replace `image` with real photos (drop files in /public/community and set the path).
const MOMENTS = [
  { label: "Workshops", glyph: "</>", color: "#4285F4", rotate: -5, image: null as string | null },
  { label: "Tech talks", glyph: "{ }", color: "#EA4335", rotate: 3, image: null as string | null },
  { label: "Socials", glyph: ":)", color: "#FBBC05", rotate: -2, image: null as string | null },
];

const LINKS = [
  { name: "Instagram", handle: "@gdg_anu", href: INSTAGRAM_URL, icon: Instagram, color: "#EA4335" },
  { name: "GDG Community", handle: "Events & RSVPs", href: GDG_COMMUNITY_URL, icon: Users, color: "#4285F4" },
];

export default function Community() {
  return (
    <section id="community" className="relative scroll-mt-20 overflow-hidden bg-ink-2 py-24 md:py-32">
      <Container>
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1fr_1.05fr]">
          <div>
            <SectionHead
              index="04"
              eyebrow="Our community"
              title="A room full of people"
              accent="who ship."
              description="Study sessions, first pull requests, dinner after the talks. The best part of GDG ANU is who you'll meet."
              color="#FBBC05"
            />

            <FadeIn delay={0.15} className="mt-10 grid gap-3 sm:grid-cols-2">
              {LINKS.map(({ name, handle, href, icon: Icon, color }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/25 hover:bg-white/[0.06]"
                >
                  <span
                    aria-hidden="true"
                    className="absolute -right-6 -top-6 h-20 w-20 rounded-full opacity-0 blur-2xl transition group-hover:opacity-50"
                    style={{ background: color }}
                  />
                  <div className="relative flex items-start justify-between">
                    <Icon className="h-6 w-6" style={{ color }} />
                    <ArrowUpRight className="h-4 w-4 text-white/30 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                  </div>
                  <p className="relative mt-6 text-lg font-semibold">{name}</p>
                  <p className="label-mono relative mt-1 text-[10px] text-white/45">{handle}</p>
                </a>
              ))}
            </FadeIn>

            <p className="label-mono mt-8 text-[11px] text-white/30">
              Psst, click anywhere on this page ✦
            </p>
          </div>

          {/* Tilted photo stack */}
          <div className="relative mx-auto grid w-full max-w-xl grid-cols-2 gap-4 sm:gap-6">
            {MOMENTS.map((m, i) => (
              <motion.figure
                key={m.label}
                initial={{ opacity: 0, y: 40, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: m.rotate }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ rotate: 0, scale: 1.04, zIndex: 10, transition: { duration: 0.25 } }}
                className={`relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-ink shadow-2xl ${
                  i === 0 ? "col-span-2 aspect-[16/10]" : "aspect-square"
                }`}
              >
                {m.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={m.image} alt={m.label} loading="lazy" className="h-full w-full object-cover" />
                ) : (
                  <div
                    className="flex h-full w-full items-center justify-center"
                    style={{ background: `radial-gradient(90% 90% at 30% 20%, ${m.color}, ${m.color}22 60%, #0b0b0d)` }}
                  >
                    <span className="font-[family-name:var(--font-google-code)] text-6xl font-medium text-white/90 sm:text-7xl">
                      {m.glyph}
                    </span>
                  </div>
                )}
                <figcaption className="label-mono absolute bottom-3 left-3 rounded-full bg-ink/75 px-3 py-1.5 text-[10px] backdrop-blur">
                  {m.label}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
