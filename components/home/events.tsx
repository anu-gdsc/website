"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import Container from "@/components/ui/container";
import SectionHead from "@/components/ui/section-head";
import { events, type ClubEvent, type EventCategory } from "@/data/events";

const FILTERS = ["All", "Upcoming", "Talk", "Workshop", "Social"] as const;
type Filter = (typeof FILTERS)[number];
const PAGE = 6;

const GLYPH: Record<EventCategory, string> = {
  Flagship: "✦",
  Workshop: "</>",
  Talk: "“ ”",
  Social: ":)",
};

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const matches = (e: ClubEvent, f: Filter) =>
  f === "All" || (f === "Upcoming" ? e.status === "upcoming" : e.category === f);

export default function Events() {
  const [filter, setFilter] = useState<Filter>("All");
  const [visible, setVisible] = useState(PAGE);
  const list = events.filter((e) => matches(e, filter));
  const shown = list.slice(0, visible);

  return (
    <section id="events" className="relative scroll-mt-20 bg-ink py-24 md:py-32">
      <Container>
        <div className="flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
          <SectionHead
            index="02"
            eyebrow="Events"
            title="What's on,"
            accent="and what we've done."
            description="Tech talks with engineers, hands-on workshops, study sessions and socials. Come to one, then come to them all."
            color="#EA4335"
          />
          <div
            role="tablist"
            aria-label="Filter events"
            className="flex flex-wrap gap-1 self-start rounded-3xl border border-white/10 bg-white/[0.04] p-1 sm:rounded-full xl:self-auto"
          >
            {FILTERS.map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={f === filter}
                onClick={() => { setFilter(f); setVisible(PAGE); }}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                  f === filter ? "bg-paper text-ink" : "text-white/60 hover:text-white"
                }`}
              >
                {f === "Talk" || f === "Workshop" || f === "Social" ? `${f}s` : f}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((e) => (
              <EventCard key={e.title} event={e} />
            ))}
          </AnimatePresence>
        </motion.div>

        {list.length === 0 && <p className="mt-10 text-sm text-white/50">Nothing here yet. Check back soon.</p>}

        {list.length > visible && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setVisible((v) => v + PAGE)}
              className="rounded-full border border-white/15 px-7 py-3 text-sm font-semibold text-white/85 transition hover:border-white/35 hover:bg-white/5 active:scale-[0.97]"
            >
              Load more events ({list.length - visible})
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}

function EventCard({ event: e }: { event: ClubEvent }) {
  const upcoming = e.status === "upcoming";

  const body = (
    <>
      <div
        className="relative aspect-[16/10] overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${e.color}, ${e.color}33 70%, #0b0b0d)` }}
      >
        {e.image ? (
          <>
            <Image
              src={e.image}
              alt={e.speaker ? `${e.speaker}, speaker` : e.title}
              fill
              sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
          </>
        ) : (
          <>
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:28px_28px]"
            />
            <span
              aria-hidden="true"
              className="absolute -bottom-3 -right-1 font-[family-name:var(--font-google-code)] text-[7rem] font-medium leading-none tracking-tighter text-white/90 transition-transform duration-500 group-hover:-translate-y-2 group-hover:-rotate-3"
            >
              {GLYPH[e.category]}
            </span>
          </>
        )}

        <span className="label-mono absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1.5 text-[10px] text-white backdrop-blur">
          {e.category}
        </span>

        {/* date badge */}
        <div className="absolute right-4 top-4 rounded-2xl bg-paper px-3.5 py-2 text-center text-ink shadow-lg">
          <p className="text-xl font-bold leading-none">{e.day}</p>
          <p className="mt-1 text-[11px] font-semibold leading-none">{e.month} {e.year}</p>
        </div>

        {e.speaker && (
          <span className="label-mono absolute bottom-3 left-4 rounded-full bg-ink/75 px-3 py-1.5 text-[10px] text-white backdrop-blur">
            {e.speaker}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl font-semibold leading-snug text-white">{e.title}</h3>
        <p className="mt-2 text-sm leading-6 text-white/55">{e.blurb}</p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/70">
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5">
            <CalendarDays className="h-3.5 w-3.5 text-white/40" />
            {e.time}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5">
            <MapPin className="h-3.5 w-3.5 text-white/40" />
            {e.location}
          </span>
        </div>
        <p className="label-mono mt-auto flex items-center gap-1.5 pt-6 text-[11px]">
          {upcoming ? (
            <span className="flex items-center gap-1.5 text-white/85">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ggreen opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-ggreen" />
              </span>
              Register
              <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          ) : (
            <span className="text-white/35">Past event</span>
          )}
        </p>
      </div>
    </>
  );

  const cls =
    "group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-ink-2 transition duration-300 hover:-translate-y-1 hover:border-white/25";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, ease: EASE }}
    >
      {e.href ? (
        <a href={e.href} target="_blank" rel="noopener noreferrer" className={cls}>
          {body}
        </a>
      ) : (
        <div className={cls}>{body}</div>
      )}
    </motion.div>
  );
}
