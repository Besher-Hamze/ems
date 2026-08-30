import { Schema } from "mongoose";
import { db } from "@/lib/mongoose";

const m = db();

const ServiceSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    slug: { type: String, required: true, unique: true },
    hidden: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Service = m.models.Service || m.model("Service", ServiceSchema);
