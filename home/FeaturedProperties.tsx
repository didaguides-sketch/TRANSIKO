import SectionHeading from "@/components/ui/SectionHeading";
import PropertyCard from "@/components/ui/PropertyCard";
import { DEMO_PROPERTIES } from "@/data/demo";
import { Locale } from "@/i18n/config";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function FeaturedProperties({ dict, locale }: { dict: any; locale: Locale }) {
  const items = DEMO_PROPERTIES.filter((p) => p.featured);

  return (
    <section className="mx-auto max-w-6xl px-5 py-12">
      <SectionHeading eyebrow={dict.sections.featured} title={dict.sections.featured} />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => <PropertyCard key={p.id} property={p} locale={locale} />)}
      </div>
      <div className="mt-8 text-center">
        <Link
          href={`/${locale}/proprietes` as any}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-maroon-700 to-maroon-500 px-6 py-3.5 font-bold text-white"
        >
          {dict.nav.properties} <ChevronRight size={16} />
        </Link>
      </div>
    </section>
  );
}
