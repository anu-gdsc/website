"use client";
import { motion, type TargetAndTransition } from "framer-motion";

type Direction = "up" | "down" | "left" | "right" | "none";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const dirMap: Record<Direction, TargetAndTransition> = {
  up:    { opacity: 0, y: 40 },
  down:  { opacity: 0, y: -40 },
  left:  { opacity: 0, x: 60 },
  right: { opacity: 0, x: -60 },
  none:  { opacity: 0 },
};

const visibleState: TargetAndTransition = { opacity: 1, y: 0, x: 0 };

export function FadeIn({
  children,
  delay = 0,
  duration = 0.65,
  direction = "up",
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: Direction;
  className?: string;
}) {
  return (
    <motion.div
      initial={dirMap[direction]}
      whileInView={visibleState}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
