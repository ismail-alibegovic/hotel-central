import type { Hours, Phone } from "@/cms/hotelInfoMerge";
import { Photo } from "../Photo";
import { FadeIn } from "../Reveal";

/**
 * Opening hours for one or more places of the hotel, read from Hotel Information (CMS → Hotel Information →
 * Opening hours; one entry per place: café, gym, spa, pool…). Nothing is invented: until the hotel enters the hours,
 * the section says so and gives the reception phone number instead.
 */
export function OpeningHours({
  hours,
  facilities,
  label,
  title,
  fallback,
  note,
  phone,
  photos = [],
  className = "bg-ivory text-ink",
  rule = "border-ink/15",
  titleClass = "font-display",
}: {
  hours: Hours[];
  facilities: string[];
  label: string;
  title: string[];
  fallback: string;
  note?: string;
  phone: Phone;
  photos?: { src: string; alt: string; position?: string }[];
  className?: string;
  rule?: string;
  titleClass?: string;
}) {
  const shown = hours.filter((h) => facilities.includes(h.facility) && h.rows.length);
  const [before, after] = fallback.split("{phone}");
  return (
    <section aria-labelledby="hours-title" className={`relative overflow-hidden px-[var(--gutter)] py-16 md:py-[6vw] ${className}`}>
      <div className={`grid gap-12 ${photos.length ? "md:grid-cols-[1fr_1.1fr] md:gap-[5vw]" : "md:grid-cols-[1fr_1.4fr]"} md:items-start`}>
        <div>
          <p className="label opacity-60">{label}</p>
          <h2 id="hours-title" className={`${titleClass} mt-6 scroll-mt-[140px] text-[13vw] leading-[0.9] md:text-[5vw]`}>
            {title.map((l, i) => (
              <span key={l} className={`block ${i ? "pl-[6vw] md:pl-[4vw]" : ""}`}>
                {l}
              </span>
            ))}
          </h2>
          <FadeIn className="mt-10 max-w-[520px]">
            {shown.length ? (
              <div className="space-y-8">
                {shown.map((h) => (
                  <div key={h.facility + h.name}>
                    {shown.length > 1 && <p className="label mb-2 opacity-70">{h.name}</p>}
                    <dl className={`label divide-y border-y ${rule}`}>
                      {h.rows.map((r) => (
                        <div key={r.days} className={`flex justify-between gap-6 py-[0.85em] ${rule}`}>
                          <dt className="opacity-70">{r.days}</dt>
                          <dd className="text-right">{r.closed ? "—" : r.time}</dd>
                        </div>
                      ))}
                    </dl>
                    {h.note && <p className="body-copy mt-3 opacity-75">{h.note}</p>}
                  </div>
                ))}
              </div>
            ) : (
              <p className="body-copy max-w-[44ch] opacity-90">
                {before}
                <a href={phone.href} className="link-line whitespace-nowrap">
                  {phone.display}
                </a>
                {after}
              </p>
            )}
            {note && <p className="body-copy mt-6 max-w-[44ch] opacity-75">{note}</p>}
          </FadeIn>
        </div>
        {photos.length > 0 && (
          <div className="grid grid-cols-[1.25fr_1fr] items-end gap-4 md:gap-[1.6vw]">
            {photos.slice(0, 2).map((p, i) => (
              <Photo key={p.src} src={p.src} alt={p.alt} position={p.position} sizes="(min-width: 1024px) 26vw, 50vw" className={i ? "aspect-[3/4]" : "aspect-[4/5]"} grade="grade-soft" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
