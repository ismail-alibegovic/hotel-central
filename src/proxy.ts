import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale } from "@/lib/i18n";

/**
 * Next 16 "proxy" (formerly middleware).
 * - CMS routes (/admin, /api/* except the contact form) exist only when CMS_ENABLED=true; otherwise 404,
 *   so a deployment without CMS secrets never exposes a half-configured admin or API.
 * - Un-prefixed public paths are redirected to a locale. Bosnian (or HR/SR) browsers get /bs.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1] ?? "";

  if (first === "api" && (pathname === "/api/contact" || pathname.startsWith("/api/contact/"))) return NextResponse.next();
  if (first === "admin" || first === "api") {
    return process.env.CMS_ENABLED === "true" ? NextResponse.next() : new NextResponse("Not found", { status: 404 });
  }

  if (isLocale(first)) return NextResponse.next();

  const accept = request.headers.get("accept-language")?.toLowerCase() ?? "";
  const preferred = /^(bs|hr|sr|sh)\b/.test(accept) ? "bs" : defaultLocale;

  const url = request.nextUrl.clone();
  url.pathname = `/${preferred}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|images|favicon.ico|icon|apple-icon|opengraph-image|robots.txt|sitemap.xml|.*\\..*).*)"],
};
