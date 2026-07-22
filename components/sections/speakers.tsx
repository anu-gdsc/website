"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/ui/container";
import SectionTitle from "@/components/ui/section-title";

type Speaker = {
  name: string;
  role: string;
  company: string;
  topic: string;
  bio: string;
  category: string;
  color: "blue" | "green" | "yellow" | "red";
  image: string;
  linkedin?: string;
};

const colorStyles = {
  blue:   "bg-blue-500/50 shadow-[0_0_25px_rgba(59,130,246,0.55)]",
  green:  "bg-green-500/50 shadow-[0_0_25px_rgba(34,197,94,0.55)]",
  yellow: "bg-yellow-400/40 shadow-[0_0_25px_rgba(250,204,21,0.55)]",
  red:    "bg-red-500/50 shadow-[0_0_25px_rgba(239,68,68,0.55)]",
};

const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

export default function Speakers({ speakers }: { speakers: Speaker[] }) {
  return (
    <section id="speakers" className="border-b border-white/10 bg-black py-20 md:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
        >
          <SectionTitle
            eyebrow="Speakers"
            title="Meet the voices shaping the day"
            description="Learn from industry leaders across AI, Cloud, and Open Source."
          />
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {speakers.map((speaker, i) => (
            <motion.div
              key={speaker.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.08, ease }}
              whileHover={{ y: -6, scale: 1.015, transition: { duration: 0.2 } }}
              className={`rounded-3xl p-[2px] ${colorStyles[speaker.color]}`}
            >
              <div className="rounded-3xl bg-black p-5">
                {speaker.image ? (
                  <Image
                    src={speaker.image}
                    alt={speaker.name}
                    width={400}
                    height={500}
                    className="aspect-[4/5] w-full rounded-2xl object-cover"
                  />
                ) : (
                  <div className="aspect-[4/5] w-full rounded-2xl bg-white/5" />
                )}
                <div className="mt-5">
                  <h3 className="text-lg font-semibold">{speaker.name}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-white/60">{speaker.topic}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease }}
          className="mt-10 text-center"
        >
          <Link
            href="/speakers"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
          >
            Meet all speakers
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
