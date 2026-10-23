import type { linePaths } from "@/components/DecorativeLine";
import type { ResolvedLink } from "../links";

/**
 * Render-ready blocks: everything already localized and validated. Both the static layouts
 * (src/content/layouts.ts) and CMS documents (src/cms/resolve.ts) produce exactly this shape, and one
 * renderer (src/components/blocks/BlockRenderer.tsx) turns it into the existing Hotel Central components.
 */
export type Tone = "ivory" | "deep" | "olive" | "sage" | "ink";
export type Img = { src: string; alt: string; position?: string };
export type Cta = { label: string; link: ResolvedLink };
export type LineVariant = keyof typeof linePaths;

export type HeroBlock = { type: "hero"; image: Img; eyebrow: string; title: string[]; intro?: string; meta?: [string, string, string] };
export type SplitBlock = {
  type: "split";
  label: string;
  index?: string;
  title: string[];
  body: string[];
  tone: Tone;
  reverse: boolean;
  line?: LineVariant;
  images: [Img, Img?];
  primary?: Cta;
  secondary?: Cta;
  facts?: { k: string; v: string }[];
  bullets?: { title: string; items: string[] };
};
export type FactsBlock = { type: "facts"; label: string; items: { k: string; v: string }[] };
export type StatementBlock = { type: "statement"; text: string; label?: string; tone: Tone };
export type GalleryBlock = { type: "gallery"; tone: Tone; label?: string; images: Img[] };
export type FinalBookingBlock = { type: "finalBooking"; image?: string; alt?: string };
export type ArrivalBlock = { type: "arrival"; label: string; transport: { title: string; body: string }[] };
export type ContactBlock = {
  type: "contact";
  office: { label: string; body: string };
  reservations: { label: string; body: string };
  write: { label: string };
  social: { label: string; body: string };
};
export type RoomListBlock = { type: "roomList" };
export type FaqBlock = { type: "faq"; label: string; title?: string[]; items: { q: string; a: string }[] };
export type CtaBlock = { type: "cta"; tone: Tone; label?: string; title: string[]; body?: string; primary?: Cta; secondary?: Cta };
/** Shows the published offers (Offers collection, current language). Renders nothing when there are none. */
export type OffersBlock = { type: "offers"; label: string; title?: string[]; tone: Tone };
export type Offer = { id: string; title: string; summary?: string; validity?: string; image?: Img; cta?: Cta; sample: boolean };

export type Block = HeroBlock | SplitBlock | FactsBlock | StatementBlock | GalleryBlock | FinalBookingBlock | ArrivalBlock | ContactBlock | RoomListBlock | FaqBlock | CtaBlock | OffersBlock;
export type BlockType = Block["type"];
export const blockTypes: BlockType[] = ["hero", "split", "facts", "statement", "gallery", "finalBooking", "arrival", "contact", "roomList", "faq", "cta", "offers"];

export type PageKey = "about" | "rooms" | "spa" | "restaurant" | "meetings-events" | "location" | "contact";
export const pageKeys: PageKey[] = ["about", "rooms", "spa", "restaurant", "meetings-events", "location", "contact"];
export type PageLayout = { blocks: Block[]; meta: { title: string; description: string }; ogImage: string };
