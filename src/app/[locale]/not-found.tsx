import Link from "next/link";
import { getDictionary } from "@/content/dictionary";

export default function NotFound() {
  const dict = getDictionary("en");
  return (
    <section className="flex min-h-[80svh] flex-col items-center justify-center bg-deep px-[var(--gutter)] pt-[var(--header-h)] text-center text-white">
      <p className="label mb-6">404</p>
      <h1 className="font-display text-[14vw] leading-[0.9] md:text-[7vw]">
        {dict.notFound.title[0]}
        <br />
        {dict.notFound.title[1]}
      </h1>
      <p className="body-copy mt-8 opacity-80">{dict.notFound.body}</p>
      <Link href="/en" className="pill pill-light mt-10">
        <span>{dict.common.backHome}</span>
      </Link>
    </section>
  );
}
