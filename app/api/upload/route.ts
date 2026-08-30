import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export const runtime = "nodejs";

const IMAGE_EXT = ["jpg", "jpeg", "png", "webp", "svg", "gif"];
const VIDEO_EXT = ["mp4", "webm", "mov", "m4v"];

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "اختر ملف" }, { status: 400 });
  }

  const ext = (file.name.split(".").pop() || "").toLowerCase().replace(/[^a-z0-9]/g, "");
  const isImage = IMAGE_EXT.includes(ext);
  const isVideo = VIDEO_EXT.includes(ext);
  if (!isImage && !isVideo) {
    return NextResponse.json({ error: "نوع الملف غير مدعوم" }, { status: 400 });
  }

  const max = isVideo ? 80 * 1024 * 1024 : 8 * 1024 * 1024;
  if (file.size > max) {
    return NextResponse.json({ error: isVideo ? "الفيديو كبير (حتى 80 ميغا)" : "الصورة كبيرة" }, { status: 400 });
  }

  const name = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(dir, name), buffer);
  return NextResponse.json({ url: `/uploads/${name}` });
}
