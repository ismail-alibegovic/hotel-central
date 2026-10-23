import type { Block, Cta, Img } from "./blocks/types";
import { linkFromHref } from "./links";
import type { Locale } from "@/lib/i18n";

/**
 * Static layout → CMS block data (the migration). Pure, so tests can prove the round trip:
 * resolveLayout(toCmsLayout(staticLayout(page, l)), l) equals staticLayout(page, l) for every page and language.
 */
const rows = (xs: string[] | undefined) => (xs ?? []).map((text) => ({ text }));
const image = (i: Img | undefined) => (i ? { staticPath: i.src.replace(/^\/images\//, ""), alt: i.alt, ...(i.position ? { position: i.position } : {}) } : undefined);
const cta = (c: Cta | undefined, locale: Locale) => (c ? { label: c.label, link: linkFromHref(c.link.href, locale) } : undefined);

type Existing = { id?: string | null; images?: { id?: string | null }[] | null }[] | null | undefined;

/**
 * `existing` = the rows already stored (from the first language): block rows and the rows of the shared
 * gallery list must be addressed by id when adding the second language, otherwise Payload would replace
 * the rows and drop the first language's alt texts.
 */
export function toCmsLayout(blocks: Block[], locale: Locale, existing?: Existing): Record<string, unknown>[] {
  return toRows(blocks, locale).map((row, n) => {
    const prev = existing?.[n];
    if (!prev) return row;
    const images = row.images as { image?: unknown }[] | undefined;
    return { ...row, id: prev.id, ...(images ? { images: images.map((im, k) => ({ ...im, id: prev.images?.[k]?.id })) } : {}) };
  });
}

function toRows(blocks: Block[], locale: Locale): Record<string, unknown>[] {
  return blocks.map((b) => {
    switch (b.type) {
      case "hero":
        return { blockType: "hero", image: image(b.image), eyebrow: b.eyebrow, title: b.title.join("\n"), intro: b.intro, metaLeft: b.meta?.[0], metaCenter: b.meta?.[1], metaRight: b.meta?.[2] };
      case "split":
        return {
          blockType: "split",
          label: b.label,
          index: b.index,
          title: b.title.join("\n"),
          body: rows(b.body),
          tone: b.tone,
          reverse: b.reverse,
          line: b.line,
          image1: image(b.images[0]),
          image2: image(b.images[1]),
          primary: cta(b.primary, locale),
          secondary: cta(b.secondary, locale),
          facts: b.facts,
          bulletsTitle: b.bullets?.title,
          bullets: rows(b.bullets?.items),
        };
      case "facts":
        return { blockType: "facts", label: b.label, items: b.items };
      case "statement":
        return { blockType: "statement", text: b.text, label: b.label, tone: b.tone };
      case "gallery":
        return { blockType: "gallery", tone: b.tone, label: b.label, images: b.images.map((i) => ({ image: image(i) })) };
      case "finalBooking":
        return { blockType: "finalBooking", image: b.image ? image({ src: b.image, alt: b.alt ?? "" }) : undefined };
      case "arrival":
        return { blockType: "arrival", label: b.label, transport: b.transport };
      case "contact":
        return {
          blockType: "contact",
          officeLabel: b.office.label,
          officeBody: b.office.body,
          reservationsLabel: b.reservations.label,
          reservationsBody: b.reservations.body,
          writeLabel: b.write.label,
          socialLabel: b.social.label,
          socialBody: b.social.body,
        };
      case "roomList":
        return { blockType: "roomList" };
    }
  });
}
