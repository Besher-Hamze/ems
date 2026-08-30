"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { deleteService } from "@/lib/actions";
import { ConfirmDelete } from "@/components/admin/ConfirmDelete";
import Link from "next/link";

type Item = { _id: string; title: string; description?: string; image?: string; hidden?: boolean };

export function AdminProductList({ items }: { items: Item[] }) {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return items;
    return items.filter((item) => `${item.title} ${item.description || ""}`.toLowerCase().includes(term));
  }, [items, q]);

  return (
    <>
      <label className="relative mt-6 block">
        <Search className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ems-gold" />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="بحث بالمنتجات…"
          className="w-full rounded-full border border-ems-line bg-white py-3 pr-11 pl-4 text-sm outline-none focus:border-ems-gold"
        />
      </label>
      <div className="mt-4 space-y-3">
        {filtered.map((item) => (
          <div key={item._id} className="flex items-center gap-4 rounded-2xl border border-ems-line bg-white p-3 shadow-soft">
            <div className="h-16 w-16 overflow-hidden rounded-xl bg-zinc-100">
              {item.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.image} alt="" className="h-full w-full object-cover" />
              ) : null}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-bold">{item.title}</p>
              {item.hidden ? <p className="text-xs text-zinc-400">مخفي عن الموقع</p> : null}
            </div>
            <Link href={`/admin/services/${item._id}`} className="rounded-xl px-3 py-2 text-sm font-semibold">
              تعديل
            </Link>
            <ConfirmDelete action={deleteService} id={item._id} />
          </div>
        ))}
        {!filtered.length ? <p className="text-zinc-500">{q ? "ما في نتائج." : "ما في منتجات بعد. أضف أول منتج."}</p> : null}
      </div>
    </>
  );
}
