import Image from "next/image";
import Link from "next/link";
import type { HotelContact } from "@/cms/hotelInfoMerge";
import { hotel } from "@/content/hotel";
import { href, type Locale } from "@/lib/i18n";
import { LanguageSwitcher } from "../LanguageSwitcher";
import type { MicroBrand, MicroNavItem } from "./MicroHeader";

/** Footer of a stand-alone brand section: brand logo, its pages, the hotel's contact details and the way back to the hotel. */
export function MicroFooter({
  locale,
  brand,
  items,
  contact,
  part,
  back,
  labels,
}: {
  locale: Locale;
  brand: MicroBrand;
  items: MicroNavItem[];
  contact: HotelContact;
  part: string;
  back: string;
  labels: { address: string; contact: string; explore: string; language: string; rights: string };
}) {
  return (
    <footer className={`${brand.bar}`}>
      <div className="grid gap-12 px-[var(--gutter)] py-14 md:grid-cols-[1.2fr_1fr_1fr_1fr] md:py-16">
        <div className="space-y-6">
          <Image src={brand.logo.src} alt={brand.logo.alt} width={brand.logo.width} height={brand.logo.height} unoptimized={brand.logo.src.endsWith(".svg")} className="h-[96px] w-auto" />
          <p className="body-copy max-w-[30ch] opacity-80">{part}</p>
          <Link href={href(locale)} className="label link-line inline-flex items-center gap-2">
            <span aria-hidden>←</span> {back}
          </Link>
        </div>
        <nav aria-label={labels.explore} className="label">
          <p className="mb-3 opacity-55">{labels.explore}</p>
          <ul className="space-y-2">
            {items.map((i) => (
              <li key={i.href}>
                <Link href={href(locale, i.href)} className="link-line">
                  {i.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="label space-y-1">
          <p className="mb-3 opacity-55">{labels.contact}</p>
          <p>
            <a href={contact.phone.href} className="link-line">
              {contact.phone.display}
            </a>
          </p>
          <p>
            <a href={`mailto:${contact.email}`} className="link-line normal-case tracking-[0.06em]">
              {contact.email}
            </a>
          </p>
        </div>
        <div className="label space-y-1">
          <p className="mb-3 opacity-55">{labels.address}</p>
          <p>{hotel.name}</p>
          <address className="not-italic">
            {contact.street}
            <br />
            {contact.postalCode} {contact.city}
          </address>
          <div className="pt-5">
            <LanguageSwitcher locale={locale} label={labels.language} />
          </div>
        </div>
      </div>
      <p className="label-sm border-t border-current/15 px-[var(--gutter)] py-5 opacity-60">
        © {new Date().getFullYear()} {hotel.name}. {labels.rights}
      </p>
    </footer>
  );
}
