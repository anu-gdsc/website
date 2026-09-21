"use client";

import { useEffect, useRef, useState } from "react";
import { DinoSprite, GOOGLE_COLORS } from "@/components/fx/dino";

const HEIGHT = 46;

/**
 * A mini dino that trots across the bottom of the screen every so often, in a
 * different Google colour each time, sometimes running left and sometimes right,
 * with a little hop halfway. Purely decorative and never blocks clicks.
 */
export default function RoamingDino() {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [color, setColor] = useState<string>(GOOGLE_COLORS[0]);
  const [flip, setFlip] = useState(false);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer: ReturnType<typeof setTimeout>;
    let lastColor = -1;
    let alive = true;

    const run = () => {
      if (!alive) return;
      const el = outer.current;
      const hop = inner.current;
      if (!el || !hop || document.hidden) {
        timer = setTimeout(run, 8000);
        return;
      }

      let idx = Math.floor(Math.random() * GOOGLE_COLORS.length);
      if (idx === lastColor) idx = (idx + 1) % GOOGLE_COLORS.length;
      lastColor = idx;
      const ltr = Math.random() < 0.5;
      const w = window.innerWidth;
      const duration = Math.max(5500, w * 6);

      setColor(GOOGLE_COLORS[idx]);
      setFlip(!ltr);
      setRunning(true);

      const travel = el.animate(
        [
          { transform: `translateX(${ltr ? -90 : w + 90}px)` },
          { transform: `translateX(${ltr ? w + 90 : -90}px)` },
        ],
        { duration, easing: "linear", fill: "forwards" },
      );
      // hop somewhere in the middle
      const at = 0.4 + Math.random() * 0.2;
      hop.animate(
        [
          { transform: "translateY(0)", offset: 0 },
          { transform: "translateY(0)", offset: at },
          { transform: "translateY(-38px)", offset: at + 0.025, easing: "ease-out" },
          { transform: "translateY(0)", offset: at + 0.05, easing: "ease-in" },
          { transform: "translateY(0)", offset: 1 },
        ],
        { duration, easing: "linear" },
      );

      travel.onfinish = () => {
        setRunning(false);
        el.style.transform = `translateX(${-200}px)`;
        timer = setTimeout(run, 22000 + Math.random() * 26000);
      };
    };

    timer = setTimeout(run, 7000);
    return () => {
      alive = false;
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed bottom-1 left-0 z-[45] h-[52px] w-[60px] overflow-visible"
    >
      <div ref={outer} className="absolute bottom-0 left-0" style={{ transform: "translateX(-200px)" }}>
        <div ref={inner}>
          <div className={`dino-scene ${running ? "running" : ""} ${flip ? "-scale-x-100" : ""}`}>
            <DinoSprite color={color} height={HEIGHT} running={running} />
          </div>
        </div>
      </div>
    </div>
  );
}
