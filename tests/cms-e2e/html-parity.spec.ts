import { expect, test } from "@playwright/test";

/**
 * Strongest parity check: with seeded content, every public page rendered by the CMS-ON site must be
 * structurally identical (every element, attribute, text node) to the same page from a CMS-OFF build of
 * the same code. Visual tests only catch what a screenshot shows; this catches everything else (links,
 * booking URLs, alt text, hidden text, metadata).
 */
const cms = process.env.E2E_BASE_URL ?? "http://127.0.0.1:3200";
const reference = process.env.E2E_STATIC_BASE_URL ?? "http://127.0.0.1:3201";

const rooms = ["single-room", "standard-twin-double", "superior-double-room", "family-room", "junior-suite", "presidential-suite"];
const sections = ["", "/about", "/rooms", "/spa", "/restaurant", "/meetings-events", "/location", "/contact"];
export const paths = ["en", "bs"].flatMap((l) => [...sections.map((s) => `/${l}${s}`), ...rooms.map((r) => `/${l}/rooms/${r}`)]);

/** Reduce a document to what a visitor/crawler can observe, removing build-specific noise only. */
export function normalise(html: string): string {
  const grab = (re: RegExp) => (html.match(re) ?? []).join("\n");
  const body = (html.match(/<body[\s\S]*<\/body>/i)?.[0] ?? "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\/_next\/static\/[^"'\s)]+/g, "/_next/static/X")
    .replace(/\s+/g, " ")
    .replace(/> </g, ">\n<");
  const head = [
    grab(/<html[^>]*lang="[^"]*"/i),
    grab(/<title>[\s\S]*?<\/title>/i),
    grab(/<meta (?:name|property)="(?:description|robots|og:[a-z:]+|twitter:[a-z:]+)"[^>]*>/gi),
    grab(/<link rel="(?:canonical|alternate)"[^>]*>/gi),
  ].join("\n");
  return `${head}\n${body}`;
}

for (const path of paths) {
  test(`HTML parity ${path}`, async ({ request }) => {
    const [a, b] = await Promise.all([request.get(cms + path), request.get(reference + path)]);
    expect(a.status(), "cms-on").toBe(200);
    expect(b.status(), "cms-off reference").toBe(200);
    const x = normalise(await a.text());
    const y = normalise(await b.text());
    if (x !== y) {
      const xs = x.split("\n"), ys = y.split("\n");
      const i = xs.findIndex((l, n) => l !== ys[n]);
      expect.soft(xs.slice(Math.max(0, i - 1), i + 2).join("\n"), `first difference (line ${i})`).toBe(ys.slice(Math.max(0, i - 1), i + 2).join("\n"));
    }
    expect(x === y, "identical normalised document").toBe(true);
  });
}
