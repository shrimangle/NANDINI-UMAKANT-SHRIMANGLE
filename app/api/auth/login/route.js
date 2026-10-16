import { NextResponse } from "next/server";
import { COOKIE_NAME, checkCredentials, cookieOptions, signToken } from "@/lib/auth";
import { rateLimit, clientIp } from "@/lib/rateLimit";

export const runtime = "nodejs";

export async function POST(request) {
  const limit = rateLimit(`login:${clientIp(request)}`, 5, 15 * 60 * 1000);
  if (!limit.ok) {
    return NextResponse.json(
      { error: `Too many attempts. Try again in ${Math.ceil(limit.retryAfter / 60)} minute(s).` },
      { status: 429 }
    );
  }

  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "ADMIN_EMAIL / ADMIN_PASSWORD are not set in the environment." }, { status: 500 });
  }
  if ((process.env.AUTH_SECRET || "").length < 32) {
    return NextResponse.json({ error: "AUTH_SECRET must be set (min 32 characters)." }, { status: 500 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!checkCredentials(body.email, body.password)) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  const token = await signToken(String(body.email).trim().toLowerCase());
  const res = NextResponse.json({ success: true });
  res.cookies.set(COOKIE_NAME, token, cookieOptions);
  return res;
}
