import { getPage } from "@/lib/content";
import { savePage } from "@/lib/actions";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { SaveButton } from "@/components/admin/SaveButton";

export default async function ContentPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string; tab?: string }>;
}) {
  const q = await searchParams;
  const tab = q.tab === "about" ? "about" : "home";
  const page = await getPage(tab);

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-black">نصوص الموقع</h1>
      <div className="mt-4 flex gap-2">
        <a
          href="/admin/content"
          className={`rounded-full px-4 py-2 text-sm font-bold ${tab === "home" ? "bg-ems-black text-white" : "bg-white"}`}
        >
          الرئيسية
        </a>
        <a
          href="/admin/content?tab=about"
          className={`rounded-full px-4 py-2 text-sm font-bold ${tab === "about" ? "bg-ems-black text-white" : "bg-white"}`}
        >
          من نحن
        </a>
      </div>
      {q.ok ? (
        <p className="mt-4 rounded-xl bg-emerald-50 p-3 text-sm font-semibold text-emerald-700">تم الحفظ</p>
      ) : null}
      <form action={savePage} className="mt-6 space-y-4 rounded-3xl border border-ems-line bg-white p-6 shadow-soft">
        <input type="hidden" name="key" value={tab} />
        <div>
          <label htmlFor="title">العنوان</label>
          <input id="title" name="title" defaultValue={page.title} required />
        </div>
        <div>
          <label htmlFor="body">النص</label>
          <textarea id="body" name="body" defaultValue={page.body} />
        </div>
        <ImageUpload name="image" defaultValue={page.image} />
        <SaveButton />
      </form>
    </div>
  );
}
