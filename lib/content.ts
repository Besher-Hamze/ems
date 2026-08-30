import { connectDB } from "@/lib/db";
import { Settings } from "@/lib/models/Settings";
import { Page } from "@/lib/models/Page";
import { Service } from "@/lib/models/Service";
import { Project } from "@/lib/models/Project";

const fallbackSettings = {
  companyName: "EMS.PRO",
  slogan: "أساس جمال بيتك يبدأ من تحت البلاط",
  logo: "/brand/logo.png",
  phone: "0944010556",
  whatsapp: "0944010556",
  email: "info@ems.pro",
  address: "سورية — حلب",
  facebook: "",
  instagram: "",
};

export async function getSettings() {
  try {
    await connectDB();
    let settings = await Settings.findOne().lean();
    if (!settings) {
      settings = (await Settings.create(fallbackSettings)).toObject();
    }
    return JSON.parse(JSON.stringify(settings));
  } catch {
    return fallbackSettings;
  }
}

export async function getPage(key: string) {
  try {
    await connectDB();
    const page = await Page.findOne({ key }).lean();
    return page ? JSON.parse(JSON.stringify(page)) : { key, title: "", body: "", image: "" };
  } catch {
    return { key, title: "", body: "", image: "" };
  }
}

export async function getServices(all = false) {
  try {
    await connectDB();
    const filter = all ? {} : { hidden: { $ne: true } };
    const items = await Service.find(filter).sort({ createdAt: 1 }).lean();
    return JSON.parse(JSON.stringify(items));
  } catch {
    return [];
  }
}

export async function getProjects(all = false) {
  try {
    await connectDB();
    const filter = all ? {} : { hidden: { $ne: true } };
    const items = await Project.find(filter).sort({ createdAt: 1 }).lean();
    return JSON.parse(JSON.stringify(items));
  } catch {
    return [];
  }
}

export async function getServiceBySlug(slug: string) {
  try {
    await connectDB();
    const item = await Service.findOne({ slug, hidden: { $ne: true } }).lean();
    return item ? JSON.parse(JSON.stringify(item)) : null;
  } catch {
    return null;
  }
}

export async function getProjectBySlug(slug: string) {
  try {
    await connectDB();
    const item = await Project.findOne({ slug, hidden: { $ne: true } }).lean();
    return item ? JSON.parse(JSON.stringify(item)) : null;
  } catch {
    return null;
  }
}
