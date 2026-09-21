"use client";

import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import Spark from "@/components/ui/spark";
import Magnetic from "@/components/fx/magnetic";
import { PALETTE_EVENT } from "@/components/fx/command-palette";

const PROMPTS = [
  "How do I join the committee?",
  "What events are coming up?",
  "What are you building?",
  "Who are the mentors?",
  "Is there a dino game?",
];

/** Keyword routing so the bar answers by taking you to the right section. */
const ROUTES: [RegExp, string][] = [
  [/join|apply|committee|volunteer|role|recruit|work for/, "join"],
  [/game|dino|play|fun|bored/, "play"],
  [/project|build|building|app|askanu|anu info|sign|access/, "projects"],
  [/event|talk|workshop|when|coming up|what'?s on|social|study/, "events"],
  [/team|mentor|who|people|president|lead|committee member/, "team"],
  [/sponsor|partner|company|companies/, "sponsors"],
  [/about|mission|vision|value|what is/, "about"],
  [/community|instagram|photo/, "community"],
];

const CHIPS = [
  { label: "Join the committee", id: "join", color: "#fff", primary: true },
  { label: "What's on?", id: "events", color: "#EA4335" },
  { label: "Our projects", id: "projects", color: "#34A853" },
  { label: "Meet the team", id: "team", color: "#FBBC05" },
  { label: "Play dino", id: "play", color: "#4285F4" },
];

const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

/** Types a rotating list of prompts into a placeholder overlay. */
function useTypewriter(prompts: string[]) {
  const [text, setText] = useState("");
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      t = setTimeout(() => setText(prompts[0]), 0);
      return () => clearTimeout(t);
    }
    let i = 0, c = 0, dir = 1;
    const tick = () => {
      const p = prompts[i];
      if (dir === 1) {
        c++;
        setText(p.slice(0, c));
        if (c === p.length) { dir = -1; t = setTimeout(tick, 1700); return; }
        t = setTimeout(tick, 52);
      } else {
        c--;
        setText(p.slice(0, c));
        if (c === 0) { dir = 1; i = (i + 1) % prompts.length; t = setTimeout(tick, 380); return; }
        t = setTimeout(tick, 24);
      }
    };
    t = setTimeout(tick, 1400);
    return () => clearTimeout(t);
  }, [prompts]);
  return text;
}

/**
 * Google-Search-style prompt bar. Typing a question jumps to the matching section,
 * and anything it doesn't recognise opens the command palette with the query filled in.
 */
export default function HeroSearch() {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const placeholder = useTypewriter(PROMPTS);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = value.trim().toLowerCase();
    if (!q) { inputRef.current?.focus(); return; }
    const hit = ROUTES.find(([re]) => re.test(q));
    if (hit) go(hit[1]);
    else window.dispatchEvent(new CustomEvent(PALETTE_EVENT, { detail: { query: value.trim() } }));
    setValue("");
    inputRef.current?.blur();
  };

  return (
    <div className="mt-9 max-w-xl">
      <form
        role="search"
        onSubmit={submit}
        className="group relative flex h-[60px] items-center gap-3 rounded-full border border-[#dfe1e5] bg-white pl-5 pr-2 shadow-[0_1px_6px_rgba(32,33,36,0.16)] transition-shadow hover:shadow-[0_1px_10px_rgba(32,33,36,0.26)] focus-within:border-transparent focus-within:shadow-[0_1px_12px_rgba(32,33,36,0.3)]"
      >
        <Search className="h-[18px] w-[18px] shrink-0 text-[#80868b]" aria-hidden="true" />
        <div className="relative flex-1">
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            aria-label="Ask GDG ANU"
            autoComplete="off"
            spellCheck={false}
            className="h-[58px] w-full bg-transparent text-base text-[#202124] outline-none"
          />
          {!value && (
            <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 flex items-center text-base text-[#80868b]">
              {placeholder}
              <span className="caret ml-0.5 inline-block h-5 w-px bg-[#80868b]" />
            </span>
          )}
        </div>
        <button
          type="submit"
          aria-label="Go"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f1f3f4] transition hover:bg-[#e8eaed] active:scale-95"
        >
          <Spark gradient className="h-5 w-5" />
        </button>
      </form>

      <div className="mt-4 flex flex-wrap gap-2">
        {CHIPS.map((c) => {
          const chip = (
            <button
              key={c.id}
              type="button"
              onClick={() => go(c.id)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition active:scale-[0.97] ${
                c.primary
                  ? "border-transparent bg-gblue text-white shadow-[0_6px_18px_-8px_rgba(66,133,244,0.9)] hover:brightness-110"
                  : "border-[#dadce0] bg-white text-[#3c4043] hover:bg-[#f8f9fa] hover:shadow-sm"
              }`}
            >
              {!c.primary && <span className="h-2 w-2 rounded-full" style={{ background: c.color }} />}
              {c.label}
            </button>
          );
          return c.primary ? <Magnetic key={c.id}>{chip}</Magnetic> : chip;
        })}
      </div>

      <p className="label-mono mt-5 hidden text-[10px] text-[#80868b] sm:block">
        Tip: press <kbd className="rounded border border-[#dadce0] bg-white px-1.5 py-0.5">⌘</kbd>{" "}
        <kbd className="rounded border border-[#dadce0] bg-white px-1.5 py-0.5">K</kbd> anywhere to search the whole site
      </p>
    </div>
  );
}
