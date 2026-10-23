"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { altStore } from "@/lib/altLocales";
import { locales, switchLocalePath, type Locale } from "@/lib/i18n";

export function LanguageSwitcher({ locale, label, className = "" }: { locale: Locale; label: string; className?: string }) {
  const pathname = usePathname() || `/${locale}`;
  const alt = useSyncExternalStore(altStore.subscribe, altStore.get, () => null);
  return (
    <nav aria-label={label} className={`label flex items-center gap-3 ${className}`}>
      {locales.map((l, i) => (
        <span key={l} className="flex items-center gap-3">
          {i > 0 && <span aria-hidden className="opacity-40">/</span>}
          <Link
            href={alt ? (alt[l] ? `/${l}${alt[l]}` : `/${l}`) : switchLocalePath(pathname, l)}
            hrefLang={l}
            lang={l}
            aria-current={l === locale ? "true" : undefined}
            className={`link-line transition-opacity duration-500 ${l === locale ? "opacity-100" : "opacity-55 hover:opacity-100"}`}
          >
            {l.toUpperCase()}
          </Link>
        </span>
      ))}
    </nav>
  );
}
