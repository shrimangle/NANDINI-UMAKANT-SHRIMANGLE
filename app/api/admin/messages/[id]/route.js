import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Message from "@/models/Message";

export async function PATCH(request, { params }) {
  try {
    await connectDB();
    const { read } = await request.json();
    const doc = await Message.findByIdAndUpdate(params.id, { read: Boolean(read) }, { new: true }).lean();
    if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(JSON.parse(JSON.stringify(doc)));
  } catch {
    return NextResponse.json({ error: "Could not update message." }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    await Message.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Could not delete message." }, { status: 400 });
  }
}
