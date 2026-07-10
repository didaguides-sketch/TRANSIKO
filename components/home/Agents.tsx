import SectionHeading from "@/components/ui/SectionHeading";
import { DEMO_AGENTS } from "@/data/demo";
import { Phone, User } from "lucide-react";

export default function Agents({ dict }: { dict: any }) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-12">
      <SectionHeading eyebrow={dict.sections.agents} title={dict.sections.agents} />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {DEMO_AGENTS.map((a) => (
          <div key={a.id} className="rounded-2xl border border-slate-200 bg-white p-6 text-center transition hover:-translate-y-1 hover:shadow-card">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-maroon-100 text-maroon-700">
              <User size={26} />
            </div>
            <h4 className="font-heading text-base font-extrabold text-slate-900">{a.name}</h4>
            <div className="text-sm text-slate-500">{a.role}</div>
            <div className="mt-2 text-xs text-slate-400">{a.lang}</div>
            <div className="mt-3 flex items-center justify-center gap-1.5 text-sm font-bold text-maroon-700">
              <Phone size={14} /> {a.phone}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
