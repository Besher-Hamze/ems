import { loginAction } from "@/lib/actions";
import { SaveButton } from "@/components/admin/SaveButton";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const q = await searchParams;
  return (
    <div className="flex min-h-screen items-center justify-center bg-ems-black px-4">
      <form action={loginAction} className="admin-shell w-full max-w-md rounded-[2rem] bg-white p-8 text-zinc-900">
        <p className="text-xs font-bold tracking-widest text-ems-gold">EMS.PRO</p>
        <h1 className="mt-1 text-2xl font-black">دخول لوحة التحكم</h1>
        {q.error ? (
          <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700">
            البريد أو كلمة المرور غير صحيحة
          </p>
        ) : null}
        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="email">البريد</label>
            <input id="email" name="email" type="email" required defaultValue="admin@ems.pro" dir="ltr" />
          </div>
          <div>
            <label htmlFor="password">كلمة المرور</label>
            <input id="password" name="password" type="password" required dir="ltr" />
          </div>
        </div>
        <SaveButton>دخول</SaveButton>
      </form>
    </div>
  );
}
