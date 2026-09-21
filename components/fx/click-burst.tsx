"use client";

import { useEffect, useRef } from "react";

const COLORS = ["#4285F4", "#EA4335", "#FBBC05", "#34A853"];
const GLYPHS = ["<", ">", "/", "{", "}", ";", "0", "1", "()", "=>"];

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  size: number;
  rot: number;
  vr: number;
  color: string;
  glyph: string | null;
};

type Ring = { x: number; y: number; life: number; color: string };

/**
 * Global click effect: every press throws a burst of code glyphs and squares in
 * Google colours plus a soft shockwave ring. One fixed canvas, and the render
 * loop only runs while something is alive.
 */
export default function ClickBurst() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const particles: Particle[] = [];
    const rings: Ring[] = [];
    let raf = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };
    resize();
    window.addEventListener("resize", resize);

    const frame = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(dpr, dpr);

      for (let i = rings.length - 1; i >= 0; i--) {
        const r = rings[i];
        r.life += 1;
        const t = r.life / 26;
        if (t >= 1) { rings.splice(i, 1); continue; }
        ctx.globalAlpha = (1 - t) * 0.55;
        ctx.strokeStyle = r.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(r.x, r.y, 6 + t * 46, 0, Math.PI * 2);
        ctx.stroke();
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life += 1;
        if (p.life >= p.max) { particles.splice(i, 1); continue; }
        p.vy += 0.16; // gravity
        p.vx *= 0.985;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;

        const t = p.life / p.max;
        ctx.globalAlpha = t > 0.6 ? 1 - (t - 0.6) / 0.4 : 1;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        if (p.glyph) {
          ctx.font = `600 ${p.size * 2.2}px ui-monospace, monospace`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(p.glyph, 0, 0);
        } else {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        }
        ctx.restore();
      }

      ctx.globalAlpha = 1;
      if (particles.length || rings.length) {
        raf = requestAnimationFrame(frame);
      } else {
        raf = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    const burst = (e: PointerEvent) => {
      const count = 16;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
        const speed = 3 + Math.random() * 5;
        particles.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 2,
          life: 0,
          max: 34 + Math.random() * 26,
          size: 5 + Math.random() * 5,
          rot: Math.random() * Math.PI,
          vr: (Math.random() - 0.5) * 0.3,
          color: COLORS[i % COLORS.length],
          glyph: Math.random() < 0.55 ? GLYPHS[Math.floor(Math.random() * GLYPHS.length)] : null,
        });
      }
      rings.push({ x: e.clientX, y: e.clientY, life: 0, color: COLORS[Math.floor(Math.random() * 4)] });
      if (!raf) raf = requestAnimationFrame(frame);
    };

    window.addEventListener("pointerdown", burst, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", burst);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[90] h-full w-full"
    />
  );
}
