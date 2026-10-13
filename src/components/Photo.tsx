"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { useRef } from "react";

type Grade = "grade" | "grade-dark" | "grade-soft" | "none";

type PhotoProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  imgClassName?: string;
  position?: string;
  grade?: Grade;
  priority?: boolean;
  /** Masked reveal when scrolled into view */
  reveal?: boolean | "up" | "down" | "left" | "right";
  /** Subtle vertical parallax amplitude in % of the frame (0 = off) */
  parallax?: number;
  /** Extra dark veil (0–1) */
  veil?: number;
};

const clipFrom = {
  up: "inset(100% 0% 0% 0%)",
  down: "inset(0% 0% 100% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
};

/**
 * Framed photograph with the house grade, optional masked reveal and gentle parallax.
 * The frame (`className`) controls size; the image always covers it.
 */
export function Photo({
  src,
  alt,
  sizes,
  className = "",
  imgClassName = "",
  position = "50% 50%",
  grade = "grade",
  priority,
  reveal = true,
  parallax = 0,
  veil = 0,
}: PhotoProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`${-parallax}%`, `${parallax}%`]);

  const dir = reveal === true ? "up" : reveal || null;
  const animate = !!dir;

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden bg-deep/40 ${className}`}
      initial={animate ? { clipPath: clipFrom[dir] } : false}
      whileInView={animate ? { clipPath: "inset(0% 0% 0% 0%)" } : undefined}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={reduce ? { duration: 0 } : { duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
    >
      <motion.div
        className="absolute inset-0"
        style={parallax && !reduce ? { y, scale: 1 + (parallax * 2.4) / 100 } : undefined}
      >
        <motion.div
          className="absolute inset-0"
          initial={animate ? { scale: 1.18 } : false}
          whileInView={animate ? { scale: 1 } : undefined}
          viewport={{ once: true, margin: "0px 0px -12% 0px" }}
          transition={reduce ? { duration: 0 } : { duration: 2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className={`object-cover ${grade !== "none" ? grade : ""} ${imgClassName}`}
            style={{ objectPosition: position }}
          />
        </motion.div>
      </motion.div>
      {veil > 0 && <div className="pointer-events-none absolute inset-0 bg-ink" style={{ opacity: veil }} />}
    </motion.div>
  );
}
