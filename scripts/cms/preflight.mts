/**
 * Usage: node --env-file=<file> --import tsx scripts/cms/preflight.mts staging|production
 *    or: STAGING vars exported in the shell, then `npm run cms:preflight -- staging`
 * Prints a pass/warn/fail table WITHOUT echoing any value. Exit code 1 on any error.
 */
import { hasErrors, preflight, type Target } from "../../src/cms/preflight";

const target = (process.argv[2] ?? "staging") as Target;
if (target !== "staging" && target !== "production") throw new Error("target must be staging or production");
const findings = preflight(process.env, target);
const icon = { ok: "PASS", warn: "WARN", error: "FAIL" } as const;
for (const f of findings) console.log(`${icon[f.level]}  ${f.name.padEnd(26)} ${f.message}`);
const errors = findings.filter((f) => f.level === "error").length;
console.log(`\n${target}: ${errors ? `${errors} blocking problem(s)` : "no blocking problems"}`);
process.exit(hasErrors(findings) ? 1 : 0);
