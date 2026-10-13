export type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  consent: boolean;
  locale: string;
  /** Honeypot: must stay empty */
  company?: string;
};

export type ContactErrors = Partial<Record<"name" | "email" | "message" | "consent", true>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Shared by the form (instant feedback) and the API route (authoritative). */
export function validateContact(p: Partial<ContactPayload>): ContactErrors {
  const e: ContactErrors = {};
  if (!p.name || p.name.trim().length < 2 || p.name.length > 120) e.name = true;
  if (!p.email || !EMAIL.test(p.email.trim()) || p.email.length > 200) e.email = true;
  if (!p.message || p.message.trim().length < 10 || p.message.length > 5000) e.message = true;
  if (!p.consent) e.consent = true;
  return e;
}
