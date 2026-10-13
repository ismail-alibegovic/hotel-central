"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/** Honour the visitor's reduced-motion preference for every Motion animation. */
export function MotionRoot({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
