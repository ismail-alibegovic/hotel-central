import type { CSSProperties } from "react";

/**
 * Mobile size for an oversized serif title: as large as `max` (vw) but never wider than
 * `measure` (vw) for its longest line. 0.68em is the average uppercase advance of the display face.
 */
export function fitVw(lines: string[], measure = 90, max = 13) {
  const longest = Math.max(...lines.map((l) => l.length), 1);
  return `${Math.min(max, measure / (longest * 0.68)).toFixed(2)}vw`;
}

/** Style object exposing the fitted size as --fs-m (use with `text-[length:var(--fs-m)]`). */
export const fitStyle = (lines: string[], measure?: number, max?: number) =>
  ({ "--fs-m": fitVw(lines, measure, max) }) as CSSProperties;
