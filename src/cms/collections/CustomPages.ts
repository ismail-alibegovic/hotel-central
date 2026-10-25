import type { CollectionConfig, TextFieldSingleValidation } from "payload";
import { adminFieldAccess, isAdmin, publishedOrStaff, staffUpdate } from "../access";
import { blocks } from "../blocks/config";
import { blockEditorPublish, requireEditorDraft } from "../hooks/blockEditorPublish";
import { revalidateCustomPageAfterChange, revalidateCustomPageAfterDelete } from "../hooks/revalidate";
import { refuseSamplePublish } from "../hooks/sampleGuard";
import { validateSlugFormat } from "../slugs";
import { statusNote, draftButtons } from "../admin/fields";
import { seoFields } from "./seoFields";

/**
 * Pages created in the CMS, in addition to the seven built-in pages (which stay in the "Pages" collection and keep their
 * static fallback). Each page has one address per language (`/en/offers`, `/bs/ponude`), shared section structure and
 * per-language text. A language without an address (or without usable sections) simply does not have the page: it answers
 * 404 and is left out of that language's sitemap and language switcher. Unpublished pages are never public.
 *
 * Only administrators create or delete pages and set addresses (so nobody can shadow a route or move a URL by accident);
 * editors write content as drafts, like everywhere else.
 */
export const CustomPages: CollectionConfig = {
  slug: "custom-pages",
  labels: { singular: "New page", plural: "New pages" },
  admin: {
    group: "Website Content",
    hideAPIURL: true,
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "_status", "updatedAt"],
    description: "Pages you add to the website, for example a Special Offers page. Each language has its own page URL, e.g. /en/offers and /bs/ponude. A new page stays a draft until you publish it.",
    components: draftButtons,
  },
  access: { read: publishedOrStaff, create: isAdmin, update: staffUpdate, delete: isAdmin },
  versions: { drafts: { autosave: { interval: 1500, showSaveDraftButton: true } }, maxPerDoc: 25 },
  hooks: {
    beforeOperation: [requireEditorDraft],
    beforeChange: [blockEditorPublish, refuseSamplePublish],
    afterChange: [revalidateCustomPageAfterChange],
    afterDelete: [revalidateCustomPageAfterDelete],
  },
  fields: [
    statusNote,
    {
      type: "tabs",
      tabs: [
        {
          label: "Page Sections",
          description: "The page name and its sections. Text is written separately for each language (switch the language at the top); the order of the sections is shared.",
          fields: [
            { name: "title", type: "text", localized: true, required: true, label: "Page name", admin: { description: "Used in this admin and as the browser-tab title, unless you set a Google title." } },
            { name: "layout", type: "blocks", blocks, minRows: 1, label: "Page Sections", labels: { singular: "Section", plural: "Sections" }, admin: { description: "Add a section (for example “Special offers (cards)”), then fill it in. Drag sections to change their order." } },
          ],
        },
        { label: "Google & Search Appearance", description: "How this page looks in Google search. If left empty, the standard text is used.", fields: seoFields({ socialImage: true }) },
        {
          label: "Page URL",
          description: "An administrator sets the page URL. The page only appears in languages that have a URL.",
          fields: [
            {
              name: "slug",
              type: "text",
              localized: true,
              required: true,
              index: true,
              label: "Page URL (per language)",
              access: { create: adminFieldAccess, update: adminFieldAccess },
              admin: { description: "Lowercase letters, digits and hyphens, no accents or spaces: offers, summer-offers. A language without a URL does not show this page." },
              validate: (async (value: string | null | undefined, { req, id }: { req: { locale?: string | null; payload: { find: (a: unknown) => Promise<{ totalDocs: number }> } }; id?: string | number }) => {
                const format = validateSlugFormat(value);
                if (format !== true) return format;
                const clash = await req.payload.find({
                  collection: "custom-pages",
                  where: { and: [{ slug: { equals: String(value).trim() } }, ...(id !== undefined ? [{ id: { not_equals: id } }] : [])] },
                  locale: req.locale ?? undefined,
                  limit: 1,
                  depth: 0,
                  overrideAccess: true,
                });
                return clash.totalDocs ? "Another page already uses this address in this language." : true;
              }) as unknown as TextFieldSingleValidation,
            },
          ],
        },
      ],
    },
  ],
};
