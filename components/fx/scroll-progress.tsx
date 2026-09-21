"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin Google-coloured reading progress bar pinned to the top of the viewport. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.3 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX, background: "linear-gradient(90deg,#4285F4 0%,#EA4335 35%,#FBBC05 68%,#34A853 100%)" }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] origin-left"
    />
  );
}
