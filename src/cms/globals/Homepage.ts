import type { Field, GlobalConfig } from "payload";
import { isStaff, publishedOrStaff } from "../access";
import { factRows, imageField, textRows } from "../blocks/config";
import { seoFields } from "../collections/seoFields";
import { blockEditorPublishGlobal, requireEditorDraftGlobal } from "../hooks/globalGuards";
import { adminOnlyPublish } from "./adminOnlyPublish";
import { statusNote } from "../admin/fields";
import { revalidateHomeAfterChange } from "../hooks/revalidateGlobal";

const t = (name: string, label: string, description?: string): Field => ({ name, type: "text", localized: true, label, ...(description ? { admin: { description } } : {}) });
const area = (name: string, label: string, description?: string): Field => ({ name, type: "textarea", localized: true, label, ...(description ? { admin: { description } } : {}) });
const lines = (name: string, label: string): Field => area(name, label, "Each new line of text becomes a new line, as in the design.");
/** Replacement photograph: empty = the photograph that is on the website now. */
const photo = (name: string, label: string): Field => ({ ...imageField(name, { label, required: true }), admin: { description: "Leave empty to keep the current photo." } });

/**
 * The home page. Every text and photograph of the existing composition can be changed; nothing about the layout, the
 * animations, the booking form or the links can. Anything left empty keeps the built-in text or photograph, so the page
 * can never come out blank, and with the CMS off (or unreachable) the home page is the static one.
 */
export const Homepage: GlobalConfig = {
  slug: "homepage",
  label: "Homepage",
  admin: { group: false, hideAPIURL: true, description: "The texts and photos of the homepage. Empty fields keep the current ones.", components: adminOnlyPublish },
  // Not staffUpdate (see Navigation): editors are held to drafts by the hooks.
  access: { read: publishedOrStaff, update: isStaff },
  versions: { drafts: { autosave: { interval: 1500, showSaveDraftButton: true } }, max: 25 },
  hooks: {
    beforeOperation: [requireEditorDraftGlobal],
    beforeChange: [blockEditorPublishGlobal],
    afterChange: [revalidateHomeAfterChange],
  },
  fields: [
    statusNote,
    ...seoFields({ socialImage: true }).filter((f) => (f as { name?: string }).name !== "noindex"),
    {
      name: "hero",
      type: "group",
      label: "1 · Top of the page",
      fields: [t("label", "Small label above the name"), lines("title", "Name (two lines)"), t("tagline", "Tagline"), area("note", "Note under the tagline"), photo("image", "Background photo")],
    },
    {
      name: "hotel",
      type: "group",
      label: "2 · The hotel",
      fields: [
        t("metaLeft", "Top strip — left"),
        t("metaCenter", "Top strip — centre"),
        t("metaIndex", "Top strip — number"),
        t("metaRight", "Top strip — right"),
        t("metaRightSub", "Top strip — right, second line"),
        lines("title", "Heading"),
        area("body", "Text"),
        t("cta", "Button"),
        photo("imageLeft", "Photo — left"),
        photo("imageCenter", "Photo — centre"),
        photo("imageRight", "Photo — right"),
      ],
    },
    {
      name: "rooms",
      type: "group",
      label: "3 · Rooms and suites",
      admin: { description: "The rooms themselves, their order and their photos are edited under Rooms." } as never,
      fields: [t("metaLeft", "Top strip — left"), t("metaCenter", "Top strip — centre"), t("metaIndex", "Number"), t("metaRight", "Word before the room number"), area("body", "Text")],
    },
    {
      name: "spa",
      type: "group",
      label: "4 · Club & Spa",
      fields: [
        t("metaLeft", "Top strip — left"),
        t("metaCenter", "Top strip — centre"),
        t("metaRight", "Top strip — right"),
        lines("title", "Heading"),
        area("body", "Text"),
        textRows("facts", ["Item", "Short list"], "Short list under the text."),
        t("cta", "Button"),
        photo("imageMain", "Large photo"),
        photo("imageSecondary", "Small photo"),
      ],
    },
    {
      name: "restaurant",
      type: "group",
      label: "5 · Restaurant",
      fields: [
        t("metaLeft", "Top strip — left"),
        t("metaCenter", "Top strip — centre"),
        t("metaRight", "Top strip — right"),
        lines("title", "Heading"),
        area("body", "Text"),
        area("body2", "Second text"),
        t("cta", "Button"),
        photo("imageMain", "Large photo"),
        photo("imageCoffee", "Second photo"),
        photo("imageBuffet", "Small photo"),
      ],
    },
    {
      name: "location",
      type: "group",
      label: "6 · Location",
      fields: [
        t("metaLeft", "Top strip — left"),
        t("metaCenter", "Top strip — centre"),
        t("metaRight", "Top strip — right"),
        lines("title", "Heading"),
        area("body", "Text"),
        factRows("facts", ["Fact", "Facts (label / value)"]),
        t("cta", "Link"),
        photo("image", "Small photo"),
      ],
    },
    {
      name: "events",
      type: "group",
      label: "7 · Meetings & events",
      fields: [
        t("metaLeft", "Top strip — left"),
        t("metaCenter", "Top strip — centre"),
        t("metaRight", "Top strip — right"),
        lines("title", "Heading"),
        area("body", "Text"),
        t("cta", "Button"),
        photo("imageMain", "Large photo"),
        photo("imageSecondary", "Small photo"),
      ],
    },
    {
      name: "final",
      type: "group",
      label: "8 · Reservations (end of the page)",
      admin: { description: "The booking button always opens the hotel's booking system; only its wording can be changed." } as never,
      fields: [t("label", "Small label"), lines("title", "Heading"), area("body", "Text"), t("cta", "Button wording"), photo("image", "Background photo")],
    },
  ],
};
