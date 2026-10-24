import type { Field, TextFieldSingleValidation } from "payload";
import { imageField } from "../blocks/config";

/** Search engines show about 60 characters of a title and about 155 of a description; the limits leave a little room. */
export const META_TITLE_MAX = 70;
export const META_DESCRIPTION_MAX = 200;

const capped = (max: number) =>
  ((v: string | null | undefined) => (!v || v.length <= max ? true : `Please keep this to ${max} characters or fewer (it is now ${v.length}).`)) as TextFieldSingleValidation;

/**
 * Search-engine fields shared by pages and rooms. Title and description are written per language and fall
 * back to the built-in copy when empty. "Hide from search engines" applies to the page in both languages:
 * it adds a noindex tag and removes the page from the sitemap.
 */
export function seoFields(opts: { socialImage?: boolean } = {}): Field[] {
  return [
    { name: "metaTitle", type: "text", localized: true, label: "Title in Google results", validate: capped(META_TITLE_MAX), admin: { description: `The title people see in Google results and in the browser tab. Up to ${META_TITLE_MAX} characters. If left empty, the standard title is used.` } },
    { name: "metaDescription", type: "textarea", localized: true, label: "Description in Google results", validate: capped(META_DESCRIPTION_MAX) as never, admin: { description: `One or two sentences shown under the title in Google results. Up to ${META_DESCRIPTION_MAX} characters. If left empty, the standard description is used.` } },
    ...(opts.socialImage ? [imageField("ogImage", { label: "Photo shown when the page is shared on social media (optional)" })] : []),
    { name: "noindex", type: "checkbox", defaultValue: false, label: "Hide this page from Google", admin: { description: "The page will not appear in Google search and is left out of the site map (in both languages). Only use this if you really need to." } } as Field,
  ];
}
