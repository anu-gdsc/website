import { useId } from "react";

/** Four-point sparkle, with the blue to purple to red gradient when `gradient` is set. */
export default function Spark({ className, gradient = false }: { className?: string; gradient?: boolean }) {
  const id = useId();
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      {gradient && (
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#4285F4" />
            <stop offset="0.55" stopColor="#9B72CB" />
            <stop offset="1" stopColor="#D96570" />
          </linearGradient>
        </defs>
      )}
      <path
        d="M50 0 C54 30 70 46 100 50 C70 54 54 70 50 100 C46 70 30 54 0 50 C30 46 46 30 50 0Z"
        fill={gradient ? `url(#${id})` : "currentColor"}
      />
    </svg>
  );
}
