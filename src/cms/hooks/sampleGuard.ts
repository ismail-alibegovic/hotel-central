import { APIError, type CollectionBeforeChangeHook } from "payload";

type Row = { blockType?: string; sample?: boolean | null };
const hasSample = (layout: unknown) => Array.isArray(layout) && (layout as Row[]).some((b) => b?.sample === true);

/** Staging may deliberately publish example content to show stakeholders; production never should (cms:preflight flags the switch). */
export const samplePublishAllowed = () => process.env.CMS_ALLOW_SAMPLE_PUBLISH === "true";

/**
 * DEMO / SAMPLE content must never go live by accident. Publishing is refused while any section is still ticked as sample
 * content — whether the request carries the layout (admin form) or only `_status` (API), in which case the layout of the
 * latest saved draft is checked instead. Drafts and previews are unaffected.
 */
export const refuseSamplePublish: CollectionBeforeChangeHook = async ({ data, originalDoc, req }) => {
  if ((data as { _status?: string })._status !== "published" || samplePublishAllowed()) return data;
  let layout: unknown = (data as { layout?: unknown }).layout;
  if (layout === undefined) {
    const id = (originalDoc as { id?: string | number } | undefined)?.id;
    if (id !== undefined) {
      const latest = await req.payload.findVersions({ collection: "pages", where: { parent: { equals: id } }, sort: "-updatedAt", limit: 1, depth: 0, overrideAccess: true, req });
      layout = (latest.docs[0]?.version as { layout?: unknown } | undefined)?.layout ?? (originalDoc as { layout?: unknown }).layout;
    }
  }
  if (hasSample(layout)) {
    throw new APIError("This page still contains DEMO / SAMPLE sections. Replace the example content with real content and untick “DEMO / SAMPLE content” before publishing.", 400);
  }
  return data;
};
