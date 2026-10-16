import { NextResponse } from "next/server";
import connectDB, { hasDb } from "@/lib/db";
import Message from "@/models/Message";
import { emailConfigured, sendContactEmail } from "@/lib/mailer";
import { rateLimit, clientIp } from "@/lib/rateLimit";

export const runtime = "nodejs";

export async function POST(request) {
  const limit = rateLimit(`contact:${clientIp(request)}`, 5, 15 * 60 * 1000);
  if (!limit.ok) {
    return NextResponse.json({ error: "Too many messages. Please try again later." }, { status: 429 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Hidden honeypot field: bots fill it, humans never see it
  if (body.website) return NextResponse.json({ success: true, message: "Thank you! Your message has been sent." });

  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const message = String(body.message || "").trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email and message are required." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (name.length > 100 || message.length > 2000) {
    return NextResponse.json({ error: "Name or message is too long." }, { status: 400 });
  }

  let saved = false;
  let mailed = false;

  if (hasDb()) {
    try {
      await connectDB();
      await Message.create({ name, email, message });
      saved = true;
    } catch (err) {
      console.error("Save message failed:", err.message);
    }
  }

  if (emailConfigured()) {
    try {
      await sendContactEmail({ name, email, message });
      mailed = true;
    } catch (err) {
      console.error("Email failed:", err.message);
    }
  }

  if (!saved && !mailed) {
    return NextResponse.json({ error: "Could not send message right now." }, { status: 503 });
  }
  return NextResponse.json({ success: true, message: "Thank you! Your message has been sent." }, { status: 201 });
}
