import type { ArrayField, Block, Field, GroupField, TextFieldSingleValidation } from "payload";
import { validateLink } from "../links";
import { staticImages } from "../staticImages";

const imageOptions = staticImages.map((f) => ({ label: f, value: f }));
const toneLabels: Record<string, string> = { ivory: "Light (cream)", deep: "Dark green", olive: "Olive green", sage: "Soft green", ink: "Black" };
const tones = ["ivory", "deep", "olive", "sage", "ink"].map((t) => ({ label: toneLabels[t], value: t }));
const lineLabels: Record<string, string> = { hotel: "Hotel", rooms: "Rooms", spa: "Spa", restaurant: "Restaurant", location: "Location" };
const lines = ["hotel", "rooms", "spa", "restaurant", "location"].map((l) => ({ label: lineLabels[l], value: l }));

export const textRows = (name: string, label: [string, string], description?: string): ArrayField => ({
  name,
  type: "array",
  localized: true,
  labels: { singular: label[0], plural: label[1] },
  admin: description ? { description } : undefined,
  fields: [{ name: "text", type: "textarea", required: true, label: "Text" }],
});

export const factRows = (name: string, label: [string, string]): ArrayField => ({
  name,
  type: "array",
  localized: true,
  labels: { singular: label[0], plural: label[1] },
  fields: [
    { name: "k", type: "text", required: true, label: "Name" },
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
    { name: "staticPath", type: "select", options: imageOptions, label: "Photo already on the website", admin: { description: "Pick one of the photos that are already on the website. A preview appears below." } },
    { name: "staticPreview", type: "ui", admin: { components: { Field: "/cms/admin/StaticImagePreview#StaticImagePreview" } } },
    { name: "upload", type: "upload", relationTo: "media", label: "Or upload a new photo", admin: { description: "If you choose a photo here, it is used instead of the one in the list above." } },
    {
      name: "alt",
      type: "text",
      localized: true,
      label: "Photo description (for visually impaired visitors)",
      admin: { description: "One short sentence saying what is in the photo. Write it separately for Bosnian and English." },
      validate: ((value: string | null | undefined, { siblingData }: { siblingData: unknown }) => {
        const s = siblingData as { staticPath?: string; upload?: unknown };
        return opts.required && (s.staticPath || s.upload) && !value ? "Please add a short description of the photo (needed for accessibility)." : true;
      }) as TextFieldSingleValidation,
    },
    { name: "position", type: "text", label: "Which part of the photo stays in view (optional)", admin: { description: "For example “50% 40%”. Decides which part of the photo stays visible when it is cropped. Leave empty if unsure." }, validate: ((v: string | null | undefined) => (!v || POSITION.test(v) ? true : "Use the form “50% 40%”.")) as TextFieldSingleValidation },
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
      label: "Link type",
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
      label: "Where it goes",
      admin: { description: "A page on this site (/rooms), a web address (https://…), a phone number (+387 33 561 800) or an e-mail address. Other websites must be on the approved list." },
      validate: ((value: string | null | undefined, { siblingData }: { siblingData: unknown }) => validateLink((siblingData as { kind?: string }).kind, value)) as TextFieldSingleValidation,
    },
  ],
});

const cta = (name: string, label: string): GroupField => ({
  name,
  type: "group",
  label,
  fields: [{ name: "label", type: "text", localized: true, label: "Button text" }, linkField("link", "Where it goes")],
});

/**
 * Button for the new sections. "Use the hotel's booking button" takes the destination from code (the booking
 * engine address and ids are never typed by editors); otherwise a validated link is used.
 */
const action = (name: string, label: string): GroupField => ({
  name,
  type: "group",
  label,
  fields: [
    { name: "label", type: "text", localized: true, label: "Button text" },
    { name: "useBooking", type: "checkbox", defaultValue: false, label: "Use the hotel's booking button", admin: { description: "Opens the booking system. The address is fixed and cannot be changed here." } },
    { ...linkField("link", "Or another place to go to"), admin: { condition: (_: unknown, sibling: { useBooking?: boolean }) => !sibling?.useBooking } },
  ],
});

