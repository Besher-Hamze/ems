"use client";

import { logoutAction } from "@/lib/actions";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Briefcase, FileText, Home, LogOut, Mail, Package, Settings } from "lucide-react";
import { BrandLogo } from "@/components/site/Logo";

const links = [
  { href: "/admin", label: "الرئيسية", icon: Home },
  { href: "/admin/projects", label: "الأعمال", icon: Briefcase },
  { href: "/admin/services", label: "المنتجات", icon: Package },
  { href: "/admin/messages", label: "الرسائل", icon: Mail },
  { href: "/admin/content", label: "نصوص الموقع", icon: FileText },
  { href: "/admin/settings", label: "معلومات الشركة", icon: Settings },
];

export function AdminNav() {
  const current = usePathname();
  return (
    <aside className="flex w-full flex-col gap-6 bg-ems-black p-5 text-white lg:min-h-screen lg:w-72">
      <Link href="/admin" className="flex items-center gap-3">
        <span className="rounded-xl bg-black/40 px-2 py-1.5">
          <BrandLogo className="h-8" />
        </span>
        <span>
          <span className="block text-[10px] font-bold tracking-[0.2em] text-ems-gold">EMS.PRO</span>
          <span className="block text-base font-black">لوحة التحكم</span>
        </span>
      </Link>
      <nav className="flex flex-row gap-2 overflow-x-auto lg:flex-col">
        {links.map((link) => {
          const active = current === link.href || (link.href !== "/admin" && current.startsWith(link.href));
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`inline-flex items-center gap-3 whitespace-nowrap rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                active ? "bg-ems-gold text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto flex gap-2">
        <Link href="/" className="rounded-xl px-4 py-2 text-sm text-white/50 hover:text-white">
          عرض الموقع
        </Link>
        <form action={logoutAction}>
          <button className="inline-flex items-center gap-1 rounded-xl px-4 py-2 text-sm text-red-400 hover:bg-white/5">
            <LogOut className="h-4 w-4" />
            خروج
          </button>
        </form>
      </div>
    </aside>
  );
}
