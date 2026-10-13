"use client";

import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/content/dictionary";
import { validateContact, type ContactErrors } from "@/lib/contact";
import type { Locale } from "@/lib/i18n";
import { Arrow } from "./ui";

type Status = "idle" | "sending" | "sent" | "unavailable" | "error";

const field =
  "peer w-full border-0 border-b border-ink/30 bg-transparent px-0 pb-3 pt-6 text-[14px] outline-none transition-colors duration-500 focus:border-ink placeholder:text-transparent";
const floating =
  "label pointer-events-none absolute left-0 top-6 origin-left transition-all duration-500 peer-focus:top-0 peer-focus:scale-90 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:scale-90 opacity-70";

export function ContactForm({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const c = dict.contact;
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<ContactErrors>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      subject: String(fd.get("subject") ?? ""),
      message: String(fd.get("message") ?? ""),
      consent: fd.get("consent") === "on",
      company: String(fd.get("company") ?? ""),
      locale,
    };
    const v = validateContact(payload);
    setErrors(v);
    if (Object.keys(v).length) {
      const first = Object.keys(v)[0];
      e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus("sent");
        (e.target as HTMLFormElement).reset();
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
      <p id={`err-${k}`} role="alert" className="label-sm mt-2 text-[#8a3b2a]">
        {c.errors[k]}
      </p>
    ) : null;

  return (
    <form onSubmit={onSubmit} noValidate className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
      <div className="relative">
        <input id="cf-name" name="name" autoComplete="name" placeholder=" " className={field} aria-invalid={!!errors.name} aria-describedby={errors.name ? "err-name" : undefined} required />
        <label htmlFor="cf-name" className={floating}>{c.name}</label>
        {err("name")}
      </div>
      <div className="relative">
        <input id="cf-email" name="email" type="email" autoComplete="email" placeholder=" " className={field} aria-invalid={!!errors.email} aria-describedby={errors.email ? "err-email" : undefined} required />
        <label htmlFor="cf-email" className={floating}>{c.email}</label>
        {err("email")}
      </div>
      <div className="relative">
        <input id="cf-phone" name="phone" type="tel" autoComplete="tel" placeholder=" " className={field} />
        <label htmlFor="cf-phone" className={floating}>{c.phone}</label>
      </div>
      <div className="relative">
        <label htmlFor="cf-subject" className="label absolute left-0 top-0 scale-90 opacity-70">{c.subject}</label>
        <select id="cf-subject" name="subject" className={`${field} cursor-pointer appearance-none`} defaultValue={c.subjects[0]}>
          {c.subjects.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>
      <div className="relative sm:col-span-2">
        <textarea id="cf-message" name="message" rows={5} placeholder=" " className={`${field} resize-y`} aria-invalid={!!errors.message} aria-describedby={errors.message ? "err-message" : undefined} required />
        <label htmlFor="cf-message" className={floating}>{c.message}</label>
        {err("message")}
      </div>
      {/* Honeypot */}
      <div aria-hidden className="absolute -left-[9999px]">
        <input tabIndex={-1} name="company" autoComplete="off" />
      </div>
      <div className="sm:col-span-2">
        <label className="flex cursor-pointer items-start gap-3 text-[12px] leading-[1.5]">
          <input name="consent" type="checkbox" className="mt-[3px] h-3.5 w-3.5 accent-[#363a2a]" aria-invalid={!!errors.consent} aria-describedby={errors.consent ? "err-consent" : undefined} />
          <span>{c.consent}</span>
        </label>
        {err("consent")}
      </div>
      <div className="flex flex-col items-start gap-5 sm:col-span-2">
        <button type="submit" disabled={status === "sending"} className="pill pill-dark disabled:opacity-50">
          <span>{status === "sending" ? c.sending : c.send}</span>
          <Arrow />
        </button>
        <div aria-live="polite" className="body-copy max-w-[52ch]">
          {status === "sent" && <p>{c.success}</p>}
          {status === "unavailable" && <p className="text-[#8a3b2a]">{c.errors.unavailable}</p>}
          {status === "error" && <p className="text-[#8a3b2a]">{c.errors.generic}</p>}
        </div>
      </div>
    </form>
  );
}
