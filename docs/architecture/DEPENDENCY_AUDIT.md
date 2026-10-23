# Dependency audit — `npm audit --omit=dev` with Payload installed

Date 2026-10-23 · Payload 3.92.0 · Next 16.4.2 · lockfile as committed.

## Result
| | Count | Disposition |
| --- | --: | --- |
| Critical | 0 | DOMPurify (via the admin's Monaco editor) **fixed** with `overrides.monaco-editor.dompurify ^3.4.17` |
| High | 10 | all one root cause (`braces`, below) — **not exploitable in this architecture**, no upstream fix exists |
| Moderate / low | 0 | |

npm lists 10 "high" packages only because it counts every package along the dependency chain. There is a single advisory:
**GHSA-vfj7-8cjw-p6xm — `braces` (all versions, latest 3.0.3): stack exhaustion / denial of service when expanding deeply nested brace patterns.**

## Why it is not reachable
`braces` is a *pattern expander*. Exploitation requires an attacker to control the **pattern string** passed to it. In this repo it is reached only through:

| Path | What it is | Pattern source | Shipped to production runtime? |
| --- | --- | --- | --- |
| `@payloadcms/next → sass@1.77.4 → chokidar → braces` | Sass file *watcher* used by Next/Payload's stylesheet build | file paths on the developer/CI machine | **No** — `sass` is only referenced from `withPayload` (build config) |
| `@payloadcms/storage-vercel-blob → plugin-cloud-storage → find-node-modules → findup-sync → micromatch → braces` | `find-node-modules` is declared as a dependency but is **not imported by any file of the plugin** (`grep` of `dist/` finds nothing) | none | **No** |
| `eslint-config-next → … → fast-glob → micromatch → braces` (dev-only; hidden by `--omit=dev` but reported by a full audit) | ESLint's file globbing | repo file names | **No** — devDependency |

No code path hands request data (URLs, form fields, query strings, uploaded file names, CMS content) to any of them.

## Verified, not just argued
`scripts/cms/e2e.mts` (run by `npm run test:cms-e2e`, in CI job `cms`) inspects Next's file-trace output (`.next/**/*.nft.json`), i.e. exactly the files that would be bundled into Vercel's serverless functions, and **fails the build if any of `braces, micromatch, chokidar, sass, find-node-modules, findup-sync, monaco-editor, dompurify` is traced**. It also asserts the check is not vacuous (`payload` must be in the traces). Result on the last run: 4,255 distinct traced files, none of the above present.

(Browser side: `monaco-editor`/`dompurify` ship inside the admin's client chunks, which only authenticated staff load. The DOMPurify advisories are fixed by the override regardless.)

## Residual risk and process
- Risk: **low** (no attacker-controlled input; build/dev tooling only).
- Action: re-run `npm audit` on every Payload bump; remove the override once Payload/Monaco ship `dompurify >= 3.4.17` themselves; drop this document's exception when `braces` publishes a fixed release.
- Do **not** run `npm audit fix --force`: its proposal is a breaking *downgrade* of `@payloadcms/richtext-lexical` to 0.11.x.
- Separately tracked (not a vulnerability): Payload's CLI (`payload generate:types`, `payload run`) crashes under tsx/esbuild 0.28 (undici `arguments[0]` constructor check). The repo's `cms:*` scripts use the tsx CLI directly (`scripts/cms/*.mts`). Re-test the stock CLI after Payload/tsx upgrades.
