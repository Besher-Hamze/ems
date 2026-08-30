import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="font-bold text-ems-gold">404</p>
      <h1 className="mt-2 font-changa text-3xl">الصفحة غير موجودة</h1>
      <Link href="/" className="mt-6 rounded-full bg-ems-gold px-6 py-3 font-bold text-white">
        العودة للرئيسية
      </Link>
    </div>
  );
}
