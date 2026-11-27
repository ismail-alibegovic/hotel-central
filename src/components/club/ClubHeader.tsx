"use client";

import Image from "next/image";
import { ArrowUpRight } from "@/components/ui";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { CLUB_INSTAGRAM, type ClubCopy } from "@/content/club";
import { href, type Locale } from "@/lib/i18n";

/** Club header: dark, transparent over the hero and solid once the page scrolls; white logo, the club's pages and "Become a member". */
export function ClubHeader({ locale, c }: { locale: Locale; c: ClubCopy["nav"] }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [openedAt, setOpenedAt] = useState(pathname);
  if (openedAt !== pathname) {
    setOpenedAt(pathname);
    setOpen(false);
  }
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
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

  const base = href(locale, "/centralfitnessclub");
  const links = [
    { href: `${base}#club`, label: c.club },
    { href: `${base}#pool`, label: c.pool },
    // CH-043: the timetable lives under "Classes" (one menu entry: the classes and their timetable).
    { href: `${base}/timetable`, label: c.classes, page: true },
    { href: `${base}/membership`, label: c.membership, page: true },
    { href: "#contact", label: c.contact },
  ];

  const solid = scrolled || open || pathname !== base;

  return (
    <>
      <a href="#content" className="fixed left-4 top-3 z-[90] -translate-y-24 rounded-full bg-white px-4 py-2 text-sm text-[var(--cfc-night)] transition-transform focus:translate-y-0">
        Skip to content
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-[80] text-white transition-[background-color,border-color] duration-500 ${
          solid ? "border-b border-[var(--cfc-line-dark)] bg-[var(--cfc-night)]/95 backdrop-blur-md" : "border-b border-transparent bg-gradient-to-b from-black/45 to-transparent"
        }`}
      >
        <div className="cfc-wrap cfc-max grid h-[72px] grid-cols-[auto_1fr_auto] items-center gap-6 md:h-[80px] xl:gap-5 2xl:gap-10">
          {/* The full logo over the hero; once scrolled (and on the inner pages), only the "CENTRAL FITNESS CLUB" wordmark, larger */}
          <div className="flex items-center gap-4 2xl:gap-6">
            <Link href={base} aria-label="Central Fitness Club" className="relative block h-[46px] w-[132px] shrink-0 md:h-[48px] md:w-[144px]">
              <Image src="/brand/cfc-white.png" alt="" fill sizes="48px" priority className={`object-contain object-left transition-opacity duration-500 ${solid ? "opacity-0" : "opacity-100"}`} />
              <Image src="/brand/cfc-white-wordmark.png" alt="" fill sizes="130px" priority className={`object-contain object-left transition-opacity duration-500 ${solid ? "opacity-100" : "opacity-0"}`} />
            </Link>
            {/* CH-049: a clear way back to the hotel's main site, beside the logo (as on the Day Spa header) */}
            <Link
              href={href(locale)}
              aria-label={c.hotel}
              className="group hidden h-9 items-center gap-2 whitespace-nowrap rounded-full border border-white/40 px-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:border-white hover:bg-white hover:text-[var(--cfc-night)] sm:inline-flex"
            >
              <span aria-hidden className="transition-transform duration-300 group-hover:-translate-x-0.5">←</span>
              {c.hotel}
            </Link>
          </div>
          <nav aria-label="Central Fitness Club" className="hidden items-center justify-center gap-5 whitespace-nowrap xl:flex 2xl:gap-10 [&_.cfc-nav-link]:xl:tracking-[0.1em] 2xl:[&_.cfc-nav-link]:tracking-[0.16em]">
            {links.map((l) =>
              l.page ? (
                <Link key={l.href} href={l.href} aria-current={pathname === l.href ? "page" : undefined} className="cfc-nav-link">
                  {l.label}
                </Link>
              ) : (
                <a key={l.href} href={l.href} className="cfc-nav-link">
                  {l.label}
                </a>
              ),
            )}
          </nav>
          <div className="col-start-3 flex items-center justify-end gap-4 whitespace-nowrap 2xl:gap-6">
            <LanguageSwitcher locale={locale} label={c.language} className="hidden !text-[11px] text-white sm:flex" />
            <Link href={`${base}/membership`} className="cfc-btn cfc-btn--volt hidden !min-h-[42px] !px-5 !text-[12px] md:inline-flex">
              {c.join} <span className="cfc-arrow" aria-hidden>→</span>
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="cfc-menu"
              className="flex h-11 items-center gap-3 rounded-full text-[12px] font-semibold uppercase tracking-[0.16em] xl:hidden"
            >
              {open ? c.close : c.menu}
              <span aria-hidden className="relative block h-[10px] w-6">
                <span className={`absolute left-0 h-[2px] w-full bg-current transition-transform duration-500 ${open ? "top-1/2 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 h-[2px] w-full bg-current transition-transform duration-500 ${open ? "top-1/2 -rotate-45" : "bottom-0"}`} />
              </span>
            </button>
          </div>
        </div>
      </header>
      <div id="cfc-menu" hidden={!open} className="fixed inset-0 z-[70] overflow-y-auto bg-[var(--cfc-night)] pt-[92px] text-white xl:hidden">
        <nav aria-label="Central Fitness Club" className="cfc-wrap flex flex-col pb-10">
          {links.map((l, i) => (
            <Link key={l.href} href={l.href} onClick={close} className="flex items-baseline gap-4 border-b border-[var(--cfc-line-dark)] py-4">
              <span className="cfc-num text-[12px] text-[var(--cfc-volt)]">{String(i + 1).padStart(2, "0")}</span>
              <span className="cfc-display text-[40px]">{l.label}</span>
            </Link>
          ))}
          <Link href={`${base}/membership`} onClick={close} className="cfc-btn cfc-btn--volt mt-8 self-start">
            {c.join} <span aria-hidden>→</span>
          </Link>
          {CLUB_INSTAGRAM && (
            <a href={CLUB_INSTAGRAM} target="_blank" rel="noopener noreferrer" className="mt-6 text-[14px] text-white">
              Instagram<ArrowUpRight />
            </a>
          )}
          <Link href={href(locale)} onClick={close} className="cfc-btn cfc-btn--line on-dark mt-4 self-start">
            ← {c.hotel}
          </Link>
          <LanguageSwitcher locale={locale} label={c.language} className="mt-8 text-white" />
        </nav>
      </div>
    </>
  );
}
