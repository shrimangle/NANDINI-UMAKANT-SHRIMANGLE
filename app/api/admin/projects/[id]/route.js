import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import connectDB from "@/lib/db";
import Project from "@/models/Project";
import { cleanProject, validateProject } from "@/lib/projectInput";

export async function PUT(request, { params }) {
  const data = cleanProject(await request.json());
  const err = validateProject(data);
  if (err) return NextResponse.json({ error: err }, { status: 400 });
  try {
    await connectDB();
    const doc = await Project.findByIdAndUpdate(params.id, data, { new: true, runValidators: true }).lean();
    if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
    revalidatePath("/");
    return NextResponse.json(JSON.parse(JSON.stringify(doc)));
  } catch {
    return NextResponse.json({ error: "Could not update project." }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    await Project.findByIdAndDelete(params.id);
    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Could not delete project." }, { status: 400 });
  }
}
