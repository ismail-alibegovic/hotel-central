"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import type { ClubCopy } from "@/content/club";
import { href, type Locale } from "@/lib/i18n";

/** Club header: a cream bar (FIJI) with the green CFC logo, the club's pages and "Become a member". */
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

  return (
    <>
      <a href="#content" className="fixed left-4 top-3 z-[90] -translate-y-24 rounded-full bg-white px-4 py-2 text-sm text-[var(--cfc-green)] transition-transform focus:translate-y-0">
        Skip to content
      </a>
      <header className={`fixed inset-x-0 top-0 z-[80] transition-[background-color,box-shadow] duration-500 ${scrolled || open ? "bg-[var(--cfc-cream)] shadow-[0_1px_0_var(--cfc-line)]" : "bg-[var(--cfc-cream)]/85 backdrop-blur-md"}`}>
        <div className="cfc-wrap flex h-[72px] items-center justify-between gap-6 md:h-[80px]">
          <Link href={base} aria-label="Central Fitness Club" className="relative block h-[54px] w-[46px] shrink-0 md:h-[62px] md:w-[53px]">
            <Image src="/brand/cfc-green.png" alt="" fill sizes="56px" priority className="object-contain" />
          </Link>
          <nav aria-label="Central Fitness Club" className="hidden items-center gap-7 text-[15px] text-[var(--cfc-ink)] lg:flex">
            {links.map((l) =>
              l.page ? (
                <Link key={l.href} href={l.href} aria-current={pathname === l.href ? "page" : undefined} className={`cfc-link py-1 ${pathname === l.href ? "!bg-[length:100%_1px]" : ""}`}>
                  {l.label}
                </Link>
              ) : (
                <a key={l.href} href={l.href} className="cfc-link py-1">
                  {l.label}
                </a>
              ),
            )}
            <Link href={href(locale)} className="cfc-link py-1 text-[var(--cfc-mute)]">
              ← {c.hotel}
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <LanguageSwitcher locale={locale} label={c.language} className="hidden !text-[11px] text-[var(--cfc-ink)] sm:flex" />
            <Link href={`${base}/membership`} className="cfc-btn hidden md:inline-flex">
              {c.join} <span className="cfc-arrow" aria-hidden>→</span>
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="cfc-menu"
              className="flex h-11 items-center gap-2 rounded-full px-3 text-[15px] text-[var(--cfc-ink)] lg:hidden"
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
      <div id="cfc-menu" hidden={!open} className="fixed inset-0 z-[70] overflow-y-auto bg-[var(--cfc-cream)] pt-[88px] text-[var(--cfc-green)] lg:hidden">
        <nav aria-label="Central Fitness Club" className="cfc-wrap flex flex-col pb-10">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={close} className="cfc-display border-b border-[var(--cfc-line)] py-4 text-[32px]">
              {l.label}
            </Link>
          ))}
          <Link href={href(locale)} onClick={close} className="py-5 text-[15px] text-[var(--cfc-mute)]">
            ← {c.hotel}
          </Link>
          <Link href={`${base}/membership`} onClick={close} className="cfc-btn mt-2 self-start">
            {c.join} <span aria-hidden>→</span>
          </Link>
          <LanguageSwitcher locale={locale} label={c.language} className="mt-8 text-[var(--cfc-ink)]" />
        </nav>
      </div>
    </>
  );
}
