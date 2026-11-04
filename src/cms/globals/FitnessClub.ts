import type { GlobalConfig, TextFieldSingleValidation } from "payload";
import { isStaff, publishedOrStaff } from "../access";
import { blockEditorPublishGlobal, requireEditorDraftGlobal } from "../hooks/globalGuards";
import { adminOnlyPublish } from "./adminOnlyPublish";
import { statusNote } from "../admin/fields";
import { revalidateGlobalAfterChange } from "../hooks/revalidateGlobal";
import { timeProblem } from "../fitnessRules";

const asValidate = (fn: (value: string | null | undefined) => string | null) => ((value: string | null | undefined) => fn(value) ?? true) as unknown as TextFieldSingleValidation;

const dayOptions = [
  { label: "Monday / Ponedjeljak", value: "mon" },
  { label: "Tuesday / Utorak", value: "tue" },
  { label: "Wednesday / Srijeda", value: "wed" },
  { label: "Thursday / Četvrtak", value: "thu" },
  { label: "Friday / Petak", value: "fri" },
  { label: "Saturday / Subota", value: "sat" },
  { label: "Sunday / Nedjelja", value: "sun" },
];

/**
 * Central Fitness Club (CH-011, CH-012): the monthly class timetable and the membership options, edited by the hotel's
 * staff in the existing admin (no paid plugin). Editors save drafts; administrators publish (same rules as Hotel
 * Information). While nothing is published the website shows its built-in, verified content: an honest "timetable on its
 * way" message and the membership options without prices.
 */
export const FitnessClub: GlobalConfig = {
  slug: "fitness-club",
  label: "Central Fitness Club",
  admin: {
    group: false,
    hideAPIURL: true,
    description: "The class timetable and the membership options of Central Fitness Club. A change appears on the club's pages once it is published.",
    components: adminOnlyPublish,
  },
  access: { read: publishedOrStaff, update: isStaff },
  versions: { drafts: { autosave: { interval: 1500, showSaveDraftButton: true } }, max: 25 },
  hooks: {
    beforeOperation: [requireEditorDraftGlobal],
    beforeChange: [blockEditorPublishGlobal],
    afterChange: [revalidateGlobalAfterChange],
  },
  fields: [
    statusNote,
    {
      type: "tabs",
      tabs: [
        {
          label: "Class timetable",
          description: "One row per class in the weekly timetable for the month. Class names and notes are written in both languages (switch the language at the top); days and times are shared.",
          fields: [
            { name: "month", type: "text", localized: true, label: "Month shown above the timetable", admin: { description: "For example “November 2026” / “Novembar 2026.”" } },
            { name: "note", type: "textarea", localized: true, label: "Note under the timetable (optional)", admin: { description: "For example holiday changes or “Booking at reception”." } },
            {
              name: "sessions",
              type: "array",
              label: "Classes",
              maxRows: 120,
              labels: { singular: "Class", plural: "Classes" },
              admin: { description: "Add one row per class. The website sorts them by day and start time. Leave the list empty to show the “timetable on its way” message.", initCollapsed: true },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "day", type: "select", required: true, label: "Day", options: dayOptions, admin: { width: "34%" } },
                    { name: "start", type: "text", required: true, label: "Starts", admin: { width: "33%", description: "24-hour time, e.g. 18:30" }, validate: asValidate((v) => timeProblem(v, true)) },
                    { name: "end", type: "text", label: "Ends (optional)", admin: { width: "33%", description: "e.g. 19:15" }, validate: asValidate((v) => timeProblem(v, false)) },
                  ],
                },
                { name: "name", type: "text", localized: true, required: true, label: "Class", admin: { description: "For example “Pilates” or “Aqua aerobic”." } },
                {
                  type: "row",
                  fields: [
                    { name: "instructor", type: "text", label: "Instructor (optional)", admin: { width: "50%" } },
                    { name: "studio", type: "text", localized: true, label: "Where (optional)", admin: { width: "50%", description: "e.g. “Studio” / “Pool”." } },
                  ],
                },
                { name: "note", type: "text", localized: true, label: "Note (optional)", admin: { description: "e.g. “Beginners welcome”." } },
              ],
            },
          ],
        },
        {
          label: "Membership",
          description: "The membership options shown on the Membership page. Leave the list empty to show the built-in options (annual membership and hotel guests) without prices.",
          fields: [
            { name: "membershipNote", type: "textarea", localized: true, label: "Note under the options (optional)", admin: { description: "For example “Prices include VAT” or how to pay." } },
            {
              name: "plans",
              type: "array",
              label: "Membership options",
              maxRows: 8,
              labels: { singular: "Option", plural: "Options" },
              admin: { initCollapsed: true },
              fields: [
                { name: "name", type: "text", localized: true, required: true, label: "Name", admin: { description: "e.g. “Monthly membership” / “Mjesečna članarina”." } },
                {
                  type: "row",
                  fields: [
                    { name: "price", type: "text", localized: true, label: "Price (optional)", admin: { width: "50%", description: "As guests should read it, e.g. “80 KM”. Empty = “Price on request”." } },
                    { name: "period", type: "text", localized: true, label: "Per (optional)", admin: { width: "50%", description: "e.g. “per month” / “mjesečno”." } },
                  ],
                },
                { name: "description", type: "textarea", localized: true, label: "Short description (optional)" },
                {
                  name: "includes",
                  type: "array",
                  label: "What is included",
                  maxRows: 10,
                  labels: { singular: "Item", plural: "Items" },
                  fields: [{ name: "text", type: "text", localized: true, required: true, label: "Item" }],
                },
                { name: "featured", type: "checkbox", label: "Highlight this option", defaultValue: false },
              ],
            },
          ],
        },
      ],
    },
  ],
};
