import type { ArrayField, Block, Field, GroupField, TextFieldSingleValidation } from "payload";
import { validateLink } from "../links";
import { staticImages } from "../staticImages";

const imageOptions = staticImages.map((f) => ({ label: f, value: f }));
const tones = ["ivory", "deep", "olive", "sage", "ink"].map((t) => ({ label: t === "ivory" ? "Light (ivory)" : t === "deep" ? "Dark green (deep)" : t === "olive" ? "Olive" : t === "sage" ? "Sage" : "Black (ink)", value: t }));
const lines = ["hotel", "rooms", "spa", "restaurant", "location"].map((l) => ({ label: l, value: l }));

const textRows = (name: string, label: [string, string], description?: string): ArrayField => ({
  name,
  type: "array",
  localized: true,
  labels: { singular: label[0], plural: label[1] },
  admin: description ? { description } : undefined,
  fields: [{ name: "text", type: "textarea", required: true }],
});

const factRows = (name: string, label: [string, string]): ArrayField => ({
  name,
  type: "array",
  localized: true,
  labels: { singular: label[0], plural: label[1] },
  fields: [
    { name: "k", type: "text", required: true, label: "Label" },
    { name: "v", type: "text", required: true, label: "Value" },
  ],
});

const POSITION = /^(?:\d{1,3}%|left|center|right) (?:\d{1,3}%|top|center|bottom)$/;

/** One photograph: a site photo from the drop-down OR an uploaded one (upload wins), with alt text per language. */
export const imageField = (name: string, opts: { required?: boolean; label?: string } = {}): GroupField => ({
  name,
  type: "group",
  label: opts.label ?? name,
  fields: [
    { name: "staticPath", type: "select", options: imageOptions, label: "Site photograph", admin: { description: "Photographs already on the website." } },
    { name: "upload", type: "upload", relationTo: "media", label: "Or upload a new photograph", admin: { description: "If set, this is used instead of the site photograph." } },
    {
      name: "alt",
      type: "text",
      localized: true,
      label: "Alt text (describe the image)",
      validate: ((value: string | null | undefined, { siblingData }: { siblingData: unknown }) => {
        const s = siblingData as { staticPath?: string; upload?: unknown };
        return opts.required && (s.staticPath || s.upload) && !value ? "Alt text is required for accessibility." : true;
      }) as TextFieldSingleValidation,
    },
    { name: "position", type: "text", label: "Focus (optional)", admin: { description: "e.g. “50% 40%” — which part stays visible when the photo is cropped." }, validate: ((v: string | null | undefined) => (!v || POSITION.test(v) ? true : "Use the form “50% 40%”.")) as TextFieldSingleValidation },
  ],
});

export const linkField = (name: string, label: string): GroupField => ({
  name,
  type: "group",
  label,
  fields: [
    {
      name: "kind",
      type: "select",
      options: [
        { label: "Page on this site", value: "internal" },
        { label: "Approved external website (https)", value: "external" },
        { label: "Phone number", value: "phone" },
        { label: "E-mail address", value: "email" },
      ],
    },
    {
      name: "value",
      type: "text",
      admin: { description: "Site path (/rooms), https address, phone (+387 33 561 800) or e-mail. External sites must be on the approved list." },
      validate: ((value: string | null | undefined, { siblingData }: { siblingData: unknown }) => validateLink((siblingData as { kind?: string }).kind, value)) as TextFieldSingleValidation,
    },
  ],
});

const cta = (name: string, label: string): GroupField => ({
  name,
  type: "group",
  label,
  fields: [{ name: "label", type: "text", localized: true }, linkField("link", "Destination")],
});

const titleField: Field = { name: "title", type: "textarea", localized: true, required: true, admin: { description: "Large heading, one line per row." } };

