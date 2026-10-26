import "server-only";
import { cache } from "react";
import type { Locale } from "@/lib/i18n";
import { getCmsGlobal } from "./data";
import { mergeHotelInfo, type HotelContact } from "./hotelInfoMerge";

/**
 * Hotel Information for a locale: published (or, for previewing staff, draft) CMS values over the verified built-in ones.
 * Read once per request however many components ask (layout, footer, page sections).
 */
export const getHotelContact = cache(async (locale: Locale): Promise<HotelContact> => mergeHotelInfo(locale, await getCmsGlobal("hotel-info", locale)));
