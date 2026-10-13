"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import type { Dictionary } from "@/content/dictionary";
import { booking } from "@/content/hotel";
import type { Locale } from "@/lib/i18n";
import { Arrow } from "../ui";
import { RangeCalendar, type Range } from "./RangeCalendar";

type Panel = "dates" | "rooms" | "guests" | null;

const pad = (n: number) => String(n).padStart(2, "0");
/** jQuery-UI "dd-mm-yy" → 31-12-2026, the format the hotel's widget submits. */
const ezDate = (d: Date) => `${pad(d.getDate())}-${pad(d.getMonth() + 1)}-${d.getFullYear()}`;
const nightsBetween = (a: Date, b: Date) => Math.round((b.getTime() - a.getTime()) / 86_400_000);

function useIsDesktop() {
  const [desktop, setDesktop] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const set = () => setDesktop(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);
  return desktop;
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 7 4"
      className={`h-[4px] w-[7px] transition-transform duration-500 ${open ? "rotate-180" : ""}`}
    >
      <path d="M0 0h7L3.5 4z" fill="currentColor" />
    </svg>
  );
}

function Stepper({
  label,
  value,
  min,
  max,
  onChange,
  hint,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
  hint?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-6 py-3">
      <div>
        <p className="label">{label}</p>
        {hint && <p className="label-sm mt-0.5 opacity-50">{hint}</p>}
      </div>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          aria-label={`${label} −`}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/40 transition-colors hover:border-white disabled:opacity-25"
        >
          <span aria-hidden className="block h-px w-2.5 bg-current" />
        </button>
        <output aria-live="polite" className="w-5 text-center text-[13px] tabular-nums">
          {value}
        </output>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          aria-label={`${label} +`}
          className="relative flex h-8 w-8 items-center justify-center rounded-full border border-white/40 transition-colors hover:border-white disabled:opacity-25"
        >
          <span aria-hidden className="block h-px w-2.5 bg-current" />
          <span aria-hidden className="absolute block h-2.5 w-px bg-current" />
        </button>
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  panel,
  setPanel,
  uid,
  className: cls = "",
}: {
  id: Exclude<Panel, null>;
  label: string;
  value: ReactNode;
  panel: Panel;
  setPanel: (fn: (p: Panel) => Panel) => void;
  uid: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => setPanel((p) => (p === id ? null : id))}
      aria-expanded={panel === id}
      aria-controls={`${uid}-${id}`}
      aria-label={value ? `${label}: ${typeof value === "string" ? value : ""}` : label}
      className={`group flex h-[38px] items-center justify-between gap-3 border-b border-white/45 text-left transition-colors duration-500 hover:border-white ${cls}`}
    >
      <span className="min-w-0 truncate text-[11px] tracking-[0.04em] xl:text-[12px]">
        {value ?? <span className="opacity-90">{label}</span>}
      </span>
      <span className="opacity-70">
        <Chevron open={panel === id} />
      </span>
    </button>
  );
}

/**
 * The hero booking interface: hairline fields, transparent ground, outlined pill.
 * Submits a POST to the hotel's eZee booking engine with the same field names as the
 * hotel's official widget, in a new tab. Without dates, it opens the date picker.
 */
