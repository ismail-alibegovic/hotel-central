import { builtInPlans, builtInTimetable, DAYS, type Day, type MembershipPlan, type Session, type Timetable } from "@/content/fitness";
import { builtInPriceList, type PriceList, type TreatmentCategory } from "@/content/dayspa";
import type { Locale } from "@/lib/i18n";
import { normaliseTime } from "./fitnessRules";

/**
 * Pure merges for the Central Fitness Club and Central Day Spa globals. Rules (same spirit as Hotel Information):
 * anything empty, untranslated or invalid is left out; if nothing usable remains, the verified built-in content is shown.
 * Inputs are typed loosely on purpose (a stored document, an API import or an older version can all arrive here).
 */
type Loose = Record<string, unknown> | null | undefined;
const text = (v: unknown) => (typeof v === "string" && v.trim() ? v.trim() : undefined);
const arr = (v: unknown): Record<string, unknown>[] => (Array.isArray(v) ? (v.filter((x) => x && typeof x === "object") as Record<string, unknown>[]) : []);
const isDay = (v: unknown): v is Day => typeof v === "string" && (DAYS as readonly string[]).includes(v);

export function sortSessions(sessions: Session[]): Session[] {
  return [...sessions].sort((a, b) => DAYS.indexOf(a.day) - DAYS.indexOf(b.day) || a.start.localeCompare(b.start) || a.name.localeCompare(b.name));
}

export function mergeTimetable(doc: Loose): Timetable {
  const sessions: Session[] = [];
  for (const r of arr(doc?.sessions)) {
    const start = normaliseTime(r.start as string);
    const name = text(r.name);
    if (!isDay(r.day) || !start || !name) continue; // untranslated or incomplete rows are not shown
    const end = normaliseTime(r.end as string) ?? undefined;
    sessions.push({ day: r.day, start, name, ...(end ? { end } : {}), ...(text(r.instructor) ? { instructor: text(r.instructor) } : {}), ...(text(r.studio) ? { studio: text(r.studio) } : {}), ...(text(r.note) ? { note: text(r.note) } : {}) });
  }
  if (!sessions.length) return { ...builtInTimetable, ...(text(doc?.month) ? { month: text(doc?.month) } : {}), ...(text(doc?.note) ? { note: text(doc?.note) } : {}) };
  return { sessions: sortSessions(sessions), ...(text(doc?.month) ? { month: text(doc?.month) } : {}), ...(text(doc?.note) ? { note: text(doc?.note) } : {}) };
}

export function mergePlans(locale: Locale, doc: Loose): { plans: MembershipPlan[]; note?: string; fromCms: boolean } {
  const plans: MembershipPlan[] = arr(doc?.plans).flatMap((r) => {
    const name = text(r.name);
    if (!name) return [];
    const includes = arr(r.includes).map((i) => text(i.text)).filter((x): x is string => Boolean(x));
    return [{ name, includes, ...(text(r.price) ? { price: text(r.price) } : {}), ...(text(r.period) ? { period: text(r.period) } : {}), ...(text(r.description) ? { description: text(r.description) } : {}), ...(r.featured === true ? { featured: true } : {}) }];
  });
  const note = text(doc?.membershipNote);
  return plans.length ? { plans, fromCms: true, ...(note ? { note } : {}) } : { plans: builtInPlans(locale), fromCms: false, ...(note ? { note } : {}) };
}

export function mergePriceList(locale: Locale, doc: Loose): PriceList & { fromCms: boolean } {
  const categories: TreatmentCategory[] = arr(doc?.categories).flatMap((c, n) => {
    const name = text(c.name);
    const items = arr(c.items).flatMap((i) => {
      const iname = text(i.name);
      const price = text(i.price);
      if (!iname || !price) return [];
      const includes = arr(i.includes).map((x) => text(x.text)).filter((x): x is string => Boolean(x));
      return [{ name: iname, price, ...(text(i.duration) ? { duration: text(i.duration) } : {}), ...(includes.length ? { includes } : {}) }];
    });
    return name && items.length ? [{ id: `c${n + 1}`, name, items, ...(text(c.intro) ? { intro: text(c.intro) } : {}) }] : [];
  });
  if (!categories.length) return { ...builtInPriceList(locale), fromCms: false };
  return { categories, fromCms: true, ...(text(doc?.updated) ? { updated: text(doc?.updated) } : {}), ...(text(doc?.note) ? { note: text(doc?.note) } : {}) };
}
