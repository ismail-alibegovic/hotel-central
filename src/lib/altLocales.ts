import type { Locale } from "./i18n";

/**
 * Where the current page lives in the other language. Pages created in the CMS can have a different address per
 * language, so the language switcher cannot just swap the prefix. The page publishes its alternates here (client side)
 * and the switcher reads them; without an entry the switcher falls back to swapping the prefix, as for built-in pages.
 * `null` for a language = the page does not exist there, so the switcher goes to that language's home page.
 */
export type AltPaths = Partial<Record<Locale, string | null>>;
let current: AltPaths | null = null;
const listeners = new Set<() => void>();

export const altStore = {
  set(next: AltPaths | null) {
    current = next;
    listeners.forEach((l) => l());
  },
  get: () => current,
  subscribe(l: () => void) {
    listeners.add(l);
    return () => void listeners.delete(l);
  },
};
