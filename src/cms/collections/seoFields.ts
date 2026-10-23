import type { Field, TextFieldSingleValidation } from "payload";
import { imageField } from "../blocks/config";

/** Search engines show about 60 characters of a title and about 155 of a description; the limits leave a little room. */
export const META_TITLE_MAX = 70;
export const META_DESCRIPTION_MAX = 200;

const capped = (max: number) =>
  ((v: string | null | undefined) => (!v || v.length <= max ? true : `Keep it to ${max} characters or fewer (now ${v.length}).`)) as TextFieldSingleValidation;

/**
 * Search-engine fields shared by pages and rooms. Title and description are written per language and fall
 * back to the built-in copy when empty. "Hide from search engines" applies to the page in both languages:
 * it adds a noindex tag and removes the page from the sitemap.
 */
export function seoFields(opts: { socialImage?: boolean } = {}): Field[] {
  return [
    { name: "metaTitle", type: "text", localized: true, label: "Search-engine title", validate: capped(META_TITLE_MAX), admin: { description: `Shown in search results and browser tabs. Up to ${META_TITLE_MAX} characters. Empty = the built-in title.` } },
    { name: "metaDescription", type: "textarea", localized: true, label: "Search-engine description", validate: capped(META_DESCRIPTION_MAX) as never, admin: { description: `One or two sentences shown under the title in search results. Up to ${META_DESCRIPTION_MAX} characters. Empty = the built-in description.` } },
    ...(opts.socialImage ? [imageField("ogImage", { label: "Social-share photograph (optional)" })] : []),
    { name: "noindex", type: "checkbox", defaultValue: false, label: "Hide from search engines", admin: { description: "Adds a “do not index” tag and removes the page from the sitemap (both languages)." } } as Field,
  ];
}