export const blocks: Block[] = [
  {
    slug: "hero",
    labels: { singular: "Hero (photograph + title)", plural: "Heroes" },
    fields: [
      imageField("image", { required: true, label: "Photograph" }),
      { name: "eyebrow", type: "text", localized: true, required: true },
      titleField,
      { name: "intro", type: "textarea", localized: true },
      { name: "metaLeft", type: "text", localized: true, label: "Bottom strip — left" },
      { name: "metaCenter", type: "text", localized: true, label: "Bottom strip — centre", admin: { description: "{roomCount} is replaced by the number of visible rooms." } },
      { name: "metaRight", type: "text", localized: true, label: "Bottom strip — right" },
    ],
  },
  {
    slug: "split",
    labels: { singular: "Text + photographs", plural: "Text + photographs" },
    fields: [
      { name: "label", type: "text", localized: true, required: true },
      { name: "index", type: "text", localized: true, label: "Corner note (optional)" },
      titleField,
      textRows("body", ["Paragraph", "Paragraphs"]),
      { name: "tone", type: "select", defaultValue: "ivory", options: tones },
      { name: "reverse", type: "checkbox", defaultValue: false, label: "Photograph on the right" },
      { name: "line", type: "select", options: lines, label: "Decorative line" },
      imageField("image1", { required: true, label: "Large photograph" }),
      imageField("image2", { label: "Small photograph (optional)" }),
      cta("primary", "Main button (optional)"),
      cta("secondary", "Text link next to the button (optional)"),
      factRows("facts", ["Fact", "Facts (label / value list)"]),
      { name: "bulletsTitle", type: "text", localized: true, label: "Short list — heading" },
      textRows("bullets", ["Item", "Short list — items"]),
    ],
  },
  {
    slug: "facts",
    labels: { singular: "Facts section", plural: "Facts sections" },
    fields: [{ name: "label", type: "text", localized: true, required: true }, factRows("items", ["Fact", "Facts"])],
  },
  {
    slug: "statement",
    labels: { singular: "Large statement", plural: "Large statements" },
    fields: [
      { name: "text", type: "textarea", localized: true, required: true },
      { name: "label", type: "text", localized: true },
      { name: "tone", type: "select", defaultValue: "ivory", options: tones },
    ],
  },
  {
    slug: "gallery",
    labels: { singular: "Photo gallery (up to 5)", plural: "Photo galleries" },
    fields: [
      { name: "tone", type: "select", defaultValue: "ivory", options: tones },
      { name: "label", type: "text", localized: true },
      { name: "images", type: "array", minRows: 1, maxRows: 5, labels: { singular: "Photograph", plural: "Photographs" }, fields: [imageField("image", { required: true })] },
    ],
  },
  {
    slug: "finalBooking",
    labels: { singular: "Booking call-to-action", plural: "Booking calls-to-action" },
    fields: [imageField("image", { label: "Background photograph (optional; default if empty)" })],
  },
  {
    slug: "arrival",
    labels: { singular: "Map + how to arrive", plural: "Map + how to arrive" },
    fields: [
      { name: "label", type: "text", localized: true, required: true },
      {
        name: "transport",
        type: "array",
        localized: true,
        labels: { singular: "Option", plural: "Ways to arrive" },
        fields: [
          { name: "title", type: "text", required: true },
          { name: "body", type: "textarea", required: true },
        ],
      },
    ],
  },
  {
    slug: "contact",
    labels: { singular: "Contact details + form", plural: "Contact sections" },
    fields: [
      { name: "officeLabel", type: "text", localized: true, required: true },
      { name: "officeBody", type: "textarea", localized: true, required: true },
      { name: "reservationsLabel", type: "text", localized: true, required: true },
      { name: "reservationsBody", type: "textarea", localized: true, required: true },
      { name: "writeLabel", type: "text", localized: true, required: true },
      { name: "socialLabel", type: "text", localized: true, required: true },
      { name: "socialBody", type: "textarea", localized: true, required: true },
    ],
  },
  // Shows every visible room in its CMS order; the rooms themselves are edited in the Rooms collection.
  { slug: "roomList", labels: { singular: "List of rooms", plural: "Lists of rooms" }, fields: [{ name: "note", type: "text", admin: { description: "Rooms are edited under “Rooms”. Nothing to fill in here.", readOnly: true } }] },
];
