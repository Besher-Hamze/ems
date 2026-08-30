import { connectDB } from "@/lib/db";
import { Message } from "@/lib/models/Message";
import { Service } from "@/lib/models/Service";
import { Project } from "@/lib/models/Project";
import Link from "next/link";
import { Briefcase, Mail, Package, Plus } from "lucide-react";

export default async function AdminHome() {
  let messages = 0;
  let unread = 0;
  let services = 0;
  let projects = 0;
  try {
    await connectDB();
    [messages, unread, services, projects] = await Promise.all([
      Message.countDocuments(),
      Message.countDocuments({ read: { $ne: true } }),
      Service.countDocuments(),
      Project.countDocuments(),
    ]);
  } catch {
    /* empty until seed */
  }

  const cards = [
    { href: "/admin/projects", label: "الأعمال", value: projects, hint: "صور وفيديو لكل عمل", icon: Briefcase },
    { href: "/admin/services", label: "المنتجات", value: services, hint: "إضافة أو تعديل", icon: Package },
    { href: "/admin/messages", label: "رسائل جديدة", value: unread, hint: `${messages} بالمجموع`, icon: Mail },
  ];

  return (
    <div className="mx-auto max-w-4xl">
      <p className="text-xs font-bold tracking-[0.22em] text-ems-gold">EMS.PRO</p>
      <h1 className="mt-2 text-3xl font-black">أهلاً بك</h1>
      <p className="mt-2 text-zinc-500">عدّل الأعمال والمنتجات والنصوص من هنا. الأعمال بتقدر تضيف إلها أكثر من صورة وفيديو.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-3xl border border-ems-line bg-white p-6 shadow-soft transition hover:border-ems-gold/40"
          >
            <card.icon className="mb-4 h-5 w-5 text-ems-gold" />
            <p className="text-sm font-semibold text-zinc-500">{card.label}</p>
            <p className="mt-2 font-changa text-4xl">{card.value}</p>
            <p className="mt-1 text-sm text-zinc-400">{card.hint}</p>
          </Link>
        ))}
      </div>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-ems-black p-5 font-bold text-white"
        >
          <Plus className="h-4 w-4" />
          إضافة عمل جديد
        </Link>
        <Link href="/admin/content" className="rounded-2xl border border-ems-line bg-white p-5 font-bold shadow-soft">
          نصوص الرئيسية ومن نحن
        </Link>
      </div>
    </div>
  );
}
