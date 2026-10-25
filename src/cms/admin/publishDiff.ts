/**
 * What will go live when an administrator publishes: the saved draft compared with the published version, field by field and
 * language by language. Pure (no Payload, no React) so the rules can be tested.
 *
 * Both documents come from the REST API with `locale=all`, so every translated value is an object keyed by language
 * (`{ en: "…", bs: "…" }`), also inside rows and sections. Anything else is shared by both languages.
 */
export type LanguageChanges = { shared: string[]; byLanguage: Record<string, string[]> };

type Json = unknown;

/** Technical bookkeeping that is never a content change. */
const IGNORED = new Set(["id", "_id", "__v", "_status", "createdAt", "updatedAt", "publishedAt", "createdBy", "updatedBy", "_verified", "_isLocked"]);

const isPlainObject = (v: Json): v is Record<string, Json> => typeof v === "object" && v !== null && !Array.isArray(v);

/** `{ en, bs }` (any non-empty subset of the languages) is a translated value. */
export function isLanguageMap(v: Json, languages: readonly string[]): v is Record<string, Json> {
  if (!isPlainObject(v)) return false;
  const keys = Object.keys(v);
  return keys.length > 0 && keys.every((k) => languages.includes(k));
}

/** The value as one language sees it: translated values collapse to that language's text, everything else is kept. */
export function inLanguage(v: Json, language: string, languages: readonly string[]): Json {
  if (isLanguageMap(v, languages)) return inLanguage(v[language], language, languages);
  if (Array.isArray(v)) return v.map((x) => inLanguage(x, language, languages));
  if (isPlainObject(v)) return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, inLanguage(x, language, languages)]));
  return v;
}

/** Empty text, an empty list and "nothing" are the same thing to a visitor. */
function normalise(v: Json): Json {
  if (v === null || v === undefined) return undefined;
  if (typeof v === "string") return v.trim() === "" ? undefined : v;
  if (Array.isArray(v)) {
    const items = v.map(normalise).filter((x) => x !== undefined);
    return items.length ? items : undefined;
  }
  if (isPlainObject(v)) {
    const entries = Object.entries(v)
      .map(([k, x]) => [k, normalise(x)] as const)
      .filter(([, x]) => x !== undefined)
      .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));
    return entries.length ? Object.fromEntries(entries) : undefined;
  }
  return v;
}

const same = (a: Json, b: Json) => JSON.stringify(normalise(a)) === JSON.stringify(normalise(b));

/** True when a translated value occurs anywhere inside the value. */
function containsLanguageMap(v: Json, languages: readonly string[]): boolean {
  if (isLanguageMap(v, languages)) return true;
  if (Array.isArray(v)) return v.some((x) => containsLanguageMap(x, languages));
  if (isPlainObject(v)) return Object.values(v).some((x) => containsLanguageMap(x, languages));
  return false;
}

/**
 * Top-level fields that differ between the saved draft and the published version, grouped by language. A field that is
 * not translated anywhere (for example "Show on the website") is listed once as shared. A field with translated parts is
 * listed under each language whose text differs.
 */
export function changedFields(draft: Record<string, Json> | null | undefined, published: Record<string, Json> | null | undefined, languages: readonly string[]): LanguageChanges {
  const result: LanguageChanges = { shared: [], byLanguage: Object.fromEntries(languages.map((l) => [l, [] as string[]])) };
  const d = draft ?? {};
  const p = published ?? {};
  const names = [...new Set([...Object.keys(d), ...Object.keys(p)])].filter((k) => !IGNORED.has(k));
  for (const name of names) {
    if (containsLanguageMap(d[name], languages) || containsLanguageMap(p[name], languages)) {
      for (const language of languages) {
        if (!same(inLanguage(d[name], language, languages), inLanguage(p[name], language, languages))) result.byLanguage[language].push(name);
      }
    } else if (!same(d[name], p[name])) {
      result.shared.push(name);
    }
  }
  return result;
}
