"use client";
import { motion } from "framer-motion";
import Container from "@/components/ui/container";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export default function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="border-b border-white/10 bg-black pt-32 pb-16 md:pt-40 md:pb-24">
      <Container>
        <div className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
            className="text-sm font-semibold uppercase tracking-[0.22em] text-white/55"
          >
            {eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.22, ease: EASE }}
            className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.38, ease: EASE }}
            className="mt-6 max-w-2xl text-base leading-7 text-white/70 md:text-lg"
          >
            {description}
          </motion.p>
        </div>
      </Container>
    </section>
  );
}
