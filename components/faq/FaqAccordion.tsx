"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { DemoFaq } from "@/data/demo";

export default function FaqAccordion({ faqs }: { faqs: DemoFaq[] }) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <div className="space-y-3">
      {faqs.map((f) => {
        const open = openId === f.id;
        return (
          <div key={f.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <button
              onClick={() => setOpenId(open ? null : f.id)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start"
            >
              <span className="font-heading text-sm font-extrabold text-slate-900">{f.question}</span>
              <ChevronDown size={18} className={`shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
            {open && (
              <div className="border-t border-slate-100 px-5 py-4 text-sm leading-relaxed text-slate-600">
                {f.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
