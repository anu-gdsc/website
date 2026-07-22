"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const GDG_COLORS = ["#4285F4", "#34A853", "#FBBC05", "#EA4335"];

// 4 domains evenly spread — no #BuildWithGoogle
const DOMAINS = [
  { label: "AI / ML",      color: "#4285F4", pct: 0.12 },
  { label: "Cloud Native", color: "#34A853", pct: 0.36 },
  { label: "Open Source",  color: "#FBBC05", pct: 0.60 },
  { label: "Web Dev",      color: "#EA4335", pct: 0.82 },
];

const START_DELAY_MS = 1800;
// How many px either side of the label centre the box stays lit
const ACTIVE_RADIUS = 72;

// ── Pixel-art T-Rex (rawsvg.com) ─────────────────────────────────────
// All black fills → currentColor so parent colour prop drives the tint.
// Eye stays white. Leg groups isolated for the 2-frame walk cycle.
function DinoSvg({ color, running }: { color: string; running: boolean }) {
  const cls = running ? "running" : "";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="45 18 285 350"
      height={105}
      width={86}
      style={{ color, display: "block", transition: "color 0.3s ease" }}
      aria-hidden
    >
      <g transform="translate(1.0040112,4.0223398)">
        {/* HEAD & NECK */}
        <rect fill="currentColor" x="173.42451" y="31.591932"  width="150.71416" height="78.453949" />
        <rect fill="currentColor" x="185.12379" y="23.591932"  width="127.31561" height="78.453949" />
        <rect fill="currentColor" x="173.42451" y="66.689751"  width="64.690094" height="78.453949" />
        <rect fill="currentColor" x="173.42451" y="129.31526"  width="112.86356" height="15.828429" />
        <rect fill="white"        x="199.83414" y="44.119633"  width="15"        height="15"        />

        {/* NECK / UPPER BODY / ARM */}
        <rect fill="currentColor" x="173.42451" y="66.689751"  width="50.926243" height="158.97247" />
        <rect fill="currentColor" x="173.42451" y="181.31526"  width="81.894897" height="15.828429" />
        <rect fill="currentColor" x="242.93195" y="181.61789"  width="12.387465" height="28.904087" />

        {/* BODY / HIP */}
        <rect fill="currentColor" x="161.42451" y="154.09019"  width="50.926243" height="100.4761"  />
        <rect fill="currentColor" x="137.42451" y="168.09019"  width="59.872746" height="100.4761"  />
        <rect fill="currentColor" x="117.42451" y="182.09019"  width="50.926243" height="100.4761"  />

        {/* TAIL */}
        <rect fill="currentColor" x="100.78254" y="196.09019"  width="27.568213" height="87.82383"  />
        <rect fill="currentColor" x="84.675545" y="196.09019"  width="23.675207" height="74.198311" />
        <rect fill="currentColor" x="72.670792" y="182.06775"  width="19.679958" height="72.220764" />
        <rect fill="currentColor" x="58.670792" y="168.06775"  width="19.679958" height="72.220764" />
        <rect fill="currentColor" x="48.853306" y="154.06775"  width="11.497448" height="72.220764" />

        {/* LEFT LEG */}
        <g className={`dino-leg-l ${cls}`}>
          <rect fill="currentColor" x="120.78254" y="196.09019" width="27.568213" height="100.4761"  />
          <rect fill="currentColor" x="117.68283" y="196.09019" width="10.322884" height="119.74549" />
          <rect fill="currentColor" x="117.68283" y="305.51282" width="28.215889" height="10.322882" />
        </g>

        {/* RIGHT LEG */}
        <g className={`dino-leg-r ${cls}`}>
          <rect fill="currentColor" x="161.42451" y="196.09019" width="18.581194" height="100.4761"  />
          <rect fill="currentColor" x="169.68283" y="196.09019" width="10.322884" height="147.27319" />
          <rect fill="currentColor" x="169.68283" y="333.0405"  width="28.215889" height="10.322882" />
        </g>
      </g>
    </svg>
  );
}

