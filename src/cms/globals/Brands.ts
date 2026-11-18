import type { GlobalConfig, TextFieldSingleValidation } from "payload";
import { isStaff, publishedOrStaff } from "../access";
import { statusNote } from "../admin/fields";
import { blockEditorPublishGlobal, requireEditorDraftGlobal } from "../hooks/globalGuards";
import { revalidateGlobalAfterChange } from "../hooks/revalidateGlobal";
import { adminOnlyPublish } from "./adminOnlyPublish";

/**
 * Central Day Spa and Central Fitness Club: the price list, packages, memberships and class timetable that change often.
 * Everything else on those two sites (design, photographs, texts) is built in. Empty lists keep the built-in content, so
 * the sites never show an empty price list. The booking address stays in code (an edit here cannot redirect guests).
 * Editors save drafts; only administrators publish (same rules as Hotel Information).
 */

const asValidate = (fn: (value: string | null | undefined) => string | null) => ((value: string | null | undefined) => fn(value) ?? true) as unknown as TextFieldSingleValidation;

/** "45", "50–80", "1.200" or "1200,50": a number of convertible marks without "KM" (the website adds it). */
export const priceProblem = (v: string | null | undefined): string | null => {
  const s = (v ?? "").trim();
  if (!s) return null;
  return /^\d{1,5}([.,]\d{1,3})?(\s*[–-]\s*\d{1,5}([.,]\d{1,3})?)?$/.test(s) ? null : "Write the price as a number of KM, e.g. “45” or “50–80” (without “KM”).";
};
/** "07:30" style times, 24-hour clock. */
export const timeProblem = (v: string | null | undefined): string | null => {
  const s = (v ?? "").trim();
  if (!s) return null;
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(s) ? null : "Write the time as hours:minutes on the 24-hour clock, e.g. “07:30” or “18:00”.";
};

const common = {
  access: { read: publishedOrStaff, update: isStaff },
  versions: { drafts: { autosave: { interval: 1500, showSaveDraftButton: true } }, max: 25 },
  hooks: { beforeOperation: [requireEditorDraftGlobal], beforeChange: [blockEditorPublishGlobal], afterChange: [revalidateGlobalAfterChange] },
} satisfies Partial<GlobalConfig>;

