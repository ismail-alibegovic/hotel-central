"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { useRef } from "react";
import type { Dictionary } from "@/content/dictionary";
import type { Locale } from "@/lib/i18n";
import { BookingBar } from "../booking/BookingBar";
import { FadeIn, RevealLines } from "../Reveal";

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      aria-label="Hotel Central Sarajevo"
      className="relative z-[5] h-[100svh] min-h-[600px] bg-ink text-white md:min-h-[640px]"
    >
      <div className="absolute inset-0 overflow-hidden">
      <motion.div className="absolute inset-0" style={reduce ? undefined : { y }}>
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.16, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={reduce ? { duration: 0 } : { duration: 2.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/images/3075.jpg"
            alt="Hotel Central's corner tower and façade on Ćumurija street, lit at night"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_42%] [filter:saturate(0.22)_contrast(1.12)_brightness(0.62)_sepia(0.32)_hue-rotate(28deg)]"
          />
        </motion.div>
        {/* Restrained veil: darker crown for the navigation, darker floor for the caption */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,13,16,0.62)_0%,rgba(2,13,16,0.18)_26%,rgba(2,13,16,0.22)_62%,rgba(2,13,16,0.7)_100%)]" />
        <div className="absolute inset-0 bg-deep/25 mix-blend-multiply" />
      </motion.div>
      </div>

      <motion.div className="relative flex h-full flex-col items-center px-[var(--gutter)]" style={reduce ? undefined : { opacity: fade }}>
        <div className="flex w-full flex-1 flex-col items-center justify-center pt-[var(--header-h)] md:justify-start md:pt-[calc(36.5vh)]">
          <FadeIn immediate delay={0.9} className="label mb-5 flex items-center gap-4 opacity-85 md:mb-[2.6vh]">
            <span aria-hidden className="h-px w-8 bg-white/50" />
            {dict.home.heroLabel}
            <span aria-hidden className="h-px w-8 bg-white/50" />
          </FadeIn>
          <h1 className="font-display text-center text-[clamp(46px,6.7vw,116px)] leading-[0.9] tracking-[0.015em] [word-spacing:0.14em]">
            <RevealLines
              immediate
              delay={0.55}
              stagger={0.14}
              lines={["Hotel", "Central"]}
              className="flex flex-col items-center md:flex-row md:gap-[0.28em]"
            />
          </h1>

          <FadeIn immediate delay={1.25} className="relative z-[10] mt-10 w-full max-w-[560px] md:mt-[6.2vh] md:w-auto md:max-w-none">
            <BookingBar locale={locale} dict={dict} />
          </FadeIn>
        </div>

        <FadeIn immediate delay={1.6} className="pb-[4.6vh] text-center">
          <p className="label">{dict.home.heroTagline}</p>
          <p className="mx-auto mt-1 max-w-[46ch] text-[11px] leading-[1.5] tracking-[0.03em] opacity-80 md:max-w-none">
            {dict.home.heroNote}
          </p>
        </FadeIn>
      </motion.div>

      <div aria-hidden className="absolute bottom-0 left-1/2 h-[2.8vh] w-px overflow-hidden bg-white/15">
        <span className="absolute inset-x-0 top-0 h-full animate-[scrollcue_2.4s_var(--ease-inout)_infinite] bg-white/80 motion-reduce:hidden" />
      </div>
    </section>
  );
}
