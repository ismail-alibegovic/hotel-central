import "server-only";
import { cache } from "react";
import { brandContact, clubLabels, spaDefaults, spaLabels, type BrandContact } from "@/components/brands/contact";
import type { ClubImages } from "@/components/club/ClubHome";
import type { Timetable } from "@/components/club/ClubPages";
import type { DaySpaData } from "@/components/dayspa/DaySpaPage";
import { clubCopy, clubImages, defaultClasses, type ClubCopy, type ClubPlan } from "@/content/club";
import { DAYSPA_BOOKING_URL, daySpaCopy, daySpaImages } from "@/content/dayspa";
import type { Locale } from "@/lib/i18n";
import { mergeClub, mergeSpa } from "./brandsMerge";
import { getCmsGlobal } from "./data";
import { getHotelContact } from "./hotelInfo";

type Address = { street: string; city: string; directions: string };

/** Central Day Spa for a locale: price list and packages from the "Central Day Spa" settings (built-in otherwise), contact from Hotel Information. */
export const getDaySpa = cache(async (locale: Locale): Promise<DaySpaData & { address: Address }> => {
  const [contact, doc] = await Promise.all([getHotelContact(locale), getCmsGlobal("day-spa", locale, 1)]);
  const { categories, packages } = mergeSpa(locale, doc);
  return {
    c: daySpaCopy(locale),
    categories,
    packages,
    images: daySpaImages,
    bookingUrl: DAYSPA_BOOKING_URL,
    contact: brandContact(contact, spaLabels, ["spa"], spaDefaults(locale)),
    address: { street: contact.street, city: `${contact.postalCode} ${contact.city}`, directions: contact.directions },
  };
});

/** Central Fitness Club for a locale: memberships and timetable from the "Central Fitness Club" settings, contact from Hotel Information. */
export const getClub = cache(async (locale: Locale): Promise<{ c: ClubCopy; images: ClubImages; plans: ClubPlan[]; timetable: Timetable; contact: BrandContact; address: Address }> => {
  const [contact, doc] = await Promise.all([getHotelContact(locale), getCmsGlobal("fitness-club", locale, 1)]);
  const c = clubCopy(locale);
  const { plans, timetable } = mergeClub(doc, c.membership.defaultPlans, defaultClasses);
  return {
    c,
    images: clubImages,
    plans,
    timetable,
    contact: brandContact(contact, clubLabels, ["gym", "pool"]),
    address: { street: contact.street, city: `${contact.postalCode} ${contact.city}`, directions: contact.directions },
  };
});
