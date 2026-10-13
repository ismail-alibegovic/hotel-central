import { NextResponse } from "next/server";
import { hotel } from "@/content/hotel";
import { validateContact, type ContactPayload } from "@/lib/contact";

/**
 * Contact form delivery.
 * Sends through Resend's HTTP API when RESEND_API_KEY and CONTACT_FROM are configured
 * (CONTACT_TO defaults to the hotel's published address). Without configuration it
 * answers 503 so the form tells the visitor to email or call instead — it never
 * reports a delivery that did not happen.
 */
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export async function POST(req: Request) {
  let body: Partial<ContactPayload>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  // Bots fill the hidden field; accept silently without sending.
  if (body.company) return NextResponse.json({ ok: true });

  const errors = validateContact(body);
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, error: "validation", errors }, { status: 422 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (limited(ip)) return NextResponse.json({ ok: false, error: "rate" }, { status: 429 });

  const key = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM;
  const to = process.env.CONTACT_TO ?? hotel.email;
  if (!key || !from) return NextResponse.json({ ok: false, error: "unavailable" }, { status: 503 });

  const p = body as ContactPayload;
  const rows: [string, string][] = [
    ["Name", p.name],
    ["Email", p.email],
    ["Phone", p.phone || "—"],
    ["Subject", p.subject],
    ["Language", p.locale],
  ];
  const html = `<table>${rows.map(([k, v]) => `<tr><td><b>${k}</b></td><td>${esc(v)}</td></tr>`).join("")}</table><p>${esc(p.message).replace(/\n/g, "<br>")}</p>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: p.email,
      subject: `[hotelcentral.ba] ${p.subject} — ${p.name}`,
      html,
      text: `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${p.message}`,
    }),
  });

  if (!res.ok) return NextResponse.json({ ok: false, error: "delivery" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
