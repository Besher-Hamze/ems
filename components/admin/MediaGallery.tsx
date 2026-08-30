"use client";

import { useRef, useState } from "react";
import { Plus, X } from "lucide-react";

type Props = {
  name: string;
  label: string;
  hint?: string;
  defaultValues?: string[];
  kind: "image" | "video";
};

export function MediaGallery({ name, label, hint, defaultValues = [], kind }: Props) {
  const [urls, setUrls] = useState(defaultValues.filter(Boolean));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function onFiles(list: FileList | File[]) {
    const files = Array.from(list);
    if (!files.length) return;
    setError("");
    setBusy(true);
    try {
      for (const file of files) {
        const data = new FormData();
        data.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: data });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "فشل الرفع");
        setUrls((prev) => [...prev, json.url]);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "فشل الرفع");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-3">
      <div>
        <p className="text-sm font-bold text-zinc-800">{label}</p>
        {hint ? <p className="mt-0.5 text-xs text-zinc-500">{hint}</p> : null}
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {urls.map((url) => (
          <div key={url} className="group relative overflow-hidden rounded-2xl bg-zinc-100">
            <input type="hidden" name={name} value={url} />
            {kind === "image" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={url} alt="" className="h-32 w-full object-cover" />
            ) : (
              <video src={url} className="h-32 w-full object-cover" muted playsInline />
            )}
            <button
              type="button"
              onClick={() => setUrls((prev) => prev.filter((u) => u !== url))}
              className="absolute left-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white"
              aria-label="حذف"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
        <button
          type="button"
          disabled={busy}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files.length) onFiles(e.dataTransfer.files);
          }}
          className="flex min-h-32 flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-zinc-300 bg-zinc-50 text-sm font-semibold text-zinc-500 transition hover:border-ems-gold hover:bg-amber-50"
        >
          <Plus className="h-5 w-5" />
          {busy ? "جارٍ الرفع…" : kind === "image" ? "أضف صور" : "أضف فيديو"}
        </button>
      </div>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept={kind === "image" ? "image/*" : "video/*"}
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.length) onFiles(e.target.files);
        }}
      />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
