"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/container";
import SectionHead from "@/components/ui/section-head";
import { FadeIn } from "@/components/motion/fade-in";
import { projects, type Project } from "@/data/projects";

export default function Projects() {
  return (
    <section id="projects" data-nav-tone="light" className="relative scroll-mt-20 bg-paper py-24 text-ink md:py-32">
      <Container>
        <SectionHead
          tone="light"
          index="03"
          eyebrow="Projects"
          title="What we're"
          accent="building."
          description="Real products built by our members. Join a project and put something on your CV that you can actually show."
          color="#34A853"
        />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {projects.map((p, i) => (
            <FadeIn key={p.name} delay={i * 0.1}>
              <ProjectCard project={p} index={i} />
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}

/** Card with a subtle 3D tilt that follows the cursor (mouse only). */
function ProjectCard({ project: p, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useSpring(useMotionValue(0), { stiffness: 160, damping: 16 });
  const my = useSpring(useMotionValue(0), { stiffness: 160, damping: 16 });
  const rotateY = useTransform(mx, [-0.5, 0.5], [-7, 7]);
  const rotateX = useTransform(my, [-0.5, 0.5], [6, -6]);

  const move = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const r = ref.current!.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const leave = () => { mx.set(0); my.set(0); };

  const inner = (
    <motion.div
      ref={ref}
      onPointerMove={move}
      onPointerLeave={leave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-ink/10 bg-ink text-white shadow-[0_20px_50px_-25px_rgba(11,11,13,0.55)]"
    >
      {/* window */}
      <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10">
        <div className="absolute inset-x-0 top-0 z-10 flex items-center gap-1.5 bg-ink-2/90 px-4 py-2.5 backdrop-blur">
          <span className="h-2.5 w-2.5 rounded-full bg-gred" />
          <span className="h-2.5 w-2.5 rounded-full bg-gyellow" />
          <span className="h-2.5 w-2.5 rounded-full bg-ggreen" />
          <span className="label-mono ml-3 flex-1 truncate rounded-md bg-white/[0.06] px-2.5 py-1 text-[9px] text-white/40">
            {p.href ? p.href.replace(/^https?:\/\//, "") : "in development"}
          </span>
        </div>

        {p.image ? (
          <Image src={p.image} alt={`${p.name} screenshot`} fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover object-top" />
        ) : (
          <Art kind={p.art} color={p.color} />
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="label-mono text-[10px] text-white/35">0{index + 1}</span>
          <span
            className="label-mono flex items-center gap-1.5 rounded-full border border-white/10 px-2.5 py-1 text-[10px] text-white/70"
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: p.color }} />
            {p.status}
          </span>
        </div>
        <h3 className="mt-5 flex items-center gap-2 text-2xl font-semibold leading-tight">
          {p.name}
          {p.href && <ArrowUpRight className="h-5 w-5 text-white/40 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />}
        </h3>
        <p className="mt-2 text-sm leading-6 text-white/55">{p.blurb}</p>
        <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-6">
          {p.href && (
            <span className="label-mono mr-1 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[10px] font-medium text-ink">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ggreen opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ggreen" />
              </span>
              Try it
            </span>
          )}
          {p.tags.map((t, i) => (
            <span key={`${t}-${i}`} className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-white/65">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );

  if (!p.href) return <div className="h-full">{inner}</div>;
  return /^https?:/.test(p.href) ? (
    <a href={p.href} target="_blank" rel="noopener noreferrer" className="block h-full">{inner}</a>
  ) : (
    <Link href={p.href} className="block h-full">{inner}</Link>
  );
}

/** Generated mock-ups so cards look real until a screenshot exists. */
function Art({ kind, color }: { kind: Project["art"]; color: string }) {
  const bar = (w: string, o = 0.14) => <div className="h-2 rounded-full" style={{ width: w, background: `rgba(255,255,255,${o})` }} />;
  return (
    <div className="absolute inset-0 pt-10" style={{ background: `radial-gradient(90% 90% at 20% 0%, ${color}55, transparent 70%), #0b0b0d` }}>
      {kind === "map" && (
        <svg viewBox="0 0 320 190" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          {/* blocks and roads */}
          {[[20, 20, 90, 50], [130, 14, 70, 64], [222, 24, 80, 44], [20, 96, 60, 70], [104, 100, 96, 56], [226, 92, 76, 74]].map(([x, y, w, h], i) => (
            <rect key={i} x={x} y={y} width={w} height={h} rx="8" fill="rgba(255,255,255,0.06)" />
          ))}
          {/* route */}
          <path d="M34 168 C 84 160, 96 116, 150 118 S 236 80, 268 40" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeDasharray="1 9" />
          <circle cx="34" cy="168" r="6" fill="#fff" />
          {/* destination pin with the universal access figure */}
          <g transform="translate(268 40)">
            <circle r="17" fill={color} />
            <circle r="17" fill="none" stroke={color} strokeOpacity="0.35" strokeWidth="8" />
            <g stroke="#fff" strokeWidth="1.9" strokeLinecap="round" fill="none">
              <circle cx="0" cy="-8" r="2.2" fill="#fff" stroke="none" />
              <path d="M-6 -3.5 H6 M0 -3.5 V3 M0 3 L-4 9 M0 3 L4 9" />
            </g>
          </g>
        </svg>
      )}
      {kind === "vision" && (
        <svg viewBox="0 0 320 190" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          {/* viewfinder */}
          <g stroke="rgba(255,255,255,0.55)" strokeWidth="3" strokeLinecap="round" fill="none">
            <path d="M40 46 V28 H58" /><path d="M280 46 V28 H262" />
            <path d="M40 150 V168 H58" /><path d="M280 150 V168 H262" />
          </g>
          {/* hand landmarks */}
          <g stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.9">
            <path d="M160 160 L135 140 L118 125 L105 108" />
            <path d="M160 160 L145 110 L142 85 L140 64" />
            <path d="M160 160 L160 105 L160 78 L160 54" />
            <path d="M160 160 L175 110 L178 85 L180 64" />
            <path d="M160 160 L188 122 L196 102 L202 86" />
            <path d="M135 140 L145 110 L160 105 L175 110 L188 122" />
          </g>
          {[[160, 160], [135, 140], [118, 125], [105, 108], [145, 110], [142, 85], [140, 64], [160, 105], [160, 78], [160, 54], [175, 110], [178, 85], [180, 64], [188, 122], [196, 102], [202, 86]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="4" fill="#fff" />
          ))}
        </svg>
      )}
      {kind === "chat" && (
        <div className="space-y-2.5 px-6 pt-4">
          <div className="ml-auto w-[55%] rounded-2xl rounded-br-md bg-white/10 px-3 py-2">{bar("100%", 0.3)}</div>
          <div className="w-[70%] rounded-2xl rounded-bl-md px-3 py-2.5" style={{ background: `${color}55` }}>
            <div className="space-y-1.5">{bar("100%", 0.4)}{bar("75%", 0.3)}</div>
          </div>
          <div className="mt-2 h-8 rounded-full border border-white/15 bg-white/[0.04]" />
        </div>
      )}
    </div>
  );
}
