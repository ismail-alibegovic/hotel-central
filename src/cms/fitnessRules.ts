/** "18:30" style times for the class timetable. Pure, so the rule is tested and shared by the admin and the website. */
export const TIME = /^([01]?\d|2[0-3])[:.]([0-5]\d)$/;

export function timeProblem(value: string | null | undefined, required: boolean): string | null {
  const v = (value ?? "").trim();
  if (!v) return required ? "Enter the start time, for example 18:30." : null;
  return TIME.test(v) ? null : "Use 24-hour time with a colon, for example 07:00 or 18:30.";
}

/** "7.5" / "07:05" → "07:05"; null if not a time. */
export function normaliseTime(value: string | null | undefined): string | null {
  const m = (value ?? "").trim().match(TIME);
  return m ? `${m[1].padStart(2, "0")}:${m[2]}` : null;
}
