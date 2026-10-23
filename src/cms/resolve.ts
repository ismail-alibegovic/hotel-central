import type { Media, Page } from "@/payload-types";
import type { Block, Cta, Img, Tone } from "./blocks/types";
import { resolveLink } from "./links";
import { staticImages } from "./staticImages";
import type { Locale } from "@/lib/i18n";

type RawBlock = NonNullable<Page["layout"]>[number];
type RawImage = { staticPath?: string | null; upload?: string | Media | null; alt?: string | null; position?: string | null } | null | undefined;

const text = (v: string | null | undefined) => (v && v.trim() ? v.trim() : undefined);
const lines = (v: string | null | undefined) => {
  const l = (v ?? "").split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
  return l.length ? l : undefined;
};
const rows = (xs: { text?: string | null }[] | null | undefined) => (xs ?? []).map((r) => text(r.text)).filter((t): t is string => Boolean(t));
const tone = (t: string | null | undefined): Tone => (t === "deep" || t === "olive" || t === "sage" || t === "ink" ? t : "ivory");
const LINES = ["hotel", "rooms", "spa", "restaurant", "location"] as const;

/** An uploaded photo wins over a site photograph; unknown site photographs and unpopulated uploads are rejected. */
export function resolveImage(raw: RawImage): Img | null {
  if (!raw) return null;
  const position = text(raw.position);
  const u = raw.upload;
  if (u && typeof u === "object" && u.url) return { src: u.url, alt: text(raw.alt) ?? text(u.alt) ?? "", ...(position ? { position } : {}) };
  const p = raw.staticPath;
  if (p && (staticImages as readonly string[]).includes(p)) return { src: `/images/${p}`, alt: text(raw.alt) ?? "", ...(position ? { position } : {}) };
  return null;
}

function cta(raw: { label?: string | null; link?: { kind?: string | null; value?: string | null } | null } | null | undefined, locale: Locale): Cta | undefined {
  const label = text(raw?.label);
  const link = resolveLink(raw?.link, locale);
  return label && link ? { label, link } : undefined;
}

/**
 * Turn the editor's layout for one locale into render-ready blocks. A block that is not usable in this
 * language (required text or photograph missing) is skipped and reported in `skipped` — an untranslated
 * section never shows empty headings, and never shows the other language by accident.
 */
export function resolveLayout(layout: Page["layout"], locale: Locale): { blocks: Block[]; skipped: string[] } {
  const blocks: Block[] = [];
  const skipped: string[] = [];
  (layout ?? []).forEach((raw: RawBlock, i) => {
    const skip = (why: string) => skipped.push(`#${i} ${raw.blockType}: ${why}`);
    switch (raw.blockType) {
      case "hero": {
        const image = resolveImage(raw.image);
        const title = lines(raw.title);
        const eyebrow = text(raw.eyebrow);
        if (!image || !title || !eyebrow) return skip("needs photograph, eyebrow and title");
        const meta = [raw.metaLeft, raw.metaCenter, raw.metaRight].map((m) => text(m) ?? "");
        blocks.push({ type: "hero", image, eyebrow, title, intro: text(raw.intro), meta: meta.some(Boolean) ? (meta as [string, string, string]) : undefined });
        return;
      }
      case "split": {
        const main = resolveImage(raw.image1);
        const title = lines(raw.title);
        const label = text(raw.label);
        if (!main || !title || !label) return skip("needs photograph, label and title");
        const second = resolveImage(raw.image2);
        const facts = (raw.facts ?? []).filter((f) => text(f.k) && text(f.v)).map((f) => ({ k: f.k.trim(), v: f.v.trim() }));
        const bulletItems = rows(raw.bullets);
        blocks.push({
          type: "split",
          label,
          index: text(raw.index),
          title,
          body: rows(raw.body),
          tone: tone(raw.tone),
          reverse: Boolean(raw.reverse),
          line: (LINES as readonly string[]).includes(raw.line ?? "") ? (raw.line as (typeof LINES)[number]) : undefined,
          images: second ? [main, second] : [main],
          primary: cta(raw.primary, locale),
          secondary: cta(raw.secondary, locale),
          facts: facts.length ? facts : undefined,
          bullets: bulletItems.length && text(raw.bulletsTitle) ? { title: text(raw.bulletsTitle)!, items: bulletItems } : undefined,
        });
        return;
      }
      case "facts": {
        const items = (raw.items ?? []).filter((f) => text(f.k) && text(f.v)).map((f) => ({ k: f.k.trim(), v: f.v.trim() }));
        const label = text(raw.label);
        if (!label || !items.length) return skip("needs label and facts");
        blocks.push({ type: "facts", label, items });
        return;
      }
      case "statement": {
        const t = text(raw.text);
        if (!t) return skip("needs text");
        blocks.push({ type: "statement", text: t, label: text(raw.label), tone: tone(raw.tone) });
        return;
      }
      case "gallery": {
        const images = (raw.images ?? []).map((g) => resolveImage(g.image)).filter((x): x is Img => Boolean(x)).slice(0, 5);
        if (!images.length) return skip("needs at least one photograph");
        blocks.push({ type: "gallery", tone: tone(raw.tone), label: text(raw.label), images });
        return;
      }
      case "finalBooking": {
        const image = resolveImage(raw.image);
        blocks.push({ type: "finalBooking", ...(image ? { image: image.src, alt: image.alt } : {}) });
        return;
      }
      case "arrival": {
        const label = text(raw.label);
        const transport = (raw.transport ?? []).filter((t) => text(t.title) && text(t.body)).map((t) => ({ title: t.title.trim(), body: t.body.trim() }));
        if (!label || !transport.length) return skip("needs label and options");
        blocks.push({ type: "arrival", label, transport });
        return;
      }
      case "contact": {
        const f = { ol: text(raw.officeLabel), ob: text(raw.officeBody), rl: text(raw.reservationsLabel), rb: text(raw.reservationsBody), wl: text(raw.writeLabel), sl: text(raw.socialLabel), sb: text(raw.socialBody) };
        if (Object.values(f).some((v) => !v)) return skip("needs all labels and texts");
        blocks.push({ type: "contact", office: { label: f.ol!, body: f.ob! }, reservations: { label: f.rl!, body: f.rb! }, write: { label: f.wl! }, social: { label: f.sl!, body: f.sb! } });
        return;
      }
      case "roomList":
        blocks.push({ type: "roomList" });
        return;
    }
  });
  return { blocks, skipped };
}
