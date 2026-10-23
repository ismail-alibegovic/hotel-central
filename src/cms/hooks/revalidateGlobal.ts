import type { GlobalAfterChangeHook } from "payload";
import { revalidatePath } from "next/cache";

/**
 * Navigation and footer are part of the locale layout, so a publish refreshes every page of both languages.
 * Layout tags follow the route pattern ("/[locale]"), not the concrete URL, so revalidatePath("/en", "layout")
 * would miss pages; the documented way to refresh everything under the root layout is ("/", "layout").
 */
export const revalidateGlobalAfterChange: GlobalAfterChangeHook = ({ doc, previousDoc }) => {
  if (doc?._status === "published" || previousDoc?._status === "published") {
    try {
      revalidatePath("/", "layout");
    } catch {
      // Outside a Next request (seed script, tests): nothing to revalidate.
    }
  }
  return doc;
};

/** The home page is two static pages (one per language); a publish refreshes both. */
export const revalidateHomeAfterChange: GlobalAfterChangeHook = ({ doc, previousDoc }) => {
  if (doc?._status === "published" || previousDoc?._status === "published") {
    try {
      for (const l of ["en", "bs"]) revalidatePath(`/${l}`);
    } catch {
      // Outside a Next request (seed script, tests): nothing to revalidate.
    }
  }
  return doc;
};
