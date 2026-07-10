import SectionHeading from "@/components/ui/SectionHeading";
import { WILAYAS } from "@/data/wilayas";
import { DEMO_PROPERTIES } from "@/data/demo";
import { MapPin } from "lucide-react";
import Link from "next/link";
import { Locale } from "@/i18n/config";

export default function PropertiesByWilaya({ dict, locale }: { dict: any; locale: Locale }) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-12">
      <SectionHeading eyebrow={dict.sections.byWilaya} title={dict.sections.byWilaya} />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {WILAYAS.map((w) => {
          const count = DEMO_PROPERTIES.filter((p) => p.wilaya === w.fr).length;
          return (
            <Link
              key={w.code}
              href={`/${locale}/proprietes?wilaya=${encodeURIComponent(w.fr)}` as any}
              className="rounded-xl border border-slate-200 bg-white p-4 text-center transition hover:-translate-y-0.5 hover:border-maroon-500 hover:shadow-card"
            >
              <MapPin size={18} className="mx-auto mb-2 text-maroon-700" />
              <div className="font-heading text-sm font-bold text-slate-900">{w.fr}</div>
              <div className="text-xs text-slate-500">{count} bien{count > 1 ? "s" : ""}</div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
