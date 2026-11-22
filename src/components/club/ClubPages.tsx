import Image from "next/image";
import { ArrowUpRight } from "@/components/ui";
import Link from "next/link";
import { FadeIn } from "@/components/Reveal";
import type { BrandContact } from "@/components/brands/contact";
import { CLUB_INSTAGRAM, classTypes, type ClubClass, type ClubCopy, type ClubPlan } from "@/content/club";
import { href, type Locale } from "@/lib/i18n";
import type { ClubImg } from "./ClubHome";

/** Shorter hero for the club's inner pages: dark, condensed title on the left, photograph on the right. */
export function ClubPageHero({ eyebrow, title, body, img }: { eyebrow: string; title: string; body: string; img: ClubImg }) {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--cfc-night)] text-white">
      <div className="cfc-max grid md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <FadeIn immediate className="cfc-wrap flex flex-col justify-end pb-14 pt-[132px] md:pb-20 md:pt-[200px]">
          <p className="cfc-eyebrow text-[var(--cfc-volt)]">{eyebrow}</p>
          <h1 className="cfc-display mt-6 text-[64px] md:text-[clamp(88px,9vw,150px)]">{title}</h1>
          <p className="mt-6 max-w-[48ch] text-[17px] text-white/70">{body}</p>
        </FadeIn>
        <div className="relative min-h-[300px] md:min-h-[560px]">
          <Image src={img.src} alt={img.alt} fill priority sizes="(min-width: 768px) 42vw, 100vw" className="object-cover" style={{ objectPosition: img.position }} />
          <div aria-hidden className="absolute inset-0 bg-[linear-gradient(90deg,var(--cfc-night)_0%,rgb(14_23_18/0)_35%)] max-md:bg-[linear-gradient(180deg,var(--cfc-night)_0%,rgb(14_23_18/0)_40%)]" />
        </div>
      </div>
    </section>
  );
}