export const DaySpa: GlobalConfig = {
  slug: "day-spa",
  label: "Central Day Spa",
  admin: {
    group: false,
    hideAPIURL: true,
    description: "The treatments, prices and packages shown on the Central Day Spa page. Leave a list empty to keep the current one.",
    components: adminOnlyPublish,
  },
  ...common,
  fields: [
    statusNote,
    {
      type: "tabs",
      tabs: [
        {
          label: "Treatments & prices",
          description: "One entry per category (Massage, Facial treatments…), each with its treatments. Write names in both languages. A treatment offered in several lengths is entered once per length, one after the other.",
          fields: [
            {
              name: "categories",
              type: "array",
              label: "Categories",
              maxRows: 12,
              labels: { singular: "Category", plural: "Categories" },
              admin: { description: "Drag to change the order. If the list is empty, the current price list is shown." },
              fields: [
                { name: "name", type: "text", localized: true, required: true, label: "Category name", admin: { description: "For example “Massage” / “Masaže”." } },
                { name: "summary", type: "textarea", localized: true, label: "Short description (optional)" },
                { name: "photo", type: "upload", relationTo: "media", label: "Photo (optional)", admin: { description: "Shown next to the price list. If empty, a spa photo is used." } },
                {
                  name: "treatments",
                  type: "array",
                  label: "Treatments",
                  minRows: 1,
                  maxRows: 40,
                  labels: { singular: "Treatment", plural: "Treatments" },
                  fields: [
                    { name: "name", type: "text", localized: true, required: true, label: "Treatment" },
                    { name: "duration", type: "text", label: "Duration (optional)", admin: { description: "For example “30 min” or “2 × 45 min”." } },
                    { name: "price", type: "text", required: true, label: "Price in KM", admin: { description: "Only the number, e.g. “45” or “50–80”." }, validate: asValidate(priceProblem) },
                    { name: "note", type: "text", localized: true, label: "Note (optional)", admin: { description: "A short line under the name, e.g. “for hotel guests and club members”." } },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Packages",
          fields: [
            {
              name: "packages",
              type: "array",
              label: "Packages",
              maxRows: 6,
              labels: { singular: "Package", plural: "Packages" },
              admin: { description: "If the list is empty, the current packages (Detox, Face & Body Glow, Slim & Shape) are shown." },
              fields: [
                { name: "name", type: "text", localized: true, required: true, label: "Package name" },
                { name: "duration", type: "text", label: "Duration (optional)", admin: { description: "For example “75 min”." } },
                { name: "price", type: "text", required: true, label: "Price in KM", validate: asValidate(priceProblem) },
                {
                  name: "includes",
                  type: "array",
                  label: "What is included",
                  maxRows: 8,
                  labels: { singular: "Line", plural: "Lines" },
                  fields: [{ name: "text", type: "text", localized: true, required: true, label: "Line" }],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export const FitnessClub: GlobalConfig = {
  slug: "fitness-club",
  label: "Central Fitness Club",
  admin: {
    group: false,
    hideAPIURL: true,
    description: "Memberships and the class timetable of Central Fitness Club. Leave a list empty to keep what the website shows now.",
    components: adminOnlyPublish,
  },
  ...common,
  fields: [
    statusNote,
    {
      type: "tabs",
      tabs: [
        {
          label: "Memberships",
          description: "Shown on the Membership page. A plan without a price shows “Price on request”.",
          fields: [
            {
              name: "plans",
              type: "array",
              label: "Membership plans",
              maxRows: 6,
              labels: { singular: "Plan", plural: "Plans" },
              admin: { description: "Drag to change the order. If the list is empty, the annual membership with “Price on request” is shown." },
              fields: [
                { name: "name", type: "text", localized: true, required: true, label: "Plan name", admin: { description: "For example “Monthly membership” / “Mjesečna članarina”." } },
                { name: "price", type: "text", label: "Price in KM (optional)", validate: asValidate(priceProblem) },
                { name: "period", type: "text", localized: true, label: "Per (optional)", admin: { description: "For example “month” / “mjesec”." } },
                { name: "highlight", type: "checkbox", label: "Highlight this plan" },
                {
                  name: "features",
                  type: "array",
                  label: "What is included",
                  maxRows: 10,
                  labels: { singular: "Line", plural: "Lines" },
                  fields: [{ name: "text", type: "text", localized: true, required: true, label: "Line" }],
                },
              ],
            },
          ],
        },
        {
          label: "Class timetable",
          description: "The weekly timetable on the Timetable page. Enter the classes, upload a picture of the timetable, or both.",
          fields: [
            { name: "timetableNote", type: "textarea", localized: true, label: "Note above the timetable (optional)", admin: { description: "For example “Timetable for December” or holiday changes." } },
            {
              name: "classes",
              type: "array",
              label: "Classes",
              maxRows: 80,
              labels: { singular: "Class", plural: "Classes" },
              admin: { description: "One row per class and day. The website sorts them by day and time." },
              fields: [
                { name: "day", type: "select", required: true, label: "Day", options: DAYS.map((d, i) => ({ label: d, value: String(i) })) },
                { name: "time", type: "text", required: true, label: "Start time", admin: { description: "24-hour clock, e.g. “18:00”." }, validate: asValidate(timeProblem) },
                { name: "name", type: "text", required: true, label: "Class", admin: { description: "For example “Pilates” or “Aqua aerobic”." } },
                { name: "duration", type: "text", label: "Length (optional)", admin: { description: "For example “45 min”." } },
                { name: "room", type: "text", localized: true, label: "Where (optional)", admin: { description: "For example “Studio” / “Sala” or “Pool” / “Bazen”." } },
                { name: "trainer", type: "text", label: "Trainer (optional)" },
              ],
            },
            { name: "timetableImage", type: "upload", relationTo: "media", label: "Timetable picture (optional)", admin: { description: "If you already make the monthly timetable as a picture, upload it here. It is shown under the classes, or on its own." } },
          ],
        },
      ],
    },
  ],
};
