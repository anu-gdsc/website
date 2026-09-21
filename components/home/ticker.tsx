import { TICKER } from "@/data/site";

const DOT_COLORS = ["#4285F4", "#EA4335", "#FBBC05", "#34A853"];

/** Slow-scrolling strip of what the club does. Pure CSS, pauses on hover. */
export default function Ticker() {
  // Duplicate once so translateX(-50%) loops seamlessly
  const items = [...TICKER, ...TICKER];
  return (
    <div
      className="marquee overflow-hidden border-y border-white/10 bg-ink py-4"
      aria-label={TICKER.join(", ")}
    >
      <div className="marquee-track" aria-hidden="true">
        {items.map((t, i) => (
          <span key={i} className="flex items-center whitespace-nowrap font-[family-name:var(--font-google)] text-2xl font-semibold tracking-tight text-white/85 md:text-3xl">
            <span className="px-6 md:px-9">{t}</span>
            <span className="h-2.5 w-2.5 rotate-45" style={{ background: DOT_COLORS[i % 4] }} />
          </span>
        ))}
      </div>
    </div>
  );
}
