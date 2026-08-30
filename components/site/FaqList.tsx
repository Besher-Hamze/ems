"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const items = [
  {
    q: "وين بتغطوا؟",
    a: "من حلب ودمشق ولكل المحافظات. التوريد للموقع أو للمستودع حسب الاتفاق.",
  },
  {
    q: "شو المنتجات المتوفرة؟",
    a: "لاصق سيراميك C1 وC2، GOLD FLEX، STONE BOND، LEVEL MAX، WATER PRO وإضافات خرسانية. عبوات 20 كغ.",
  },
  {
    q: "كيف بطلب عرض سعر؟",
    a: "واتساب أو اتصال على 0944 010 556 — 0944 010 557، أو من صفحة تواصل. حدد نوع البلاط ومساحة المشروع.",
  },
  {
    q: "اللاصق للاستخدام الداخلي والخارجي؟",
    a: "نعم. الخط يشمل تطبيقات داخلية وخارجية ومناطق رطبة، مع اختيار التصنيف حسب المشروع.",
  },
];

export function FaqList() {
  const [open, setOpen] = useState(0);
  return (
    <div className="divide-y divide-ems-line rounded-[1.75rem] border border-ems-line bg-white">
      {items.map((item, i) => {
        const active = open === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-right"
              onClick={() => setOpen(active ? -1 : i)}
            >
              <span className="font-changa text-lg md:text-xl">{item.q}</span>
              <ChevronDown className={`h-5 w-5 shrink-0 text-ems-gold transition ${active ? "rotate-180" : ""}`} />
            </button>
            {active ? <p className="px-6 pb-5 text-sm leading-8 text-ems-muted">{item.a}</p> : null}
          </div>
        );
      })}
    </div>
  );
}
