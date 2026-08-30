"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export function LightboxGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const total = images.length;
  const current = open === null ? 0 : open;

  const close = useCallback(() => setOpen(null), []);
  const prev = useCallback(() => {
    setOpen((i) => (i === null || total < 2 ? i : (i - 1 + total) % total));
  }, [total]);
  const next = useCallback(() => {
    setOpen((i) => (i === null || total < 2 ? i : (i + 1) % total));
  }, [total]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, prev, next]);

  if (!images.length) return null;

  return (
    <>
      <div className={images.length === 1 ? "" : "grid gap-3 sm:grid-cols-2 lg:grid-cols-3"}>
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setOpen(i)}
            className={`group overflow-hidden rounded-[1.5rem] ${i === 0 && images.length > 1 ? "sm:col-span-2 lg:col-span-3" : ""}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`${title} ${i + 1}`}
              className={`w-full object-cover transition duration-500 group-hover:scale-[1.03] ${
                i === 0 ? "h-[280px] md:h-[460px]" : "h-56"
              }`}
            />
          </button>
        ))}
      </div>

      {open !== null ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 px-4 py-16" onClick={close} dir="ltr">
          <button
            type="button"
            onClick={close}
            className="absolute right-5 top-5 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label="إغلاق"
          >
            <X className="h-5 w-5" />
          </button>

          {total > 1 ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-3 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 md:left-6"
              aria-label="السابق"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          ) : null}

          {total > 1 ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-3 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 md:right-6"
              aria-label="التالي"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          ) : null}

          <div className="flex max-h-full max-w-5xl flex-col items-center" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[current]}
              alt={`${title} ${current + 1}`}
              className="max-h-[78vh] w-auto max-w-full rounded-2xl object-contain"
            />
            <p className="mt-4 text-center text-sm text-white/80">
              {title} — {current + 1} / {total}
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
