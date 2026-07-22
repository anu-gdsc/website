"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/container";
import SectionTitle from "@/components/ui/section-title";

const expects = [
  "Hands-on workshops across modern developer tools",
  "Sessions on AI, cloud, web engineering, and product",
  "Networking with peers, mentors, and community builders",
  "Opportunities to explore projects and collaborations",
];

const dotColors = ["#4285F4", "#EA4335", "#FBBC05", "#34A853"];

const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

export default function About() {
  return (
    <section id="about" className="border-b border-white/10 bg-black py-20 md:py-28">
      <Container>
        <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease }}
          >
            <SectionTitle
              eyebrow="About"
              title="A student-led developer event designed for builders."
              description="GDG ANU brings together students, developers, designers, and builders for a day of ideas, practical learning, and community. Expect engaging talks, technical workshops, product thinking, and real conversations with peers and industry speakers."
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="rounded-3xl border border-white/10 bg-white/5 p-8"
          >
            <h3 className="text-xl font-semibold">What to expect</h3>
            <ul className="mt-6 space-y-4">
              {expects.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.35 + i * 0.08, ease }}
                  className="flex items-start gap-3 text-white/70"
                >
                  <span
                    className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: dotColors[i] }}
                  />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