export function BookingBar({
  locale,
  dict,
  className = "",
  dropUp = false,
}: {
  locale: Locale;
  dict: Dictionary;
  className?: string;
  dropUp?: boolean;
}) {
  const b = dict.booking;
  const [range, setRange] = useState<Range>({ start: null, end: null });
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [panel, setPanel] = useState<Panel>(null);
  const [hint, setHint] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const desktop = useIsDesktop();
  const uid = useId();

  useEffect(() => {
    if (!panel) return;
    const onDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setPanel(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPanel(null);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [panel]);

  // Advance to guests once a full range is picked
  const onRange = (r: Range) => {
    setRange(r);
    setHint(false);
  };

  const dateFmt = new Intl.DateTimeFormat(locale === "bs" ? "bs-BA" : "en-GB", { day: "numeric", month: "short" });
  const nights = range.start && range.end ? nightsBetween(range.start, range.end) : 0;
  const datesValue =
    range.start && range.end
      ? `${dateFmt.format(range.start)} — ${dateFmt.format(range.end)}`
      : range.start
        ? `${dateFmt.format(range.start)} — …`
        : null;

  const submit = () => {
    if (!range.start || !range.end) {
      setHint(true);
      setPanel("dates");
      return;
    }
    formRef.current?.submit();
  };

  const panelPos = desktop
    ? `absolute ${dropUp ? "bottom-[calc(100%+18px)]" : "top-[calc(100%+18px)]"}`
    : "fixed inset-x-0 bottom-0 z-[90] max-h-[85vh] overflow-y-auto";

  return (
    <div ref={rootRef} className={`relative text-white ${className}`}>
      <form ref={formRef} action={booking.formAction} method="post" target="_blank" className="contents">
        <input type="hidden" name="eZ_chkin" value={range.start ? ezDate(range.start) : ""} />
        <input type="hidden" name="eZ_chkout" value={range.end ? ezDate(range.end) : ""} />
        <input type="hidden" name="eZ_Nights" value={nights || ""} />
        <input type="hidden" name="eZ_adult" value={adults} />
        <input type="hidden" name="eZ_child" value={children} />
        <input type="hidden" name="eZ_room" value={rooms} />
        <input type="hidden" name="calformat" value={booking.calFormat} />
        <input type="hidden" name="hidBodyLanguage" value="en" />
      </form>

      <div className="grid grid-cols-2 items-end gap-x-4 gap-y-3 md:flex md:gap-[clamp(12px,1.5vw,22px)]">
        <Field
          id="dates"
          panel={panel}
          setPanel={setPanel}
          uid={uid}
          label={b.dates}
          value={datesValue}
          className="col-span-2 md:w-[clamp(150px,11.6vw,200px)]"
        />
        <Field
          id="rooms"
          panel={panel}
          setPanel={setPanel}
          uid={uid}
          label={b.rooms}
          value={`${rooms} ${rooms === 1 ? b.room : b.roomsPlural}`}
          className="md:w-[clamp(130px,11.6vw,200px)]"
        />
        <Field
          id="guests"
          panel={panel}
          setPanel={setPanel}
          uid={uid}
          label={b.guests}
          value={`${adults} / ${children}`}
          className="md:w-[clamp(130px,11.6vw,200px)]"
        />
        <div className="col-span-2 mt-3 flex md:ml-[clamp(10px,1.8vw,26px)] md:mt-0">
          <button
            type="button"
            onClick={submit}
            aria-describedby={`${uid}-note`}
            className="pill pill-light h-[33px] w-full !px-[1.6em] md:w-auto"
          >
            <span>{b.go}</span>
            <Arrow />
          </button>
          <span id={`${uid}-note`} className="sr-only">
            {b.opensNew}
          </span>
        </div>
      </div>

      <AnimatePresence>
        {panel && (
          <>
            {!desktop && (
              <motion.div
                key="scrim"
                className="fixed inset-0 z-[85] bg-ink/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setPanel(null)}
              />
            )}
            <motion.div
              key={panel}
              id={`${uid}-${panel}`}
              role="dialog"
              aria-label={panel === "dates" ? b.dates : panel === "rooms" ? b.rooms : b.guests}
              className={`${panelPos} border border-white/15 bg-deep/95 p-6 text-white shadow-[0_30px_80px_-30px_rgba(2,13,16,0.6)] backdrop-blur-xl ${
                panel === "dates" ? "left-0 md:w-[620px]" : panel === "rooms" ? "md:left-[25%] md:w-[300px]" : "md:left-[40%] md:w-[340px]"
              }`}
              initial={{ opacity: 0, y: desktop ? (dropUp ? -8 : 8) : 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: desktop ? (dropUp ? -8 : 8) : 40 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {panel === "dates" && (
                <>
                  <div className="mb-5 flex items-baseline justify-between gap-4 border-b border-white/15 pb-4">
                    <p className={`label ${hint ? "text-sage" : "opacity-70"}`}>
                      {nights ? `${nights} ${nights === 1 ? b.night : b.nightsPlural}` : b.selectDates}
                    </p>
                    <div className="label flex gap-5">
                      <button type="button" className="link-line opacity-70" onClick={() => setRange({ start: null, end: null })}>
                        {b.clear}
                      </button>
                      <button
                        type="button"
                        className="link-line"
                        onClick={() => setPanel(range.end ? "guests" : null)}
                      >
                        {b.done}
                      </button>
                    </div>
                  </div>
                  <RangeCalendar
                    value={range}
                    onChange={onRange}
                    months={desktop ? 2 : 1}
                    locale={locale === "bs" ? "bs-BA" : "en-GB"}
                    labels={{ weekdays: b.weekdays, months: b.months, prevMonth: b.prevMonth, nextMonth: b.nextMonth }}
                  />
                </>
              )}
              {panel === "rooms" && (
                <Stepper label={b.rooms} value={rooms} min={1} max={booking.maxRooms} onChange={setRooms} />
              )}
              {panel === "guests" && (
                <div className="divide-y divide-white/10">
                  <Stepper label={b.adults} value={adults} min={1} max={booking.maxAdults} onChange={setAdults} />
                  <Stepper label={b.children} value={children} min={0} max={booking.maxChildren} onChange={setChildren} />
                </div>
              )}
              {panel !== "dates" && (
                <div className="mt-4 flex justify-end border-t border-white/10 pt-4">
                  <button type="button" className="label link-line" onClick={() => setPanel(null)}>
                    {b.done}
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
