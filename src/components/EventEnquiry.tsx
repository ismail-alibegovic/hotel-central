"use client";

import { useState, type FormEvent } from "react";
import { clientCopy } from "@/content/clientCopy";
import type { Dictionary } from "@/content/dictionary";
import { validateContact, type ContactErrors } from "@/lib/contact";
import type { Locale } from "@/lib/i18n";
import { Arrow } from "./ui";

type Status = "idle" | "sending" | "sent" | "unavailable" | "error";

const field =
  "w-full border-0 border-b border-ink/30 bg-transparent px-0 pb-3 pt-2 text-[15px] outline-none transition-colors duration-500 focus:border-ink";
const lab = "label mb-1 block opacity-70";

/**
 * The enquiry form on the Meetings & Events page. It collects the details a proposal needs (type, date, guests,
 * set-up, extras) and sends them through the same delivery route as the contact form, as a structured message.
 */
export function EventEnquiry({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const f = clientCopy.eventForm[locale];
  const c = dict.contact;
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<ContactErrors>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const g = (k: string) => String(fd.get(k) ?? "").trim();
    const extras = fd.getAll("services").map(String);
    const lines = [
      `${f.type}: ${g("type")}`,
      `${f.date}: ${g("date") || "—"}`,
      `${f.guests}: ${g("guests") || "—"}`,
      `${f.setup}: ${g("setup")}`,
      `${f.services} ${extras.length ? extras.join(", ") : "—"}`,
      ...(g("notes") ? ["", g("notes")] : []),
    ];
    const payload = {
      name: g("name"),
      email: g("email"),
      phone: g("phone"),
      subject: f.subject,
      message: lines.join("\n"),
      consent: fd.get("consent") === "on",
      company: g("company"),
      locale,
    };
    const v = validateContact(payload);
    setErrors(v);
    if (Object.keys(v).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(v)[0]}"]`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else if (res.status === 503) setStatus("unavailable");
      else if (res.status === 422) {
        setErrors((await res.json()).errors ?? {});
        setStatus("idle");
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  const err = (k: keyof ContactErrors) =>
    errors[k] ? (
      <p id={`ee-err-${k}`} role="alert" className="label-sm mt-2 text-[#8a3b2a]">
        {c.errors[k]}
      </p>
    ) : null;

  return (
    <section id="enquiry" data-block="eventEnquiry" className="scroll-mt-20 bg-ivory px-[var(--gutter)] py-16 text-ink md:py-[7vw]">
      <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-[6vw]">
        <div>
          <p className="label mb-8">{f.label}</p>
          <h2 className="font-display text-[length:var(--fs-m)] leading-[0.95] md:text-[4vw]">
            {f.title[0]}
            <br />
            {f.title[1]}
          </h2>
          <p className="body-copy mt-8 max-w-[40ch] opacity-85">{f.intro}</p>
        </div>

        <form onSubmit={onSubmit} noValidate className="grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2">
          <p className="label border-b border-ink/20 pb-3 opacity-60 sm:col-span-2">{f.details}</p>

          <div className="sm:col-span-2">
            <label htmlFor="ee-type" className={lab}>{f.type}</label>
            <select id="ee-type" name="type" defaultValue={f.types[0]} className={`${field} cursor-pointer`}>
              {f.types.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="ee-date" className={lab}>{f.date}</label>
            <input id="ee-date" name="date" type="date" className={field} />
          </div>
          <div>
            <label htmlFor="ee-guests" className={lab}>{f.guests}</label>
            <input id="ee-guests" name="guests" type="number" inputMode="numeric" min={1} max={500} className={field} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="ee-setup" className={lab}>{f.setup}</label>
            <select id="ee-setup" name="setup" defaultValue={f.setups[0]} className={`${field} cursor-pointer`}>
              {f.setups.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          <fieldset className="sm:col-span-2">
            <legend className={lab}>{f.services}</legend>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-3">
              {f.servicesList.map((s) => (
                <label key={s} className="flex cursor-pointer items-center gap-3 text-[14px]">
                  <input type="checkbox" name="services" value={s} className="h-3.5 w-3.5 accent-[#363a2a]" />
                  {s}
                </label>
              ))}
            </div>
          </fieldset>

          <p className="label mt-4 border-b border-ink/20 pb-3 opacity-60 sm:col-span-2">{f.contactTitle}</p>

          <div>
            <label htmlFor="ee-name" className={lab}>{c.name}</label>
            <input id="ee-name" name="name" autoComplete="name" className={field} aria-invalid={!!errors.name} aria-describedby={errors.name ? "ee-err-name" : undefined} required />
            {err("name")}
          </div>
          <div>
            <label htmlFor="ee-email" className={lab}>{c.email}</label>
            <input id="ee-email" name="email" type="email" autoComplete="email" className={field} aria-invalid={!!errors.email} aria-describedby={errors.email ? "ee-err-email" : undefined} required />
            {err("email")}
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="ee-phone" className={lab}>{c.phone}</label>
            <input id="ee-phone" name="phone" type="tel" autoComplete="tel" className={field} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="ee-notes" className={lab}>{f.notes}</label>
            <textarea id="ee-notes" name="notes" rows={4} className={`${field} resize-y`} />
          </div>

          {/* Honeypot */}
          <div aria-hidden className="absolute -left-[9999px]">
            <input tabIndex={-1} name="company" autoComplete="off" />
          </div>

          <div className="sm:col-span-2">
            <label className="flex cursor-pointer items-start gap-3 text-[12px] leading-[1.5]">
              <input name="consent" type="checkbox" className="mt-[3px] h-3.5 w-3.5 accent-[#363a2a]" aria-invalid={!!errors.consent} aria-describedby={errors.consent ? "ee-err-consent" : undefined} />
              <span>{c.consent}</span>
            </label>
            {err("consent")}
          </div>
          <div className="flex flex-col items-start gap-5 sm:col-span-2">
            <button type="submit" disabled={status === "sending"} className="pill pill-dark disabled:opacity-50">
              <span>{status === "sending" ? c.sending : f.title.join(" ")}</span>
              <Arrow />
            </button>
            <div aria-live="polite" className="body-copy max-w-[52ch]">
              {status === "sent" && <p>{c.success}</p>}
              {status === "unavailable" && <p className="text-[#8a3b2a]">{c.errors.unavailable}</p>}
              {status === "error" && <p className="text-[#8a3b2a]">{c.errors.generic}</p>}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
