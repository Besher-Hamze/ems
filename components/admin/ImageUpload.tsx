"use client";

import { useRef, useState } from "react";

type Props = {
  name: string;
  defaultValue?: string;
  label?: string;
};

export function ImageUpload({ name, defaultValue = "", label = "الصورة" }: Props) {
  const [url, setUrl] = useState(defaultValue);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function onFile(file: File) {
    setError("");
    setBusy(true);
    try {
      const data = new FormData();
      data.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: data });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "فشل الرفع");
      setUrl(json.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "فشل الرفع");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-zinc-700">{label}</p>
      <input type="hidden" name={name} value={url} />
      <button
        type="button"
        disabled={busy}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files[0];
          if (file) onFile(file);
        }}
        className="flex min-h-[180px] w-full items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-zinc-300 bg-zinc-50 text-zinc-500 transition hover:border-ems-gold hover:bg-orange-50"
      >
        {url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={url} alt="" className="h-full max-h-64 w-full object-cover" />
        ) : (
          <span>{busy ? "جارٍ الرفع…" : "انقر أو اسحب الصورة هنا"}</span>
        )}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFile(file);
        }}
      />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
