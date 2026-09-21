"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Container from "@/components/ui/container";
import SectionHead from "@/components/ui/section-head";
import {
  BODY, BOUNDS, EYE, GOOGLE_COLORS, LEG_L, LEG_LIFT, LEG_R, OFFSET, type Rect,
} from "@/components/fx/dino";

const HEIGHT = 190;
const GROUND = 158;
const SCALE = 0.15; // sprite units to pixels
const DINO_X = 56;
const DINO_W = BOUNDS.w * SCALE;
const DINO_H = BOUNDS.h * SCALE;
const GRAVITY = 2700;
const JUMP_V = 860;
const HI_KEY = "gdg-dino-hi";

type Phase = "idle" | "playing" | "over";
type Cactus = { x: number; h: number; count: number };

const CACTUS_W = 24;
const CACTUS_GAP = 6;

function readHi(): number {
  try { return Number(localStorage.getItem(HI_KEY)) || 0; } catch { return 0; }
}

const pad = (n: number) => String(Math.floor(n)).padStart(5, "0");

/**
 * Chrome-dino style runner in the club's colours. Space, arrow up, click or tap
 * to jump. The dino changes Google colour every 100 points.
 */
export default function DinoPlay() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scoreRef = useRef<HTMLSpanElement>(null);
  const hiRef = useRef<HTMLSpanElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const jump = useRef<() => void>(() => {});

  const game = useRef({
    phase: "idle" as Phase,
    y: 0, // height above the ground
    vy: 0,
    dist: 0,
    speed: 0,
    cacti: [] as Cactus[],
    nextGap: 0,
    hi: 0,
    inView: false,
    t: 0,
    raf: 0,
    w: 600,
  });

  const setGamePhase = useCallback((p: Phase) => {
    game.current.phase = p;
    setPhase(p);
  }, []);

  useEffect(() => {
    const g = game.current;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const wrap = wrapRef.current!;
    let dpr = 1;

    g.hi = readHi();
    if (hiRef.current) hiRef.current.textContent = pad(g.hi / 1);

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      g.w = wrap.clientWidth;
      canvas.width = g.w * dpr;
      canvas.height = HEIGHT * dpr;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const reset = () => {
      g.y = 0; g.vy = 0; g.dist = 0; g.speed = 340;
      g.cacti = [];
      g.nextGap = g.w * 0.8;
    };
    reset();

    const rects = (list: readonly Rect[], dy = 0) => {
      for (const r of list) ctx.fillRect(r[0] + OFFSET.x, r[1] + OFFSET.y + dy, r[2], r[3]);
    };

    const drawDino = (color: string, running: boolean, frame: number) => {
      const top = GROUND - g.y - DINO_H;
      ctx.save();
      ctx.translate(DINO_X, top);
      ctx.scale(SCALE, SCALE);
      ctx.translate(-BOUNDS.x, -BOUNDS.y);
      ctx.fillStyle = color;
      rects(BODY);
      const airborne = g.y > 1;
      const stepL = running && !airborne && frame % 2 === 0;
      const stepR = running && !airborne && frame % 2 === 1;
      rects(LEG_L, stepL ? -LEG_LIFT : 0);
      rects(LEG_R, stepR ? -LEG_LIFT : 0);
      ctx.fillStyle = "#0b0b0d";
      ctx.fillRect(EYE[0] + OFFSET.x, EYE[1] + OFFSET.y, EYE[2], EYE[3]);
      ctx.restore();
    };

    const drawCactus = (c: Cactus) => {
      ctx.fillStyle = "rgba(255,255,255,0.78)";
      for (let i = 0; i < c.count; i++) {
        const x = c.x + i * (CACTUS_W + CACTUS_GAP);
        const top = GROUND - c.h;
        ctx.fillRect(x + 8, top, 9, c.h); // trunk
        ctx.fillRect(x, top + c.h * 0.42, 9, 5); // left arm
        ctx.fillRect(x, top + c.h * 0.42 - 12, 5, 17);
        ctx.fillRect(x + 16, top + c.h * 0.24, 8, 5); // right arm
        ctx.fillRect(x + 19, top + c.h * 0.24 - 12, 5, 17);
      }
    };

    const hit = () => {
      const dx = DINO_X + 10, dw = DINO_W - 22;
      const dTop = GROUND - g.y - DINO_H + 8, dBottom = GROUND - g.y - 6;
      return g.cacti.some((c) => {
        const cw = c.count * CACTUS_W + (c.count - 1) * CACTUS_GAP;
        return dx < c.x + cw - 3 && dx + dw > c.x + 3 && dBottom > GROUND - c.h + 3 && dTop < GROUND;
      });
    };

    const frame = (now: number) => {
      const dt = Math.min(0.034, (now - g.t) / 1000 || 0.016);
      g.t = now;
      const playing = g.phase === "playing";

      if (playing) {
        g.dist += g.speed * dt;
        g.speed = Math.min(760, g.speed + dt * 9);
        // physics
        g.vy -= GRAVITY * dt;
        g.y = Math.max(0, g.y + g.vy * dt);
        if (g.y === 0) g.vy = 0;
        // obstacles
        for (const c of g.cacti) c.x -= g.speed * dt;
        g.cacti = g.cacti.filter((c) => c.x > -120);
        g.nextGap -= g.speed * dt;
        if (g.nextGap <= 0) {
          g.cacti.push({ x: g.w + 20, h: 34 + Math.random() * 22, count: 1 + Math.floor(Math.random() * 3 * (Math.random() < 0.55 ? 0 : 1)) });
          g.nextGap = g.speed * (0.75 + Math.random() * 0.75) + 160;
        }
        if (hit()) {
          const score = g.dist / 12;
          if (score > g.hi) {
            g.hi = score;
            try { localStorage.setItem(HI_KEY, String(Math.floor(score))); } catch { /* storage blocked */ }
            if (hiRef.current) hiRef.current.textContent = pad(g.hi);
          }
          setGamePhase("over");
        }
      }

      const score = g.dist / 12;
      if (scoreRef.current) scoreRef.current.textContent = pad(score);
      const color = GOOGLE_COLORS[Math.floor(score / 100) % 4];
      const stride = Math.floor(g.dist / 34);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, g.w, HEIGHT);

      // ground with scrolling dashes
      ctx.fillStyle = "rgba(255,255,255,0.22)";
      ctx.fillRect(0, GROUND + 1, g.w, 2);
      const off = g.dist % 44;
      ctx.fillStyle = "rgba(255,255,255,0.35)";
      for (let x = -off; x < g.w; x += 44) ctx.fillRect(x, GROUND + 9, 16, 2);
      for (let x = -off * 0.6 + 22; x < g.w; x += 88) ctx.fillRect(x, GROUND + 17, 8, 2);

      g.cacti.forEach(drawCactus);
      drawDino(color, g.phase === "playing", stride);

      g.raf = g.inView ? requestAnimationFrame(frame) : 0;
    };

    const start = () => { g.t = performance.now(); if (!g.raf) g.raf = requestAnimationFrame(frame); };

    jump.current = () => {
      if (g.phase === "idle" || g.phase === "over") {
        reset();
        setGamePhase("playing");
        g.vy = JUMP_V;
        start();
        return;
      }
      if (g.y === 0) g.vy = JUMP_V;
    };

    const onKey = (e: KeyboardEvent) => {
      if (!g.inView) return;
      if (e.code !== "Space" && e.code !== "ArrowUp") return;
      const el = e.target as HTMLElement | null;
      if (el && /^(INPUT|TEXTAREA|SELECT|BUTTON|A)$/.test(el.tagName)) return;
      e.preventDefault();
      jump.current();
    };
    window.addEventListener("keydown", onKey);

    const io = new IntersectionObserver(([entry]) => {
      g.inView = entry.intersectionRatio > 0.45;
      if (g.inView) start();
    }, { threshold: [0, 0.45, 1] });
    io.observe(wrap);

    // draw the idle scene once
    start();

    return () => {
      cancelAnimationFrame(g.raf);
      g.raf = 0;
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("keydown", onKey);
    };
  }, [setGamePhase]);

  return (
    <section id="play" className="relative scroll-mt-20 overflow-hidden bg-ink py-24 md:py-32">
      <Container>
        <SectionHead
          index="08"
          eyebrow="Take a break"
          title="Built by developers,"
          accent="so yes, there's a game."
          description="Space, arrow up, or tap to jump. The dino changes colour every 100 points. Can you beat your best?"
          color="#34A853"
        />

        <div
          ref={wrapRef}
          onPointerDown={() => jump.current()}
          className="relative mt-12 select-none overflow-hidden rounded-[2rem] border border-white/10 bg-ink-2"
          style={{ height: HEIGHT, touchAction: "manipulation", cursor: "pointer" }}
          role="application"
          aria-label="Dino runner game. Press space or tap to jump."
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_120%,rgba(66,133,244,0.14),transparent)]"
          />
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

          <div className="label-mono pointer-events-none absolute right-5 top-4 flex gap-5 text-[11px] text-white/60">
            <span>HI <span ref={hiRef} className="text-white/85">00000</span></span>
            <span><span ref={scoreRef} className="text-white">00000</span></span>
          </div>

          {phase !== "playing" && (
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2 pb-10 text-center">
              <p className="text-xl font-semibold md:text-2xl">
                {phase === "over" ? "Game over" : "Ready?"}
              </p>
              <p className="label-mono text-[11px] text-white/55">
                {phase === "over" ? "Tap or press space to try again" : "Tap or press space to start"}
              </p>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
