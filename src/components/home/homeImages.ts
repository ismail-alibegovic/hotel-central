/**
 * Homepage photographs the CMS can replace. Every photograph in the home components keeps its built-in file, alt text
 * and focus point as the default; an override only supplies what the editor actually set. With no override the markup is
 * exactly what it was before the CMS existed.
 */
export type ImgOverride = { src?: string; alt?: string; position?: string };
export type HomeImageKey =
  | "hero"
  | "hotelLeft"
  | "hotelCenter"
  | "hotelRight"
  | "spaMain"
  | "spaSecondary"
  | "restaurantMain"
  | "restaurantCoffee"
  | "restaurantBuffet"
  | "location"
  | "eventsMain"
  | "eventsSecondary"
  | "final";
export type HomeImages = Partial<Record<HomeImageKey, ImgOverride>>;

type Default = { src: string; alt: string; position?: string };

/**
 * No override = the built-in photograph, alt text and focus point. With an override the editor's photograph is used with the
 * editor's alt text (never the old photograph's description) and focus point; a decorative duplicate (built-in alt "") stays decorative.
 */
export const img = (o: ImgOverride | undefined, d: Default): Default =>
  o?.src
    ? { src: o.src, alt: d.alt === "" ? "" : (o.alt ?? ""), position: o.position }
    : d;
