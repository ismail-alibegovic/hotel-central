import type { GlobalConfig } from "payload";
import { isStaff, publishedOrStaff } from "../access";
import { blockEditorPublishGlobal, requireEditorDraftGlobal } from "../hooks/globalGuards";
import { adminOnlyPublish } from "./adminOnlyPublish";
import { statusNote } from "../admin/fields";
import { revalidateGlobalAfterChange } from "../hooks/revalidateGlobal";

/**
 * Central Day Spa (CH-013): the treatment price list, edited by staff in the existing admin. Editors save drafts;
 * administrators publish. While no price list is published, the website shows the verified October 2026 list built into
 * the code (src/content/dayspa.ts). Booking stays with the spa's existing Lime Booking form, phone and e-mail.
 */
export const DaySpa: GlobalConfig = {
  slug: "day-spa",
  label: "Central Day Spa",
  admin: {
    group: false,
    hideAPIURL: true,
    description: "The treatments and prices of Central Day Spa. A change appears on the spa page once it is published. Leave the list empty to keep the current price list (October 2026).",
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
    { name: "updated", type: "text", localized: true, label: "Price list date", admin: { description: "Shown above the prices, e.g. “November 2026” / “Novembar 2026.”" } },
    { name: "note", type: "textarea", localized: true, label: "Note under the price list (optional)" },
    {
      name: "categories",
      type: "array",
      label: "Treatment categories",
      maxRows: 20,
      labels: { singular: "Category", plural: "Categories" },
      admin: { description: "Drag to change the order. Names are written in both languages; durations and prices are shared.", initCollapsed: true },
      fields: [
        { name: "name", type: "text", localized: true, required: true, label: "Category", admin: { description: "e.g. “Massages” / “Masaže”." } },
        { name: "intro", type: "textarea", localized: true, label: "Short introduction (optional)" },
        {
          name: "items",
          type: "array",
          label: "Treatments",
          minRows: 1,
          maxRows: 40,
          labels: { singular: "Treatment", plural: "Treatments" },
          admin: { initCollapsed: true },
          fields: [
            { name: "name", type: "text", localized: true, required: true, label: "Treatment" },
            {
              type: "row",
              fields: [
                { name: "duration", type: "text", label: "Duration (optional)", admin: { width: "50%", description: "e.g. “45 min” or “60 min (30+30)”." } },
                { name: "price", type: "text", required: true, label: "Price", admin: { width: "50%", description: "As guests should read it, e.g. “65 KM” or “50–80 KM”." } },
              ],
            },
            {
              name: "includes",
              type: "array",
              label: "Included in a package (optional)",
              maxRows: 8,
              labels: { singular: "Part", plural: "Parts" },
              fields: [{ name: "text", type: "text", localized: true, required: true, label: "Part" }],
            },
          ],
        },
      ],
    },
  ],
};
