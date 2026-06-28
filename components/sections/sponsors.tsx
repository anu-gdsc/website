"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/ui/container";
import SectionTitle from "@/components/ui/section-title";

type Sponsor = { name: string; type: string; logo?: string; website?: string };

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function Sponsors({ sponsors }: { sponsors: Sponsor[] }) {
  return (
    <section id="sponsors" className="border-b border-white/10 bg-black py-20 md:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
        >
          <SectionTitle
            eyebrow="Sponsors"
            title="Backed by community and ecosystem partners"
            description="Showcase the institutions, companies, and communities powering the event."
          />
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
          {sponsors.map((sponsor, i) => {
            const inner = sponsor.logo ? (
              <Image
                src={sponsor.logo}
                alt={sponsor.name}
                width={120}
                height={48}
                className="max-h-12 w-auto object-contain"
              />
            ) : (
              <span className="text-sm font-medium text-white/70">{sponsor.name}</span>
            );

            return (
              <motion.div
                key={sponsor.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.07, ease }}
                whileHover={{ y: -4, borderColor: "rgba(255,255,255,0.25)", transition: { duration: 0.2 } }}
                className="flex h-28 items-center justify-center rounded-3xl border border-white/10 bg-white/5"
              >
                {sponsor.website ? (
                  <a href={sponsor.website} target="_blank" rel="noopener noreferrer">
                    {inner}
                  </a>
                ) : (
                  inner
                )}
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