/** /centralfitnessclub/membership: plans (prices only when staff entered them), benefits, a tour invitation. */
export function ClubMembership({ c, plans, images, contact }: { c: ClubCopy; plans: ClubPlan[]; images: { hero: ClubImg; tour: ClubImg }; contact: BrandContact }) {
  const m = c.membership;
  const mail = (plan: string) => `mailto:${contact.email}?subject=${encodeURIComponent(`Central Fitness Club — ${plan}`)}`;
  return (
    <>
      <ClubPageHero eyebrow={m.eyebrow} title={m.title} body={m.body} img={images.hero} />

      <section className="py-20 md:py-28">
        <div className="cfc-wrap cfc-max">
          <h2 className="cfc-display text-[48px] text-[var(--cfc-night)] md:text-[80px]">{m.plansTitle}</h2>
          <div className={`mt-10 grid gap-4 ${plans.length >= 3 ? "lg:grid-cols-3" : plans.length === 2 ? "md:grid-cols-2" : "max-w-[620px]"}`}>
            {plans.map((p, i) => (
              <FadeIn key={p.name} delay={0.08 * i} className={`flex flex-col gap-6 rounded-[8px] p-8 md:p-10 ${p.highlight ? "bg-[var(--cfc-night)] text-white" : "border border-[var(--cfc-line)] bg-white text-[var(--cfc-ink)]"}`}>
                <h3 className="cfc-title text-[24px]">{p.name}</h3>
                <p className={`cfc-display cfc-num text-[56px] ${p.highlight ? "text-[var(--cfc-volt)]" : ""}`}>
                  {p.price ? (
                    <>
                      {p.price} KM {p.period && <span className="text-[16px] font-medium normal-case opacity-60">/ {p.period}</span>}
                    </>
                  ) : (
                    <span className="text-[40px]">{m.onRequest}</span>
                  )}
                </p>
                <ul className={`grid border-t text-[15px] ${p.highlight ? "border-[var(--cfc-line-dark)]" : "border-[var(--cfc-line)]"}`}>
                  {p.features.map((f) => (
                    <li key={f} className={`flex gap-3 border-b py-3 ${p.highlight ? "border-[var(--cfc-line-dark)]" : "border-[var(--cfc-line)]"}`}>
                      <span aria-hidden className={p.highlight ? "text-[var(--cfc-volt)]" : "text-[var(--cfc-green)]"}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap gap-3 pt-3">
                  <a href={contact.phone.href} className={`cfc-btn ${p.highlight ? "cfc-btn--volt" : ""}`}>
                    {contact.phone.display}
                  </a>
                  <a href={mail(p.name)} className={`cfc-btn cfc-btn--line ${p.highlight ? "on-dark" : "on-light"}`}>
                    {m.ask}
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="cfc-wrap cfc-max grid gap-12 pb-20 md:grid-cols-2 md:gap-[6vw] md:pb-28">
        <FadeIn>
          <h2 className="cfc-display text-[44px] text-[var(--cfc-night)] md:text-[64px]">{m.benefitsTitle}</h2>
          <ul className="mt-8 border-t border-[var(--cfc-line)]">
            {c.benefits.items.map((b, i) => (
              <li key={b} className="flex items-baseline gap-5 border-b border-[var(--cfc-line)] py-4 text-[16px]">
                <span className="cfc-num w-7 shrink-0 text-[13px] font-semibold text-[var(--cfc-green)]">{String(i + 1).padStart(2, "0")}</span>
                {b}
              </li>
            ))}
          </ul>
        </FadeIn>
        <div className="relative isolate flex flex-col justify-end overflow-hidden rounded-[8px] p-8 text-white md:p-10">
          <Image src={images.tour.src} alt={images.tour.alt} fill sizes="(min-width: 768px) 44vw, 92vw" className="-z-10 object-cover" style={{ objectPosition: images.tour.position }} />
          <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(14_23_18/0.05)_15%,rgb(14_23_18/0.92)_65%)]" />
          <div className="min-h-[220px]" />
          <h3 className="cfc-display text-[48px]">{m.tourTitle}</h3>
          <p className="mt-3 max-w-[40ch] text-white/85">{m.tourBody}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={contact.phone.href} className="cfc-btn cfc-btn--volt">
              {c.join.call} · {contact.phone.display}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export type Timetable = { classes: ClubClass[]; file?: { url: string; isImage: boolean; alt: string }; note?: string };

/** /centralfitnessclub/timetable: a weekly grid (days × times), as a list per day on phones; a file or an honest empty state otherwise. */
export function ClubTimetable({ locale, c, timetable, img, contact }: { locale: Locale; c: ClubCopy; timetable: Timetable; img: ClubImg; contact: BrandContact }) {
  const t = c.timetable;
  const days = [0, 1, 2, 3, 4, 5, 6];
  const byDay = days.map((d) => timetable.classes.filter((x) => x.day === d).sort((a, b) => a.time.localeCompare(b.time)));
  const usedDays = days.filter((d) => byDay[d].length || d < 5);
  const times = [...new Set(timetable.classes.map((x) => x.time))].sort();
  const has = timetable.classes.length > 0;

  return (
    <>
      <ClubPageHero eyebrow={t.eyebrow} title={t.title} body={timetable.note || t.body} img={img} />

      <section className="cfc-wrap cfc-max py-16 md:py-24">
        {has && (
          <>
            {/* Desktop grid */}
            <div className="hidden overflow-hidden rounded-[8px] border border-[var(--cfc-line)] bg-white md:block">
              <table className="w-full table-fixed border-collapse [font-variant-numeric:tabular-nums]">
                <thead>
                  <tr className="bg-[var(--cfc-night)] text-white">
                    <th className="w-[88px] p-4 text-left text-[12px] font-medium uppercase tracking-[0.18em]" scope="col">
                      <span className="sr-only">Time</span>
                    </th>
                    {usedDays.map((d) => (
                      <th key={d} scope="col" className="p-4 text-left text-[13px] font-medium uppercase tracking-[0.14em]">
                        {t.short[d]}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {times.map((time) => (
                    <tr key={time} className="border-t border-[var(--cfc-line)] align-top">
                      <th scope="row" className="cfc-display cfc-num p-4 text-left text-[26px] text-[var(--cfc-night)]">
                        {time}
                      </th>
                      {usedDays.map((d) => {
                        const items = byDay[d].filter((x) => x.time === time);
                        return (
                          <td key={d} className="p-2">
                            {items.map((x, i) => (
                              <div key={i} className="rounded-[4px] border-l-[3px] border-[var(--cfc-volt)] bg-[var(--cfc-sand)] p-3">
                                <p className="text-[15px] font-medium text-[var(--cfc-ink)]">{x.name}</p>
                                <p className="mt-0.5 text-[12px] text-[var(--cfc-mute)]">{[x.duration, x.room, x.trainer].filter(Boolean).join(" · ")}</p>
                              </div>
                            ))}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Phones: one block per day */}
            <div className="grid gap-4 md:hidden">
              {usedDays.map((d) => (
                <div key={d} className="rounded-[8px] bg-white p-5 ring-1 ring-[var(--cfc-line)]">
                  <h2 className="cfc-display text-[32px] text-[var(--cfc-night)]">{t.days[d]}</h2>
                  {byDay[d].length ? (
                    <ul className="mt-3">
                      {byDay[d].map((x, i) => (
                        <li key={i} className="flex gap-4 border-t border-[var(--cfc-line)] py-3">
                          <span className="cfc-display cfc-num w-16 shrink-0 text-[22px] text-[var(--cfc-night)]">{x.time}</span>
                          <span>
                            <span className="block text-[15px] font-medium">{x.name}</span>
                            <span className="text-[13px] text-[var(--cfc-mute)]">{[x.duration, x.room, x.trainer].filter(Boolean).join(" · ")}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-2 text-[14px] text-[var(--cfc-mute)]">{t.noClasses}</p>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {timetable.file && (
          <div className={`${has ? "mt-10" : ""} rounded-[8px] bg-white p-5 ring-1 ring-[var(--cfc-line)] md:p-8`}>
            {timetable.file.isImage ? (
              <a href={timetable.file.url} target="_blank" rel="noopener noreferrer" className="block">
                {/* eslint-disable-next-line @next/next/no-img-element -- an uploaded timetable of any size, shown as is */}
                <img src={timetable.file.url} alt={timetable.file.alt} className="mx-auto h-auto max-h-[1200px] w-auto max-w-full rounded-[12px]" />
              </a>
            ) : (
              <a href={timetable.file.url} target="_blank" rel="noopener noreferrer" className="cfc-btn">
                {t.download} <ArrowUpRight />
              </a>
            )}
          </div>
        )}

        {!has && !timetable.file && (
          <div className="rounded-[8px] bg-[var(--cfc-volt)] p-8 md:p-14">
            <h2 className="cfc-display max-w-[18ch] text-[44px] text-[var(--cfc-night)] md:text-[72px]">{t.emptyTitle}</h2>
            <p className="mt-4 max-w-[48ch] text-[16px] text-[var(--cfc-ink)]/75">{t.emptyBody}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={contact.phone.href} className="cfc-btn">
                {contact.phone.display}
              </a>
              {CLUB_INSTAGRAM && (
                <a href={CLUB_INSTAGRAM} target="_blank" rel="noopener noreferrer" className="cfc-btn cfc-btn--line on-light">
                  {t.instagram}<ArrowUpRight />
                </a>
              )}
            </div>
          </div>
        )}

        <div className="mt-14">
          <h2 className="cfc-display text-[40px] text-[var(--cfc-night)]">{t.typesTitle}</h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {classTypes.map((x) => (
              <li key={x} className="rounded-full border border-[var(--cfc-line)] px-4 py-2 text-[13px] font-semibold uppercase tracking-[0.06em]">
                {x}
              </li>
            ))}
          </ul>
          <Link href={href(locale, "/centralfitnessclub/membership")} className="cfc-btn mt-10">
            {c.nav.membership} <span className="cfc-arrow" aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </>
  );
}

/** Club footer: dark, a big "Questions? Write to us", then address, contact, hours and the sister sites. */
export function ClubFooter({ locale, c, contact, address }: { locale: Locale; c: ClubCopy; contact: BrandContact; address: { street: string; city: string; directions: string } }) {
  const f = c.footer;
  const label = "mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--cfc-volt)]";
  return (
    <footer id="contact" className="scroll-mt-20 bg-[var(--cfc-night)] text-white">
      <div className="cfc-wrap cfc-max">
        <div className="flex flex-col gap-8 border-b border-[var(--cfc-line-dark)] py-16 md:flex-row md:items-end md:justify-between md:py-24">
          <h2 className="cfc-display text-[64px] md:text-[clamp(88px,9vw,150px)]">
            {f.title[0]}
            <br />
            <span className="text-[var(--cfc-volt)]">{f.title[1]}</span>
          </h2>
          <a href={`mailto:${contact.email}?subject=${encodeURIComponent("Central Fitness Club")}`} className="cfc-btn cfc-btn--volt self-start md:self-auto">
            {f.write} <span className="cfc-arrow" aria-hidden>→</span>
          </a>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-14 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div className="col-span-2 flex items-start gap-5 lg:col-span-1">
            <Image src="/brand/cfc-white.png" alt="Central Fitness Club" width={60} height={71} className="h-[71px] w-auto" />
            <p className="max-w-[26ch] text-[14px] text-white/55">{f.rights}</p>
          </div>
          <div className="break-words text-[14px] md:text-[15px]">
            <p className={label}>{f.address}</p>
            <p>{address.street}</p>
            <p>{address.city}</p>
            <a href={address.directions} target="_blank" rel="noopener noreferrer" className="cfc-link mt-2 inline-block text-white/60">
              Google Maps<ArrowUpRight />
            </a>
          </div>
          <div className="break-words text-[14px] md:text-[15px]">
            <p className={label}>{f.contact}</p>
            <p>
              <a href={contact.phone.href} className="cfc-link">
                {contact.phone.display}
              </a>
            </p>
            <p>
              <a href={`mailto:${contact.email}`} className="cfc-link">
                {contact.email}
              </a>
            </p>
            {CLUB_INSTAGRAM && (
              <p className="mt-2">
                <a href={CLUB_INSTAGRAM} target="_blank" rel="noopener noreferrer" className="cfc-link text-white/60">
                  Instagram<ArrowUpRight />
                </a>
              </p>
            )}
            <p className={`${label} mt-8`}>{f.hours}</p>
            {contact.hours.length ? (
              contact.hours.map((h) => (
                <div key={h.name} className="mb-3">
                  <p className="text-white/55">{h.name}</p>
                  {h.rows.map((r) => (
                    <p key={r.days}>
                      {r.days}: {r.closed ? "—" : r.time}
                    </p>
                  ))}
                </div>
              ))
            ) : (
              <p className="text-white/60">{f.hoursFallback}</p>
            )}
          </div>
          <div className="break-words text-[14px] md:text-[15px]">
            <p className={label}>{f.also}</p>
            <p>
              <Link href={href(locale, "/dayspa")} className="cfc-link">
                {f.spa}
              </Link>
            </p>
            <p>
              <Link href={href(locale)} className="cfc-link">
                {f.hotel}
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-[var(--cfc-line-dark)]">
        <div className="cfc-wrap cfc-max flex flex-wrap items-center justify-between gap-3 py-6 text-[12px] text-white/45">
          <span>© {new Date().getFullYear()} Hotel Central Sarajevo</span>
          <span className="cfc-display text-[14px] tracking-[0.08em] text-white/60">{c.hero.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
