"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import type { DaySpaCopy } from "@/content/dayspa";
import { href, type Locale } from "@/lib/i18n";

type Props = { locale: Locale; c: DaySpaCopy["nav"]; bookingUrl: string; phone: { display: string; href: string } };

/** Day Spa header: transparent over the hero with the light logo, cream and the wine logo once the page scrolls. */
export function DaySpaHeader({ locale, c, bookingUrl, phone }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [openedAt, setOpenedAt] = useState(pathname);
  if (openedAt !== pathname) {
    setOpenedAt(pathname);
    setOpen(false);
  }
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  const solid = scrolled || open;
  const base = href(locale, "/dayspa");
  const links = [
    { href: `${base}#treatments`, label: c.treatments },
    { href: `${base}#prices`, label: c.prices },
    { href: `${base}#packages`, label: c.packages },
    { href: `${base}#about`, label: c.about },
    { href: `${base}#contact`, label: c.contact },
  ];

  return (
    <>
      <a href="#content" className="fixed left-4 top-3 z-[90] -translate-y-24 rounded-full bg-white px-4 py-2 text-sm text-[var(--ds-wine)] transition-transform focus:translate-y-0">
        Skip to content
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-[80] transition-[background-color,box-shadow,color] duration-500 ${
          solid ? "bg-[var(--ds-cream)]/95 text-[var(--ds-wine)] shadow-[0_1px_0_var(--ds-line)] backdrop-blur-md" : "bg-transparent text-white"
        }`}
      >
        <div className="ds-wrap flex h-[74px] items-center justify-between gap-6 md:h-[86px]">
          <Link href={base} className="relative block h-[58px] w-[81px] shrink-0 md:h-[72px] md:w-[100px]" aria-label="Central Day Spa">
            <Image src="/brand/dayspa-on-dark.png" alt="" fill sizes="110px" priority className={`object-contain transition-opacity duration-500 ${solid ? "opacity-0" : "opacity-100"}`} />
            <Image src="/brand/dayspa-on-light.png" alt="" fill sizes="110px" priority className={`object-contain transition-opacity duration-500 ${solid ? "opacity-100" : "opacity-0"}`} />
          </Link>

          <nav aria-label="Central Day Spa" className="hidden items-center gap-7 text-[14px] lg:flex">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="ds-link py-1">
                {l.label}
              </a>
            ))}
            <Link href={href(locale)} className="ds-link py-1 opacity-75">
              ← {c.hotel}
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitcher locale={locale} label={c.language} className="hidden !text-[11px] sm:flex" />
            <a href={phone.href} className={`hidden rounded-full px-4 py-2.5 text-[13px] xl:inline-flex ${solid ? "bg-[var(--ds-lilac-soft)]" : "bg-white/10 ring-1 ring-white/30 backdrop-blur-sm"}`}>
              ✆ {phone.display}
            </a>
            <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className={`ds-btn hidden !min-h-[44px] md:inline-flex ${solid ? "" : "ds-btn--light"}`}>
              {c.book}
              <i aria-hidden className="!h-8 !w-8">→</i>
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="ds-menu"
              className="flex h-11 items-center gap-2 rounded-full px-3 text-[14px] lg:hidden"
            >
              <span aria-hidden className="relative block h-[10px] w-5">
                <span className={`absolute left-0 h-px w-full bg-current transition-transform duration-500 ${open ? "top-1/2 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 h-px w-full bg-current transition-transform duration-500 ${open ? "top-1/2 -rotate-45" : "bottom-0"}`} />
              </span>
              {open ? c.close : c.menu}
            </button>
          </div>
        </div>
      </header>

      <div
        id="ds-menu"
        hidden={!open}
        className="fixed inset-0 z-[70] overflow-y-auto bg-[var(--ds-cream)] pt-[90px] text-[var(--ds-wine)] lg:hidden"
      >
        <nav aria-label="Central Day Spa" className="ds-wrap flex flex-col gap-1 pb-10">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={close} className="ds-display border-b border-[var(--ds-line)] py-4 text-[30px]">
              {l.label}
            </a>
          ))}
          <Link href={href(locale)} onClick={close} className="py-5 text-[15px] opacity-75">
            ← {c.hotel}
          </Link>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="ds-btn">
              {c.book}
              <i aria-hidden>→</i>
            </a>
            <a href={phone.href} className="text-[15px]">
              ✆ {phone.display}
            </a>
          </div>
          <LanguageSwitcher locale={locale} label={c.language} className="mt-8" />
        </nav>
      </div>
    </>
  );
}
