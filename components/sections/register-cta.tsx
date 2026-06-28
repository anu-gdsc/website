"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/container";

const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

export default function RegisterCTA() {
  return (
    <section id="register" className="bg-black py-20 md:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease }}
          className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 md:p-14"
        >
          {/* Background colour washes */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(66,133,244,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(52,168,83,0.18),transparent_28%)]" />

          {/* Subtle grid */}
          <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(circle,rgba(255,255,255,0.4)_1px,transparent_1px)] [background-size:40px_40px]" />

          <div className="relative max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15, ease }}
              className="text-sm font-semibold uppercase tracking-[0.22em] text-white/55"
            >
              Join the event
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25, ease }}
              className="mt-3 text-3xl font-bold md:text-5xl"
            >
              Be part of the GDSC ANU experience.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35, ease }}
              className="mt-4 text-base leading-7 text-white/65 md:text-lg"
            >
              Register early, secure your spot, and be part of a day built for
              ambitious student developers and builders.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.45, ease }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <motion.a
                href="https://campus.hellorubric.com/?s=9746"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-black"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                Register Now
              </motion.a>
              <motion.a
                href="#speakers"
                className="rounded-full border border-white/15 px-7 py-3 text-sm font-semibold text-white"
                whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.3)" }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                Explore Speakers
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
