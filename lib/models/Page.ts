import { Schema } from "mongoose";
import { db } from "@/lib/mongoose";

const m = db();

const PageSchema = new Schema(
  {
    key: { type: String, required: true, unique: true },
    title: { type: String, default: "" },
    body: { type: String, default: "" },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Page = m.models.Page || m.model("Page", PageSchema);
