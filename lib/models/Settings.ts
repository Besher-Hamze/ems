import { Schema } from "mongoose";
import { db } from "@/lib/mongoose";

const m = db();

const SettingsSchema = new Schema(
  {
    companyName: { type: String, default: "EMS.PRO" },
    slogan: { type: String, default: "" },
    logo: { type: String, default: "/brand/logo.svg" },
    phone: { type: String, default: "" },
    whatsapp: { type: String, default: "" },
    email: { type: String, default: "" },
    address: { type: String, default: "" },
    facebook: { type: String, default: "" },
    instagram: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Settings = m.models.Settings || m.model("Settings", SettingsSchema);
