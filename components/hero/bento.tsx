"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Counter from "@/components/ui/counter";
import Spark from "@/components/ui/spark";
import { DinoSprite, GOOGLE_COLORS } from "@/components/fx/dino";
import { STATS } from "@/data/site";

const members = STATS.find((s) => s.label === "Members")!;
const mentors = STATS.find((s) => s.label === "Professional mentors")!;

/** Eight-lobed "cookie" shape, the Material expressive flower. */
function flowerPath(R: number, lobes: number, amp: number) {
  const pts: string[] = [];
  for (let i = 0; i <= 240; i++) {
    const t = (i / 240) * Math.PI * 2;
    const r = (R * (1 + amp * Math.cos(lobes * t))) / (1 + amp);
    pts.push(`${(50 + r * Math.cos(t)).toFixed(2)},${(50 + r * Math.sin(t)).toFixed(2)}`);
  }
  return `M${pts.join("L")}Z`;
}
const FLOWER = flowerPath(48, 8, 0.09);

const K = "text-[#1967d2]"; // keyword
const T = "text-[#188038]"; // type
const N = "text-[#e8710a]"; // number
const F = "text-[#9334e6]"; // function

const pop = (i: number) => ({
  initial: { opacity: 0, scale: 0.6, rotate: i % 2 ? 8 : -8 },
  animate: { opacity: 1, scale: 1, rotate: 0 },
  transition: { type: "spring" as const, stiffness: 170, damping: 15, delay: 0.25 + i * 0.09 },
});

const hover = { scale: 1.045, transition: { type: "spring" as const, stiffness: 320, damping: 16 } };

/**
 * Material-style bento for the hero: real club numbers, a code card and the dino.
 * The whole board tilts gently toward the cursor.
 */
