import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import connectDB, { hasDb } from "@/lib/db";
import Project from "@/models/Project";
import { getProjects } from "@/lib/projects";
import { cleanProject, validateProject } from "@/lib/projectInput";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ dbConnected: hasDb(), projects: await getProjects() });
}

export async function POST(request) {
  if (!hasDb()) return NextResponse.json({ error: "Set MONGODB_URI to add projects." }, { status: 503 });
  const data = cleanProject(await request.json());
  const err = validateProject(data);
  if (err) return NextResponse.json({ error: err }, { status: 400 });
  try {
    await connectDB();
    const doc = await Project.create(data);
    revalidatePath("/");
    return NextResponse.json(JSON.parse(JSON.stringify(doc)), { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "Could not save project." }, { status: 500 });
  }
}
