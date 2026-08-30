import { AdminNav } from "@/components/admin/AdminNav";

export const dynamic = "force-dynamic";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-shell min-h-screen bg-ems-stone text-ems-ink lg:flex">
      <AdminNav />
      <div className="min-w-0 flex-1 p-4 md:p-8">{children}</div>
    </div>
  );
}
