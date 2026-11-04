import Link from "next/link";
import { Fragment } from "react";
import type { Dictionary } from "@/content/dictionary";
import { staticSocial } from "@/cms/chromeMerge";
import { builtInContact, type HotelContact } from "@/cms/hotelInfoMerge";
import { booking, hotel } from "@/content/hotel";
import { href, type Locale } from "@/lib/i18n";
import { DecorativeLine } from "./DecorativeLine";
import { FooterFrame } from "./FooterFrame";
import { LanguageSwitcher } from "./LanguageSwitcher";
import Image from "next/image";
import { BrandLogo } from "./BrandLogo";
import { Arrow } from "./ui";

export function Footer({
  locale,
  dict,
  social = staticSocial,
  contact = builtInContact(locale),
}: {
  locale: Locale;
  dict: Dictionary;
  social?: { label: string; href: string }[];
  contact?: HotelContact;
}) {
  const f = dict.footer;
  const year = new Date().getFullYear();
  return (
    <FooterFrame>
      <DecorativeLine variant="footer" tone="light" className="z-0" opacity={0.5} />

      {/* CH-018: the three logos of the house together — Central Fitness Club · Hotel Central · Central Day Spa */}
      <div className="relative z-[1] px-[var(--gutter)] pb-10 pt-14 md:pb-12 md:pt-[5vw]">
        <ul aria-label={f.family} className="flex items-center justify-center gap-5 min-[420px]:gap-8 md:gap-14">
          <li>
            <Link href={href(locale, "/centralfitnessclub")} className="block opacity-85 transition-opacity duration-500 hover:opacity-100">
              <Image src="/brand/central-fitness-club-mark-white.png" alt="Central Fitness Club" width={542} height={640} className="h-[52px] w-auto min-[420px]:h-[60px] md:h-[78px]" />
            </Link>
          </li>
          <li aria-hidden className="h-12 w-px bg-white/25 md:h-16" />
          <li>
            <Link href={href(locale)} aria-label={dict.nav.homeLabel} className="block">
              <BrandLogo variant="full" tone="light" alt="" className="w-[88px] min-[420px]:w-[100px] md:w-[128px]" />
            </Link>
          </li>
          <li aria-hidden className="h-12 w-px bg-white/25 md:h-16" />
          <li>
            <Link href={href(locale, "/dayspa")} className="block opacity-85 transition-opacity duration-500 hover:opacity-100">
              <Image src="/brand/central-day-spa-mark-white.png" alt="Central Day Spa" width={640} height={579} className="h-[46px] w-auto min-[420px]:h-[54px] md:h-[70px]" />
            </Link>
          </li>
        </ul>
      </div>

      {/* Reservations */}
      <div className="relative z-[1] mx-[var(--gutter)] flex flex-col items-center gap-5 border-y border-white/15 py-7 text-center md:flex-row md:justify-between md:text-left">
        <div className="label flex flex-col gap-1 md:flex-row md:gap-10">
          <span className="opacity-55">{f.reservations}</span>
          <span className="opacity-90">{f.reservationsBody}</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6">
          <a href={contact.phone.href} className="label link-line">
            {contact.phone.display}
          </a>
          <a href={booking.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn-book btn-book-light">
            <span>{dict.nav.book}</span>
            <Arrow />
          </a>
        </div>
      </div>

      {/* Information */}
      <div className="relative z-[1] grid grid-cols-2 gap-x-6 gap-y-10 px-[var(--gutter)] py-10 md:grid-cols-[1.1fr_1fr_1.6fr_0.8fr_0.7fr] md:py-12">
        <div className="label space-y-1">
          <p className="mb-3 opacity-50">{f.address}</p>
          <p>{hotel.name}</p>
          <address className="not-italic">
            {contact.street}
            <br />
            {contact.postalCode} {contact.city}
            <br />
            {contact.country}
          </address>
          <a href={contact.directions} target="_blank" rel="noopener noreferrer" className="link-line mt-3 inline-block opacity-80">
            {dict.common.directions}
          </a>
        </div>
        <div className="label space-y-1">
          <p className="mb-3 opacity-50">{f.contact}</p>
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
          {/* Further numbers and addresses from Hotel Information (none by default), each with its label. */}
          {contact.phones.slice(1).map((p) => (
            <p key={p.href}>
              {p.label && <span className="opacity-55">{p.label} </span>}
              <a href={p.href} className="link-line">
                {p.display}
              </a>
            </p>
          ))}
          {contact.emails.slice(1).map((e) => (
            <p key={e.address}>
              {e.label && <span className="opacity-55">{e.label} </span>}
              <a href={`mailto:${e.address}`} className="link-line normal-case tracking-[0.06em]">
                {e.address}
              </a>
            </p>
          ))}
        </div>
        <nav aria-label={f.explore} className="label col-span-2 md:col-span-1">
          <p className="mb-3 opacity-50">{f.explore}</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-0 md:gap-y-1">
            {dict.nav.items.filter((item) => item.href !== "/").map((item) => (
              <li key={item.href}>
                <Link href={href(locale, item.href)} className="link-line py-[7px] md:py-0">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="label">
          <p className="mb-3 opacity-50">{f.follow}</p>
          {social.map((s, i) => (
            <Fragment key={s.href}>
              {i > 0 && <br />}
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-line">
                {s.label}
              </a>
            </Fragment>
          ))}
        </div>
        <div className="label">
          <p className="mb-3 opacity-50">{dict.nav.language}</p>
          <LanguageSwitcher locale={locale} label={dict.nav.language} />
        </div>
      </div>

      <div className="label-sm relative z-[1] flex flex-col gap-2 border-t border-white/15 px-[var(--gutter)] py-5 opacity-60 md:flex-row md:justify-between">
        <p>
          © {year} {hotel.name}. {f.rights}
        </p>
        <p>{f.credits}</p>
      </div>
    </FooterFrame>
  );
}
