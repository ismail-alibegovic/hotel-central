import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale } from "@/lib/i18n";

/** Next 16 "proxy" (formerly middleware). Redirect un-prefixed paths to a locale. Bosnian (or HR/SR) browsers get /bs. */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1] ?? "";
  if (isLocale(first)) return NextResponse.next();

  const accept = request.headers.get("accept-language")?.toLowerCase() ?? "";
  const preferred = /^(bs|hr|sr|sh)\b/.test(accept) ? "bs" : defaultLocale;

  const url = request.nextUrl.clone();
  url.pathname = `/${preferred}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next|images|favicon.ico|icon|apple-icon|opengraph-image|robots.txt|sitemap.xml|.*\\..*).*)"],
};
