/**
 * Public addresses of the built-in pages, keyed by their CMS page key. The keys are stored in the database and never
 * change; the addresses follow the client's approved sitemap (Hotel Website sitemap → "PROPOSED Sitemap", round 1):
 *
 * - "restaurant" is shown as Central Café under About (CH-007),
 * - "meetings-events" lives at /conference (sitemap 06),
 * - "spa" (the combined Club & Spa page) was split into Central Fitness Club and Central Day Spa (CH-009); its key is kept
 *   so existing CMS documents stay valid, and its old address redirects to /dayspa.
 *
 * Old addresses redirect permanently (see `legacyRedirects`), so links already shared keep working.
 */
export const pagePaths = {
  about: "/about",
  rooms: "/rooms",
  spa: "/dayspa",
  restaurant: "/about/cafe",
  "meetings-events": "/conference",
  location: "/location",
  contact: "/contact",
} as const;

/** The new stand-alone sections (not CMS page documents). */
export const sectionPaths = {
  cafe: "/about/cafe",
  club: "/centralfitnessclub",
  clubMembership: "/centralfitnessclub/membership",
  clubTimetable: "/centralfitnessclub/timetable",
  dayspa: "/dayspa",
  conference: "/conference",
} as const;

/** Address of a built-in page key, or `/<key>` for anything else (pages created in the CMS). */
export const pathForPageKey = (key: string): string => (key in pagePaths ? pagePaths[key as keyof typeof pagePaths] : `/${key}`);

/** Old → new addresses (without the locale prefix). Applied for both languages in next.config.ts. */
export const legacyRedirects: [string, string][] = [
  ["/spa", "/dayspa"],
  ["/restaurant", "/about/cafe"],
  ["/meetings-events", "/conference"],
];
