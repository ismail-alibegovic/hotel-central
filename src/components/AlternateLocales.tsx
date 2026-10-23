"use client";

import { useEffect } from "react";
import { altStore, type AltPaths } from "@/lib/altLocales";

/** Rendered by pages whose address differs per language; tells the language switcher where the other languages live. */
export function AlternateLocales({ paths }: { paths: AltPaths }) {
  const key = JSON.stringify(paths);
  useEffect(() => {
    altStore.set(JSON.parse(key) as AltPaths);
    return () => altStore.set(null);
  }, [key]);
  return null;
}
