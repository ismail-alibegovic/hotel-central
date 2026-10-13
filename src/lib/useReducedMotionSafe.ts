"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

/**
 * Reduced-motion preference that is `false` during SSR and hydration, then the real value.
 * Keeps server and client markup identical; components use it to zero out durations
 * (never to change `initial`), so reduced-motion visitors see content appear instantly.
 */
export function useReducedMotionSafe() {
  const pref = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted && !!pref;
}
