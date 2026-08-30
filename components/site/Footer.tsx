import Link from "next/link";
import { BrandLogo } from "./Logo";

type Settings = {
  companyName: string;
  slogan?: string;
  phone?: string;
  email?: string;
  address?: string;
  logo?: string;
};

export function Footer({ settings }: { settings: Settings }) {
  return (
    <footer className="mt-auto bg-ems-black text-white">
      <div className="mx-auto grid max-w-site gap-12 px-4 pb-14 pt-20 md:grid-cols-3 md:px-6 md:pt-24">
        <div>
          <BrandLogo className="h-11" />
          <p className="mt-5 max-w-sm text-sm leading-8 text-white/55">{settings.slogan}</p>
          <p className="mt-4 text-xs font-bold tracking-[0.18em] text-ems-gold">صنع في سورية</p>
        </div>
        <div>
          <p className="mb-4 text-xs font-bold tracking-[0.22em] text-ems-gold">استكشف</p>
          <div className="flex flex-col gap-2 text-sm font-semibold text-white/75">
            <Link href="/services" className="hover:text-white">المنتجات</Link>
            <Link href="/projects" className="hover:text-white">الأعمال</Link>
            <Link href="/about" className="hover:text-white">من نحن</Link>
            <Link href="/contact" className="hover:text-white">اطلب عرض سعر</Link>
          </div>
        </div>
        <div>
          <p className="mb-4 text-xs font-bold tracking-[0.22em] text-ems-gold">تواصل</p>
          <div className="space-y-2 text-sm text-white/75">
            {settings.address ? <p>{settings.address}</p> : null}
            <p dir="ltr" className="font-outfit text-lg font-bold text-white">
              0944 010 556 — 0944 010 557
            </p>
            {settings.email ? (
              <a href={`mailto:${settings.email}`} className="hover:text-white">
                {settings.email}
              </a>
            ) : null}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-[11px] tracking-widest text-white/35">
        © {new Date().getFullYear()} EMS.PRO — سورية
      </div>
    </footer>
  );
}
