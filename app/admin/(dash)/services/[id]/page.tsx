import { connectDB } from "@/lib/db";
import { Service } from "@/lib/models/Service";
import { saveService } from "@/lib/actions";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { SaveButton } from "@/components/admin/SaveButton";
import { notFound } from "next/navigation";

export default async function ServiceFormPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isNew = id === "new";
  let item: { _id?: string; title?: string; description?: string; image?: string; hidden?: boolean } = {};
  if (!isNew) {
    await connectDB();
    const found = await Service.findById(id).lean();
    if (!found) notFound();
    item = JSON.parse(JSON.stringify(found));
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-black">{isNew ? "إضافة منتج" : "تعديل المنتج"}</h1>
      <form action={saveService} className="mt-6 space-y-4 rounded-3xl border border-ems-line bg-white p-6 shadow-soft">
        {!isNew ? <input type="hidden" name="id" value={item._id} /> : null}
        <div>
          <label htmlFor="title">العنوان</label>
          <input id="title" name="title" required defaultValue={item.title} />
        </div>
        <div>
          <label htmlFor="description">الوصف</label>
          <textarea id="description" name="description" defaultValue={item.description} />
        </div>
        <ImageUpload name="image" defaultValue={item.image} />
        <label className="flex items-center gap-2 font-semibold">
          <input type="checkbox" name="hidden" defaultChecked={item.hidden} className="h-5 w-5" />
          إخفاء عن الموقع
        </label>
        <SaveButton />
      </form>
    </div>
  );
}
