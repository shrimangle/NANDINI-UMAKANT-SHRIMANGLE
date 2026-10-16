import { NextResponse } from "next/server";
import { COOKIE_NAME, verifyToken } from "@/lib/jwt";

// Protects /admin pages and /api/admin routes. Everything else is public.
export async function middleware(request) {
  const { pathname } = request.nextUrl;
  let session = null;
  try {
    session = await verifyToken(request.cookies.get(COOKIE_NAME)?.value);
  } catch {
    session = null;
  }
  if (session) return NextResponse.next();

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = { matcher: ["/admin/:path*", "/api/admin/:path*"] };
