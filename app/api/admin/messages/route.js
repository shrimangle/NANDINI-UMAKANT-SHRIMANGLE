import { NextResponse } from "next/server";
import connectDB, { hasDb } from "@/lib/db";
import Message from "@/models/Message";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!hasDb()) return NextResponse.json({ error: "MONGODB_URI is not set.", dbConnected: false, messages: [] });
  try {
    await connectDB();
    const messages = await Message.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ dbConnected: true, messages: JSON.parse(JSON.stringify(messages)) });
  } catch (err) {
    return NextResponse.json({ error: "Database connection failed.", dbConnected: false, messages: [] }, { status: 503 });
  }
}
