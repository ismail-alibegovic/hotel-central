"use client";

import Image from "next/image";
import { ArrowUpRight } from "@/components/ui";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { DAYSPA_INSTAGRAM, type DaySpaCopy } from "@/content/dayspa";
import { href, type Locale } from "@/lib/i18n";

type Props = { locale: Locale; c: DaySpaCopy["nav"]; bookingUrl: string; phone: { display: string; href: string } };

/** Day Spa header: links either side of a centred logo; transparent over the hero, cream with the wine logo once the page scrolls. */
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
          solid ? "bg-[var(--ds-cream)]/95 text-[var(--ds-wine)] shadow-[0_1px_0_var(--ds-line)] backdrop-blur-md" : "bg-gradient-to-b from-[rgb(30_7_10/0.55)] to-transparent text-white"
        }`}
      >
        <div className={`ds-wrap ds-max grid grid-cols-[1fr_auto_1fr] items-center gap-6 transition-[height] duration-500 ${solid ? "h-[72px]" : "h-[76px] md:h-[96px]"}`}>
          <nav aria-label="Central Day Spa" className="hidden items-center gap-8 lg:flex">
            {/* Way back to the hotel's main site; the label shows from xl, below that the arrow alone */}
            <Link
              href={href(locale)}
              aria-label={c.hotel}
              className="group inline-flex h-9 items-center gap-2 rounded-full border border-current/30 px-3 text-[11px] font-medium uppercase tracking-[0.14em] opacity-80 transition-[opacity,border-color,background-color] duration-300 hover:border-current hover:opacity-100 xl:px-4"
            >
              <span aria-hidden className="transition-transform duration-300 group-hover:-translate-x-0.5">←</span>
              <span className="hidden whitespace-nowrap xl:inline">{c.hotel}</span>
            </Link>
            {links.slice(0, 3).map((l) => (
              <a key={l.href} href={l.href} className="ds-nav-link">
                {l.label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="ds-menu"
            className="flex h-11 items-center gap-3 justify-self-start text-[12px] font-medium uppercase tracking-[0.16em] lg:hidden"
          >
            <span aria-hidden className="relative block h-[9px] w-6">
              <span className={`absolute left-0 h-px w-full bg-current transition-transform duration-500 ${open ? "top-1/2 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-px w-full bg-current transition-transform duration-500 ${open ? "top-1/2 -rotate-45" : "bottom-0"}`} />
            </span>
            {open ? c.close : c.menu}
          </button>

          {/* The full logo over the hero; once scrolled, only the "DAY SPA" wordmark, larger */}
          <Link href={base} className={`relative block shrink-0 transition-[height,width] duration-500 ${solid ? "h-[34px] w-[146px] md:h-[40px] md:w-[172px]" : "h-[56px] w-[78px] md:h-[72px] md:w-[100px]"}`} aria-label="Central Day Spa">
            <Image src="/brand/dayspa-on-dark.png" alt="" fill sizes="110px" priority className={`object-contain transition-opacity duration-500 ${solid ? "opacity-0" : "opacity-100"}`} />
            <Image src="/brand/dayspa-on-light-wordmark.png" alt="" fill sizes="180px" priority className={`object-contain transition-opacity duration-500 ${solid ? "opacity-100" : "opacity-0"}`} />
          </Link>

          <div className="flex items-center justify-end gap-7">
            <Link href={href(locale)} aria-label={c.hotel} className="inline-flex h-9 items-center gap-2 rounded-full border border-current/30 px-3 text-[11px] font-medium uppercase tracking-[0.14em] opacity-85 transition-opacity hover:opacity-100 lg:hidden">
              <span aria-hidden>←</span>
              <span className="whitespace-nowrap">Hotel</span>
            </Link>
            <nav aria-label="Central Day Spa" className="hidden items-center gap-8 lg:flex">
              {links.slice(3).map((l) => (
                <a key={l.href} href={l.href} className="ds-nav-link">
                  {l.label}
                </a>
              ))}
            </nav>
            <LanguageSwitcher locale={locale} label={c.language} className="hidden !text-[11px] lg:flex" />
            <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className={`ds-btn hidden !min-h-[44px] !px-5 md:inline-flex ${solid ? "" : "ds-btn--light"}`}>
              {c.book}
              <i aria-hidden>→</i>
            </a>
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
            <a key={l.href} href={l.href} onClick={close} className="ds-display border-b border-[var(--ds-line)] py-4 text-[38px]">
              {l.label}
            </a>
          ))}
          <a href={phone.href} className="pt-5 text-[15px]">
            ✆ {phone.display}
          </a>
          <a href={DAYSPA_INSTAGRAM} target="_blank" rel="noopener noreferrer" className="py-3 text-[15px]">
            Instagram<ArrowUpRight />
          </a>
          <Link href={href(locale)} onClick={close} className="pb-5 text-[15px] opacity-75">
            ← {c.hotel}
          </Link>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="ds-btn">
              {c.book}
              <i aria-hidden>→</i>
            </a>
          </div>
          <LanguageSwitcher locale={locale} label={c.language} className="mt-8" />
        </nav>
      </div>
    </>
  );
}
