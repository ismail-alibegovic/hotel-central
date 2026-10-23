/**
 * Import this FIRST in scripts that load `payload/node` (type generation, migration generation).
 * Under tsx, Payload's `import nextEnv from "@next/env"` receives `undefined` because the bundled CJS module has no
 * `default` export, and loading `payload/node` crashes with "Cannot destructure property 'loadEnvConfig'".
 * Giving the module a self-referencing `default` makes both interop modes work. Dev tooling only; not used at runtime.
 */
import { createRequire } from "node:module";

const fromPayload = createRequire(createRequire(import.meta.url).resolve("payload"));
const nextEnv = fromPayload("@next/env") as Record<string, unknown>;
if (!("default" in nextEnv)) Object.defineProperty(nextEnv, "default", { value: nextEnv, enumerable: false });
