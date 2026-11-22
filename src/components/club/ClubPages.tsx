import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/Reveal";
import type { BrandContact } from "@/components/brands/contact";
import { CLUB_INSTAGRAM, classTypes, type ClubClass, type ClubCopy, type ClubPlan } from "@/content/club";
import { href, type Locale } from "@/lib/i18n";
import type { ClubImg } from "./ClubHome";
import { Leaf } from "./shapes";

/** Shorter hero for the club's inner pages: photograph in an arch, title on cream. */
export function ClubPageHero({ eyebrow, title, body, img }: { eyebrow: string; title: string; body: string; img: ClubImg }) {
  return (
    <section className="cfc-wrap grid gap-10 pb-12 pt-[112px] md:grid-cols-[1.1fr_0.9fr] md:items-end md:gap-[5vw] md:pb-16 md:pt-[140px]">
      <FadeIn immediate>
        <p className="cfc-eyebrow text-[var(--cfc-mute)]">{eyebrow}</p>
        <h1 className="cfc-display mt-4 text-[48px] text-[var(--cfc-green)] md:text-[88px]">{title}</h1>
        <p className="mt-5 max-w-[48ch] text-[17px] text-[var(--cfc-mute)]">{body}</p>
      </FadeIn>
      <div className="relative mx-auto aspect-[4/4.4] w-full max-w-[460px] overflow-hidden rounded-[220px_220px_24px_24px]">
        <Image src={img.src} alt={img.alt} fill priority sizes="(min-width: 768px) 36vw, 92vw" className="object-cover" style={{ objectPosition: img.position }} />
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

      <section className="relative isolate overflow-hidden bg-[var(--cfc-green)] py-16 text-white md:py-24">
        <Leaf className="absolute -right-16 -top-16 -z-10 w-[320px] rotate-[150deg] fill-[var(--cfc-leaf)] text-white opacity-70" />
        <div className="cfc-wrap">
          <h2 className="cfc-display text-[38px] md:text-[56px]">{m.plansTitle}</h2>
          <div className={`mt-10 grid gap-4 ${plans.length >= 3 ? "lg:grid-cols-3" : plans.length === 2 ? "md:grid-cols-2" : "max-w-[620px]"}`}>
            {plans.map((p, i) => (
              <FadeIn key={p.name} delay={0.08 * i} className={`flex flex-col gap-5 rounded-[22px] p-7 md:p-9 ${p.highlight ? "bg-[var(--cfc-sun)] text-[var(--cfc-ink)]" : "bg-[var(--cfc-cream)] text-[var(--cfc-ink)]"}`}>
                <h3 className="cfc-display text-[30px] !font-normal">{p.name}</h3>
                <p className="cfc-display text-[44px] leading-none [font-variant-numeric:tabular-nums]">
                  {p.price ? (
                    <>
                      {p.price} KM {p.period && <span className="text-[16px] text-[var(--cfc-mute)]">/ {p.period}</span>}
                    </>
                  ) : (
                    <span className="text-[26px]">{m.onRequest}</span>
                  )}
                </p>
                <ul className="grid gap-2.5 text-[15px]">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-3">
                      <span aria-hidden className="text-[var(--cfc-green)]">—</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap gap-3 pt-3">
                  <a href={contact.phone.href} className="cfc-btn">
                    {contact.phone.display}
                  </a>
                  <a href={mail(p.name)} className="cfc-btn cfc-btn--line">
                    {m.ask}
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="cfc-wrap grid gap-12 py-16 md:grid-cols-2 md:gap-[6vw] md:py-24">
        <FadeIn>
          <h2 className="cfc-display text-[36px] text-[var(--cfc-green)] md:text-[50px]">{m.benefitsTitle}</h2>
          <ul className="mt-8">
            {c.benefits.items.map((b, i) => (
              <li key={b} className="flex items-baseline gap-5 border-b border-[var(--cfc-line)] py-4 text-[16px]">
                <span className="cfc-display w-8 shrink-0 text-[15px] text-[var(--cfc-moss)]">{String(i + 1).padStart(2, "0")}</span>
                {b}
              </li>
            ))}
          </ul>
        </FadeIn>
        <div className="relative isolate flex flex-col justify-end overflow-hidden rounded-[24px] p-8 text-white md:p-10">
          <Image src={images.tour.src} alt={images.tour.alt} fill sizes="(min-width: 768px) 44vw, 92vw" className="-z-10 object-cover" style={{ objectPosition: images.tour.position }} />
          <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(24_51_37/0.1)_15%,rgb(24_51_37/0.9)_62%)]" />
          <div className="min-h-[220px]" />
          <h3 className="cfc-display text-[34px]">{m.tourTitle}</h3>
          <p className="mt-3 max-w-[40ch] text-white/85">{m.tourBody}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={contact.phone.href} className="cfc-btn cfc-btn--cream">
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

      <section className="cfc-wrap pb-20 md:pb-28">
        {has && (
          <>
            {/* Desktop grid */}
            <div className="hidden overflow-hidden rounded-[22px] border border-[var(--cfc-line)] bg-white/50 md:block">
              <table className="w-full table-fixed border-collapse [font-variant-numeric:tabular-nums]">
                <thead>
                  <tr className="bg-[var(--cfc-green)] text-white">
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
                      <th scope="row" className="cfc-display p-4 text-left text-[22px] font-normal text-[var(--cfc-green)]">
                        {time}
                      </th>
                      {usedDays.map((d) => {
                        const items = byDay[d].filter((x) => x.time === time);
                        return (
                          <td key={d} className="p-2">
                            {items.map((x, i) => (
                              <div key={i} className="rounded-[14px] bg-[var(--cfc-sand)] p-3">
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
                <div key={d} className="rounded-[20px] bg-[var(--cfc-sand)] p-5">
                  <h2 className="cfc-display text-[26px] text-[var(--cfc-green)]">{t.days[d]}</h2>
                  {byDay[d].length ? (
                    <ul className="mt-3">
                      {byDay[d].map((x, i) => (
                        <li key={i} className="flex gap-4 border-t border-[var(--cfc-line)] py-3">
                          <span className="cfc-display w-14 shrink-0 text-[18px] text-[var(--cfc-green)]">{x.time}</span>
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
          <div className={`${has ? "mt-10" : ""} rounded-[22px] bg-[var(--cfc-sand)] p-5 md:p-8`}>
            {timetable.file.isImage ? (
              <a href={timetable.file.url} target="_blank" rel="noopener noreferrer" className="block">
                {/* eslint-disable-next-line @next/next/no-img-element -- an uploaded timetable of any size, shown as is */}
                <img src={timetable.file.url} alt={timetable.file.alt} className="mx-auto h-auto max-h-[1200px] w-auto max-w-full rounded-[12px]" />
              </a>
            ) : (
              <a href={timetable.file.url} target="_blank" rel="noopener noreferrer" className="cfc-btn">
                {t.download} <span aria-hidden>↗</span>
              </a>
            )}
          </div>
        )}

        {!has && !timetable.file && (
          <div className="relative isolate overflow-hidden rounded-[26px] bg-[var(--cfc-sun)] p-8 md:p-14">
            <span aria-hidden className="absolute -right-10 -top-10 -z-10 h-60 w-60 rounded-[52%_48%_44%_56%/58%_46%_54%_42%] bg-[var(--cfc-sun-soft)]" />
            <h2 className="cfc-display max-w-[20ch] text-[34px] text-[var(--cfc-ink)] md:text-[48px]">{t.emptyTitle}</h2>
            <p className="mt-4 max-w-[48ch] text-[16px] text-[var(--cfc-ink)]/75">{t.emptyBody}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={contact.phone.href} className="cfc-btn">
                {contact.phone.display}
              </a>
              {CLUB_INSTAGRAM && (
                <a href={CLUB_INSTAGRAM} target="_blank" rel="noopener noreferrer" className="cfc-btn cfc-btn--line">
                  {t.instagram} ↗
                </a>
              )}
            </div>
          </div>
        )}

        <div className="mt-14">
          <h2 className="cfc-display text-[30px] text-[var(--cfc-green)]">{t.typesTitle}</h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {classTypes.map((x) => (
              <li key={x} className="rounded-full border border-[var(--cfc-line)] px-4 py-2 text-[14px]">
                {x}
              </li>
            ))}
          </ul>
          <Link href={href(locale, "/centralfitnessclub/membership")} className="cfc-link mt-8 inline-block text-[15px] text-[var(--cfc-green)]">
            {c.nav.membership} →
          </Link>
        </div>
      </section>
    </>
  );
}

/** Club footer: green with a leaf, "Questions? Write to us", address, contact, hours, Instagram, links to the hotel and spa. */
export function ClubFooter({ locale, c, contact, address }: { locale: Locale; c: ClubCopy; contact: BrandContact; address: { street: string; city: string; directions: string } }) {
  const f = c.footer;
  return (
    <footer id="contact" className="relative isolate scroll-mt-20 overflow-hidden bg-[var(--cfc-green)] text-white">
      <Leaf className="absolute left-[34%] -top-24 -z-10 w-[420px] rotate-[28deg] fill-[var(--cfc-leaf)] text-white opacity-60" />
      <div className="cfc-wrap grid gap-12 py-16 md:grid-cols-[1.3fr_1fr_1fr] md:py-20">
        <div>
          <h2 className="cfc-display text-[38px] md:text-[52px]">
            {f.title[0]}
            <br />
            {f.title[1]}
          </h2>
          <a href={`mailto:${contact.email}?subject=${encodeURIComponent("Central Fitness Club")}`} className="cfc-btn cfc-btn--cream mt-7">
            {f.write} <span className="cfc-arrow" aria-hidden>→</span>
          </a>
          <div className="mt-10 flex items-center gap-4">
            <Image src="/brand/cfc-white.png" alt="Central Fitness Club" width={60} height={71} className="h-[71px] w-auto" />
            <p className="max-w-[28ch] text-[13px] text-white/60">{f.rights}</p>
          </div>
        </div>
        <div className="grid content-start gap-8 text-[15px]">
          <div>
            <p className="cfc-eyebrow mb-3 text-[var(--cfc-sun)]">{f.address}</p>
            <p>{address.street}</p>
            <p>{address.city}</p>
            <a href={address.directions} target="_blank" rel="noopener noreferrer" className="cfc-link mt-2 inline-block text-white/75">
              Google Maps ↗
            </a>
          </div>
          <div>
            <p className="cfc-eyebrow mb-3 text-[var(--cfc-sun)]">{f.contact}</p>
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
          </div>
        </div>
        <div className="grid content-start gap-8 text-[15px]">
          <div>
            <p className="cfc-eyebrow mb-3 text-[var(--cfc-sun)]">{f.hours}</p>
            {contact.hours.length ? (
              contact.hours.map((h) => (
                <div key={h.name} className="mb-3">
                  <p className="text-white/60">{h.name}</p>
                  {h.rows.map((r) => (
                    <p key={r.days}>
                      {r.days}: {r.closed ? "—" : r.time}
                    </p>
                  ))}
                </div>
              ))
            ) : (
              <p className="text-white/75">{f.hoursFallback}</p>
            )}
          </div>
          {CLUB_INSTAGRAM && (
            <div>
              <p className="cfc-eyebrow mb-3 text-[var(--cfc-sun)]">{f.follow}</p>
              <a href={CLUB_INSTAGRAM} target="_blank" rel="noopener noreferrer" className="cfc-link">
                Instagram
              </a>
            </div>
          )}
          <div>
            <p className="cfc-eyebrow mb-3 text-[var(--cfc-sun)]">{f.also}</p>
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
      <div className="cfc-wrap border-t border-white/10 py-6 text-[12px] text-white/50">© {new Date().getFullYear()} Hotel Central Sarajevo</div>
    </footer>
  );
}
