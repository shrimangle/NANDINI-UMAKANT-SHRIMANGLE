import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    org: { type: String, default: "", trim: true, maxlength: 120 },
    description: { type: String, required: true, trim: true, maxlength: 1000 },
    icon: { type: String, default: "fa-solid fa-laptop-code", trim: true },
    tags: [String],
    github: { type: String, default: "", trim: true },
    live: { type: String, default: "", trim: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model("Project", projectSchema);
