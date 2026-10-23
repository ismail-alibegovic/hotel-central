import type { HomeImages, ImgOverride } from "@/components/home/homeImages";
import type { Dictionary } from "@/content/dictionary";
import type { Homepage } from "@/payload-types";
import { resolveImage } from "./resolve";

const text = (v: string | null | undefined) => (v && v.trim() ? v.trim() : undefined);
const lines = (v: string | null | undefined) => {
  const l = (v ?? "").split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
  return l.length ? l : undefined;
};
const rows = (xs: { text?: string | null }[] | null | undefined) => {
  const out = (xs ?? []).map((r) => text(r.text)).filter((t): t is string => Boolean(t));
  return out.length ? out : undefined;
};
const facts = (xs: { k?: string | null; v?: string | null }[] | null | undefined) => {
  const out = (xs ?? []).filter((f) => text(f.k) && text(f.v)).map((f) => ({ k: f.k!.trim(), v: f.v!.trim() }));
  return out.length ? out : undefined;
};
const image = (raw: Parameters<typeof resolveImage>[0]): ImgOverride | undefined => {
  const r = resolveImage(raw);
  return r ? { src: r.src, alt: r.alt, ...(r.position ? { position: r.position } : {}) } : undefined;
};
const drop = <T extends Record<string, unknown>>(o: T): T => Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined)) as T;

export type HomeContent = { dict: Dictionary; images: HomeImages; meta: { title: string; description: string; ogImage?: string } };

/**
 * The built-in dictionary with the home page's CMS values laid over it, field by field: empty or missing keeps the
 * built-in text (so an untranslated language shows the built-in text of that language, never the other one), lists replace
 * the built-in list only when they have usable rows. Photographs are overrides only where an editor chose one.
 */
export function mergeHome(dict: Dictionary, doc: Homepage | null): HomeContent {
  const meta = { title: dict.meta.title, description: dict.meta.description };
  if (!doc) return { dict, images: {}, meta };
  const h = dict.home;
  const g = {
    hero: doc.hero ?? {},
    hotel: doc.hotel ?? {},
    rooms: doc.rooms ?? {},
    spa: doc.spa ?? {},
    restaurant: doc.restaurant ?? {},
    location: doc.location ?? {},
    events: doc.events ?? {},
    final: doc.final ?? {},
  };
  const home: Dictionary["home"] = {
    heroLabel: text(g.hero.label) ?? h.heroLabel,
    heroTitle: lines(g.hero.title) ?? h.heroTitle,
    heroTagline: text(g.hero.tagline) ?? h.heroTagline,
    heroNote: text(g.hero.note) ?? h.heroNote,
    hotel: {
      metaLeft: text(g.hotel.metaLeft) ?? h.hotel.metaLeft,
      metaCenter: text(g.hotel.metaCenter) ?? h.hotel.metaCenter,
      metaIndex: text(g.hotel.metaIndex) ?? h.hotel.metaIndex,
      metaRight: text(g.hotel.metaRight) ?? h.hotel.metaRight,
      metaRightSub: text(g.hotel.metaRightSub) ?? h.hotel.metaRightSub,
      title: lines(g.hotel.title) ?? h.hotel.title,
      body: text(g.hotel.body) ?? h.hotel.body,
      cta: text(g.hotel.cta) ?? h.hotel.cta,
    },
    rooms: {
      metaLeft: text(g.rooms.metaLeft) ?? h.rooms.metaLeft,
      metaCenter: text(g.rooms.metaCenter) ?? h.rooms.metaCenter,
      body: text(g.rooms.body) ?? h.rooms.body,
      metaIndex: text(g.rooms.metaIndex) ?? h.rooms.metaIndex,
      metaRight: text(g.rooms.metaRight) ?? h.rooms.metaRight,
    },
    spa: {
      metaLeft: text(g.spa.metaLeft) ?? h.spa.metaLeft,
      metaCenter: text(g.spa.metaCenter) ?? h.spa.metaCenter,
      metaRight: text(g.spa.metaRight) ?? h.spa.metaRight,
      title: lines(g.spa.title) ?? h.spa.title,
      body: text(g.spa.body) ?? h.spa.body,
      facts: rows(g.spa.facts) ?? h.spa.facts,
      cta: text(g.spa.cta) ?? h.spa.cta,
    },
    restaurant: {
      metaLeft: text(g.restaurant.metaLeft) ?? h.restaurant.metaLeft,
      metaCenter: text(g.restaurant.metaCenter) ?? h.restaurant.metaCenter,
      metaRight: text(g.restaurant.metaRight) ?? h.restaurant.metaRight,
      title: lines(g.restaurant.title) ?? h.restaurant.title,
      body: text(g.restaurant.body) ?? h.restaurant.body,
      body2: text(g.restaurant.body2) ?? h.restaurant.body2,
      cta: text(g.restaurant.cta) ?? h.restaurant.cta,
    },
    location: {
      metaLeft: text(g.location.metaLeft) ?? h.location.metaLeft,
      metaCenter: text(g.location.metaCenter) ?? h.location.metaCenter,
      metaRight: text(g.location.metaRight) ?? h.location.metaRight,
      title: lines(g.location.title) ?? h.location.title,
      body: text(g.location.body) ?? h.location.body,
      facts: facts(g.location.facts) ?? h.location.facts,
      cta: text(g.location.cta) ?? h.location.cta,
    },
    events: {
      metaLeft: text(g.events.metaLeft) ?? h.events.metaLeft,
      metaCenter: text(g.events.metaCenter) ?? h.events.metaCenter,
      metaRight: text(g.events.metaRight) ?? h.events.metaRight,
      title: lines(g.events.title) ?? h.events.title,
      body: text(g.events.body) ?? h.events.body,
      cta: text(g.events.cta) ?? h.events.cta,
    },
    final: {
      label: text(g.final.label) ?? h.final.label,
      title: lines(g.final.title) ?? h.final.title,
      body: text(g.final.body) ?? h.final.body,
      cta: text(g.final.cta) ?? h.final.cta,
    },
  };
  const images = drop<HomeImages>({
    hero: image(g.hero.image),
    hotelLeft: image(g.hotel.imageLeft),
    hotelCenter: image(g.hotel.imageCenter),
    hotelRight: image(g.hotel.imageRight),
    spaMain: image(g.spa.imageMain),
    spaSecondary: image(g.spa.imageSecondary),
    restaurantMain: image(g.restaurant.imageMain),
    restaurantCoffee: image(g.restaurant.imageCoffee),
    restaurantBuffet: image(g.restaurant.imageBuffet),
    location: image(g.location.image),
    eventsMain: image(g.events.imageMain),
    eventsSecondary: image(g.events.imageSecondary),
    final: image(g.final.image),
  });
  return {
    dict: { ...dict, home },
    images,
    meta: { title: text(doc.metaTitle) ?? meta.title, description: text(doc.metaDescription) ?? meta.description, ogImage: resolveImage(doc.ogImage)?.src },
  };
}
