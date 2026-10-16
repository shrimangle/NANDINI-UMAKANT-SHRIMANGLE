// Node-only helpers: checking the email/password from the environment (no database).
import { createHash, timingSafeEqual } from "crypto";

export { COOKIE_NAME, signToken, verifyToken } from "./jwt";

const digest = (v) => createHash("sha256").update(String(v)).digest();
const safeEqual = (a, b) => timingSafeEqual(digest(a), digest(b));

export function checkCredentials(email, password) {
  const e = process.env.ADMIN_EMAIL;
  const p = process.env.ADMIN_PASSWORD;
  if (!e || !p) return false;
  const emailOk = safeEqual(String(email || "").trim().toLowerCase(), e.trim().toLowerCase());
  const passOk = safeEqual(password || "", p);
  return emailOk && passOk;
}

export const cookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
};
