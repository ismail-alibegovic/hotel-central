import Link from "next/link";
import { Fragment } from "react";
import type { Dictionary } from "@/content/dictionary";
import { booking, hotel, maps } from "@/content/hotel";
import { href, type Locale } from "@/lib/i18n";
import { DecorativeLine } from "./DecorativeLine";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { RevealLines } from "./Reveal";
import { Arrow } from "./ui";

export function Footer({ locale, dict, social = [{ label: "Facebook", href: hotel.facebook }] }: { locale: Locale; dict: Dictionary; social?: { label: string; href: string }[] }) {
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
          <a href={hotel.phoneHref} className="label link-line">
            {hotel.phoneDisplay}
          </a>
          <a href={booking.bookingUrl} target="_blank" rel="noopener noreferrer" className="pill pill-light">
            <span>{dict.nav.book}</span>
            <Arrow />
          </a>
        </div>
      </div>

      {/* Typographic statement */}
      <div className="relative z-[1] px-[var(--gutter)] pb-6 pt-14 md:pb-[2vw] md:pt-[5vw]">
        <p aria-hidden className="font-display text-[17vw] leading-[0.84] md:text-[14.5vw]">
          <RevealLines lines={f.statement} lineClassName={["", "pl-[5vw] md:pl-[22vw]"]} />
        </p>
      </div>

      {/* Information */}
      <div className="relative z-[1] grid grid-cols-2 gap-x-6 gap-y-10 border-t border-white/15 px-[var(--gutter)] py-10 md:grid-cols-[1.1fr_1fr_1.4fr_0.8fr_0.8fr] md:py-12">
        <div className="label space-y-1">
          <p className="mb-3 opacity-50">{f.address}</p>
          <p>{hotel.name}</p>
          <address className="not-italic">
            {hotel.street}
            <br />
            {hotel.postalCode} {hotel.city}
            <br />
            {locale === "bs" ? hotel.countryBs : hotel.country}
          </address>
          <a href={maps.directions} target="_blank" rel="noopener noreferrer" className="link-line mt-3 inline-block opacity-80">
            {dict.common.directions}
          </a>
        </div>
        <div className="label space-y-1">
          <p className="mb-3 opacity-50">{f.contact}</p>
          <p>
            <a href={hotel.phoneHref} className="link-line">
              {hotel.phoneDisplay}
            </a>
          </p>
          <p>
            <a href={`mailto:${hotel.email}`} className="link-line normal-case tracking-[0.06em]">
              {hotel.email}
            </a>
          </p>
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
    </footer>
  );
}
