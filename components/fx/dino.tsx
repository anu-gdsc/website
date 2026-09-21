/**
 * The club's pixel dino, shared by the roaming mini-dino (SVG) and the playable
 * game (canvas). Coordinates are in the sprite's own units; both renderers apply
 * the same offset so the SVG and canvas versions match exactly.
 */

export type Rect = readonly [x: number, y: number, w: number, h: number];

export const OFFSET = { x: 1.0040112, y: 4.0223398 } as const;

export const BODY: readonly Rect[] = [
  // head and neck
  [173.42451, 31.591932, 150.71416, 78.453949],
  [185.12379, 23.591932, 127.31561, 78.453949],
  [173.42451, 66.689751, 64.690094, 78.453949],
  [173.42451, 129.31526, 112.86356, 15.828429],
  // neck, upper body and arm
  [173.42451, 66.689751, 50.926243, 158.97247],
  [173.42451, 181.31526, 81.894897, 15.828429],
  [242.93195, 181.61789, 12.387465, 28.904087],
  // body and hip
  [161.42451, 154.09019, 50.926243, 100.4761],
  [137.42451, 168.09019, 59.872746, 100.4761],
  [117.42451, 182.09019, 50.926243, 100.4761],
  // tail
  [100.78254, 196.09019, 27.568213, 87.82383],
  [84.675545, 196.09019, 23.675207, 74.198311],
  [72.670792, 182.06775, 19.679958, 72.220764],
  [58.670792, 168.06775, 19.679958, 72.220764],
  [48.853306, 154.06775, 11.497448, 72.220764],
];

export const EYE: Rect = [199.83414, 44.119633, 15, 15];

export const LEG_L: readonly Rect[] = [
  [120.78254, 196.09019, 27.568213, 100.4761],
  [117.68283, 196.09019, 10.322884, 119.74549],
  [117.68283, 305.51282, 28.215889, 10.322882],
];

export const LEG_R: readonly Rect[] = [
  [161.42451, 196.09019, 18.581194, 100.4761],
  [169.68283, 196.09019, 10.322884, 147.27319],
  [169.68283, 333.0405, 28.215889, 10.322882],
];

/** Sprite bounds in real (offset-applied) units */
export const BOUNDS = { x: 49.86, y: 27.6, w: 275.3, h: 319.8 } as const;
/** How far a lifted foot rises, in sprite units */
export const LEG_LIFT = 18;

export const GOOGLE_COLORS = ["#4285F4", "#EA4335", "#FBBC05", "#34A853"] as const;

/** Inline SVG dino. Wrap in an element with the `dino-scene running` classes to animate the legs. */
export function DinoSprite({
  color,
  height = 48,
  running = true,
  className,
}: {
  color: string;
  height?: number;
  running?: boolean;
  className?: string;
}) {
  const cls = running ? "running" : "";
  const width = Math.round((BOUNDS.w / BOUNDS.h) * height);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`${BOUNDS.x} ${BOUNDS.y} ${BOUNDS.w} ${BOUNDS.h}`}
      width={width}
      height={height}
      style={{ color, display: "block", overflow: "visible" }}
      className={className}
      aria-hidden="true"
    >
      <g transform={`translate(${OFFSET.x},${OFFSET.y})`}>
        {BODY.map((r, i) => (
          <rect key={i} fill="currentColor" x={r[0]} y={r[1]} width={r[2]} height={r[3]} />
        ))}
        <rect fill="#0b0b0d" x={EYE[0]} y={EYE[1]} width={EYE[2]} height={EYE[3]} />
        <g className={`dino-leg-l ${cls}`}>
          {LEG_L.map((r, i) => (
            <rect key={i} fill="currentColor" x={r[0]} y={r[1]} width={r[2]} height={r[3]} />
          ))}
        </g>
        <g className={`dino-leg-r ${cls}`}>
          {LEG_R.map((r, i) => (
            <rect key={i} fill="currentColor" x={r[0]} y={r[1]} width={r[2]} height={r[3]} />
          ))}
        </g>
      </g>
    </svg>
  );
}
