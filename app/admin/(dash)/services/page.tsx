import { getServices } from "@/lib/content";
import { AdminProductList } from "@/components/admin/AdminProductList";
import Link from "next/link";

export default async function ServicesAdmin({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string }>;
}) {
  const items = await getServices(true);
  const q = await searchParams;
  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold tracking-[0.22em] text-ems-gold">الموقع</p>
          <h1 className="mt-1 text-3xl font-black">المنتجات</h1>
        </div>
        <Link href="/admin/services/new" className="rounded-full bg-ems-gold px-5 py-3 text-sm font-bold text-white">
          إضافة منتج
        </Link>
      </div>
      {q.ok ? (
        <p className="mt-4 rounded-2xl bg-emerald-50 p-3 text-sm font-semibold text-emerald-700">تم الحفظ</p>
      ) : null}
      <AdminProductList items={items} />
    </div>
  );
}
