import { Schema } from "mongoose";
import { db } from "@/lib/mongoose";

const m = db();

const ProjectSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    images: { type: [String], default: [] },
    videos: { type: [String], default: [] },
    slug: { type: String, required: true, unique: true },
    hidden: { type: Boolean, default: false },
  },
  { timestamps: true }
);

if (m.models.Project) {
  if (!m.models.Project.schema.path("images")) {
    m.models.Project.schema.add({
      images: { type: [String], default: [] },
      videos: { type: [String], default: [] },
    });
  }
}

export const Project = m.models.Project || m.model("Project", ProjectSchema);
