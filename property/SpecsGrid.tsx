import { Ruler, BedDouble, Bath, Layers, CalendarDays, Hash } from "lucide-react";
import type { DemoProperty } from "@/data/demo";

export default function SpecsGrid({ property }: { property: DemoProperty }) {
  const specs = [
    { icon: Ruler, label: "Surface", value: `${property.surface} m²` },
    { icon: BedDouble, label: "Chambres", value: property.bedrooms > 0 ? String(property.bedrooms) : "—" },
    { icon: Bath, label: "Salles de bain", value: property.bathrooms > 0 ? String(property.bathrooms) : "—" },
    { icon: Layers, label: "Étage", value: property.floor !== undefined ? (property.floor === 0 ? "Rez-de-chaussée" : String(property.floor)) : "—" },
    { icon: CalendarDays, label: "Année de construction", value: property.yearBuilt ? String(property.yearBuilt) : "—" },
    { icon: Hash, label: "Référence", value: property.reference },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {specs.map((s) => (
        <div key={s.label} className="rounded-xl border border-slate-200 bg-white p-4">
          <s.icon size={18} className="mb-2 text-maroon-700" />
          <div className="text-xs text-slate-500">{s.label}</div>
          <div className="font-heading text-sm font-extrabold text-slate-900">{s.value}</div>
        </div>
      ))}
    </div>
  );
}
