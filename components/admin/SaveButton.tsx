"use client";

import { useFormStatus } from "react-dom";

export function SaveButton({ children = "حفظ" }: { children?: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-ems-gold px-6 text-base font-bold text-white transition hover:brightness-110 disabled:opacity-60"
    >
      {pending ? "جارٍ التنفيذ…" : children}
    </button>
  );
}
