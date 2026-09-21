"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight, CalendarDays, CornerDownLeft, Gamepad2, Hash, Instagram, Mail, Search, Users, Volume2, Zap,
} from "lucide-react";
import { events } from "@/data/events";
import { roles } from "@/data/roles";
import { projects } from "@/data/projects";
import { APPLY_URL, CONTACT_EMAIL, GDG_COMMUNITY_URL, INSTAGRAM_URL, REGISTER_URL } from "@/data/site";

type Item = {
  id: string;
  label: string;
  hint?: string;
  group: string;
  keywords?: string;
  icon: React.ReactNode;
  run: () => void;
};

export const PALETTE_EVENT = "gdg:palette";
export const SOUND_EVENT = "gdg:sound-toggle";

/**
 * Cmd/Ctrl+K command palette. Jump to any section, event or team, open links,
 * toggle the music or start the dino game, all from the keyboard.
 */
export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const close = useCallback(() => { setOpen(false); setQuery(""); setActive(0); }, []);

  const goto = useCallback(
    (id: string) => {
      close();
      if (pathname === "/") {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        history.replaceState(null, "", `#${id}`);
      } else {
        router.push(`/#${id}`);
      }
    },
    [close, pathname, router],
  );
  const openUrl = useCallback((url: string) => { close(); window.open(url, "_blank", "noopener,noreferrer"); }, [close]);

  const items: Item[] = useMemo(() => {
    const icon = (n: React.ReactNode) => n;
    const cls = "h-4 w-4";
    const sections: [string, string][] = [
      ["about", "About us"], ["events", "Events"], ["projects", "Projects"], ["community", "Community"],
      ["team", "Meet the team"], ["join", "Join the team"], ["sponsors", "Sponsors"],
    ];
    return [
      ...sections.map(([id, label]): Item => ({
        id: `go-${id}`, label, group: "Go to", hint: `#${id}`, icon: icon(<Hash className={cls} />), run: () => goto(id),
      })),
      { id: "go-play", label: "Play the dino game", group: "Go to", hint: "Space to jump", keywords: "game fun break", icon: <Gamepad2 className={cls} />, run: () => goto("play") },
      ...events.map((e): Item => ({
        id: `ev-${e.title}`,
        label: e.title,
        group: "Events",
        hint: `${e.day} ${e.month} ${e.year}`,
        keywords: `${e.category} ${e.speaker ?? ""} ${e.location}`,
        icon: <CalendarDays className={cls} />,
        run: () => (e.href ? openUrl(e.href) : goto("events")),
      })),
      ...projects.map((p): Item => ({
        id: `proj-${p.name}`, label: p.name, group: "Projects", hint: p.href ? "Try it" : p.status, keywords: p.blurb,
        icon: <Zap className={cls} />, run: () => (p.href?.startsWith("http") ? openUrl(p.href) : goto("projects")),
      })),
      ...roles.map((r): Item => ({
        id: `role-${r.team}`, label: `Join ${r.team}`, group: "Join a team", hint: "Apply", keywords: r.tagline,
        icon: <Users className={cls} />, run: () => openUrl(APPLY_URL),
      })),
      { id: "l-reg", label: "Register for the Developer Event", group: "Links", icon: <Zap className={cls} />, run: () => openUrl(REGISTER_URL) },
      { id: "l-ig", label: "Instagram", group: "Links", hint: "@gdg_anu", icon: <Instagram className={cls} />, run: () => openUrl(INSTAGRAM_URL) },
      { id: "l-gdg", label: "GDG Community page", group: "Links", icon: <ArrowUpRight className={cls} />, run: () => openUrl(GDG_COMMUNITY_URL) },
      { id: "l-mail", label: "Email us", group: "Links", hint: CONTACT_EMAIL, icon: <Mail className={cls} />, run: () => { close(); window.location.href = `mailto:${CONTACT_EMAIL}`; } },
      { id: "p-sound", label: "Toggle music", group: "Preferences", keywords: "sound audio ambient", icon: <Volume2 className={cls} />, run: () => { close(); window.dispatchEvent(new Event(SOUND_EVENT)); } },
    ];
  }, [goto, openUrl, close]);

  const results = useMemo(() => {
    const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (!tokens.length) return items.filter((i) => i.group === "Go to" || i.group === "Preferences");
    return items.filter((i) => {
      const hay = `${i.label} ${i.group} ${i.hint ?? ""} ${i.keywords ?? ""}`.toLowerCase();
      return tokens.every((t) => hay.includes(t));
    });
  }, [items, query]);

  // Global shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        close();
      }
    };
    const onOpen = (e: Event) => {
      const q = (e as CustomEvent<{ query?: string }>).detail?.query;
      setQuery(q ?? "");
      setActive(0);
      setOpen(true);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(PALETTE_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(PALETTE_EVENT, onOpen);
    };
  }, [close]);

  useEffect(() => { if (open) requestAnimationFrame(() => inputRef.current?.focus()); }, [open]);
  useEffect(() => {
    listRef.current?.querySelector(`[data-idx="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    else if (e.key === "Enter") { e.preventDefault(); results[active]?.run(); }
  };

  let lastGroup = "";
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="palette"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[80] flex items-start justify-center bg-black/60 px-4 pt-[12vh] backdrop-blur-sm"
          onMouseDown={(e) => { if (e.target === e.currentTarget) close(); }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-full max-w-xl overflow-hidden rounded-3xl border border-white/10 bg-ink-2 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-5">
              <Search className="h-4 w-4 text-white/40" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => { setQuery(e.target.value); setActive(0); }}
                onKeyDown={onInputKey}
                role="combobox"
                aria-expanded="true"
                aria-controls="palette-list"
                aria-activedescendant={results[active] ? `pal-${results[active].id}` : undefined}
                placeholder="Search sections, events, teams..."
                className="h-14 flex-1 bg-transparent text-[15px] text-white outline-none placeholder:text-white/35"
              />
              <kbd className="label-mono rounded-md border border-white/15 px-1.5 py-0.5 text-[10px] text-white/45">esc</kbd>
            </div>

            <div ref={listRef} id="palette-list" role="listbox" className="max-h-[52vh] overflow-y-auto p-2">
              {results.length === 0 && <p className="px-4 py-10 text-center text-sm text-white/45">No matches. Try &quot;events&quot; or &quot;join&quot;.</p>}
              {results.map((it, i) => {
                const showGroup = it.group !== lastGroup;
                lastGroup = it.group;
                const on = i === active;
                return (
                  <div key={it.id}>
                    {showGroup && <p className="label-mono px-3 pb-1.5 pt-3 text-[10px] text-white/35">{it.group}</p>}
                    <button
                      id={`pal-${it.id}`}
                      role="option"
                      aria-selected={on}
                      data-idx={i}
                      onMouseMove={() => setActive(i)}
                      onClick={it.run}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${on ? "bg-white/10 text-white" : "text-white/70"}`}
                    >
                      <span className={on ? "text-gblue" : "text-white/40"}>{it.icon}</span>
                      <span className="flex-1 truncate">{it.label}</span>
                      {it.hint && <span className="label-mono text-[10px] text-white/35">{it.hint}</span>}
                      {on && <CornerDownLeft className="h-3.5 w-3.5 text-white/40" />}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="label-mono flex items-center gap-4 border-t border-white/10 px-5 py-3 text-[10px] text-white/35">
              <span>↑↓ navigate</span>
              <span>↵ select</span>
              <span className="ml-auto">GDG ANU</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
