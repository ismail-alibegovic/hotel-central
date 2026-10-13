"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { useCallback, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import type { Dictionary } from "@/content/dictionary";
import { booking } from "@/content/hotel";
import type { Room } from "@/content/rooms";
import { href, type Locale } from "@/lib/i18n";
import { DecorativeLine } from "../DecorativeLine";
import { Arrow, ArrowLeft } from "../ui";

const ease = [0.76, 0, 0.24, 1] as const;
const easeOut = [0.22, 1, 0.36, 1] as const;

/* Photo frame, measured from the reference (1025×640) */
const IMG = "[--x:var(--gutter-pct)] [--y:0%] [--w:calc(100%_-_2*var(--gutter-pct))] [--h:58%] md:[--x:2.54%] md:[--y:22.2%] md:[--w:45.66%] md:[--h:66.9%]";

/** Fit the longest serif line into the available measure (in cqw). */
function serifSize(lines: string[], measure: number, max: number) {
  const longest = Math.max(...lines.map((l) => l.length));
  return Math.min(max, measure / (longest * 0.7));
}

function TitleLayer({ room, locale, idx, dir }: { room: Room; locale: Locale; idx: number; dir: number }) {
  const lines = room.titleLines[locale];
  const vars = {
    "--fs-d": `${serifSize(lines, 42, 7.15)}cqw`,
    "--fs-m": `${serifSize(lines, 90, 15)}cqw`,
  } as CSSProperties;
  const lineAnim = (i: number) => ({
    initial: { y: dir >= 0 ? "110%" : "-110%" },
    animate: { y: "0%", transition: { duration: 1.1, ease: easeOut, delay: 0.35 + i * 0.09 } },
    exit: { y: dir >= 0 ? "-110%" : "110%", transition: { duration: 0.55, ease, delay: i * 0.04 } },
  });
  return (
    <div className="absolute inset-0" style={vars}>
      {/* Grotesk line — the room's defining feature */}
      <p className="absolute right-[4%] top-[51%] overflow-hidden whitespace-nowrap text-[8.4cqw] font-light uppercase leading-[1] tracking-[-0.01em] md:right-[25.4%] md:top-[31.6%] md:text-[5.75cqw]">
        <motion.span key={`f-${idx}`} className="block" {...lineAnim(0)}>
          {room.feature[locale]}
        </motion.span>
      </p>
      {/* Serif lines — the room name */}
      <div className="font-display absolute left-[var(--gutter-pct)] top-[61%] text-[length:var(--fs-m)] leading-[0.92] md:left-[53.76%] md:top-[42.2%] md:text-[length:var(--fs-d)]">
        {lines.map((l, i) => (
          <span key={i} className="block overflow-hidden pb-[0.04em]">
            <motion.span key={`${idx}-${i}`} className="block whitespace-nowrap" {...lineAnim(i + 1)}>
              {l}
            </motion.span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function RoomCarousel({ locale, dict, rooms }: { locale: Locale; dict: Dictionary; rooms: Room[] }) {
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);
  const reduce = useReducedMotionSafe();
  const room = rooms[index];
  const d = dict.home.rooms;
  const total = rooms.length;
  const pad = (n: number) => String(n).padStart(2, "0");

  const go = useCallback(
    (delta: number) => setState(([i]) => [(i + delta + total) % total, delta]),
    [total],
  );

  // Touch / pen swipe on the photograph
  const start = useRef<{ x: number; y: number } | null>(null);
  const onDown = (e: PointerEvent) => {
    if (e.pointerType === "mouse") return;
    start.current = { x: e.clientX, y: e.clientY };
  };
  const onUp = (e: PointerEvent) => {
    if (!start.current) return;
    const dx = e.clientX - start.current.x;
    const dy = e.clientY - start.current.y;
    start.current = null;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
  };

  const roomHref = href(locale, `/rooms/${room.slug}`);
  const bookHref = booking.roomUrl(room.roomTypeId);

  const nextButton = (
    <button
      type="button"
      onClick={() => go(1)}
      aria-label={`${dict.common.next}: ${rooms[(index + 1) % total].name[locale]}`}
      className="group absolute z-[5] flex aspect-square w-[17cqw] items-center justify-center rounded-full border border-white/40 transition-colors duration-700 hover:border-white hover:bg-white hover:text-deep md:w-[7.05cqw]
        right-[7%] top-[3%] md:right-auto md:left-[87.38%] md:top-[23.4%]"
    >
      <span className="label-sm rotate-[14deg] transition-transform duration-700 group-hover:rotate-0 md:!text-[0.8cqw]">
        {dict.common.next}
      </span>
    </button>
  );

  const controls = (
    <>
      <button type="button" onClick={() => go(-1)} aria-label={dict.common.previous} className="-m-3 p-3 opacity-80 transition-opacity hover:opacity-100">
        <ArrowLeft />
      </button>
      <p className="label-sm tabular-nums" aria-hidden>
        {pad(index + 1)}/{pad(total)}
      </p>
      <button type="button" onClick={() => go(1)} aria-label={dict.common.next} className="-m-3 p-3 opacity-80 transition-opacity hover:opacity-100">
        <Arrow />
      </button>
    </>
  );

  const amenities = (
    <ul className="space-y-[0.15em]">
      {room.highlights[locale].map((a) => (
        <li key={a} className="flex gap-[0.7em] before:content-['•']">
          {a}
        </li>
      ))}
    </ul>
  );

  const actions = (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-4 md:flex-col-reverse md:items-start md:gap-[1.6cqw]">
      <a href={bookHref} target="_blank" rel="noopener noreferrer" className="pill pill-light md:!h-[2.9cqw] md:!text-[0.8cqw]">
        <span>{dict.common.checkAvailability}</span>
      </a>
      <Link href={roomHref} className="label link-line flex items-center gap-3 md:!text-[0.8cqw]">
        {dict.common.viewRoom} <Arrow />
      </Link>
    </div>
  );

  return (
    <section
      aria-roledescription="carousel"
      aria-label={dict.nav.rooms}
      className="relative overflow-hidden bg-deep pb-12 pt-[30px] text-white [--gutter-pct:4.1%] md:pb-0 md:pt-0 md:[--gutter-pct:2.54%]"
    >
      {/* Mobile header */}
      <div className="label mb-8 grid grid-cols-2 gap-4 px-[var(--gutter)] md:hidden">
        <p>{d.metaLeft}</p>
        <p className="text-right">{d.metaCenter}</p>
      </div>

      <div className="comp aspect-[390/560] md:aspect-[1025/640]">
        <DecorativeLine variant="rooms" tone="light" className="z-0 hidden md:block" />

        {/* Desktop editorial metadata */}
        <div className="label absolute left-[2.54%] top-[4.85%] z-[4] hidden md:block">{d.metaLeft}</div>
        <div className="absolute left-[53.76%] top-[4.85%] z-[4] hidden w-[18.6%] md:block">
          <p className="label">{d.metaCenter}</p>
          <p className="mt-[0.9em] text-[0.82cqw] leading-[1.45] opacity-90">{d.body}</p>
        </div>
        <div className="label absolute left-[78.7%] top-[4.85%] z-[4] hidden md:block" aria-live="polite">
          <p className="flex gap-[3.4em]">
            <span className="tabular-nums">({pad(index + 1)})</span>
            <span>{d.metaRight}</span>
          </p>
          <AnimatePresence mode="wait">
            <motion.p
              key={room.slug}
              className="mt-[0.4em] opacity-80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {room.name[locale]}
              <br />
              {room.sizeLabel[locale]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Base title (white on olive), beneath the photograph */}
        <div className="pointer-events-none absolute inset-0 z-[1]">
          <AnimatePresence initial={false}>
            <TitleLayer key={index} room={room} locale={locale} idx={index} dir={dir} />
          </AnimatePresence>
        </div>

        {/* Photograph */}
        <div
          className={`rect z-[2] touch-pan-y overflow-hidden bg-ink ${IMG}`}
          onPointerDown={onDown}
          onPointerUp={onUp}
        >
          <AnimatePresence initial={false} custom={dir}>
            <motion.div
              key={room.slug}
              className="absolute inset-0"
              initial={reduce ? { opacity: 0 } : { clipPath: dir >= 0 ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)" }}
              animate={reduce ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)" }}
              exit={{ opacity: 1, zIndex: 0 }}
              transition={{ duration: 1.25, ease }}
              style={{ zIndex: 1 }}
            >
              <motion.div
                className="absolute inset-0"
                initial={reduce ? false : { scale: 1.14, x: dir >= 0 ? "4%" : "-4%" }}
                animate={{ scale: 1, x: "0%" }}
                transition={{ duration: 1.8, ease: easeOut }}
              >
                <Image
                  src={room.images[0].src}
                  alt={room.images[0].alt[locale]}
                  fill
                  sizes="(min-width: 768px) 46vw, 92vw"
                  className="grade object-cover"
                  style={{ objectPosition: room.images[0].position ?? "50% 50%" }}
                  priority={index === 0}
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
          <div className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(180deg,rgba(2,13,16,0)_55%,rgba(2,13,16,0.35)_100%)]" />
        </div>

        {/* Overprint: title re-coloured over the photograph */}
        <div aria-hidden className={`clip-rect pointer-events-none absolute inset-0 z-[3] blend-diff ${IMG}`}>
          <AnimatePresence initial={false}>
            <TitleLayer key={index} room={room} locale={locale} idx={index} dir={dir} />
          </AnimatePresence>
        </div>

        {nextButton}

        {/* Desktop: actions, amenities, controls */}
        <div className="absolute bottom-[10.9%] left-[53.76%] z-[4] hidden md:block">{actions}</div>
        <div className="absolute bottom-[10.9%] left-[78.7%] z-[4] hidden text-[0.74cqw] uppercase leading-[1.5] tracking-[0.1em] md:block">
          <AnimatePresence mode="wait">
            <motion.div key={room.slug} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              {amenities}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="absolute left-[2.54%] top-[91.4%] z-[4] hidden w-[45.66%] items-center justify-between md:flex">{controls}</div>
      </div>

      {/* Mobile: copy, amenities, actions, controls */}
      <div className="px-[var(--gutter)] md:hidden">
        <p className="label mt-2 opacity-80">
          {room.name[locale]} · {room.sizeLabel[locale]}
        </p>
        <div className="mt-6 text-[10px] uppercase leading-[1.6] tracking-[0.12em]">{amenities}</div>
        <div className="mt-8">{actions}</div>
        <div className="mt-10 flex items-center justify-between border-t border-white/15 pt-5">{controls}</div>
      </div>

      <p className="sr-only" aria-live="polite">
        {room.name[locale]}, {pad(index + 1)} / {pad(total)}
      </p>
    </section>
  );
}
