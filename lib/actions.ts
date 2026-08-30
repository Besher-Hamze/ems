"use server";

import { AuthError } from "next-auth";
import { auth, signIn, signOut } from "@/auth";
import { connectDB } from "@/lib/db";
import { Settings } from "@/lib/models/Settings";
import { Page } from "@/lib/models/Page";
import { Service } from "@/lib/models/Service";
import { Project } from "@/lib/models/Project";
import { Message } from "@/lib/models/Message";
import { slugify } from "@/lib/slug";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("غير مصرح");
}

function str(form: FormData, key: string) {
  return String(form.get(key) || "").trim();
}

export async function loginAction(formData: FormData) {
  const email = str(formData, "email");
  const password = str(formData, "password");
  try {
    await signIn("credentials", { email, password, redirectTo: "/admin" });
  } catch (error) {
    if (error instanceof AuthError) {
      redirect("/admin/login?error=1");
    }
    throw error;
  }
}

export async function logoutAction() {
  await signOut({ redirectTo: "/admin/login" });
}

export async function saveSettings(formData: FormData) {
  await requireAdmin();
  await connectDB();
  const data = {
    companyName: str(formData, "companyName"),
    slogan: str(formData, "slogan"),
    logo: str(formData, "logo") || "/brand/logo.svg",
    phone: str(formData, "phone"),
    whatsapp: str(formData, "whatsapp"),
    email: str(formData, "email"),
    address: str(formData, "address"),
    facebook: str(formData, "facebook"),
    instagram: str(formData, "instagram"),
  };
  await Settings.findOneAndUpdate({}, data, { upsert: true });
  revalidatePath("/", "layout");
  revalidatePath("/admin");
  redirect("/admin/settings?ok=1");
}

export async function savePage(formData: FormData) {
  await requireAdmin();
  await connectDB();
  const key = str(formData, "key");
  await Page.findOneAndUpdate(
    { key },
    {
      key,
      title: str(formData, "title"),
      body: str(formData, "body"),
      image: str(formData, "image"),
    },
    { upsert: true }
  );
  revalidatePath("/", "layout");
  revalidatePath("/admin/content");
  redirect("/admin/content?ok=1");
}

export async function saveService(formData: FormData) {
  await requireAdmin();
  await connectDB();
  const id = str(formData, "id");
  const title = str(formData, "title");
  const description = str(formData, "description");
  const image = str(formData, "image");
  const hidden = formData.get("hidden") === "on";
  if (id) {
    await Service.findByIdAndUpdate(id, { title, description, image, hidden });
  } else {
    await Service.create({ title, description, image, hidden, slug: slugify(title) });
  }
  revalidatePath("/", "layout");
  revalidatePath("/admin/services");
  redirect("/admin/services?ok=1");
}

export async function deleteService(formData: FormData) {
  await requireAdmin();
  await connectDB();
  await Service.findByIdAndDelete(str(formData, "id"));
  revalidatePath("/", "layout");
  revalidatePath("/admin/services");
}

export async function saveProject(formData: FormData) {
  await requireAdmin();
  await connectDB();
  const id = str(formData, "id");
  const title = str(formData, "title");
  const description = str(formData, "description");
  const images = formData
    .getAll("images")
    .map((v) => String(v).trim())
    .filter(Boolean);
  const videos = formData
    .getAll("videos")
    .map((v) => String(v).trim())
    .filter(Boolean);
  const image = images[0] || str(formData, "image");
  const hidden = formData.get("hidden") === "on";
  const payload = { title, description, image, images, videos, hidden };
  if (id) {
    await Project.findByIdAndUpdate(id, payload);
  } else {
    await Project.create({ ...payload, slug: slugify(title) });
  }
  revalidatePath("/", "layout");
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  redirect("/admin/projects?ok=1");
}

export async function deleteProject(formData: FormData) {
  await requireAdmin();
  await connectDB();
  await Project.findByIdAndDelete(str(formData, "id"));
  revalidatePath("/", "layout");
  revalidatePath("/admin/projects");
}

export async function sendContact(formData: FormData) {
  await connectDB();
  const name = str(formData, "name");
  const phone = str(formData, "phone");
  const body = str(formData, "body");
  if (!name || !phone || !body) {
    redirect("/contact?error=1");
  }
  await Message.create({ name, phone, body });
  redirect("/contact?ok=1");
}

export async function markMessageRead(formData: FormData) {
  await requireAdmin();
  await connectDB();
  await Message.findByIdAndUpdate(str(formData, "id"), { read: true });
  revalidatePath("/admin");
  revalidatePath("/admin/messages");
}

export async function deleteMessage(formData: FormData) {
  await requireAdmin();
  await connectDB();
  await Message.findByIdAndDelete(str(formData, "id"));
  revalidatePath("/admin");
  revalidatePath("/admin/messages");
}
