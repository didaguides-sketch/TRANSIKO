import SectionHeading from "@/components/ui/SectionHeading";
import { DEMO_TESTIMONIALS } from "@/data/demo";
import { Star, Quote } from "lucide-react";

export default function Testimonials({ dict }: { dict: any }) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-12">
      <SectionHeading eyebrow={dict.sections.testimonials} title={dict.sections.testimonials} />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {DEMO_TESTIMONIALS.map((t) => (
          <div key={t.id} className="rounded-2xl border border-slate-200 bg-white p-6">
            <Quote size={20} className="mb-3 text-maroon-500" />
            <p className="text-sm leading-relaxed text-slate-700">{t.content}</p>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <div className="font-heading text-sm font-extrabold text-slate-900">{t.name}</div>
                <div className="text-xs text-slate-500">{t.role}</div>
              </div>
              <div className="flex gap-0.5 text-amber-400">
                {Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
