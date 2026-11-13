"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { href, type Locale } from "@/lib/i18n";
import { LanguageSwitcher } from "../LanguageSwitcher";

export type MicroNavItem = { href: string; label: string };
export type MicroBrand = {
  name: string;
  home: string;
  logo: { src: string; alt: string; width: number; height: number };
  /** Tailwind classes for the bar (background + text colour). */
  bar: string;
  /** Tailwind classes for the primary call to action. */
  cta: string;
};

/**
 * Header of a stand-alone brand section (Central Fitness Club, Central Day Spa): its own logo, its own navigation and
 * call to action, with a quiet utility bar that leads back to Hotel Central and switches language.
 */
export function MicroHeader({
  locale,
  brand,
  items,
  action,
  hotelLabel,
  languageLabel,
  menuLabel,
  skipLabel,
}: {
  locale: Locale;
  brand: MicroBrand;
  items: MicroNavItem[];
  action: { label: string; href: string; external?: boolean };
  hotelLabel: string;
  languageLabel: string;
  menuLabel: string;
  skipLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const current = pathname?.replace(/^\/(en|bs)/, "") || "/";
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const cta = action.external ? (
    <a href={action.href} target="_blank" rel="noopener noreferrer" className={`pill !h-[42px] ${brand.cta}`}>
      <span>{action.label}</span>
    </a>
  ) : (
    <Link href={href(locale, action.href)} className={`pill !h-[42px] ${brand.cta}`}>
      <span>{action.label}</span>
    </Link>
  );

  return (
    <header className={`sticky top-0 z-[70] ${brand.bar}`}>
      <a href="#content" className="label fixed left-4 top-3 z-[80] -translate-y-20 bg-white px-4 py-2 text-black transition-transform focus:translate-y-0">
        {skipLabel}
      </a>
      <div className="label-sm flex items-center justify-between border-b border-current/15 px-[var(--gutter)] py-2 opacity-80">
        <Link href={href(locale)} className="link-line flex items-center gap-2">
          <span aria-hidden>←</span> {hotelLabel}
        </Link>
        <LanguageSwitcher locale={locale} label={languageLabel} className="!text-[10px]" />
      </div>
      <div className="flex h-[76px] items-center justify-between gap-6 px-[var(--gutter)] md:h-[88px]">
        <Link href={href(locale, brand.home)} aria-label={`${brand.name} — ${items[0]?.label ?? ""}`} className="flex shrink-0 items-center">
          <Image src={brand.logo.src} alt={brand.logo.alt} width={brand.logo.width} height={brand.logo.height} priority unoptimized={brand.logo.src.endsWith(".svg")} className="h-[56px] w-auto md:h-[66px]" />
        </Link>
        <nav aria-label={brand.name} className="hidden items-center gap-8 lg:flex">
          {items.map((i) => (
            <Link key={i.href} href={href(locale, i.href)} aria-current={current === i.href ? "page" : undefined} className="label link-line opacity-85 hover:opacity-100 aria-[current=page]:opacity-100">
              {i.label}
            </Link>
          ))}
          {cta}
        </nav>
        <button
          type="button"
          className="label flex min-h-[44px] items-center gap-3 lg:hidden"
          aria-expanded={open}
          aria-controls="micro-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden className="relative block h-[9px] w-[18px]">
            <span className={`absolute left-0 h-px w-full bg-current transition-all ${open ? "top-1/2 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 h-px w-full bg-current transition-all ${open ? "top-1/2 -rotate-45" : "bottom-0"}`} />
          </span>
          {menuLabel}
        </button>
      </div>
      {open && (
        <nav id="micro-menu" aria-label={brand.name} className={`border-t border-current/15 px-[var(--gutter)] pb-8 pt-4 lg:hidden ${brand.bar}`}>
          <ul className="space-y-1">
            {items.map((i) => (
              <li key={i.href}>
                <Link href={href(locale, i.href)} onClick={() => setOpen(false)} aria-current={current === i.href ? "page" : undefined} className="font-display block py-2 text-[34px] leading-none opacity-85 aria-[current=page]:opacity-100">
                  {i.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6" onClick={() => setOpen(false)}>
            {cta}
          </div>
        </nav>
      )}
    </header>
  );
}
