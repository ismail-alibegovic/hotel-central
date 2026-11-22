import type { PriceCategory } from "@/components/dayspa/PriceList";
import type { DaySpaPackage } from "@/components/dayspa/DaySpaPage";
import type { Timetable } from "@/components/club/ClubPages";
import { spaCategories, spaPackages } from "@/content/dayspa";
import type { ClubPlan } from "@/content/club";
import type { Locale } from "@/lib/i18n";
import type { DaySpa, FitnessClub, Media } from "@/payload-types";
import { priceProblem, timeProblem } from "./globals/Brands";

/**
 * Pure merges for the Day Spa and Club settings (testable without a database). A list from the CMS is used only when it
 * has at least one complete entry in this language; otherwise the built-in list stays. Inside a list, an entry that is not
 * written in this language or holds an invalid price/time is left out, never shown half-empty or in the other language.
 */

const text = (v: string | null | undefined) => (v && v.trim() ? v.trim() : undefined);
const mediaUrl = (m: string | Media | null | undefined) => (m && typeof m === "object" && m.url ? { url: m.url, alt: text(m.alt) ?? "" } : undefined);
const normPrice = (v: string) => v.trim().replace(/\s*[–-]\s*/, "–");

export function builtInSpa(locale: Locale): { categories: PriceCategory[]; packages: DaySpaPackage[] } {
  return {
    categories: spaCategories.map((cat) => ({
      id: cat.id,
      name: cat.name[locale],
      summary: cat.summary[locale],
      image: cat.image,
      items: cat.items.map((t) => ({ name: t.name[locale], price: t.price, ...(t.duration ? { duration: t.duration } : {}), ...(t.note ? { note: t.note[locale] } : {}) })),
    })),
    packages: spaPackages.map((p) => ({ name: p.name[locale], duration: p.duration, price: p.price, includes: p.includes.map((x) => x[locale]) })),
  };
}

export function mergeSpa(locale: Locale, doc: DaySpa | null): { categories: PriceCategory[]; packages: DaySpaPackage[] } {
  const base = builtInSpa(locale);
  if (!doc) return base;
  const fallbackImages = base.categories.map((c) => c.image);

  const categories: PriceCategory[] = (doc.categories ?? []).flatMap((c, i) => {
    const name = text(c.name);
    const items = (c.treatments ?? []).flatMap((t) => {
      const n = text(t.name);
      const price = text(t.price);
      if (!n || !price || priceProblem(price)) return [];
      return [{ name: n, price: normPrice(price), ...(text(t.duration) ? { duration: text(t.duration)! } : {}), ...(text(t.note) ? { note: text(t.note)! } : {}) }];
    });
    if (!name || !items.length) return [];
    return [{ id: c.id ?? `c${i}`, name, summary: text(c.summary) ?? "", image: mediaUrl(c.photo)?.url ?? fallbackImages[i % fallbackImages.length], items }];
  });

  const packages: DaySpaPackage[] = (doc.packages ?? []).flatMap((p) => {
    const name = text(p.name);
    const price = text(p.price);
    if (!name || !price || priceProblem(price)) return [];
    return [{ name, duration: text(p.duration) ?? "", price: normPrice(price), includes: (p.includes ?? []).map((x) => text(x.text)).filter((x): x is string => Boolean(x)) }];
  });

  return { categories: categories.length ? categories : base.categories, packages: packages.length ? packages : base.packages };
}

export function mergeClub(doc: FitnessClub | null, defaultPlans: ClubPlan[]): { plans: ClubPlan[]; timetable: Timetable } {
  if (!doc) return { plans: defaultPlans, timetable: { classes: [] } };

  const plans: ClubPlan[] = (doc.plans ?? []).flatMap((p) => {
    const name = text(p.name);
    if (!name) return [];
    const price = text(p.price);
    const usablePrice = price && !priceProblem(price) ? normPrice(price) : undefined;
    return [{ name, ...(usablePrice ? { price: usablePrice } : {}), ...(usablePrice && text(p.period) ? { period: text(p.period)! } : {}), features: (p.features ?? []).map((f) => text(f.text)).filter((x): x is string => Boolean(x)), highlight: p.highlight === true }];
  });

  const classes = (doc.classes ?? []).flatMap((c) => {
    const day = Number(c.day);
    const time = text(c.time);
    const name = text(c.name);
    if (!Number.isInteger(day) || day < 0 || day > 6 || !time || timeProblem(time) || !name) return [];
    return [{ day, time, name, ...(text(c.duration) ? { duration: text(c.duration)! } : {}), ...(text(c.room) ? { room: text(c.room)! } : {}), ...(text(c.trainer) ? { trainer: text(c.trainer)! } : {}) }];
  });
  const image = mediaUrl(doc.timetableImage);

  return {
    plans: plans.length ? plans : defaultPlans,
    timetable: { classes, ...(image ? { file: { url: image.url, isImage: true, alt: image.alt } } : {}), ...(text(doc.timetableNote) ? { note: text(doc.timetableNote)! } : {}) },
  };
}
