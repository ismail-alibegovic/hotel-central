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

/** The full price list as tabs per category. Every row stays in the HTML (other tabs are hidden, not removed). */
export function PriceList({ categories, labels }: { categories: PriceCategory[]; labels: { duration: string; price: string } }) {
  const [active, setActive] = useState(categories[0]?.id);
  const reduce = useReducedMotionSafe();
  const uid = useId();
  const current = categories.find((c) => c.id === active) ?? categories[0];
  if (!current) return null;

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)] lg:gap-16">
      <div className="min-w-0">
        <div role="tablist" aria-label="Categories" className="-mx-1 flex flex-wrap gap-2">
          {categories.map((c) => {
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
                className={`rounded-full px-4 py-2.5 text-[13px] transition-colors duration-300 ${
                  on ? "bg-[var(--ds-wine)] text-white" : "bg-[var(--ds-paper)] text-[var(--ds-wine)] ring-1 ring-[var(--ds-line)] hover:bg-[var(--ds-lilac-soft)]"
                }`}
              >
                {c.name}
              </button>
            );
          })}
        </div>
        <div className="relative mt-8 hidden aspect-[4/5] overflow-hidden rounded-[22px] lg:block">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div
              key={current.id}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={reduce ? { duration: 0 } : { duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image src={current.image} alt="" fill sizes="(min-width: 1024px) 34vw, 0px" className="object-cover" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="min-w-0">
        {categories.map((c) => (
          <div key={c.id} role="tabpanel" id={`${uid}-panel-${c.id}`} aria-labelledby={`${uid}-tab-${c.id}`} hidden={c.id !== current.id}>
            <h3 className="ds-display text-[28px] text-[var(--ds-wine)] md:text-[34px]">{c.name}</h3>
            <p className="mt-2 max-w-[52ch] text-[var(--ds-mute)]">{c.summary}</p>
            <div className="mt-7 grid grid-cols-[minmax(0,1fr)_86px_72px] gap-x-5 border-b border-[var(--ds-line)] pb-3 text-[11px] uppercase tracking-[0.18em] text-[var(--ds-mute)]">
              <span />
              <span className="text-right">{labels.duration}</span>
              <span className="text-right">{labels.price}</span>
            </div>
            <ul>
              {groupRows(c.items).map((row, i) => (
                <li key={i} className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-5 border-b border-[var(--ds-line)] py-4 [font-variant-numeric:tabular-nums]">
                  <span className="min-w-0 pt-px">
                    <span className="block text-[16px] text-[var(--ds-ink)]">{row.name}</span>
                    {row.note && <span className="mt-0.5 block text-[13px] text-[var(--ds-mute)]">{row.note}</span>}
                  </span>
                  <span className="grid gap-1.5">
                    {row.options.map((o, j) => (
                      <span key={j} className="grid grid-cols-[86px_72px] gap-x-5 text-right">
                        <span className="whitespace-nowrap text-[14px] leading-[24px] text-[var(--ds-mute)]">{o.duration ?? "—"}</span>
                        <span className="whitespace-nowrap text-[16px] font-medium leading-[24px] text-[var(--ds-wine)]">{o.price} KM</span>
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
