import { FadeIn } from "@/components/motion/fade-in";

/**
 * Consistent section header: numbered mono eyebrow, big display title, optional copy.
 * `tone` picks text colours for the dark (ink) or light (paper) canvas.
 */
export default function SectionHead({
  index,
  eyebrow,
  title,
  accent,
  description,
  tone = "dark",
  color = "#4285F4",
  className = "",
}: {
  index: string;
  eyebrow: string;
  title: string;
  /** Rendered after the title in the serif italic accent style */
  accent?: string;
  description?: string;
  tone?: "dark" | "light";
  color?: string;
  className?: string;
}) {
  const light = tone === "light";
  return (
    <FadeIn className={`max-w-3xl ${className}`}>
      <p className={`label-mono flex items-center gap-3 ${light ? "text-ink/55" : "text-white/50"}`}>
        <span className="h-2 w-2 rotate-45" style={{ background: color }} />
        {index} / {eyebrow}
      </p>
      <h2
        className={`mt-5 text-[clamp(2.1rem,5vw,3.75rem)] font-bold leading-[1.05] ${light ? "text-ink" : "text-white"}`}
      >
        {title}
        {accent && (
          <>
            {" "}
            <span className="accent-text">{accent}</span>
          </>
        )}
      </h2>
      {description && (
        <p className={`mt-5 max-w-2xl text-base leading-7 md:text-lg md:leading-8 ${light ? "text-ink/65" : "text-white/60"}`}>
          {description}
        </p>
      )}
    </FadeIn>
  );
}
