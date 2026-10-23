import type { GlobalAfterChangeHook } from "payload";
import { revalidatePath } from "next/cache";

/** Navigation and footer are part of the locale layout, so a publish refreshes every page of both languages. */
export const revalidateGlobalAfterChange: GlobalAfterChangeHook = ({ doc, previousDoc }) => {
  if (doc?._status === "published" || previousDoc?._status === "published") {
    try {
      for (const l of ["en", "bs"]) revalidatePath(`/${l}`, "layout");
    } catch {
      // Outside a Next request (seed script, tests): nothing to revalidate.
    }
  }
  return doc;
};
