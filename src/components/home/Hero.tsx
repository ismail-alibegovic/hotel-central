"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { useRef } from "react";
import type { Dictionary } from "@/content/dictionary";
import type { Locale } from "@/lib/i18n";
import { BookingBar } from "../booking/BookingBar";
import { img, type HomeImages } from "./homeImages";
import { FadeIn, RevealLines } from "../Reveal";

export function Hero({ locale, dict, images }: { locale: Locale; dict: Dictionary; images?: HomeImages }) {
  // CH-001: the daytime façade (brighter, truer to the hotel's own branding) replaces the night shot; still editable in the CMS.
  const photo = img(images?.hero, { src: "/images/3064.jpg", alt: "Hotel Central's white façade and corner tower on Ćumurija street", position: "55% 38%" });
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
            src={photo.src}
            alt={photo.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[55%_38%] [filter:saturate(0.45)_contrast(1.04)_brightness(0.9)_sepia(0.16)]"
            style={photo.position ? { objectPosition: photo.position } : undefined}
          />
        </motion.div>
        {/* Light veil: just enough crown for the navigation and floor for the caption; the photograph stays bright */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,13,16,0.5)_0%,rgba(2,13,16,0.12)_24%,rgba(2,13,16,0.16)_55%,rgba(2,13,16,0.62)_100%)]" />
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
              lines={dict.home.heroTitle}
              className="flex flex-col items-center md:flex-row md:gap-[0.28em]"
            />
          </h1>

          {/* CH-003: the booking search sits on the photograph as in the original design; its filled button is the action. */}
          <FadeIn immediate delay={1.0} className="relative z-[10] mt-10 w-full max-w-[560px] md:mt-[6.2vh] md:w-auto md:max-w-none">
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
