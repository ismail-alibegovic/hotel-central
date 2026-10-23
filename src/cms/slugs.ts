import { pageKeys } from "./blocks/types";

/**
 * URL keys for pages created in the CMS: `/en/<slug>` and `/bs/<slug>`, one segment, lowercase ASCII.
 * Bosnian slugs are written without diacritics (č → c, š → s, ž → z, đ → dj) so every link works everywhere.
 */
export const SLUG_MAX = 60;
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Routes and files that already exist (or must never be shadowed). Built-in page keys come from the route table. */
export const reservedSlugs: readonly string[] = [...pageKeys, "admin", "api", "en", "bs", "sitemap", "robots", "icon", "images", "favicon", "not-found"];

export const isValidSlug = (v: unknown): v is string => typeof v === "string" && v.length <= SLUG_MAX && SLUG.test(v);

/** True when the slug can be used for a new page (format and not reserved). Uniqueness is checked against the database separately. */
export function validateSlugFormat(value: string | null | undefined): true | string {
  const v = (value ?? "").trim();
  if (!v) return "Enter the page address, e.g. offers.";
  if (v.length > SLUG_MAX) return `Keep the address to ${SLUG_MAX} characters or fewer.`;
  if (!SLUG.test(v)) return "Use lowercase letters, digits and single hyphens only (no spaces, accents or slashes), e.g. summer-offers.";
  if (reservedSlugs.includes(v)) return `“${v}” is already used by the website. Choose another address.`;
  return true;
}
