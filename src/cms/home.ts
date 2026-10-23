import "server-only";
import type { Dictionary } from "@/content/dictionary";
import type { Locale } from "@/lib/i18n";
import { getCmsGlobal } from "./data";
import { mergeHome, type HomeContent } from "./homeMerge";

/** Home page content for a locale: built-in text and photographs with the published (or, for previewing staff, draft) CMS values laid over them. */
export async function getHome(locale: Locale, dict: Dictionary): Promise<HomeContent & { draft: boolean }> {
  const doc = await getCmsGlobal("homepage", locale);
  return { ...mergeHome(dict, doc), draft: doc?._status === "draft" };
}
