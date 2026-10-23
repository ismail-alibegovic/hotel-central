import type { CollectionConfig, TextFieldSingleValidation } from "payload";
import { adminFieldAccess, isAdmin, publishedOrStaff, staffUpdate } from "../access";
import { blocks } from "../blocks/config";
import { blockEditorPublish, requireEditorDraft } from "../hooks/blockEditorPublish";
import { revalidateCustomPageAfterChange, revalidateCustomPageAfterDelete } from "../hooks/revalidate";
import { refuseSamplePublish } from "../hooks/sampleGuard";
import { validateSlugFormat } from "../slugs";
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
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "_status", "updatedAt"],
    description: "Pages you add to the website. Each language has its own address, e.g. /en/offers and /bs/ponude.",
  },
  access: { read: publishedOrStaff, create: isAdmin, update: staffUpdate, delete: isAdmin },
  versions: { drafts: { localizeStatus: true, autosave: { interval: 1500, showSaveDraftButton: true } }, maxPerDoc: 25 },
  hooks: {
    beforeOperation: [requireEditorDraft],
    beforeChange: [blockEditorPublish, refuseSamplePublish],
    afterChange: [revalidateCustomPageAfterChange],
    afterDelete: [revalidateCustomPageAfterDelete],
  },
  fields: [
    { name: "title", type: "text", localized: true, required: true, label: "Page name", admin: { description: "Used in the admin and as the browser-tab title unless a search-engine title is set." } },
    {
      name: "slug",
      type: "text",
      localized: true,
      required: true,
      index: true,
      label: "Address (per language)",
      access: { create: adminFieldAccess, update: adminFieldAccess },
      admin: { description: "Lowercase letters, digits and hyphens, no accents: offers, summer-offers. A language without an address does not show this page." },
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
    ...seoFields({ socialImage: true }),
    { name: "layout", type: "blocks", blocks, minRows: 1, label: "Page sections", admin: { description: "Add, remove and reorder sections. Text is edited per language (switch language at the top); the section structure is shared." } },
  ],
};
