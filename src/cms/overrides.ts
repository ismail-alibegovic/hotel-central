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

export function roomWithCms(room: Room, doc: CmsRoom | null, locale: Locale): Room {
  if (!doc) return room;
  const paragraphs = (doc.description ?? []).map((p) => text(p.text)).filter((p): p is string => Boolean(p));
  return {
    ...room,
    name: { ...room.name, [locale]: text(doc.name) ?? room.name[locale] },
    feature: { ...room.feature, [locale]: text(doc.feature) ?? room.feature[locale] },
    summary: { ...room.summary, [locale]: text(doc.summary) ?? room.summary[locale] },
    description: { ...room.description, [locale]: paragraphs.length ? paragraphs : room.description[locale] },
  };
}
