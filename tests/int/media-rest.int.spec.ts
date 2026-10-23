import fs from "node:fs";
import path from "node:path";
import { handleEndpoints, type Payload } from "payload";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { boot, PNG_1X1, rand, type Harness } from "./helpers";

/** Media upload validation through the real REST handler (multipart), as the admin UI sends it. */
let h: Harness;
let payload: Payload;
const PASSWORD = "Correct-Horse-" + rand();
let adminToken = "";
let editorToken = "";

async function upload(opts: { token?: string; name: string; type: string; bytes: Buffer | Uint8Array; alt?: string }) {
  const form = new FormData();
  form.set("_payload", JSON.stringify({ ...(opts.alt === undefined ? {} : { alt: opts.alt }) }));
  form.set("file", new Blob([new Uint8Array(opts.bytes)], { type: opts.type }), opts.name);
  const res = await handleEndpoints({
    config: payload.config,
    request: new Request("http://localhost:3000/api/media?locale=en", {
      method: "POST",
      headers: opts.token ? { Authorization: `JWT ${opts.token}` } : {},
      body: form,
    }),
  });
  const text = await res.text();
  let json: Record<string, any> | null = null; // eslint-disable-line @typescript-eslint/no-explicit-any
  try {
    json = JSON.parse(text);
  } catch {
    /* not JSON */
  }
  return { status: res.status, json, text };
}

beforeAll(async () => {
  h = await boot();
  payload = h.payload;
  const mk = (p: string) => payload.create({ collection: "users", data: { email: `${p}-${rand()}@example.test`, password: PASSWORD } as never, overrideAccess: true });
  const [a, e] = [await mk("admin"), await mk("editor")];
  const login = async (email: string) =>
    (await (await handleEndpoints({ config: payload.config, request: new Request("http://localhost:3000/api/users/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password: PASSWORD }) }) })).json()).token as string;
  adminToken = await login(a.email);
  editorToken = await login(e.email);
});
afterAll(async () => h?.stop());

describe("media upload validation (REST)", () => {
  it("accepts a real image from an editor with alt text and stores it", async () => {
    const res = await upload({ token: editorToken, name: `ok-${rand()}.png`, type: "image/png", bytes: PNG_1X1, alt: "A pixel" });
    expect(res.status).toBe(201);
    const file = path.join(h.mediaDir, res.json!.doc.filename);
    expect(fs.existsSync(file)).toBe(true);
    expect(fs.readFileSync(file).equals(PNG_1X1)).toBe(true);
  });

  it("requires alt text", async () => {
    const res = await upload({ token: editorToken, name: `noalt-${rand()}.png`, type: "image/png", bytes: PNG_1X1 });
    expect(res.status).toBe(400);
  });

  it("rejects anonymous uploads", async () => {
    const res = await upload({ name: `anon-${rand()}.png`, type: "image/png", bytes: PNG_1X1, alt: "x" });
    expect([401, 403]).toContain(res.status);
  });

  it("rejects SVG (script-capable)", async () => {
    const svg = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" onload="alert(1)"><script>alert(1)</script></svg>');
    const res = await upload({ token: adminToken, name: "x.svg", type: "image/svg+xml", bytes: svg, alt: "x" });
    expect(res.status).toBeGreaterThanOrEqual(400);
  });

  it("rejects HTML/JS disguised as an image by name and declared type", async () => {
    const html = Buffer.from("<!doctype html><script>alert(document.cookie)</script>");
    for (const [name, type] of [["evil.png", "image/png"], ["evil.jpg", "image/jpeg"], ["evil.html", "text/html"], ["evil.png", "text/html"]]) {
      const res = await upload({ token: adminToken, name, type, bytes: html, alt: "x" });
      expect(res.status, `${name} as ${type}`).toBeGreaterThanOrEqual(400);
    }
    expect(fs.readdirSync(h.mediaDir).some((f) => f.startsWith("evil"))).toBe(false);
  });

  it("rejects files over the 8 MB limit", async () => {
    const big = Buffer.concat([PNG_1X1, Buffer.alloc(9 * 1024 * 1024)]);
    const res = await upload({ token: adminToken, name: `big-${rand()}.png`, type: "image/png", bytes: big, alt: "big" });
    expect(res.status).toBeGreaterThanOrEqual(400);
  });

  it("does not let path-traversal filenames escape the media directory", async () => {
    await upload({ token: adminToken, name: "../../../../tmp/pwned.png", type: "image/png", bytes: PNG_1X1, alt: "x" });
    expect(fs.existsSync("/tmp/pwned.png")).toBe(false);
    expect(fs.existsSync(path.join(path.dirname(h.mediaDir), "pwned.png"))).toBe(false);
  });
});
