"use client";

import { useMemo, useRef, useState, type KeyboardEvent } from "react";
import { ArrowLeft, Arrow } from "../ui";

export type Range = { start: Date | null; end: Date | null };

export const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const sameDay = (a: Date | null, b: Date | null) => !!a && !!b && a.getTime() === b.getTime();
export const iso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

function monthMatrix(year: number, month: number) {
  const first = new Date(year, month, 1);
  const lead = (first.getDay() + 6) % 7; // Monday-first
  const days = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = Array.from({ length: lead }, () => null);
  for (let d = 1; d <= days; d++) cells.push(new Date(year, month, d));
  while (cells.length % 7) cells.push(null);
  return cells;
}

type Labels = { weekdays: string[]; months: string[]; prevMonth: string; nextMonth: string };

/**
 * Accessible range calendar. Arrow keys move by day/week, Enter selects.
 * First pick = arrival, second pick = departure.
 */
export function RangeCalendar({
  value,
  onChange,
  labels,
  months = 2,
  locale,
}: {
  value: Range;
  onChange: (r: Range) => void;
  labels: Labels;
  months?: 1 | 2;
  locale: string;
}) {
  const today = useMemo(() => startOfDay(new Date()), []);
  const [view, setView] = useState(() => {
    const base = value.start ?? today;
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });
  const [hover, setHover] = useState<Date | null>(null);
  const [focusDate, setFocusDate] = useState<Date>(value.start ?? today);
  const gridRef = useRef<HTMLDivElement>(null);

  const minView = new Date(today.getFullYear(), today.getMonth(), 1);
  const canPrev = view > minView;

  const pick = (d: Date) => {
    const { start, end } = value;
    if (!start || end || d <= start) onChange({ start: d, end: null });
    else onChange({ start, end: d });
  };

  const inRange = (d: Date) => {
    const { start, end } = value;
    const last = end ?? (start && hover && hover > start ? hover : null);
    return !!start && !!last && d > start && d < last;
  };

  const moveFocus = (d: Date) => {
    if (d < today) return;
    setFocusDate(d);
    const firstVisible = view;
    const lastVisible = new Date(view.getFullYear(), view.getMonth() + months, 0);
    if (d < firstVisible) setView(new Date(d.getFullYear(), d.getMonth(), 1));
    else if (d > lastVisible) setView(new Date(d.getFullYear(), d.getMonth() - months + 1, 1));
    requestAnimationFrame(() =>
      gridRef.current?.querySelector<HTMLButtonElement>(`[data-date="${iso(d)}"]`)?.focus(),
    );
  };

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, d: Date) => {
    const map: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
    if (e.key in map) {
      e.preventDefault();
      moveFocus(addDays(d, map[e.key]));
    }
  };

  const fmt = new Intl.DateTimeFormat(locale, { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  return (
    <div ref={gridRef} className="select-none">
      <div className="mb-5 flex items-center justify-between">
        <button
          type="button"
          onClick={() => canPrev && setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))}
          disabled={!canPrev}
          aria-label={labels.prevMonth}
          className="-m-2 p-2 transition-opacity disabled:opacity-25"
        >
          <ArrowLeft />
        </button>
        <button
          type="button"
          onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))}
          aria-label={labels.nextMonth}
          className="-m-2 p-2"
        >
          <Arrow />
        </button>
      </div>
      <div className={`grid gap-8 ${months === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
        {Array.from({ length: months }, (_, m) => {
          const y = view.getFullYear();
          const mo = view.getMonth() + m;
          const date = new Date(y, mo, 1);
          const cells = monthMatrix(date.getFullYear(), date.getMonth());
          return (
            <div key={m}>
              <p className="label mb-4 text-center" aria-live="polite">
                {labels.months[date.getMonth()]} {date.getFullYear()}
              </p>
              <div className="grid grid-cols-7 text-center" role="grid" aria-label={`${labels.months[date.getMonth()]} ${date.getFullYear()}`}>
                {labels.weekdays.map((w) => (
                  <span key={w} className="label-sm pb-2 opacity-50" role="columnheader">
                    {w}
                  </span>
                ))}
                {cells.map((d, i) => {
                  if (!d) return <span key={i} />;
                  const disabled = d < today;
                  const isStart = sameDay(d, value.start);
                  const isEnd = sameDay(d, value.end);
                  const between = inRange(d);
                  const focusable = sameDay(d, focusDate) || (!value.start && sameDay(d, today));
                  return (
                    <button
                      key={i}
                      type="button"
                      data-date={iso(d)}
                      disabled={disabled}
                      tabIndex={focusable ? 0 : -1}
                      aria-pressed={isStart || isEnd}
                      aria-label={fmt.format(d)}
                      onClick={() => pick(d)}
                      onMouseEnter={() => setHover(d)}
                      onFocus={() => setFocusDate(d)}
                      onKeyDown={(e) => onKey(e, d)}
                      className={`relative flex h-8 items-center justify-center text-[12px] transition-colors duration-300 ${
                        disabled ? "cursor-default opacity-25" : "hover:text-white"
                      } ${between ? "bg-white/10" : ""}`}
                    >
                      <span
                        className={`flex h-7 w-7 items-center justify-center rounded-full border transition-colors duration-300 ${
                          isStart || isEnd
                            ? "border-white bg-white text-ink"
                            : sameDay(d, today)
                              ? "border-white/40"
                              : "border-transparent hover:border-white/50"
                        }`}
                      >
                        {d.getDate()}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
