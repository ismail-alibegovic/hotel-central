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

/**
 * Offers, FAQ and call-to-action sections. `sample` marks DEMO / SAMPLE content: it renders an unmissable badge and
 * can not be published unless the environment explicitly allows it (see src/cms/hooks/sampleGuard.ts).
 */
export type OfferItem = { title: string; description: string; tag?: string; validity?: string; priceNote?: string; image?: Img; cta?: Cta };
export type OffersBlock = { type: "offers"; label: string; title: string[]; intro?: string; tone: Tone; sample: boolean; validityLabel: string; priceLabel: string; items: OfferItem[] };
export type FaqBlock = { type: "faq"; label: string; title: string[]; tone: Tone; sample: boolean; items: { q: string; a: string[] }[] };
export type CtaBlock = { type: "cta"; label?: string; title: string[]; body?: string; tone: Tone; sample: boolean; primary: Cta; secondary?: Cta };

export type Block = HeroBlock | SplitBlock | FactsBlock | StatementBlock | GalleryBlock | FinalBookingBlock | ArrivalBlock | ContactBlock | RoomListBlock | OffersBlock | FaqBlock | CtaBlock;
export type BlockType = Block["type"];
export const blockTypes: BlockType[] = ["hero", "split", "facts", "statement", "gallery", "finalBooking", "arrival", "contact", "roomList", "offers", "faq", "cta"];

export type PageKey = "about" | "rooms" | "spa" | "restaurant" | "meetings-events" | "location" | "contact";
export const pageKeys: PageKey[] = ["about", "rooms", "spa", "restaurant", "meetings-events", "location", "contact"];
export type PageLayout = { blocks: Block[]; meta: { title: string; description: string }; ogImage: string };
