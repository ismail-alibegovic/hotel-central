import type { Page, Room as CmsRoom } from "@/payload-types";
import type { getPages } from "@/content/pages";
import type { Room } from "@/content/rooms";
import type { Locale } from "@/lib/i18n";

type About = ReturnType<typeof getPages>["about"];

const text = (v: string | null | undefined) => (v && v.trim() ? v.trim() : undefined);
const lines = (v: string | null | undefined) => {
  const l = (v ?? "").split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
  return l.length ? l : undefined;
};

/** CMS text replaces static copy only where the editor filled it in; everything else stays as authored in code. */
export function aboutWithCms(about: About, doc: Page | null): About {
  if (!doc) return about;
  return {
    ...about,
    meta: { title: text(doc.metaTitle) ?? about.meta.title, description: text(doc.metaDescription) ?? about.meta.description },
    hero: {
      eyebrow: text(doc.heroEyebrow) ?? about.hero.eyebrow,
      title: lines(doc.heroTitle) ?? about.hero.title,
      intro: text(doc.heroIntro) ?? about.hero.intro,
    },
  };
}

const texts = (rows: { text?: string | null }[] | null | undefined) => (rows ?? []).map((r) => text(r.text)).filter((t): t is string => Boolean(t));

/** Photographs chosen in the CMS (populated media docs). Absent/unpopulated entries are skipped. */
function cmsImages(gallery: CmsRoom["gallery"], locale: Locale, fallbackAlt: string): Room["images"] {
  const out: Room["images"] = [];
  for (const g of gallery ?? []) {
    const m = g.image;
    if (!m || typeof m !== "object" || !m.url) continue;
    const alt = text(m.alt) ?? fallbackAlt;
    out.push({ src: m.url, alt: { en: alt, bs: alt }, position: undefined });
  }
  void locale;
  return out;
}

/**
 * Merge one CMS room into its static counterpart for `locale`. Identity, booking mapping and size always
 * come from code: the CMS can only supply copy, photographs, order and visibility.
 */
export function roomWithCms(room: Room, doc: CmsRoom | null, locale: Locale): Room {
  if (!doc) return room;
  const paragraphs = texts(doc.description);
  const highlights = texts(doc.highlights);
  const amenities = texts(doc.amenities);
  const title = lines(doc.titleLines);
  const name = text(doc.name) ?? room.name[locale];
  const images = cmsImages(doc.gallery, locale, name);
  return {
    ...room,
    name: { ...room.name, [locale]: name },
    titleLines: { ...room.titleLines, [locale]: title ?? room.titleLines[locale] },
    feature: { ...room.feature, [locale]: text(doc.feature) ?? room.feature[locale] },
    sizeLabel: { ...room.sizeLabel, [locale]: text(doc.sizeLabel) ?? room.sizeLabel[locale] },
    summary: { ...room.summary, [locale]: text(doc.summary) ?? room.summary[locale] },
    description: { ...room.description, [locale]: paragraphs.length ? paragraphs : room.description[locale] },
    highlights: { ...room.highlights, [locale]: highlights.length ? highlights : room.highlights[locale] },
    amenities: { ...room.amenities, [locale]: amenities.length ? amenities : room.amenities[locale] },
    images: images.length ? images : room.images,
  };
}

/**
 * The room list for a locale: static rooms merged with their CMS documents, hidden rooms removed, ordered
 * by the CMS `order` (rooms without one keep their static position). With no documents this returns the
 * static list unchanged (same array contents, same order).
 */
export function mergeRooms(base: Room[], docs: CmsRoom[], locale: Locale): Room[] {
  const bySlug = new Map(docs.map((d) => [d.slug, d]));
  return base
    .map((room, i) => ({ room: roomWithCms(room, bySlug.get(room.slug) ?? null, locale), doc: bySlug.get(room.slug), pos: bySlug.get(room.slug)?.order ?? i + 1 }))
    .filter((x) => x.doc?.visible !== false)
    .sort((a, b) => a.pos - b.pos)
    .map((x) => x.room);
}