// ── DinoRunner ────────────────────────────────────────────────────────
export default function DinoRunner() {
  const [colorIdx,    setColorIdx]    = useState(0);
  const [activeDomain, setActiveDomain] = useState<number | null>(null);
  const [running,     setRunning]     = useState(false);

  const sceneRef = useRef<HTMLDivElement>(null);
  const dinoRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;

    // Per-lap tracking sets — reset when the dino wraps around
    const approached = new Set<number>();
    const passed     = new Set<number>();
    let prevCenter   = -Infinity;

    const tick = () => {
      const dino  = dinoRef.current;
      const scene = sceneRef.current;

      if (dino && scene) {
        const dr = dino.getBoundingClientRect();
        const sr = scene.getBoundingClientRect();

        // Centre of the dino in scene-local coordinates
        const dinoCenter = dr.left - sr.left + dr.width / 2;

        // ── Lap reset: dino jumped from right back to left ──
        if (dinoCenter < prevCenter - 60) {
          approached.clear();
          passed.clear();
          setColorIdx(0);
          setActiveDomain(null);
        }
        prevCenter = dinoCenter;

        DOMAINS.forEach((d, i) => {
          const labelX = d.pct * sr.width;

          // Dino entering the active window → light up box + colour dino
          if (!approached.has(i) && dinoCenter >= labelX - ACTIVE_RADIUS) {
            approached.add(i);
            setColorIdx(i % GDG_COLORS.length);
            setActiveDomain(i);
          }

          // Dino leaving the active window → dim box, dino keeps colour
          if (!passed.has(i) && dinoCenter >= labelX + ACTIVE_RADIUS) {
            passed.add(i);
            setActiveDomain((p) => (p === i ? null : p));
          }
        });
      }

      rafId = requestAnimationFrame(tick);
    };

    const startDelay = setTimeout(() => {
      setRunning(true);
      rafId = requestAnimationFrame(tick);
    }, START_DELAY_MS);

    return () => {
      clearTimeout(startDelay);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const dinoColor = GDG_COLORS[colorIdx];
  const runCls    = running ? "running" : "";

  return (
    <motion.div
      ref={sceneRef}
      className={`dino-scene relative w-full overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-b from-white/[0.025] to-transparent ${runCls}`}
      style={{ height: 320 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4, duration: 0.7, ease: "easeOut" }}
    >
      {/* ── Pixel clouds (decorative) ────────────────── */}
      <div className="pointer-events-none absolute top-6 left-[10%] opacity-[0.06]">
        <div className="h-3 w-20 rounded-full bg-white" />
        <div className="mt-1 ml-3 h-2 w-14 rounded-full bg-white" />
      </div>
      <div className="pointer-events-none absolute top-3 left-[44%] opacity-[0.05]">
        <div className="h-3 w-14 rounded-full bg-white" />
        <div className="mt-1 ml-1 h-2 w-9 rounded-full bg-white" />
      </div>
      <div className="pointer-events-none absolute top-7 left-[70%] opacity-[0.05]">
        <div className="h-3 w-16 rounded-full bg-white" />
        <div className="mt-1 ml-2 h-2 w-10 rounded-full bg-white" />
      </div>

      {/* ── Domain labels — span from sky to just above ground ── */}
      {DOMAINS.map((d, i) => {
        const isActive = activeDomain === i;
        return (
          <div
            key={d.label}
            className="pointer-events-none absolute flex flex-col items-center"
            style={{
              left:      `${d.pct * 100}%`,
              top:       14,
              bottom:    44,
              transform: "translateX(-50%)",
            }}
          >
            {/* Label pill */}
            <span
              className="whitespace-nowrap rounded border px-2 py-0.5 text-[10px] font-medium"
              style={{
                borderColor: isActive ? d.color : "rgba(255,255,255,0.10)",
                color:       isActive ? d.color : "rgba(255,255,255,0.28)",
                background:  isActive ? `${d.color}18` : "rgba(0,0,0,0.28)",
                boxShadow:   isActive ? `0 0 20px ${d.color}55, 0 0 6px ${d.color}30` : "none",
                transition:  "all 0.2s ease",
              }}
            >
              {d.label}
            </span>

            {/* Connector line — grows to fill remaining height */}
            <div
              className="flex-1"
              style={{
                width:      1,
                background: isActive
                  ? `linear-gradient(to bottom, ${d.color}70, ${d.color}08)`
                  : "linear-gradient(to bottom, rgba(255,255,255,0.07), transparent)",
                transition: "background 0.2s ease",
              }}
            />
          </div>
        );
      })}

      {/* ── Scrolling ground ─────────────────────────── */}
      <div
        className={`dino-ground absolute ${runCls}`}
        style={{ bottom: 44 }}
      />

      {/* Sub-ground tint */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0"
        style={{ height: 44, background: "linear-gradient(to bottom, rgba(255,255,255,0.012), transparent)" }}
      />

      {/* ── Dino ─────────────────────────────────────── */}
      <div ref={dinoRef} className={`dino-run-wrap ${runCls}`}>
        <div className={`dino-bob ${runCls}`}>
          <div
            style={{
              filter:     `drop-shadow(0 0 12px ${dinoColor}90)`,
              transition: "filter 0.2s ease",
            }}
          >
            <DinoSvg color={dinoColor} running={running} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
