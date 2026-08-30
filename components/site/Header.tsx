"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { BrandLogo } from "./Logo";

type Settings = {
  companyName: string;
  slogan?: string;
  logo?: string;
  phone?: string;
};

const nav = [
  { href: "/", label: "الرئيسية" },
  { href: "/services", label: "المنتجات" },
  { href: "/projects", label: "الأعمال" },
  { href: "/about", label: "من نحن" },
  { href: "/contact", label: "تواصل" },
];

export function Header({ settings }: { settings: Settings }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ems-line/80 bg-ems-stone/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-site items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-3" aria-label={settings.companyName}>
          <span className="rounded-2xl bg-ems-black px-2.5 py-1.5">
            <BrandLogo className="h-8 md:h-9" />
          </span>
          <span className="hidden min-w-0 sm:block">
            <span className="block truncate text-sm font-black tracking-wide">{settings.companyName}</span>
            <span className="block truncate text-[10px] font-bold tracking-[0.16em] text-ems-gold">
              صنع في سورية
            </span>
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-2 text-sm font-semibold text-ems-ink/70 transition hover:text-ems-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/contact"
            className="rounded-full bg-ems-gold px-4 py-2.5 text-sm font-bold text-white transition hover:brightness-110 md:px-5"
          >
            اطلب عرض سعر
          </Link>
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-ems-line bg-white lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="القائمة"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open ? (
        <div className="border-t border-ems-line px-4 py-3 lg:hidden">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-3 py-3 font-semibold"
            >
              {item.label}
            </Link>
          ))}
        </div>
      ) : null}
    </header>
  );
}
