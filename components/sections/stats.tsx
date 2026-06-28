"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Container from "@/components/ui/container";

const stats = [
  { value: "500+", label: "Expected Attendees" },
  { value: "15+",  label: "Speakers"           },
  { value: "8",    label: "Sessions & Workshops"},
  { value: "4",    label: "Core Tracks"         },
];

function useCountUp(target: number, inView: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();

    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [target, inView]);

  return count;
}

function StatCard({ stat, index }: { stat: { value: string; label: string }; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const numStr = stat.value.match(/\d+/)?.[0] ?? "0";
  const suffix = stat.value.replace(/\d+/, "");
  const count = useCountUp(parseInt(numStr, 10), inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="rounded-3xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-white/20"
    >
      <p className="text-3xl font-bold md:text-4xl">
        {count}
        {suffix}
      </p>
      <p className="mt-2 text-sm text-white/60">{stat.label}</p>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section className="border-b border-white/10 bg-zinc-950">
      <Container>
        <div className="grid gap-6 py-14 sm:grid-cols-2 md:grid-cols-4">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
