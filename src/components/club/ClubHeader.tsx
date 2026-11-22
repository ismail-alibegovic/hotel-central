"use client";

import Image from "next/image";
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
    { href: `${base}#classes`, label: c.classes },
    { href: `${base}/membership`, label: c.membership, page: true },
    { href: `${base}/timetable`, label: c.timetable, page: true },
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
        <div className="cfc-wrap cfc-max grid h-[72px] grid-cols-[auto_1fr_auto] items-center gap-6 md:h-[84px]">
          <Link href={base} aria-label="Central Fitness Club" className="relative block h-[46px] w-[40px] shrink-0 md:h-[56px] md:w-[48px]">
            <Image src="/brand/cfc-white.png" alt="" fill sizes="48px" priority className="object-contain" />
          </Link>
          <nav aria-label="Central Fitness Club" className="hidden items-center justify-center gap-8 lg:flex xl:gap-10">
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
          <div className="col-start-3 flex items-center justify-end gap-5">
            <Link href={href(locale)} className="hidden text-[12px] font-medium tracking-[0.06em] text-white/60 transition-colors hover:text-white xl:inline">
              ← {c.hotel}
            </Link>
            <LanguageSwitcher locale={locale} label={c.language} className="hidden !text-[11px] text-white sm:flex" />
            <Link href={`${base}/membership`} className="cfc-btn cfc-btn--volt hidden !min-h-[44px] !px-5 md:inline-flex">
              {c.join} <span className="cfc-arrow" aria-hidden>→</span>
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="cfc-menu"
              className="flex h-11 items-center gap-3 rounded-full text-[12px] font-semibold uppercase tracking-[0.16em] lg:hidden"
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
      <div id="cfc-menu" hidden={!open} className="fixed inset-0 z-[70] overflow-y-auto bg-[var(--cfc-night)] pt-[92px] text-white lg:hidden">
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
              Instagram ↗
            </a>
          )}
          <Link href={href(locale)} onClick={close} className="mt-4 text-[14px] text-white/60">
            ← {c.hotel}
          </Link>
          <LanguageSwitcher locale={locale} label={c.language} className="mt-8 text-white" />
        </nav>
      </div>
    </>
  );
}
