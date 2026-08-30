import { Schema } from "mongoose";
import { db } from "@/lib/mongoose";

const m = db();

const UserSchema = new Schema(
  {
    name: { type: String, default: "المدير" },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export const User = m.models.User || m.model("User", UserSchema);
