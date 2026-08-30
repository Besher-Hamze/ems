"use client";

export function ConfirmDelete({
  action,
  id,
}: {
  action: (formData: FormData) => void | Promise<void>;
  id: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm("متأكد من الحذف؟")) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button className="rounded-xl px-3 py-2 text-sm font-semibold text-red-600">حذف</button>
    </form>
  );
}
