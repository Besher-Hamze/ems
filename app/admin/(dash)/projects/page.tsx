import { getProjects } from "@/lib/content";
import { deleteProject } from "@/lib/actions";
import { projectCover } from "@/lib/project-media";
import { ConfirmDelete } from "@/components/admin/ConfirmDelete";
import Link from "next/link";

export default async function ProjectsAdmin({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string }>;
}) {
  const items = await getProjects(true);
  const q = await searchParams;
  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold tracking-[0.22em] text-ems-gold">الموقع</p>
          <h1 className="mt-1 text-3xl font-black">الأعمال</h1>
        </div>
        <Link href="/admin/projects/new" className="rounded-full bg-ems-gold px-5 py-3 text-sm font-bold text-white">
          إضافة عمل
        </Link>
      </div>
      {q.ok ? (
        <p className="mt-4 rounded-2xl bg-emerald-50 p-3 text-sm font-semibold text-emerald-700">تم الحفظ</p>
      ) : null}
      <div className="mt-6 space-y-3">
        {items.map((item: { _id: string; title: string; image?: string; images?: string[]; videos?: string[]; hidden?: boolean }) => {
          const cover = projectCover(item);
          return (
            <div key={item._id} className="flex items-center gap-4 rounded-2xl border border-ems-line bg-white p-3 shadow-soft">
              <div className="h-16 w-16 overflow-hidden rounded-xl bg-zinc-100">
                {cover ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={cover} alt="" className="h-full w-full object-cover" />
                ) : null}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-bold">{item.title}</p>
                <p className="text-xs text-zinc-400">
                  {item.images?.length ? `${item.images.length} صور` : "بدون صور"}
                  {item.videos?.length ? ` · ${item.videos.length} فيديو` : ""}
                  {item.hidden ? " · مخفي" : ""}
                </p>
              </div>
              <Link href={`/admin/projects/${item._id}`} className="rounded-xl px-3 py-2 text-sm font-semibold">
                تعديل
              </Link>
              <ConfirmDelete action={deleteProject} id={item._id} />
            </div>
          );
        })}
        {!items.length ? <p className="text-zinc-500">ما في أعمال بعد.</p> : null}
      </div>
    </div>
  );
}
