import PropertyCard from "@/components/ui/PropertyCard";
import { DEMO_PROPERTIES, type DemoProperty } from "@/data/demo";

export default function SimilarProperties({ current, locale }: { current: DemoProperty; locale: string }) {
  const similar = DEMO_PROPERTIES.filter(
    (p) => p.id !== current.id && (p.wilaya === current.wilaya || p.type === current.type)
  ).slice(0, 3);

  if (similar.length === 0) return null;

  return (
    <section>
      <h3 className="mb-4 font-heading text-xl font-extrabold text-slate-900">Biens similaires</h3>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {similar.map((p) => <PropertyCard key={p.id} property={p} locale={locale} />)}
      </div>
    </section>
  );
}
