import { Schema } from "mongoose";
import { db } from "@/lib/mongoose";

const m = db();

const MessageSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    body: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Message = m.models.Message || m.model("Message", MessageSchema);
