import type { GlobalConfig, TextFieldSingleValidation } from "payload";
import { isStaff, publishedOrStaff } from "../access";
import { addressProblem, emailProblem, hoursProblem, phoneProblem } from "../hotelInfoRules";
import { blockEditorPublishGlobal, requireEditorDraftGlobal } from "../hooks/globalGuards";
import { adminOnlyPublish } from "./adminOnlyPublish";
import { statusNote } from "../admin/fields";
import { revalidateGlobalAfterChange } from "../hooks/revalidateGlobal";

type Sibling = { siblingData: unknown };
const asValidate = (fn: (value: string | null | undefined, ctx: Sibling) => string | null) =>
  ((value: string | null | undefined, ctx: Sibling) => fn(value, ctx) ?? true) as unknown as TextFieldSingleValidation;

export const FACILITIES = ["reception", "restaurant", "cafe", "spa", "pool", "gym", "other"] as const;
const facilityLabels: Record<(typeof FACILITIES)[number], string> = { reception: "Reception", restaurant: "Restaurant", cafe: "Café", spa: "Spa", pool: "Pool", gym: "Gym / fitness", other: "Other" };

/**
 * The hotel's contact details and opening hours, in one place. Every part of the website that shows the phone number,
 * the e-mail address or the street address reads it from here; anything empty or not valid keeps the verified built-in
 * value from `src/content/hotel.ts`, so the website never shows a blank or broken contact detail.
 *
 * Deliberately NOT here: where the contact form delivers messages (CONTACT_TO, set by a developer), the booking engine
 * address and ids, and anything else about reservations. Those stay in code so an edit here cannot redirect guests.
 *
 * Editors save drafts; only administrators publish (same rules as Navigation, Footer and Homepage).
 */
export const HotelInfo: GlobalConfig = {
  slug: "hotel-info",
  label: "Hotel Information",
  admin: {
    group: false,
    hideAPIURL: true,
    description: "The hotel's phone numbers, e-mail addresses, address and opening hours. A change here updates every page of the website once it is published. Empty fields keep the current details.",
    components: adminOnlyPublish,
  },
  // Not staffUpdate (see Navigation): editors are held to drafts by the hooks.
  access: { read: publishedOrStaff, update: isStaff },
  versions: { drafts: { autosave: { interval: 1500, showSaveDraftButton: true } }, max: 25 },
  hooks: {
    beforeOperation: [requireEditorDraftGlobal],
    beforeChange: [blockEditorPublishGlobal],
    // The details appear in the header menu and footer of every page, so publishing refreshes the whole site.
    afterChange: [revalidateGlobalAfterChange],
  },
  fields: [
    statusNote,
    {
      type: "tabs",
      tabs: [
        {
          label: "Phone numbers",
          description: "The first number is the hotel's main number. It is shown in the menu, the footer, the call button on phones, the booking banner and on the Contact page. Further numbers (for example Spa or Events) are listed in the footer under the main one.",
          fields: [
            {
              name: "phones",
              type: "array",
              label: "Phone numbers",
              maxRows: 6,
              labels: { singular: "Phone number", plural: "Phone numbers" },
              admin: { description: "Drag to change the order. If the list is empty, the current number +387 33 561 800 is used." },
              fields: [
                { name: "number", type: "text", required: true, label: "Phone number", admin: { description: "As guests should see it, with the country code, for example “+387 33 561 800”." }, validate: asValidate((v) => phoneProblem(v)) },
                { name: "label", type: "text", localized: true, label: "What the number is for (optional)", admin: { description: "For example “Reception” / “Recepcija” or “Spa”. Write it in both languages." } },
              ],
            },
          ],
        },
        {
          label: "E-mail addresses",
          description: "The first address is the hotel's main e-mail address. It is shown in the menu, the footer and on the Contact page. Messages sent with the website's contact form are not affected: where they are delivered is set by the developer.",
          fields: [
            {
              name: "emails",
              type: "array",
              label: "E-mail addresses",
              maxRows: 6,
              labels: { singular: "E-mail address", plural: "E-mail addresses" },
              admin: { description: "Drag to change the order. If the list is empty, the current address info@hotelcentral.ba is used." },
              fields: [
                { name: "address", type: "text", required: true, label: "E-mail address", validate: asValidate((v) => emailProblem(v)) },
                { name: "label", type: "text", localized: true, label: "What the address is for (optional)", admin: { description: "For example “Reservations” / “Rezervacije”." } },
              ],
            },
          ],
        },
        {
          label: "Address",
          description: "The hotel's street address, shown in the footer, the menu, on the Location and Contact pages, and used for the map and the “Directions” link. Leave all fields empty to keep the current address (Ćumurija 8, 71000 Sarajevo).",
          fields: [
            {
              name: "address",
              type: "group",
              label: "Address",
              fields: [
                { name: "street", type: "text", label: "Street and number", validate: asValidate((_, { siblingData }) => addressProblem(siblingData as never)) },
                { name: "postalCode", type: "text", label: "Postal code", validate: asValidate((v) => (v && !/^[0-9A-Za-z -]{3,10}$/.test(v.trim()) ? "Please check the postal code, for example “71000”." : null)) },
                { name: "city", type: "text", label: "City" },
                { name: "country", type: "text", localized: true, label: "Country", admin: { description: "Per language: “Bosnia and Herzegovina” / “Bosna i Hercegovina”. If empty, the current wording is used." } },
              ],
            },
          ],
        },
        {
          label: "Opening hours",
          description: "Opening hours for each part of the hotel. The day names and notes are written in both languages; the times are shared.",
          fields: [
            {
              name: "hours",
              type: "array",
              label: "Opening hours",
              maxRows: 12,
              labels: { singular: "Place", plural: "Places" },
              admin: { description: "Add one entry per place (Reception, Restaurant, Spa…). Drag to change the order." },
              fields: [
                { name: "facility", type: "select", required: true, label: "Place", options: FACILITIES.map((f) => ({ label: facilityLabels[f], value: f })), admin: { description: "Used to show the right hours on the right page." } },
                { name: "name", type: "text", localized: true, required: true, label: "Name shown to guests", admin: { description: "For example “Reception” / “Recepcija” or “Club & Spa”." } },
                {
                  name: "rows",
                  type: "array",
                  label: "Days and hours",
                  minRows: 1,
                  maxRows: 8,
                  labels: { singular: "Line", plural: "Lines" },
                  fields: [
                    { name: "days", type: "text", localized: true, required: true, label: "Days", admin: { description: "For example “Monday – Friday” / “Ponedjeljak – petak” or “Every day” / “Svaki dan”." } },
                    { name: "time", type: "text", label: "Hours", admin: { description: "24-hour clock, for example “07:00 – 22:00”, or “07:00 – 15:00, 18:00 – 23:00”. Leave empty if closed." }, validate: asValidate((v, { siblingData }) => hoursProblem(v, (siblingData as { closed?: boolean }).closed)) },
                    { name: "closed", type: "checkbox", defaultValue: false, label: "Closed on these days" },
                  ],
                },
                { name: "note", type: "textarea", localized: true, label: "Note (optional)", admin: { description: "For example “Different hours on public holidays.”" } },
              ],
            },
          ],
        },
      ],
    },
  ],
};
