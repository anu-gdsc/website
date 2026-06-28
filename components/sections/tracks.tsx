"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/container";
import SectionTitle from "@/components/ui/section-title";

type Track = { title: string; desc: string };

const trackAccents = ["#4285F4", "#EA4335", "#FBBC05", "#34A853"];

const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease },
  }),
};

export default function Tracks({ tracks }: { tracks: Track[] }) {
  return (
    <section id="projects" className="border-b border-white/10 bg-zinc-950 py-20 md:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
        >
          <SectionTitle
            eyebrow="Projects"
            title="What you will build"
            description="Hands-on project tracks where students and members collaborate to build real things together."
          />
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {tracks.map((track, i) => (
            <motion.div
              key={track.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              whileHover={{
                y: -6,
                borderColor: "rgba(255,255,255,0.22)",
                transition: { duration: 0.2 },
              }}
              className="rounded-3xl border border-white/10 bg-black p-6"
            >
              <div
                className="mb-5 h-2 w-14 rounded-full"
                style={{ background: trackAccents[i % trackAccents.length] }}
              />
              <h3 className="text-xl font-semibold">{track.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/65">{track.desc}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
