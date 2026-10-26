/**
 * Validation for Hotel Information, shared by the admin form (so staff see the problem while typing) and by the
 * website (so a value that somehow got stored anyway is ignored and the verified built-in value is shown instead).
 * Pure functions, no Payload or React imports.
 */

/** Digits, spaces and the usual separators, an optional leading "+", 6–15 digits (the international maximum is 15). */
export function phoneProblem(value: string | null | undefined): string | null {
  const v = (value ?? "").trim();
  if (!v) return "Please enter the phone number.";
  if (!/^\+?[0-9][0-9 ()\-./]*[0-9]$/.test(v)) return "Use digits, spaces and the signs + ( ) - . / only, for example “+387 33 561 800”.";
  const digits = v.replace(/\D/g, "").length;
  if (digits < 6 || digits > 15) return "A phone number has between 6 and 15 digits. Please check it.";
  return null;
}

/** The link behind a phone number, derived from what staff typed ("+387 33 561 800" → "tel:+38733561800"); never typed separately. */
export const phoneHref = (display: string) => `tel:${display.trim().startsWith("+") ? "+" : ""}${display.replace(/\D/g, "")}`;

const EMAIL = /^[^\s@<>()[\]"',;:\\]+@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)*\.[A-Za-z]{2,}$/;
export function emailProblem(value: string | null | undefined): string | null {
  const v = (value ?? "").trim();
  if (!v) return "Please enter the e-mail address.";
  if (v.length > 254 || !EMAIL.test(v)) return "This does not look like an e-mail address, for example “info@hotelcentral.ba”.";
  return null;
}

/** "07:00 – 22:00", "7.00-22.00", "07:00 – 15:00, 18:00 – 23:00", "00:00 – 24:00". */
const TIME = "(?:[01]?\\d|2[0-4])[:.][0-5]\\d";
const RANGE = `${TIME}\\s*[–—-]\\s*${TIME}`;
const HOURS = new RegExp(`^${RANGE}(?:\\s*,\\s*${RANGE})*$`);
export function hoursProblem(value: string | null | undefined, closed: boolean | null | undefined): string | null {
  if (closed) return null;
  const v = (value ?? "").trim();
  if (!v) return "Enter the opening hours, for example “07:00 – 22:00”, or tick “Closed”.";
  if (!HOURS.test(v)) return "Write the hours like “07:00 – 22:00”. Several periods are separated by commas: “07:00 – 15:00, 18:00 – 23:00”.";
  return null;
}

/** Shown on the website the same way in both languages: "07:00 – 22:00" (24-hour clock, en dash, colon). */
export const formatHours = (value: string) =>
  value
    .trim()
    .split(/\s*,\s*/)
    .map((r) => r.replace(/\s*[–—-]\s*/, " – ").replace(/(\d{1,2})[:.](\d{2})/g, (_, h: string, m: string) => `${h.padStart(2, "0")}:${m}`))
    .join(", ");

/** The address is used only when the street, postal code and city are all present (a half-changed address would be wrong). */
export function addressProblem(a: { street?: string | null; postalCode?: string | null; city?: string | null } | null | undefined): string | null {
  const filled = [a?.street, a?.postalCode, a?.city].map((v) => Boolean(v && v.trim()));
  if (filled.every(Boolean) || !filled.some(Boolean)) return null;
  return "Please fill in the street, the postal code and the city together (or leave all three empty to keep the current address).";
}
