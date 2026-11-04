import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { DAYS, fitnessLinks, type FitnessContent, type MembershipPlan, type Session, type Timetable } from "@/content/fitness";
import type { HotelContact } from "@/cms/hotelInfoMerge";
import { href, type Locale } from "@/lib/i18n";
import { Photo } from "../Photo";
import { FadeIn } from "../Reveal";
import { Arrow } from "../ui";

/**
 * Central Fitness Club building blocks. A deliberately different personality from the hotel pages: the club's green,
 * condensed athletic headlines, a geometric sans for labels, chips and bold numbers — but the same grid, photography
 * treatment and accessibility rules as the rest of the site.
 */

export function FitHeadline({ lines, as: Tag = "h2", className = "", id }: { lines: string[]; as?: "h1" | "h2" | "h3"; className?: string; id?: string }) {
  return (
    <Tag id={id} className={`font-athletic font-bold uppercase leading-[0.86] tracking-[-0.005em] ${className}`}>
      {lines.map((l, i) => (
        <span key={i} className="block">
          {l}
        </span>
      ))}
    </Tag>
  );
}

export function FitLabel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`font-geo text-[10.5px] font-semibold uppercase tracking-[0.2em] ${className}`}>{children}</p>;
}

type BtnProps = { href: string; children: ReactNode; tone?: "solid" | "outline" | "green"; external?: boolean; className?: string };
export function FitButton({ href: to, children, tone = "solid", external, className = "" }: BtnProps) {
  const cls = `inline-flex min-h-[50px] items-center justify-center gap-3 rounded-full px-7 font-geo text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors duration-300 ${
    tone === "solid" ? "bg-white text-fit-green hover:bg-fit-mist" : tone === "green" ? "bg-fit-green text-white hover:bg-fit-deep" : "border border-current hover:bg-white hover:text-fit-green"
  } ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      <Arrow />
    </>
  );
  if (external || /^(https?:|tel:|mailto:|#)/.test(to))
    return (
      <a href={to} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {inner}
      </a>
    );
  return (
    <Link href={to} className={cls}>
      {inner}
    </Link>
  );
}

/** Page hero for the club's pages. `image` omitted = a typographic hero on the club green. */
export function FitHero({ eyebrow, title, intro, image, alt, children, compact = false }: { eyebrow: string; title: string[]; intro: string; image?: string; alt?: string; children?: ReactNode; compact?: boolean }) {
  return (
    <section className={`relative overflow-hidden bg-fit-green text-white ${compact ? "min-h-[54svh]" : "min-h-[calc(100svh-var(--sub-bar-h)-var(--sub-nav-h))]"} flex flex-col justify-end`}>
      {image && (
        <>
          <Image src={image} alt={alt ?? ""} fill priority sizes="100vw" className="object-cover object-[50%_60%] [filter:saturate(0.9)_contrast(1.04)]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,49,40,0.92)_0%,rgba(9,49,40,0.72)_42%,rgba(9,49,40,0.15)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(0deg,rgba(6,31,26,0.75),transparent)]" />
        </>
      )}
      <div className="relative px-[var(--gutter)] pb-12 pt-20 md:pb-[5vw] md:pt-[8vw]">
        <FitLabel className="mb-6 text-white/80">{eyebrow}</FitLabel>
        <FitHeadline as="h1" lines={title} className="max-w-[12ch] text-[clamp(54px,14vw,92px)] md:max-w-none md:text-[clamp(84px,9.4vw,168px)]" />
        <p className="mt-7 max-w-[46ch] text-[15px] leading-[1.6] text-white/90 md:text-[16px]">{intro}</p>
        {children}
      </div>
    </section>
  );
}

export function Stats({ items }: { items: { v: string; k: string }[] }) {
  return (
    <dl className="mt-10 grid max-w-[720px] grid-cols-3 gap-4 border-t border-white/25 pt-6">
      {items.map((s) => (
        <div key={s.k}>
          <dt className="sr-only">{s.k}</dt>
          <dd>
            <span className="block font-athletic text-[clamp(36px,6vw,64px)] font-bold leading-none">{s.v}</span>
            <span className="mt-2 block font-geo text-[10px] font-semibold uppercase tracking-[0.16em] text-white/75">{s.k}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function Chips({ items, tone = "light" }: { items: string[]; tone?: "light" | "dark" }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((c) => (
        <li key={c} className={`rounded-full px-4 py-2 font-geo text-[11px] font-semibold uppercase tracking-[0.12em] ${tone === "light" ? "bg-white text-fit-green ring-1 ring-fit-green/15" : "bg-white/10 text-white ring-1 ring-white/20"}`}>
          {c}
        </li>
      ))}
    </ul>
  );
}

export function NumberedList({ items, tone = "dark" }: { items: string[]; tone?: "dark" | "light" }) {
  return (
    <ol className={`divide-y ${tone === "dark" ? "divide-white/15 border-y border-white/15" : "divide-fit-green/15 border-y border-fit-green/15"}`}>
      {items.map((x, i) => (
        <li key={x} className="flex gap-5 py-4">
          <span className="w-8 shrink-0 font-athletic text-[22px] font-bold leading-none opacity-60">{String(i + 1).padStart(2, "0")}</span>
          <span className="text-[15px] leading-[1.45]">{x}</span>
        </li>
      ))}
    </ol>
  );
}

export function FactGrid({ items, tone = "light" }: { items: { k: string; v: string }[]; tone?: "light" | "dark" }) {
  return (
    <dl className={`grid gap-px overflow-hidden rounded-[14px] ${items.length % 3 === 0 && items.length < 6 ? "sm:grid-cols-3" : "sm:grid-cols-2 sm:[&>div:last-child:nth-child(odd)]:col-span-2"}`} style={{ background: tone === "light" ? "rgb(9 49 40 / 0.12)" : "rgb(255 255 255 / 0.14)" }}>
      {items.map((f) => (
        <div key={f.k} className={`p-5 ${tone === "light" ? "bg-white" : "bg-fit-green"}`}>
          <dt className="font-geo text-[10px] font-semibold uppercase tracking-[0.18em] opacity-60">{f.k}</dt>
          <dd className="mt-2 font-athletic text-[24px] font-semibold uppercase leading-[1.05]">{f.v}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Membership option cards (CMS or built-in). Without a price, "Price on request" — never an invented number. */
export function PlanCards({ plans, f, locale, contactHref }: { plans: MembershipPlan[]; f: FitnessContent; locale: Locale; contactHref: string }) {
  void locale;
  return (
    <ul className={`grid gap-5 ${plans.length > 2 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
      {plans.map((p) => (
        <li key={p.name} className={`flex flex-col rounded-[18px] p-7 md:p-8 ${p.featured ? "bg-fit-green text-white" : "bg-white text-fit-green ring-1 ring-fit-green/15"}`}>
          <h3 className="font-athletic text-[34px] font-bold uppercase leading-[0.95]">{p.name}</h3>
          <p className="mt-4 flex items-baseline gap-2">
            <span className={`font-athletic font-bold uppercase leading-none ${p.price ? "text-[40px]" : "text-[22px] opacity-80"}`}>{p.price ?? f.membership.priceOnRequest}</span>
            {p.price && p.period && <span className="font-geo text-[11px] font-semibold uppercase tracking-[0.14em] opacity-70">{p.period}</span>}
          </p>
          {p.description && <p className="mt-4 text-[15px] leading-[1.55] opacity-85">{p.description}</p>}
          {p.includes.length > 0 && (
            <ul className={`mt-6 space-y-2 border-t pt-5 text-[14px] ${p.featured ? "border-white/20" : "border-fit-green/15"}`}>
              {p.includes.map((x) => (
                <li key={x} className="flex gap-3">
                  <span aria-hidden className="mt-[0.55em] h-[6px] w-[6px] shrink-0 rounded-full bg-current opacity-70" />
                  {x}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-auto pt-7">
            <FitButton href={contactHref} tone={p.featured ? "solid" : "green"}>
              {f.nav.enquire}
            </FitButton>
          </div>
        </li>
      ))}
    </ul>
  );
}

/** The monthly timetable: seven columns on desktop, one stacked list per day on phones. Empty = an honest message. */
export function TimetableGrid({ timetable, f, compact = false }: { timetable: Timetable; f: FitnessContent; compact?: boolean }) {
  const t = f.timetable;
  const byDay = DAYS.map((d) => ({ day: d, sessions: timetable.sessions.filter((s) => s.day === d) }));
  if (!timetable.sessions.length) {
    return (
      <div className="rounded-[18px] bg-white p-7 text-fit-green ring-1 ring-fit-green/15 md:p-10">
        <p className="font-athletic text-[30px] font-bold uppercase leading-[0.95] md:text-[40px]">{t.emptyTitle}</p>
        <p className="mt-4 max-w-[60ch] text-[15px] leading-[1.6] opacity-85">{t.emptyBody}</p>
      </div>
    );
  }
  const card = (s: Session) => (
    <li key={`${s.day}-${s.start}-${s.name}`} className="rounded-[12px] bg-white p-4 text-fit-green ring-1 ring-fit-green/15">
      <p className="font-geo text-[11px] font-semibold tabular-nums tracking-[0.08em]">
        {s.start}
        {s.end ? `–${s.end}` : ""}
      </p>
      <p className="mt-1 font-athletic text-[21px] font-bold uppercase leading-[1]">{s.name}</p>
      {(s.instructor || s.studio) && (
        <p className="mt-2 text-[12.5px] opacity-75">
          {s.instructor && (
            <>
              <span className="sr-only">{t.instructor}: </span>
              {s.instructor}
            </>
          )}
          {s.instructor && s.studio ? " · " : ""}
          {s.studio && (
            <>
              <span className="sr-only">{t.studio}: </span>
              {s.studio}
            </>
          )}
        </p>
      )}
      {s.note && <p className="mt-2 text-[12.5px] italic opacity-70">{s.note}</p>}
    </li>
  );
  return (
    <>
      {/* Desktop / tablet landscape: the week at a glance */}
      <div className={`hidden gap-3 lg:grid lg:grid-cols-7 ${compact ? "" : ""}`}>
        {byDay.map(({ day, sessions }) => (
          <section key={day} aria-label={t.days[day]} className="rounded-[14px] bg-fit-mist p-3">
            <h3 className="mb-3 px-1 font-athletic text-[20px] font-bold uppercase text-fit-green">{t.short[day]}</h3>
            {sessions.length ? <ul className="space-y-2">{sessions.map(card)}</ul> : <p className="px-1 text-[12.5px] text-fit-green/60">{t.noClasses}</p>}
          </section>
        ))}
      </div>
      {/* Phones and tablets: one day after another, only days with classes */}
      <div className="space-y-6 lg:hidden">
        {byDay
          .filter((d) => d.sessions.length)
          .map(({ day, sessions }) => (
            <section key={day} aria-label={t.days[day]}>
              <h3 className="mb-3 font-athletic text-[26px] font-bold uppercase text-fit-green">{t.days[day]}</h3>
              <ul className="grid gap-2 sm:grid-cols-2">{sessions.map(card)}</ul>
            </section>
          ))}
      </div>
    </>
  );
}

/** Enquiry block, used on all three club pages (anchor #contact). Phone and e-mail follow Hotel Information. */
export function FitContact({ f, contact }: { f: FitnessContent; contact: HotelContact }) {
  const c = f.contact;
  const mail = `mailto:${contact.email}?subject=${encodeURIComponent(c.subject)}`;
  return (
    <section id="contact" aria-labelledby="fit-contact" className="scroll-mt-[calc(var(--sub-bar-h)+var(--sub-nav-h))] bg-fit-deep px-[var(--gutter)] py-16 text-white md:py-[6vw]">
      <div className="grid gap-10 md:grid-cols-12 md:gap-x-[2vw]">
        <div className="md:col-span-5">
          <FitLabel className="mb-5 text-white/70">{c.label}</FitLabel>
          <FitHeadline id="fit-contact" lines={c.title} className="text-[clamp(52px,12vw,76px)] md:text-[6vw]" />
          <p className="mt-6 max-w-[42ch] text-[15px] leading-[1.6] text-white/85">{c.body}</p>
          <p className="mt-6 font-geo text-[10.5px] font-semibold uppercase tracking-[0.16em] text-white/60">{c.address}</p>
        </div>
        <ul className="grid gap-3 md:col-span-6 md:col-start-7 md:self-end">
          {[
            { k: c.call, v: contact.phone.display, href: contact.phone.href },
            { k: c.email, v: contact.email, href: mail },
            { k: c.instagram, v: fitnessLinks.instagramHandle, href: fitnessLinks.instagram, external: true },
          ].map((x) => (
            <li key={x.k}>
              <a
                href={x.href}
                {...(x.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex min-h-[72px] items-center justify-between gap-4 rounded-[14px] bg-white/[0.06] px-6 py-4 ring-1 ring-white/15 transition-colors hover:bg-white hover:text-fit-green"
              >
                <span>
                  <span className="block font-geo text-[10px] font-semibold uppercase tracking-[0.18em] opacity-70">{x.k}</span>
                  <span className="mt-1 block break-all font-athletic text-[24px] font-semibold leading-[1.05] md:text-[28px]">{x.v}</span>
                </span>
                <Arrow className="shrink-0" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function PoolMosaic({ alts }: { alts: FitnessContent["imageAlt"] }) {
  const tiles = [
    { src: "/images/pool-01.jpg", alt: alts.pool1, cls: "col-span-2 aspect-[16/9]" },
    { src: "/images/pool-04.jpg", alt: alts.pool2, cls: "aspect-[4/3]" },
    { src: "/images/pool-08.jpg", alt: alts.pool3, cls: "aspect-[4/3]" },
  ];
  return (
    <div className="grid grid-cols-2 gap-3">
      {tiles.map((t) => (
        <FadeIn key={t.src} className={`relative overflow-hidden rounded-[14px] ${t.cls}`}>
          <Photo src={t.src} alt={t.alt} sizes="(min-width: 1024px) 30vw, 50vw" grade="grade-bright" reveal={false} className="h-full w-full" />
        </FadeIn>
      ))}
    </div>
  );
}

export const fitHref = (locale: Locale, path = "") => href(locale, `/centralfitnessclub${path}`);
