"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/container";
import HeroSearch from "@/components/hero/search";
import Bento from "@/components/hero/bento";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: EASE },
});

/** A word that rises out of a mask. The extra padding keeps descenders from being clipped. */
function Word({ children, i, accent = false }: { children: string; i: number; accent?: boolean }) {
  return (
    <>
      <span className="inline-block overflow-hidden pb-[0.14em] align-bottom">
        <motion.span
          className={`inline-block ${accent ? "accent-text" : ""}`}
          initial={{ y: "115%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 + i * 0.09, ease: EASE }}
        >
          {children}
        </motion.span>
      </span>
      {" "}
    </>
  );
}

export default function Hero() {
  return (
    <section
      data-nav-tone="light"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-white text-[#202124]"
    >
      {/* Backdrop: soft colour washes and a faint engineering grid */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(55%_50%_at_88%_18%,rgba(66,133,244,0.13),transparent),radial-gradient(40%_40%_at_6%_92%,rgba(251,188,4,0.13),transparent),radial-gradient(36%_36%_at_96%_92%,rgba(52,168,83,0.11),transparent),radial-gradient(30%_30%_at_40%_0%,rgba(234,67,53,0.07),transparent)]" />
        <div className="absolute inset-0 [background-image:linear-gradient(rgba(32,33,36,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(32,33,36,0.06)_1px,transparent_1px)] [background-size:56px_56px] [-webkit-mask-image:radial-gradient(ellipse_80%_75%_at_68%_45%,black,transparent)] [mask-image:radial-gradient(ellipse_80%_75%_at_68%_45%,black,transparent)]" />
      </div>

      <Container>
        <div className="grid grid-cols-1 items-center gap-16 pb-16 pt-28 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10 lg:pb-20 lg:pt-32">
          <div>
            <motion.div
              {...fade(0.05)}
              className="inline-flex items-center gap-2.5 rounded-full border border-[#dadce0] bg-white/80 py-1.5 pl-3 pr-4 text-xs font-medium text-[#5f6368] backdrop-blur"
            >
              <span className="flex gap-1" aria-hidden="true">
                <span className="h-1.5 w-1.5 rounded-full bg-gblue" />
                <span className="h-1.5 w-1.5 rounded-full bg-gred" />
                <span className="h-1.5 w-1.5 rounded-full bg-gyellow" />
                <span className="h-1.5 w-1.5 rounded-full bg-ggreen" />
              </span>
              Google Developer Group on Campus, ANU
            </motion.div>

            <h1 className="mt-6 text-[clamp(2.7rem,6.2vw,5.4rem)] font-medium leading-[1.02] tracking-[-0.035em]">
              <span className="sr-only">GDG ANU, the Google Developer Group at the Australian National University: </span>
              <Word i={0}>Build</Word>
              <Word i={1}>what&apos;s</Word>
              <Word i={2}>next,</Word>
              <br />
              <Word i={3} accent>together.</Word>
            </h1>

            <motion.p {...fade(0.75)} className="mt-6 max-w-xl text-lg leading-8 text-[#5f6368]">
              GDG ANU is the student-run Google Developer Group at the Australian National University,
              a community of <mark className="hl hl-blue">builders</mark>,{" "}
              <mark className="hl hl-red">designers</mark> and{" "}
              <mark className="hl hl-yellow">curious people</mark>. We run{" "}
              <mark className="hl hl-green">tech talks</mark>, workshops and real projects, and
              we&apos;re looking for people like you to help run it.
            </motion.p>

            <motion.div {...fade(0.9)}>
              <HeroSearch />
            </motion.div>
          </div>

          <Bento />
        </div>
      </Container>
    </section>
  );
}
