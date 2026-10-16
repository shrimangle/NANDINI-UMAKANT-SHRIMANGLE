// Edge-safe token helpers (used by middleware.js - no Node-only imports here).
import { SignJWT, jwtVerify } from "jose";

export const COOKIE_NAME = "admin_token";
export const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

const secretKey = () => {
  const s = process.env.AUTH_SECRET || "";
  if (s.length < 32) throw new Error("AUTH_SECRET must be at least 32 characters");
  return new TextEncoder().encode(s);
};

export async function signToken(email) {
  return new SignJWT({ email, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(secretKey());
}

export async function verifyToken(token) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey());
    return payload.role === "admin" ? payload : null;
  } catch {
    return null;
  }
}
