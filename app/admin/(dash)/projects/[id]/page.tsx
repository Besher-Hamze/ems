import { connectDB } from "@/lib/db";
import { Project } from "@/lib/models/Project";
import { saveProject } from "@/lib/actions";
import { MediaGallery } from "@/components/admin/MediaGallery";
import { SaveButton } from "@/components/admin/SaveButton";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function ProjectFormPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isNew = id === "new";
  let item: {
    _id?: string;
    title?: string;
    description?: string;
    image?: string;
    images?: string[];
    videos?: string[];
    hidden?: boolean;
  } = {};
  if (!isNew) {
    await connectDB();
    const found = await Project.findById(id).lean();
    if (!found) notFound();
    item = JSON.parse(JSON.stringify(found));
  }

  const images = (item.images?.length ? item.images : item.image ? [item.image] : []).filter(Boolean);

  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/admin/projects" className="text-sm font-bold text-ems-gold">
        ← كل الأعمال
      </Link>
      <h1 className="mt-2 text-3xl font-black">{isNew ? "إضافة عمل" : "تعديل العمل"}</h1>
      <p className="mt-1 text-sm text-zinc-500">أضف أكثر من صورة، وفيديوهات إذا بدك. أول صورة بتكون الغلاف.</p>
      <form action={saveProject} className="mt-6 space-y-6 rounded-3xl border border-ems-line bg-white p-6 shadow-soft md:p-8">
        {!isNew ? <input type="hidden" name="id" value={item._id} /> : null}
        <div>
          <label htmlFor="title">العنوان</label>
          <input id="title" name="title" required defaultValue={item.title} />
        </div>
        <div>
          <label htmlFor="description">الوصف</label>
          <textarea id="description" name="description" defaultValue={item.description} />
        </div>
        <MediaGallery
          name="images"
          kind="image"
          label="الصور"
          hint="تقدر تختار أكثر من صورة مرة واحدة. أول صورة هي الغلاف."
          defaultValues={images}
        />
        <MediaGallery
          name="videos"
          kind="video"
          label="الفيديوهات"
          hint="MP4 أو WebM. الحجم حتى 80 ميغا لكل فيديو."
          defaultValues={item.videos || []}
        />
        <label className="flex items-center gap-2 font-semibold">
          <input type="checkbox" name="hidden" defaultChecked={item.hidden} className="h-5 w-5" />
          إخفاء عن الموقع
        </label>
        <SaveButton />
      </form>
    </div>
  );
}
