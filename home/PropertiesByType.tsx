import SectionHeading from "@/components/ui/SectionHeading";
import { Home, Building2, Warehouse, Landmark, Store, Briefcase } from "lucide-react";
import Link from "next/link";
import { Locale } from "@/i18n/config";

const TYPES = [
  { label: "Villas", icon: Home },
  { label: "Appartements", icon: Building2 },
  { label: "Maisons", icon: Warehouse },
  { label: "Terrains", icon: Landmark },
  { label: "Locaux commerciaux", icon: Store },
  { label: "Bureaux", icon: Briefcase },
];

export default function PropertiesByType({ dict, locale }: { dict: any; locale: Locale }) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-12">
      <SectionHeading eyebrow={dict.sections.byType} title={dict.sections.byType} />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
        {TYPES.map(({ label, icon: Icon }) => (
          <Link
            key={label}
            href={`/${locale}/proprietes?type=${encodeURIComponent(label)}` as any}
            className="flex flex-col items-center gap-2 rounded-xl border border-slate-200 bg-white p-5 text-center transition hover:-translate-y-0.5 hover:border-maroon-500 hover:shadow-card"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-maroon-100 text-maroon-700">
              <Icon size={20} />
            </div>
            <span className="text-sm font-bold text-slate-800">{label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
