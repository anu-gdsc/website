"use client";

import { useCallback, useEffect, useState } from "react";
import { getAmbient } from "@/lib/ambient";

const KEY = "gdg-sound";

function readPref(): string | null {
  try { return localStorage.getItem(KEY); } catch { return null; }
}
function writePref(v: "on" | "off") {
  try { localStorage.setItem(KEY, v); } catch { /* storage blocked, fine */ }
}

/**
 * Ambient music switch. Browsers block audio until the visitor interacts, so the
 * soundtrack fades in on the first click/tap/key anywhere (unless they turned it
 * off before). The choice is remembered.
 */
export default function SoundToggle({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (readPref() === "off") return;

    const kickoff = (e: Event) => {
      const el = e.target as HTMLElement | null;
      if (el?.closest("[data-sound-toggle]")) return; // the button handles itself
      getAmbient().start();
      setOn(true);
      cleanup();
    };
    const cleanup = () => {
      window.removeEventListener("pointerdown", kickoff);
      window.removeEventListener("keydown", kickoff);
    };
    window.addEventListener("pointerdown", kickoff);
    window.addEventListener("keydown", kickoff);
    return cleanup;
  }, []);

  const toggle = useCallback(() => {
    const engine = getAmbient();
    if (engine.isPlaying()) {
      engine.stop();
      writePref("off");
      setOn(false);
    } else {
      engine.start();
      writePref("on");
      setOn(true);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("gdg:sound-toggle", toggle);
    return () => window.removeEventListener("gdg:sound-toggle", toggle);
  }, [toggle]);

  const light = tone === "light";
  return (
    <button
      type="button"
      data-sound-toggle
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? "Turn ambient music off" : "Turn ambient music on"}
      title={on ? "Music on" : "Music off"}
      className={`group inline-flex h-10 items-center gap-2 rounded-full px-3.5 text-xs font-medium transition ${
        light
          ? "text-ink/70 hover:bg-ink/5 hover:text-ink"
          : "text-white/70 hover:bg-white/10 hover:text-white"
      }`}
    >
      <span className={`flex h-3.5 items-end gap-[2px] ${on ? "" : "eq-paused"}`} aria-hidden="true">
        <span className="eq-bar block h-full w-[2.5px] rounded-full bg-current" />
        <span className="eq-bar block h-full w-[2.5px] rounded-full bg-current" />
        <span className="eq-bar block h-full w-[2.5px] rounded-full bg-current" />
      </span>
      <span className="hidden xl:inline">{on ? "Sound on" : "Sound off"}</span>
    </button>
  );
}
