"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Maximize, Minimize } from "lucide-react";

export function VideoFrame({ src, title }: { src: string; title?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [full, setFull] = useState(false);

  useEffect(() => {
    const onChange = () => setFull(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggle = useCallback(async () => {
    const el = wrapRef.current;
    if (!el) return;
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await el.requestFullscreen();
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative aspect-video overflow-hidden rounded-[1.5rem] bg-black [:fullscreen]:flex [:fullscreen]:h-full [:fullscreen]:w-full [:fullscreen]:items-center [:fullscreen]:rounded-none"
    >
      <video src={src} controls playsInline className="h-full w-full object-contain" title={title} />
      <button
        type="button"
        onClick={toggle}
        className="absolute bottom-3 left-3 z-10 inline-flex items-center gap-2 rounded-full bg-black/70 px-3 py-2 text-xs font-bold text-white hover:bg-black/85"
        aria-label={full ? "خروج من ملء الشاشة" : "ملء الشاشة"}
      >
        {full ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
        {full ? "خروج" : "ملء الشاشة"}
      </button>
    </div>
  );
}
