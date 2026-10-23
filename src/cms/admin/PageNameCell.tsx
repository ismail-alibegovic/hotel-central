"use client";

import Link from "next/link";
import { pageName } from "../pageNames";

/** List cell for the built-in pages: shows “Spa”, “Contact” … instead of the page key (“spa”, “contact”). Display only. */
export function PageNameCell({ cellData, rowData }: { cellData?: unknown; rowData?: { id?: string | number } }) {
  const label = pageName(cellData) || String(cellData ?? "");
  return rowData?.id !== undefined ? <Link href={`/admin/collections/pages/${rowData.id}`}>{label}</Link> : <span>{label}</span>;
}
