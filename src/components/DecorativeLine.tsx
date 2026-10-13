"use client";

import { motion } from "motion/react";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

/**
 * Hairline organic loops traced from the reference artboard.
 * Paths are authored in a 1025×640 viewBox (the reference section frame) and
 * stretched to the section, so they keep their relationship to the photographs.
 */
export const linePaths = {
  /* Section 02: a loop on the left that drifts behind the title toward the lower right */
  hotel: [
    "M-10 108 C 90 86, 236 78, 300 116 C 352 148, 346 300, 318 400 C 296 476, 230 512, 182 496 C 128 478, 128 400, 204 356 C 300 300, 470 268, 600 300 C 720 330, 800 420, 880 478 C 940 522, 990 540, 1040 548",
  ],
  /* Section 03: rises from the bottom-left, swings through the title and curls at the right edge */
  rooms: [
    "M96 650 C 150 560, 300 470, 520 452 C 700 438, 820 470, 900 420 C 980 370, 1000 270, 960 190 C 930 130, 980 90, 1040 100",
    "M760 640 C 820 560, 900 520, 960 470 C 1010 430, 1000 360, 950 372 C 900 384, 900 456, 960 470",
  ],
  /* Spa: a long lazy S across the olive ground */
  spa: [
    "M-10 520 C 120 470, 220 560, 340 520 C 470 476, 470 330, 600 300 C 730 270, 760 400, 690 430 C 620 460, 600 360, 700 300 C 800 240, 920 190, 1040 130",
  ],
  /* Restaurant: a single loop around the coffee photograph */
  restaurant: [
    "M-10 200 C 80 170, 170 180, 220 240 C 280 312, 250 470, 170 500 C 90 530, 60 440, 120 400 C 220 330, 420 400, 560 440 C 700 480, 860 470, 1040 380",
  ],
  location: [
    "M-10 90 C 160 140, 260 60, 380 110 C 500 160, 480 300, 420 320 C 360 340, 350 260, 420 240 C 560 200, 760 330, 1040 300",
  ],
  footer: [
    "M-10 300 C 160 240, 300 360, 480 300 C 640 246, 700 120, 820 140 C 920 156, 920 260, 860 270 C 800 280, 790 200, 860 170 C 930 140, 990 150, 1040 170",
  ],
} as const;

export function DecorativeLine({
  variant,
  className = "",
  tone = "dark",
  opacity = 1,
}: {
  variant: keyof typeof linePaths;
  className?: string;
  tone?: "dark" | "light" | "sage";
  opacity?: number;
}) {
  const reduce = useReducedMotionSafe();
  const stroke =
    tone === "light" ? "rgba(255,255,255,0.42)" : tone === "sage" ? "rgba(161,170,130,0.7)" : "rgba(2,13,16,0.32)";
  return (
    <svg
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      viewBox="0 0 1025 640"
      preserveAspectRatio="none"
      fill="none"
      style={{ opacity }}
    >
      {linePaths[variant].map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke={stroke}
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={reduce ? { duration: 0 } : { duration: 3.2, ease: [0.65, 0, 0.35, 1], delay: 0.2 + i * 0.4 }}
        />
      ))}
    </svg>
  );
}
