"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

export type PriceRow = { name: string; duration?: string; price: string; note?: string };
export type PriceCategory = { id: string; name: string; summary: string; image: string; items: PriceRow[] };

/** Rows that differ only in duration ("Relax spa massage" 30/45/60 min) are shown as one treatment with several prices. */
export function groupRows(items: PriceRow[]): { name: string; note?: string; options: { duration?: string; price: string }[] }[] {
  const out: { name: string; note?: string; options: { duration?: string; price: string }[] }[] = [];
  for (const r of items) {
    const last = out[out.length - 1];
    if (last && last.name === r.name && last.note === r.note) last.options.push({ duration: r.duration, price: r.price });
    else out.push({ name: r.name, ...(r.note ? { note: r.note } : {}), options: [{ duration: r.duration, price: r.price }] });
  }
  return out;
}

/** The full price list: categories down the side (a scrolling row on phones), the chosen category as a menu with
 *  dotted leaders. Every row stays in the HTML (other panels are hidden, not removed). */
export function PriceList({ categories, labels }: { categories: PriceCategory[]; labels: { duration: string; price: string } }) {
  const [active, setActive] = useState(categories[0]?.id);
  const reduce = useReducedMotionSafe();
  const uid = useId();
  const current = categories.find((c) => c.id === active) ?? categories[0];
  if (!current) return null;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:gap-16 xl:gap-24">
      <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
        <div
          role="tablist"
          aria-label="Categories"
          aria-orientation="vertical"
          className="-mx-[var(--ds-gutter)] flex snap-x gap-2 overflow-x-auto px-[var(--ds-gutter)] pb-1 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-t lg:border-[var(--ds-line)] lg:px-0"
        >
          {categories.map((c, i) => {
            const on = c.id === current.id;
            return (
              <button
                key={c.id}
                type="button"
                role="tab"
                id={`${uid}-tab-${c.id}`}
                aria-selected={on}
                aria-controls={`${uid}-panel-${c.id}`}
                onClick={() => setActive(c.id)}
                className={`group shrink-0 snap-start text-left transition-colors duration-300 max-lg:rounded-full max-lg:px-4 max-lg:py-2.5 max-lg:text-[13px] lg:flex lg:items-baseline lg:gap-4 lg:border-b lg:border-[var(--ds-line)] lg:py-4 ${
                  on ? "max-lg:bg-[var(--ds-wine)] max-lg:text-white lg:text-[var(--ds-wine)]" : "max-lg:bg-[var(--ds-paper)] max-lg:ring-1 max-lg:ring-[var(--ds-line)] lg:text-[var(--ds-mute)] lg:hover:text-[var(--ds-wine)]"
                }`}
              >
                <span className="hidden w-6 shrink-0 text-[11px] tabular-nums tracking-[0.1em] opacity-60 lg:inline">{String(i + 1).padStart(2, "0")}</span>
                <span className="lg:flex-1 lg:text-[24px] lg:leading-[1.15] lg:[font-family:var(--ds-display)]">{c.name}</span>
                <span aria-hidden className={`hidden transition-all duration-500 lg:inline ${on ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"}`}>
                  →
                </span>
              </button>
            );
          })}
        </div>
        <div className="relative mt-8 hidden aspect-[4/3] overflow-hidden rounded-[14px] lg:block">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div
              key={current.id}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={reduce ? { duration: 0 } : { duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image src={current.image} alt="" fill sizes="(min-width: 1024px) 320px, 0px" className="object-cover" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="min-w-0 rounded-[20px] bg-[var(--ds-paper)] p-6 shadow-[0_1px_0_var(--ds-line),0_30px_60px_-40px_rgb(64_16_20/0.25)] md:p-12">
        {categories.map((c) => (
          <div key={c.id} role="tabpanel" id={`${uid}-panel-${c.id}`} aria-labelledby={`${uid}-tab-${c.id}`} hidden={c.id !== current.id}>
            <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3 border-b border-[var(--ds-wine)]/25 pb-6">
              <div>
                <h3 className="ds-display text-[38px] text-[var(--ds-wine)] md:text-[52px]">{c.name}</h3>
                <p className="mt-2 max-w-[52ch] text-[15px] text-[var(--ds-mute)]">{c.summary}</p>
              </div>
              <p className="hidden text-[11px] uppercase tracking-[0.2em] text-[var(--ds-mute)] sm:block">
                {labels.duration} · {labels.price}
              </p>
            </div>
            <ul>
              {groupRows(c.items).map((row, i) => (
                <li key={i} className="grid gap-x-10 gap-y-2 border-b border-[var(--ds-line)] py-5 last:border-b-0 md:grid-cols-[minmax(0,1fr)_minmax(220px,0.8fr)] [font-variant-numeric:tabular-nums]">
                  <span className="min-w-0">
                    <span className="block text-[17px] font-medium text-[var(--ds-ink)]">{row.name}</span>
                    {row.note && <span className="mt-1 block text-[13px] leading-[1.5] text-[var(--ds-mute)]">{row.note}</span>}
                  </span>
                  <span className="grid content-start gap-1.5">
                    {row.options.map((o, j) => (
                      <span key={j} className="flex items-baseline gap-3">
                        <span className="whitespace-nowrap text-[14px] text-[var(--ds-mute)]">{o.duration ?? ""}</span>
                        <span aria-hidden className="min-w-[24px] flex-1 translate-y-[-3px] border-b border-dotted border-[var(--ds-wine)]/35" />
                        <span className="ds-display whitespace-nowrap text-[22px] leading-none text-[var(--ds-wine)] [font-variant-numeric:lining-nums_tabular-nums]">{o.price} KM</span>
                      </span>
                    ))}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
