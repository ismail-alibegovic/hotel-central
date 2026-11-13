"use client";

import { usePathname } from "next/navigation";

/** Sections that carry their own header and footer (CH-010, CH-013: "feel like a completely separate website"). */
const MICROSITES = /^\/(en|bs)\/(centralfitnessclub|dayspa)(\/|$)/;

export const isMicrosite = (pathname: string | null) => Boolean(pathname && MICROSITES.test(pathname));

/**
 * Renders the hotel's header, footer or mobile booking bar everywhere except inside the Central Fitness Club and
 * Central Day Spa sections, which bring their own branded chrome. The hotel chrome is still rendered on the server
 * and passed in, so nothing about it changes on the hotel pages.
 */
export function HotelChrome({ children }: { children: React.ReactNode }) {
  return isMicrosite(usePathname()) ? null : <>{children}</>;
}
