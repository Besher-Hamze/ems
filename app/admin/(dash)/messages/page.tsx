import { connectDB } from "@/lib/db";
import { Message } from "@/lib/models/Message";
import { deleteMessage, markMessageRead } from "@/lib/actions";

export default async function MessagesPage() {
  await connectDB();
  const items = await Message.find().sort({ createdAt: -1 }).lean();
  const list = JSON.parse(JSON.stringify(items)) as {
    _id: string;
    name: string;
    phone: string;
    body: string;
    read?: boolean;
    createdAt?: string;
  }[];

  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-xs font-bold tracking-[0.22em] text-ems-gold">التواصل</p>
      <h1 className="mt-1 text-3xl font-black">الرسائل</h1>
      <div className="mt-6 space-y-3">
        {list.map((item) => (
          <article
            key={item._id}
            className={`rounded-2xl border border-ems-line bg-white p-5 shadow-soft ${item.read ? "opacity-70" : ""}`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-black">{item.name}</p>
              <p className="text-sm text-zinc-500" dir="ltr">
                {item.phone}
              </p>
            </div>
            <p className="mt-3 whitespace-pre-wrap leading-7 text-zinc-700">{item.body}</p>
            <div className="mt-4 flex gap-2">
              {!item.read ? (
                <form action={markMessageRead}>
                  <input type="hidden" name="id" value={item._id} />
                  <button className="rounded-xl bg-zinc-100 px-3 py-2 text-sm font-semibold">تعليم كمقروء</button>
                </form>
              ) : null}
              <form action={deleteMessage}>
                <input type="hidden" name="id" value={item._id} />
                <button className="rounded-xl px-3 py-2 text-sm font-semibold text-red-600">حذف</button>
              </form>
            </div>
          </article>
        ))}
        {!list.length ? <p className="text-zinc-500">ما في رسائل بعد.</p> : null}
      </div>
    </div>
  );
}
