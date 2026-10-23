import "server-only";
import type { Offer, Img } from "./blocks/types";
import { getCmsDocs } from "./data";
import { resolveLink } from "./links";
import { resolveImage } from "./resolve";
import type { Locale } from "@/lib/i18n";

const text = (v: string | null | undefined) => (v && v.trim() ? v.trim() : undefined);

/**
 * Offers to show in a language: published and visible, translated into this language, in CMS order.
 * Empty when the CMS is off or unreachable (an Offers section then simply renders nothing).
 */
export async function getOffers(locale: Locale): Promise<Offer[]> {
  const { docs } = await getCmsDocs("offers", locale);
  return docs
    .filter((d) => d.visible !== false && text(d.title))
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
    .slice(0, 12)
    .map((d) => {
      const image: Img | null = resolveImage(d.image);
      const label = text(d.cta?.label);
      const link = resolveLink(d.cta?.link, locale);
      return {
        id: String(d.id),
        title: text(d.title)!,
        summary: text(d.summary),
        validity: text(d.validity),
        ...(image ? { image } : {}),
        ...(label && link ? { cta: { label, link } } : {}),
        sample: d.sample === true,
      };
    });
}
