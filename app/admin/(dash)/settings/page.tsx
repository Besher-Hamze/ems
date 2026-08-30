import { getSettings } from "@/lib/content";
import { saveSettings } from "@/lib/actions";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { SaveButton } from "@/components/admin/SaveButton";

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string }>;
}) {
  const settings = await getSettings();
  const q = await searchParams;
  return (
    <div className="mx-auto max-w-2xl">
      <p className="text-xs font-bold tracking-[0.22em] text-ems-gold">الشركة</p>
      <h1 className="mt-1 text-3xl font-black">معلومات الشركة</h1>
      {q.ok ? (
        <p className="mt-4 rounded-xl bg-emerald-50 p-3 text-sm font-semibold text-emerald-700">تم الحفظ</p>
      ) : null}
      <form action={saveSettings} className="mt-6 space-y-4 rounded-3xl border border-ems-line bg-white p-6 shadow-soft">
        <div>
          <label htmlFor="companyName">اسم الشركة</label>
          <input id="companyName" name="companyName" defaultValue={settings.companyName} required />
        </div>
        <div>
          <label htmlFor="slogan">الجملة التعريفية</label>
          <input id="slogan" name="slogan" defaultValue={settings.slogan} />
        </div>
        <ImageUpload name="logo" defaultValue={settings.logo} label="الشعار" />
        <div>
          <label htmlFor="phone">رقم الهاتف</label>
          <input id="phone" name="phone" defaultValue={settings.phone} dir="ltr" />
        </div>
        <div>
          <label htmlFor="whatsapp">رقم الواتساب</label>
          <input id="whatsapp" name="whatsapp" defaultValue={settings.whatsapp} dir="ltr" />
        </div>
        <div>
          <label htmlFor="email">الإيميل</label>
          <input id="email" name="email" type="email" defaultValue={settings.email} dir="ltr" />
        </div>
        <div>
          <label htmlFor="address">العنوان</label>
          <input id="address" name="address" defaultValue={settings.address} />
        </div>
        <SaveButton />
      </form>
    </div>
  );
}
