"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Container from "@/components/ui/container";
import DinoRunner from "@/components/hero/dino-runner";

// ── Constants ───────────────────────────────────────────────────────
const SCRAMBLE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$!?<>/\\|{}[]~^&*";

const HEADLINE = [
  { word: "Build,",      delay: 0.25 },
  { word: "learn,",      delay: 0.50 },
  { word: "and",         delay: 0.70 },
  { word: "connect",     delay: 0.85 },
  { word: "with",        delay: 1.05 },
  { word: "the",         delay: 1.15 },
  { word: "next",        delay: 1.25 },
  { word: "generation",  delay: 1.35 },
  { word: "of",          delay: 1.55 },
  { word: "developers.", delay: 1.65 },
];


const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

// ── ScrambleWord ─────────────────────────────────────────────────────
// Renders a word character by character. On mount (after `initialDelay`)
// and on hover, characters cycle through SCRAMBLE pool before resolving
// to the real letter — left-to-right.
type CharState = { ch: string; live: boolean };

function ScrambleWord({ word, initialDelay = 0 }: { word: string; initialDelay?: number }) {
  const blank = (): CharState[] =>
    word.split("").map(c => ({
      ch: c === " " ? " " : SCRAMBLE[Math.floor(Math.random() * SCRAMBLE.length)],
      live: c !== " ",
    }));

  const [chars, setChars] = useState<CharState[]>(blank);
  const [glowing, setGlowing] = useState(false);
  const rafRef = useRef(0);

  const run = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setGlowing(true);

    const target = word.split("");
    // More frames for longer words so the effect lasts proportionally
    const FRAMES = Math.max(22, target.length * 4 + 12);
    let f = 0;

    const tick = () => {
      f++;
      const resolved = Math.floor((f / FRAMES) * target.length);
      setChars(
        target.map((c, i) => {
          if (c === " ") return { ch: " ", live: false };
          if (i < resolved) return { ch: c, live: false };
          return { ch: SCRAMBLE[Math.floor(Math.random() * SCRAMBLE.length)], live: true };
        })
      );
      if (f < FRAMES) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setChars(target.map(c => ({ ch: c, live: false })));
        setGlowing(false);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [word]);

  useEffect(() => {
    const t = setTimeout(run, initialDelay * 1000);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(rafRef.current);
    };
  }, [initialDelay, run]);

  return (
    <motion.span
      // aria-label lets screen readers read the real word regardless of scramble state
      aria-label={word}
      className="relative mr-[0.22em] inline-block cursor-default select-none last:mr-0"
      style={{
        textShadow: glowing
          ? "0 0 18px rgba(74,222,128,0.55), 0 0 40px rgba(74,222,128,0.2)"
          : "none",
        transition: "text-shadow 0.15s ease",
      }}
      onHoverStart={run}
      whileHover={{ y: -4, transition: { duration: 0.12, ease: "easeOut" } }}
    >
      {/*
        Width anchor: opacity-0 keeps the real word's exact dimensions so
        the parent inline-block never resizes during scramble → no layout shift.
      */}
      <span className="whitespace-nowrap opacity-0 select-none" aria-hidden="true">
        {word}
      </span>

      {/*
        Scramble overlay: absolute-positioned over the anchor so it has no
        effect on layout whatsoever.
      */}
      <span
        className="pointer-events-none absolute inset-0 whitespace-nowrap"
        aria-hidden="true"
      >
        {chars.map((c, i) => (
          <span
            key={i}
            style={{
              display: "inline",
              color: c.live ? "#4ade80" : "white",
              transition: "color 0.06s",
            }}
          >
            {c.ch}
          </span>
        ))}
      </span>
    </motion.span>
  );
}

// ── Hero ─────────────────────────────────────────────────────────────
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [spotlight, setSpotlight] = useState({ x: -9999, y: -9999 });

  useEffect(() => {
    const rect = sectionRef.current?.getBoundingClientRect();
    const sT = rect?.top ?? 0;
    const sL = rect?.left ?? 0;

    const move = (e: MouseEvent) =>
      setSpotlight({ x: e.clientX - sL, y: e.clientY - sT });

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <section ref={sectionRef} className="relative border-b border-white/10 bg-black">

      {/* ── Background layers ──────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Colour washes */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(66,133,244,0.22),transparent_32%),radial-gradient(circle_at_top_right,rgba(234,67,53,0.18),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(52,168,83,0.18),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(251,188,5,0.16),transparent_30%)]" />
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle,rgba(255,255,255,0.4)_1px,transparent_1px)] [background-size:36px_36px]" />
      </div>

      {/* ── Cursor spotlight ───────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(480px circle at ${spotlight.x}px ${spotlight.y}px, rgba(66,133,244,0.09), transparent 70%)`,
        }}
      />


      <Container>
        <div className="relative z-[1] grid min-h-[90vh] items-center gap-14 py-24 md:grid-cols-2 md:py-32">

          {/* ── Left: text ─────────────────────────────────── */}
          <div>

            {/* Eyebrow — periodic glitch */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="glitch-flicker mb-5 text-sm font-semibold uppercase tracking-[0.22em] text-white/50"
            >
              Google Developer Student Club • ANU
            </motion.p>

            {/* H1 — character-scramble per word */}
            <h1 className="max-w-2xl text-5xl font-bold leading-[1.1] md:text-[4.2rem]">
              {HEADLINE.map(({ word, delay }) => (
                <ScrambleWord key={word} word={word} initialDelay={delay} />
              ))}
            </h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 2.0, ease: EASE }}
              className="mt-6 max-w-xl text-lg leading-8 text-white/65"
            >
              Join GDSC ANU for a flagship community event featuring talks,
              workshops, networking, and hands-on sessions across AI, cloud, web,
              and product innovation.
            </motion.p>

            {/* Meta */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.1, ease: EASE }}
              className="mt-7 flex flex-wrap items-center gap-3 text-sm text-white/50"
            >
              <span>Canberra, ACT</span>
              <span className="h-1 w-1 rounded-full bg-white/30" />
              <span>ANU Campus</span>
              <span className="h-1 w-1 rounded-full bg-white/30" />
              <span>October 2026</span>
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.2, ease: EASE }}
              className="mt-9 flex flex-wrap gap-4"
            >
              <motion.a
                href="https://campus.hellorubric.com/?s=9746"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-black"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                Register Now
              </motion.a>

              <motion.a
                href="#schedule"
                className="rounded-full border border-white/15 px-7 py-3 text-sm font-semibold text-white"
                whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.3)" }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                View Schedule
              </motion.a>
            </motion.div>
          </div>

          {/* ── Right: dino runner ─────────────────────────── */}
          <div className="hidden w-full items-center justify-center md:flex">
            <DinoRunner />
          </div>
        </div>
      </Container>

      {/* ── Scroll indicator ───────────────────────────────── */}
      <motion.div
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.0, duration: 0.6 }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="h-9 w-px bg-gradient-to-b from-white/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
