"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Command, Menu, X } from "lucide-react";
import SoundToggle from "@/components/fx/sound-toggle";
import { PALETTE_EVENT } from "@/components/fx/command-palette";
import Magnetic from "@/components/fx/magnetic";
import { NAV_LINKS } from "@/data/site";

/**
 * Floating pill nav. It reads which section is underneath it (via data-nav-tone)
 * and flips between a frosted white pill on light sections and a dark pill on dark ones.
 */
export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // The home page opens on a light hero, so start light there to avoid a flash.
  const [light, setLight] = useState(pathname === "/");
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const header = headerRef.current;
      const under = document
        .elementsFromPoint(window.innerWidth / 2, 40)
        .find((el) => !header?.contains(el));
      const tone = under?.closest("[data-nav-tone]")?.getAttribute("data-nav-tone");
      setLight(tone === "light");
      setScrolled(window.scrollY > 24);
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(update); };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname]);

  const shell = light
    ? scrolled || open
      ? "border-black/10 bg-white/85 shadow-[0_10px_40px_-14px_rgba(60,64,67,0.4)]"
      : "border-black/[0.07] bg-white/60"
    : scrolled || open
      ? "border-white/10 bg-ink/80 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.6)]"
      : "border-white/[0.08] bg-ink/40";
  const text = light ? "text-[#202124]" : "text-white";
  const link = light
    ? "text-[#5f6368] hover:bg-black/5 hover:text-[#202124]"
    : "text-white/70 hover:bg-white/10 hover:text-white";

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-3 z-50 px-3 md:top-4 md:px-6">
      <nav
        aria-label="Main"
        className={`mx-auto max-w-6xl rounded-[1.75rem] border backdrop-blur-xl transition-all duration-300 ${shell}`}
      >
        <div className="flex h-14 items-center justify-between pl-4 pr-2.5 md:pl-5">
          <Link href="/" className="flex items-center gap-2.5" aria-label="GDG ANU home">
            <Image src="/logo.svg" alt="" width={30} height={30} priority className="h-[30px] w-[30px]" />
            <span className={`whitespace-nowrap text-[15px] font-semibold tracking-tight transition-colors ${text}`}>
              GDG <span className="accent-text">ANU</span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((l) => (
              <Link key={l.name} href={l.href} className={`rounded-full px-3.5 py-2 text-sm transition ${link}`}>
                {l.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event(PALETTE_EVENT))}
              aria-label="Open command palette"
              className={`hidden h-10 items-center gap-2 rounded-full px-3 text-xs font-medium transition md:inline-flex ${link}`}
            >
              <Command className="h-3.5 w-3.5" />
              <kbd className={`label-mono rounded border px-1.5 py-0.5 text-[10px] ${light ? "border-black/15 text-[#5f6368]" : "border-white/15 text-white/50"}`}>K</kbd>
            </button>
            <SoundToggle tone={light ? "light" : "dark"} />
            <Magnetic className="hidden sm:inline-block">
              <Link
                href="/#join"
                className="inline-block whitespace-nowrap rounded-full bg-gblue px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110 active:scale-[0.97]"
              >
                Join the team
              </Link>
            </Magnetic>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label="Toggle menu"
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full transition lg:hidden ${light ? "text-[#202124] hover:bg-black/5" : "text-white/80 hover:bg-white/10"}`}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="overflow-hidden lg:hidden"
            >
              <div className={`flex flex-col gap-1 border-t px-3 pb-3 pt-3 ${light ? "border-black/10" : "border-white/10"}`}>
                {NAV_LINKS.map((l) => (
                  <Link
                    key={l.name}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-xl px-3 py-3 text-base transition ${light ? "text-[#202124] hover:bg-black/5" : "text-white/80 hover:bg-white/5 hover:text-white"}`}
                  >
                    {l.name}
                  </Link>
                ))}
                <Link
                  href="/#join"
                  onClick={() => setOpen(false)}
                  className="mt-2 rounded-full bg-gblue px-5 py-3 text-center text-sm font-semibold text-white sm:hidden"
                >
                  Join the team
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
