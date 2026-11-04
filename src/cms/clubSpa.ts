import "server-only";
import { cache } from "react";
import type { Locale } from "@/lib/i18n";
import { mergePlans, mergePriceList, mergeTimetable } from "./clubSpaMerge";
import { getCmsGlobal } from "./data";

type Loose = Record<string, unknown> | null;

/** Central Fitness Club timetable + membership options for a locale (published CMS values over the built-in ones). */
export const getFitnessClub = cache(async (locale: Locale) => {
  const doc = (await getCmsGlobal("fitness-club", locale)) as unknown as Loose;
  return { timetable: mergeTimetable(doc), membership: mergePlans(locale, doc) };
});

/** Central Day Spa price list for a locale (published CMS values over the verified October 2026 list). */
export const getDaySpaPrices = cache(async (locale: Locale) => mergePriceList(locale, (await getCmsGlobal("day-spa", locale)) as unknown as Loose));
