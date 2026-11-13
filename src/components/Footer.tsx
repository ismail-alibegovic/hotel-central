import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import type { Dictionary } from "@/content/dictionary";
import { builtInContact, type HotelContact } from "@/cms/hotelInfoMerge";
import { booking, hotel } from "@/content/hotel";
import { href, type Locale } from "@/lib/i18n";
import { DecorativeLine } from "./DecorativeLine";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Arrow } from "./ui";

export function Footer({
  locale,
  dict,
  social = [{ label: "Facebook", href: hotel.facebook }],
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
    <footer className="relative overflow-hidden bg-deep text-white">
      <DecorativeLine variant="footer" tone="light" className="z-0" opacity={0.7} />

      {/* Reservations strip */}
      <div className="relative z-[1] grid gap-6 border-b border-white/15 px-[var(--gutter)] py-8 md:grid-cols-[1fr_auto] md:items-center md:py-7">
        <div className="label flex flex-col gap-1 md:flex-row md:gap-10">
          <span className="opacity-55">{f.reservations}</span>
          <span className="opacity-90">{f.reservationsBody}</span>
        </div>
        <div className="flex flex-wrap items-center gap-6">
          <a href={contact.phone.href} className="label link-line">
            {contact.phone.display}
          </a>
          <a href={booking.bookingUrl} target="_blank" rel="noopener noreferrer" className="pill pill-light">
            <span>{dict.nav.book}</span>
            <Arrow />
          </a>
        </div>
      </div>

      {/* Logo (CH-018: the large typographic statement is replaced by the hotel's logo, at a modest size) and the two in-house brands */}
      <div className="relative z-[1] flex flex-col gap-10 px-[var(--gutter)] pb-10 pt-12 md:flex-row md:items-end md:justify-between md:pb-12 md:pt-16">
        <Link href={href(locale)} aria-label={`${hotel.name} — ${f.home}`} className="block w-[min(300px,70vw)] md:w-[340px]">
          <Image src="/brand/hotel-central-wordmark-white.png" alt={hotel.name} width={1120} height={235} sizes="340px" className="h-auto w-full" />
        </Link>
        <div className="flex items-center gap-6 md:gap-8">
          <Link href={href(locale, "/centralfitnessclub")} className="block opacity-90 transition-opacity hover:opacity-100" aria-label="Central Fitness Club">
            <Image src="/brand/central-fitness-club-white.svg" alt="Central Fitness Club" width={628} height={740} className="h-[72px] w-auto md:h-[84px]" unoptimized />
          </Link>
          <span aria-hidden className="h-14 w-px bg-white/20" />
          <Link href={href(locale, "/dayspa")} className="block overflow-hidden opacity-90 transition-opacity hover:opacity-100" aria-label="Central Day Spa">
            <Image src="/brand/day-spa.png" alt="Day Spa — Hotel Central Sarajevo" width={652} height={468} sizes="120px" className="h-[72px] w-auto md:h-[84px]" />
          </Link>
        </div>
      </div>

      {/* Information */}
      <div className="relative z-[1] grid grid-cols-2 gap-x-6 gap-y-10 border-t border-white/15 px-[var(--gutter)] py-10 md:grid-cols-[1.1fr_1fr_1.4fr_0.8fr_0.8fr] md:py-12">
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
              {p.label && <span className="opacity-50">{p.label} </span>}
              <a href={p.href} className="link-line">
                {p.display}
              </a>
            </p>
          ))}
          {contact.emails.slice(1).map((e) => (
            <p key={e.address}>
              {e.label && <span className="opacity-50">{e.label} </span>}
              <a href={`mailto:${e.address}`} className="link-line normal-case tracking-[0.06em]">
                {e.address}
              </a>
            </p>
          ))}
        </div>
        <nav aria-label={f.explore} className="label col-span-2 md:col-span-1">
          <p className="mb-3 opacity-50">{f.explore}</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-0 md:gap-y-1">
            {dict.nav.items
              .filter((item) => item.href !== "/")
              .flatMap((item) => [item, ...(dict.nav.children?.[item.href] ?? [])])
              .map((item) => (
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
    </footer>
  );
}
