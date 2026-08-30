"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { CatalogCard } from "@/components/site/MediaCard";
import { PRODUCT_IMAGES } from "@/lib/media";

type Item = {
  _id: string;
  slug: string;
  title: string;
  description: string;
  image?: string;
};

export function ProductSearch({ items, initialQuery = "" }: { items: Item[]; initialQuery?: string }) {
  const [q, setQ] = useState(initialQuery);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return items;
    return items.filter((item) => {
      const hay = `${item.title} ${item.description} ${item.slug}`.toLowerCase();
      return hay.includes(term);
    });
  }, [items, q]);

  return (
    <div>
      <label className="relative mx-auto mb-10 block max-w-xl">
        <Search className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ems-gold" />
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="ابحث عن منتج… لاصق، C1، عزل"
          className="w-full rounded-full border border-ems-line bg-white py-3.5 pr-12 pl-12 text-base outline-none ring-ems-gold/30 placeholder:text-zinc-400 focus:border-ems-gold focus:ring-4"
        />
        {q ? (
          <button
            type="button"
            onClick={() => setQ("")}
            className="absolute left-3 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700"
            aria-label="مسح البحث"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </label>

      {q.trim() ? (
        <p className="mb-6 text-sm text-ems-muted">
          {filtered.length ? `${filtered.length} نتيجة لـ «${q.trim()}»` : `ما في نتائج لـ «${q.trim()}»`}
        </p>
      ) : null}

      {filtered.length ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, i) => (
            <CatalogCard
              key={item._id}
              href={`/services/${item.slug}`}
              image={item.image || PRODUCT_IMAGES[i % PRODUCT_IMAGES.length]}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      ) : (
        <p className="rounded-[1.75rem] border border-ems-line bg-white p-10 text-center text-ems-muted">
          جرّب كلمة ثانية، مثل C2 أو تسوية أو رخام.
        </p>
      )}
    </div>
  );
}
