import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { locales, defaultLocale } from "@/i18n/config";

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|images|videos|.*\\..*).*)"],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // --- Espace d'administration : protégé par NextAuth, jamais par le routing de langue ---
  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") return NextResponse.next();

    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // --- Site public : routage par langue (ar / fr / en) ---
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  if (pathnameHasLocale) return NextResponse.next();

  // Détection simple via l'en-tête Accept-Language, repli sur le français.
  const acceptLanguage = request.headers.get("accept-language") ?? "";
  const preferred = locales.find((l) => acceptLanguage.includes(l)) ?? defaultLocale;

  const url = request.nextUrl.clone();
  url.pathname = `/${preferred}${pathname}`;
  return NextResponse.redirect(url);
}
