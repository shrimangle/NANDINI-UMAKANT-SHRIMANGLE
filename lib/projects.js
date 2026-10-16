import connectDB from "./db";
import Project from "@/models/Project";
import seedProjects from "./seedProjects";

const plain = (docs) => JSON.parse(JSON.stringify(docs));
const fallback = () => seedProjects.map((p, i) => ({ ...p, _id: `seed-${i}` }));

// Projects from MongoDB. Your 3 starter projects are saved once, the first time the site connects
// (deleting them later in the admin panel will NOT bring them back). Falls back to the built-in list without a database.
export async function getProjects() {
  try {
    const conn = await connectDB();
    if (!conn) return fallback();

    const meta = conn.connection.db.collection("meta");
    if (!(await meta.findOne({ _id: "projects_seeded" }))) {
      if ((await Project.countDocuments()) === 0) await Project.insertMany(seedProjects);
      await meta.updateOne({ _id: "projects_seeded" }, { $set: { at: new Date() } }, { upsert: true });
    }
    const list = await Project.find().sort({ order: 1, createdAt: 1 }).lean();
    return plain(list);
  } catch (err) {
    console.error("getProjects failed:", err.message);
    return fallback();
  }
}
