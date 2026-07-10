import SectionHeading from "@/components/ui/SectionHeading";
import { Home, Key, Calculator, FileSearch, Users2, Building } from "lucide-react";
import { DEMO_SERVICES } from "@/data/demo";

const ICONS: Record<string, any> = { Home, Key, Calculator, FileSearch, Users2, Building };

export default function Services({ dict }: { dict: any }) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-12">
      <SectionHeading eyebrow={dict.sections.services} title={dict.sections.services} />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {DEMO_SERVICES.map(({ icon, title, desc }) => {
          const Icon = ICONS[icon];
          return (
            <div key={title} className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-card">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-maroon-100 text-maroon-700">
                <Icon size={22} />
              </div>
              <h4 className="font-heading text-base font-extrabold text-slate-900">{title}</h4>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