const sampleField: Field = {
  name: "sample",
  type: "checkbox",
  defaultValue: false,
  label: "Example content (DEMO / SAMPLE)",
  admin: { description: "Tick this if the content is only an example. A visible “DEMO / SAMPLE” label is shown and the page cannot be published until you untick it." },
};

const titleField: Field = { name: "title", type: "textarea", localized: true, required: true, label: "Heading", admin: { description: "The large heading. Each new line of text becomes a new line of the heading." } };

export const blocks: Block[] = [
  {
    slug: "hero",
    labels: { singular: "Large photo with heading", plural: "Large photos with heading" },
    fields: [
      imageField("image", { required: true, label: "Photo" }),
      { name: "eyebrow", type: "text", localized: true, required: true, label: "Small text above the heading" },
      titleField,
      { name: "intro", type: "textarea", localized: true, label: "Short introduction" },
      { name: "metaLeft", type: "text", localized: true, label: "Bottom strip — left" },
      { name: "metaCenter", type: "text", localized: true, label: "Bottom strip — middle", admin: { description: "{roomCount} is replaced automatically by the number of rooms shown on the website." } },
      { name: "metaRight", type: "text", localized: true, label: "Bottom strip — right" },
    ],
  },
  {
    slug: "split",
    labels: { singular: "Text with photos", plural: "Text with photos" },
    fields: [
      { name: "label", type: "text", localized: true, required: true, label: "Small label above the heading" },
      { name: "index", type: "text", localized: true, label: "Small note in the corner (optional)" },
      titleField,
      textRows("body", ["Paragraph", "Paragraphs"]),
      { name: "tone", type: "select", defaultValue: "ivory", options: tones, label: "Background colour" },
      { name: "reverse", type: "checkbox", defaultValue: false, label: "Show the large photo on the right" },
      { name: "line", type: "select", options: lines, label: "Decorative line" },
      imageField("image1", { required: true, label: "Large photo" }),
      imageField("image2", { label: "Small photo (optional)" }),
      cta("primary", "Main button (optional)"),
      cta("secondary", "Text link next to the button (optional)"),
      factRows("facts", ["Fact", "Facts (name / value list)"]),
      { name: "bulletsTitle", type: "text", localized: true, label: "Short list — heading" },
      textRows("bullets", ["Item", "Short list — items"]),
    ],
  },
  {
    slug: "facts",
    labels: { singular: "List of facts", plural: "Lists of facts" },
    fields: [{ name: "label", type: "text", localized: true, required: true, label: "List heading" }, factRows("items", ["Fact", "Facts"])],
  },
  {
    slug: "statement",
    labels: { singular: "Highlighted sentence", plural: "Highlighted sentences" },
    fields: [
      { name: "text", type: "textarea", localized: true, required: true, label: "Text" },
      { name: "label", type: "text", localized: true, label: "Small label (optional)" },
      { name: "tone", type: "select", defaultValue: "ivory", options: tones, label: "Background colour" },
    ],
  },
  {
    slug: "gallery",
    labels: { singular: "Photo gallery (up to 5 photos)", plural: "Photo galleries" },
    fields: [
      { name: "tone", type: "select", defaultValue: "ivory", options: tones, label: "Background colour" },
      { name: "label", type: "text", localized: true, label: "Gallery heading (optional)" },
      { name: "images", type: "array", minRows: 1, maxRows: 5, label: "Photos", labels: { singular: "Photo", plural: "Photos" }, fields: [imageField("image", { required: true, label: "Photo" })] },
    ],
  },
  {
    slug: "finalBooking",
    labels: { singular: "“Book your stay” banner", plural: "“Book your stay” banners" },
    fields: [imageField("image", { label: "Background photo (optional; a default photo is used if empty)" })],
  },
  {
    slug: "arrival",
    labels: { singular: "Map and how to arrive", plural: "Maps and how to arrive" },
    fields: [
      { name: "label", type: "text", localized: true, required: true, label: "Heading" },
      {
        name: "transport",
        type: "array",
        localized: true,
        label: "Ways to arrive",
        labels: { singular: "Way to arrive", plural: "Ways to arrive" },
        fields: [
          { name: "title", type: "text", required: true, label: "Heading" },
          { name: "body", type: "textarea", required: true, label: "Directions" },
        ],
      },
    ],
  },
  {
    slug: "contact",
    labels: { singular: "Contact details and message form", plural: "Contact details and message forms" },
    fields: [
      { name: "officeLabel", type: "text", localized: true, required: true, label: "Reception — heading" },
      { name: "officeBody", type: "textarea", localized: true, required: true, label: "Reception — address and opening hours" },
      { name: "reservationsLabel", type: "text", localized: true, required: true, label: "Reservations — heading" },
      { name: "reservationsBody", type: "textarea", localized: true, required: true, label: "Reservations — phone and e-mail" },
      { name: "writeLabel", type: "text", localized: true, required: true, label: "Message form — heading" },
      { name: "socialLabel", type: "text", localized: true, required: true, label: "Social media — heading" },
      { name: "socialBody", type: "textarea", localized: true, required: true, label: "Social media — text" },
    ],
  },
  // Shows every visible room in its CMS order; the rooms themselves are edited in the Rooms collection.
  { slug: "roomList", labels: { singular: "List of rooms", plural: "Lists of rooms" }, fields: [{ name: "note", type: "text", label: "Note", admin: { description: "Rooms are edited under “Rooms”. There is nothing to fill in here.", readOnly: true } }] },
  {
    slug: "offers",
    labels: { singular: "Special offers (cards)", plural: "Special offers (cards)" },
    fields: [
      sampleField,
      { name: "label", type: "text", localized: true, required: true, label: "Small label above the heading" },
      titleField,
      { name: "intro", type: "textarea", localized: true, label: "Short introduction" },
      { name: "tone", type: "select", defaultValue: "ivory", options: tones, label: "Background colour" },
      { name: "validityLabel", type: "text", localized: true, label: "Word before the validity period", admin: { description: "If empty, “Valid” / “Važi” is used." } },
      { name: "priceLabel", type: "text", localized: true, label: "Word before the price", admin: { description: "If empty, “Price” / “Cijena” is used." } },
      {
        name: "items",
        type: "array",
        required: true,
        minRows: 1,
        maxRows: 6,
        label: "Offers",
        labels: { singular: "Offer", plural: "Offers" },
        fields: [
          imageField("image", { label: "Photo (optional)" }),
          { name: "tag", type: "text", localized: true, label: "Small tag (optional)" },
          { name: "title", type: "text", localized: true, required: true, label: "Offer name" },
          { name: "description", type: "textarea", localized: true, required: true, label: "Offer description" },
          { name: "validity", type: "text", localized: true, label: "When it is valid (optional)", admin: { description: "Free text written by the hotel, for example a season or a date range." } },
          { name: "priceNote", type: "text", localized: true, label: "Price (optional)", admin: { description: "Only enter real prices approved by the hotel. Never copy example prices." } },
          action("cta", "Button (optional)"),
        ],
      },
    ],
  },
  {
    slug: "faq",
    labels: { singular: "Frequently asked questions", plural: "Frequently asked questions" },
    fields: [
      sampleField,
      { name: "label", type: "text", localized: true, required: true, label: "Small label above the heading" },
      titleField,
      { name: "tone", type: "select", defaultValue: "ivory", options: tones, label: "Background colour" },
      {
        name: "items",
        type: "array",
        required: true,
        minRows: 1,
        maxRows: 20,
        label: "Questions and answers",
        labels: { singular: "Question", plural: "Questions" },
        fields: [
          { name: "q", type: "text", localized: true, required: true, label: "Question" },
          { name: "a", type: "textarea", localized: true, required: true, label: "Answer", admin: { description: "A new line of text starts a new paragraph." } },
        ],
      },
    ],
  },
  {
    slug: "cta",
    labels: { singular: "Banner with a button", plural: "Banners with a button" },
    fields: [
      sampleField,
      { name: "label", type: "text", localized: true, label: "Small label above the heading" },
      titleField,
      { name: "body", type: "textarea", localized: true, label: "Text" },
      { name: "tone", type: "select", defaultValue: "deep", options: tones, label: "Background colour" },
      action("primary", "Main button"),
      action("secondary", "Text link next to it (optional)"),
    ],
  },
];
