"use client";

import { motion, type Variants } from "motion/react";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import type { CSSProperties, ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const lineVariants: Variants = {
  hidden: { y: "108%" },
  show: (i: { delay: number; instant: boolean }) => ({
    y: "0%",
    transition: i.instant ? { duration: 0 } : { duration: 1.3, ease, delay: i.delay },
  }),
};

/**
 * Each line slides up from behind its own mask.
 * The wrapper is observed (not the masked line), so clipping never blocks the trigger.
 */
export function RevealLines({
  lines,
  as = "span",
  className = "",
  lineClassName = "",
  lineStyles,
  delay = 0,
  stagger = 0.12,
  immediate = false,
}: {
  lines: ReactNode[];
  as?: "span" | "div" | "p";
  className?: string;
  lineClassName?: string | string[];
  lineStyles?: (CSSProperties | undefined)[];
  delay?: number;
  stagger?: number;
  /** Animate on mount instead of on scroll */
  immediate?: boolean;
}) {
  const reduce = useReducedMotionSafe();
  const M = motion[as];
  return (
    <M
      className={className || "block"}
      initial="hidden"
      {...(immediate ? { animate: "show" } : { whileInView: "show" })}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
    >
      {lines.map((line, i) => {
        const cls = Array.isArray(lineClassName) ? lineClassName[i] ?? "" : lineClassName;
        return (
          <span key={i} className={`block overflow-x-visible overflow-y-clip pt-[0.16em] -mt-[0.16em] pb-[0.06em] -mb-[0.06em] ${cls}`} style={lineStyles?.[i]}>
            <motion.span className="block whitespace-nowrap" variants={lineVariants} custom={{ delay: delay + i * stagger, instant: reduce }}>
              {line}
            </motion.span>
          </span>
        );
      })}
    </M>
  );
}

/** Quiet fade + rise for small editorial copy. */
export function FadeIn({
  children,
  className = "",
  delay = 0,
  y = 14,
  as = "div",
  immediate = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "p" | "span" | "li" | "ul" | "header" | "section";
  immediate?: boolean;
}) {
  const reduce = useReducedMotionSafe();
  const M = motion[as];
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      {...(immediate ? { animate: { opacity: 1, y: 0 } } : { whileInView: { opacity: 1, y: 0 } })}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={reduce ? { duration: 0 } : { duration: 1.1, ease, delay }}
    >
      {children}
    </M>
  );
}
