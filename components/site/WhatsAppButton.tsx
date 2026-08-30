import { MessageCircle } from "lucide-react";

export function WhatsAppButton({ phone }: { phone?: string }) {
  if (!phone) return null;
  const num = phone.replace(/[^\d]/g, "");
  const href = `https://wa.me/963${num.replace(/^0/, "")}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 left-5 z-40 flex min-h-14 min-w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105"
      aria-label="واتساب"
    >
      <MessageCircle className="h-7 w-7" fill="currentColor" />
    </a>
  );
}
