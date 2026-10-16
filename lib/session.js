import { cookies } from "next/headers";
import { COOKIE_NAME, verifyToken } from "./jwt";

// For server components / route handlers: returns the admin payload or null.
export async function getSession() {
  const token = cookies().get(COOKIE_NAME)?.value;
  return verifyToken(token);
}
