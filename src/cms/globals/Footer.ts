import type { GlobalConfig } from "payload";
import { adminFieldAccess, isStaff, publishedOrStaff } from "../access";
import { linkField } from "../blocks/config";
import { blockEditorPublishGlobal, lockStructure, requireEditorDraftGlobal } from "../hooks/globalGuards";
import { adminOnlyPublish } from "./adminOnlyPublish";
import { statusNote } from "../admin/fields";
import { revalidateGlobalAfterChange } from "../hooks/revalidateGlobal";

/**
 * Footer wording (per language, editors as drafts) and social profile links (administrators only).
 * Address, phone and e-mail stay in code on purpose, and so does the booking address.
 * The footer's "Explore" list is the Navigation global's entries.
 */
export const Footer: GlobalConfig = {
  slug: "footer",
  label: "Footer",
  admin: { group: false, hideAPIURL: true, description: "The texts at the bottom of every page and the links to social media. Empty fields use the standard text.", components: adminOnlyPublish },
  // Not staffUpdate: for globals Payload evaluates update access against the stored document, which is "published", and
  // that would make the whole global read-only for editors. Editors are kept to drafts by the hooks below instead.
  access: { read: publishedOrStaff, update: isStaff },
  versions: { drafts: { autosave: { interval: 1500, showSaveDraftButton: true } }, max: 25 },
  hooks: {
    beforeOperation: [requireEditorDraftGlobal],
    beforeChange: [blockEditorPublishGlobal, lockStructure("social", ["link", "label"], "social links")],
    afterChange: [revalidateGlobalAfterChange],
  },
  fields: [
    statusNote,
    { name: "reservations", type: "text", localized: true, label: "Reservations strip — heading" },
    { name: "reservationsBody", type: "textarea", localized: true, label: "Reservations strip — text" },
    { name: "statement", type: "textarea", localized: true, label: "Large statement", admin: { description: "One line per row (the built-in one is “Hotel” / “Central”)." } },
    { name: "addressLabel", type: "text", localized: true, label: "Heading — address" },
    { name: "contactLabel", type: "text", localized: true, label: "Heading — contact" },
    { name: "exploreLabel", type: "text", localized: true, label: "Heading — explore" },
    { name: "followLabel", type: "text", localized: true, label: "Heading — follow" },
    { name: "rights", type: "text", localized: true, label: "Rights line" },
    { name: "credits", type: "text", localized: true, label: "Credits line" },
    {
      name: "social",
      type: "array",
      label: "Social links",
      maxRows: 6,
      labels: { singular: "Link", plural: "Links" },
      access: { create: adminFieldAccess, update: adminFieldAccess },
      admin: { description: "Administrators only. Links must go to websites on the approved list. If left empty, the standard Facebook link is used.", initCollapsed: true },
      fields: [{ name: "label", type: "text", required: true, label: "Name (e.g. Facebook)" }, linkField("link", "Link")],
    },
  ],
};
