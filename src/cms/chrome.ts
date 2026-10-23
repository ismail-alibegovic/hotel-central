import "server-only";
import type { Dictionary } from "@/content/dictionary";
import type { Locale } from "@/lib/i18n";
import { type SocialLink, mergeChrome } from "./chromeMerge";
import { getCmsGlobal } from "./data";

/** Header, menu and footer text for a locale: built-in dictionary with published (or, for previewing staff, draft) CMS values laid over it. */
export async function getChrome(locale: Locale, dict: Dictionary): Promise<{ dict: Dictionary; social: SocialLink[] }> {
  const [nav, foot] = await Promise.all([getCmsGlobal("navigation", locale), getCmsGlobal("footer", locale)]);
  return mergeChrome(locale, dict, nav, foot);
}
