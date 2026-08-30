import { getSettings } from "@/lib/content";
import { sendContact } from "@/lib/actions";
import { SaveButton } from "@/components/admin/SaveButton";
import { PageHero } from "@/components/site/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "تواصل معنا" };

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string; error?: string }>;
}) {
  const settings = await getSettings();
  const q = await searchParams;

  return (
    <div>
      <PageHero
        kicker="تواصل"
        title="خبرنا عن مشروعك"
        text="ابعت نوع البلاط والمساحة، أو صورة من الموقع. منرد بسرعة."
      />
      <section className="mx-auto grid max-w-site gap-12 px-4 py-14 lg:grid-cols-2 md:px-6 md:pb-28">
        <div className="flex flex-col justify-center">
          <p className="text-lg leading-9 text-ems-muted">{settings.address}</p>
          <p className="mt-4 font-outfit text-3xl font-black" dir="ltr">
            0944 010 556 — 0944 010 557
          </p>
          {settings.email ? (
            <a href={`mailto:${settings.email}`} className="mt-3 font-semibold text-ems-gold">
              {settings.email}
            </a>
          ) : null}
        </div>
        <form action={sendContact} className="admin-shell rounded-[1.75rem] border border-ems-line bg-white p-7 md:p-10">
          {q.ok ? (
            <p className="mb-4 rounded-2xl bg-emerald-50 p-3 text-sm font-semibold text-emerald-700">
              وصلت رسالتك. سنتواصل معك قريباً.
            </p>
          ) : null}
          {q.error ? (
            <p className="mb-4 rounded-2xl bg-red-50 p-3 text-sm font-semibold text-red-700">أكمل كل الحقول.</p>
          ) : null}
          <label htmlFor="name">الاسم</label>
          <input id="name" name="name" required className="mb-4" />
          <label htmlFor="phone">رقم الهاتف</label>
          <input id="phone" name="phone" required className="mb-4" dir="ltr" />
          <label htmlFor="body">الرسالة</label>
          <textarea id="body" name="body" required className="mb-4" />
          <SaveButton>إرسال</SaveButton>
        </form>
      </section>
    </div>
  );
}