export default function Bento() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useSpring(useMotionValue(0), { stiffness: 90, damping: 18 });
  const my = useSpring(useMotionValue(0), { stiffness: 90, damping: 18 });
  const rotateY = useTransform(mx, [-0.5, 0.5], [-6, 6]);
  const rotateX = useTransform(my, [-0.5, 0.5], [5, -5]);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const r = ref.current!.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <div onPointerMove={onMove} onPointerLeave={onLeave} className="relative mx-auto w-full max-w-[540px] [perspective:1100px]">
      {/* floating accents */}
      <motion.svg aria-hidden="true" viewBox="0 0 40 40" className="absolute -right-3 -top-8 z-10 hidden h-12 w-12 sm:block"
        animate={{ y: [0, -9, 0], rotate: [0, 12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
        <polygon points="20,4 37,34 3,34" fill="#FBBC05" />
      </motion.svg>
      <motion.div aria-hidden="true" className="absolute -bottom-6 right-[16%] z-10 hidden h-10 w-10 rounded-full border-[6px] border-gblue sm:block"
        animate={{ y: [0, 8, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }} />

      <motion.div
        ref={ref}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="grid aspect-square grid-cols-3 grid-rows-3 gap-2.5 sm:gap-3"
      >
        {/* 1 · code glyph */}
        <motion.div {...pop(0)} whileHover={hover}
          className="col-start-1 row-start-1 flex items-center justify-center rounded-full bg-gblue text-white shadow-[0_18px_40px_-20px_rgba(66,133,244,0.9)]">
          <span className="font-[family-name:var(--font-google-code)] text-3xl font-medium tracking-tighter sm:text-5xl">&lt;/&gt;</span>
        </motion.div>

        {/* 2 · code card */}
        <motion.div {...pop(1)} whileHover={hover}
          className="col-span-2 col-start-2 row-start-1 flex flex-col overflow-hidden rounded-[1.5rem] border border-[#e8eaed] bg-white shadow-[0_2px_14px_-4px_rgba(60,64,67,0.3)] sm:rounded-[1.9rem]">
          <div className="flex items-center gap-1.5 border-b border-[#f1f3f4] px-3.5 py-2 sm:px-4 sm:py-2.5">
            <span className="h-2 w-2 rounded-full bg-gred" /><span className="h-2 w-2 rounded-full bg-gyellow" /><span className="h-2 w-2 rounded-full bg-ggreen" />
            <span className="ml-2 font-[family-name:var(--font-google-code)] text-[8px] text-[#80868b] sm:text-[10px]">gdg_anu.dart</span>
          </div>
          <pre className="flex-1 overflow-hidden px-3.5 py-2 font-[family-name:var(--font-google-code)] text-[8px] leading-[1.6] text-[#202124] sm:px-4 sm:py-3 sm:text-[11px] sm:leading-[1.75]">
            <span className={K}>class</span> <span className={T}>GDGANU</span> <span className={K}>extends</span> <span className={T}>Club</span>{" {"}{"\n"}
            {"  "}<span className={K}>final</span> members = <span className={N}>{members.value}</span>;{"\n"}
            {"  "}<span className={K}>final</span> mentors = <span className={N}>{mentors.value}</span>;{"\n"}
            {"  "}<span className={T}>Widget</span> <span className={F}>build</span>() =&gt; <span className={T}>Welcome</span>(everyone);{"\n"}
            {"}"}<span className="caret ml-0.5 inline-block h-[0.95em] w-[5px] translate-y-[2px] bg-[#202124]" />
          </pre>
        </motion.div>

        {/* 3 · members */}
        <motion.div {...pop(2)} whileHover={hover}
          className="relative col-span-2 col-start-1 row-start-2 flex flex-col justify-between overflow-hidden rounded-[2rem] bg-gyellow p-4 text-[#202124] sm:rounded-[2.6rem] sm:p-6">
          <div className="flex items-start justify-between">
            <p className="label-mono text-[9px] text-[#202124]/70 sm:text-[10px]">Members</p>
            <div aria-hidden="true" className="flex">
              {["#4285F4", "#EA4335", "#34A853", "#202124"].map((c, i) => (
                <span key={c} className="-ml-2.5 h-5 w-5 rounded-full border-2 border-gyellow first:ml-0 sm:h-7 sm:w-7 sm:border-[3px]" style={{ background: c, zIndex: i }} />
              ))}
            </div>
          </div>
          <p className="text-[2.6rem] font-medium leading-none tracking-tight sm:text-[4.6rem]">
            <Counter value={members.value} suffix={members.suffix} />
          </p>
        </motion.div>

        {/* 4 · mentors */}
        <motion.div {...pop(3)} whileHover={hover}
          className="relative col-start-3 row-span-2 row-start-2 flex flex-col justify-between overflow-hidden rounded-[2rem] bg-ggreen p-4 text-white sm:rounded-[2.6rem] sm:p-6">
          <p className="label-mono text-[9px] text-white/80 sm:text-[10px]">Professional mentors</p>
          <div aria-hidden="true" className="absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-white/15 sm:h-52 sm:w-52" />
          <Spark className="absolute bottom-5 right-5 h-8 w-8 text-white sm:h-11 sm:w-11" />
          <p className="relative text-[4rem] font-medium leading-none tracking-tight sm:text-[7rem]">
            <Counter value={mentors.value} suffix={mentors.suffix} />
          </p>
        </motion.div>

        {/* 5 · flower */}
        <motion.div {...pop(4)} whileHover={{ ...hover, rotate: 14 }} className="col-start-1 row-start-3 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="ring-spin h-full w-full drop-shadow-[0_16px_24px_rgba(234,67,53,0.35)]" aria-hidden="true">
            <path d={FLOWER} fill="#EA4335" />
            <path transform="translate(50 50) scale(0.34) translate(-50 -50)" fill="#fff"
              d="M50 0 C54 30 70 46 100 50 C70 54 54 70 50 100 C46 70 30 54 0 50 C30 46 46 30 50 0Z" />
          </svg>
        </motion.div>

        {/* 6 · dino */}
        <motion.div {...pop(5)} whileHover={hover} className="col-start-2 row-start-3">
          <Link
            href="/#play"
            aria-label="Play the dino game"
            className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[1.5rem] border border-[#e8eaed] bg-white p-3 shadow-[0_2px_14px_-4px_rgba(60,64,67,0.3)] sm:rounded-[1.9rem] sm:p-4"
          >
            <span className="flex items-center justify-between">
              <span className="label-mono text-[8px] text-[#80868b] sm:text-[10px]">Take a break</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-[#80868b] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#202124]" />
            </span>
            <span aria-hidden="true" className="dino-scene running absolute bottom-[1.05rem] left-4 sm:bottom-6 sm:left-6">
              <DinoSprite color={GOOGLE_COLORS[0]} height={38} />
            </span>
            <span aria-hidden="true" className="absolute inset-x-4 bottom-3.5 border-t-2 border-dashed border-[#dadce0] sm:bottom-5" />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
