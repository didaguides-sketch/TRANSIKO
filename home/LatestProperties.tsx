"use client";

import { useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import PropertyCard from "@/components/ui/PropertyCard";
import { DEMO_PROPERTIES } from "@/data/demo";

export default function LatestProperties({ dict, locale }: { dict: any; locale: string }) {
  const [tab, setTab] = useState<"Tous" | "Vente" | "Location">("Tous");
  const items = DEMO_PROPERTIES.filter((p) => tab === "Tous" || p.listingType === tab).slice(0, 6);

  return (
    <section className="mx-auto max-w-6xl px-5 py-12">
      <SectionHeading
        eyebrow={dict.sections.latest}
        title={dict.sections.latest}
        action={
          <div className="inline-flex gap-1 rounded-xl bg-slate-100 p-1">
            {(["Tous", "Vente", "Location"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-lg px-4 py-2 text-sm font-bold ${
                  tab === t ? "bg-gradient-to-br from-maroon-700 to-maroon-500 text-white" : "text-slate-700"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        }
      />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => <PropertyCard key={p.id} property={p} locale={locale} />)}
      </div>
    </section>
  );
}
