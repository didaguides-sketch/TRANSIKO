"use client";

import { useMemo, useState } from "react";
import PropertyCard from "@/components/ui/PropertyCard";
import FiltersPanel, { PropertyFilters } from "./FiltersPanel";
import ResultsToolbar, { SortOption } from "./ResultsToolbar";
import EmptyState from "./EmptyState";
import { DEMO_PROPERTIES } from "@/data/demo";
import { parsePriceValue } from "@/lib/utils";

const PAGE_SIZE = 6;

export default function PropertiesResults({
  dict,
  locale,
  searchParams,
  fixedTransaction,
  basePath,
}: {
  dict: any;
  locale: string;
  searchParams: Record<string, string | undefined>;
  /** Verrouille la transaction (Vente ou Location) pour les pages dédiées /vente et /location */
  fixedTransaction?: "Vente" | "Location";
  /** Route de base utilisée par le formulaire de filtres (par défaut /proprietes) */
  basePath?: string;
}) {
  const initial: PropertyFilters = {
    transaction: fixedTransaction ?? searchParams.transaction ?? "",
    propertyType: searchParams.propertyType ?? "",
    wilaya: searchParams.wilaya ?? "",
    commune: searchParams.commune ?? "",
    priceMin: searchParams.priceMin ?? "",
    priceMax: searchParams.priceMax ?? "",
    surface: searchParams.surface ?? "",
    rooms: searchParams.rooms ?? "",
    bathrooms: searchParams.bathrooms ?? "",
    keyword: searchParams.keyword ?? "",
  };

  const [sort, setSort] = useState<SortOption>("recent");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);

  const path = basePath ?? `/${locale}/proprietes`;

  const filtered = useMemo(() => {
    let items = DEMO_PROPERTIES.filter((p) => {
      if (initial.transaction && p.listingType !== initial.transaction) return false;
      if (initial.propertyType && p.type !== initial.propertyType) return false;
      if (initial.wilaya && p.wilaya !== initial.wilaya) return false;
      if (initial.commune && !p.city.toLowerCase().includes(initial.commune.toLowerCase())) return false;
      if (initial.rooms && p.rooms < Number(initial.rooms)) return false;
      if (initial.bathrooms && p.bathrooms < Number(initial.bathrooms)) return false;
      if (initial.surface && p.surface < Number(initial.surface)) return false;
      const priceValue = parsePriceValue(p.price);
      if (initial.priceMin && priceValue < Number(initial.priceMin)) return false;
      if (initial.priceMax && priceValue > Number(initial.priceMax)) return false;
      if (initial.keyword) {
        const k = initial.keyword.toLowerCase();
        if (!p.title.toLowerCase().includes(k) && !p.city.toLowerCase().includes(k) && !p.wilaya.toLowerCase().includes(k)) {
          return false;
        }
      }
      return true;
    });

    items = [...items].sort((a, b) => {
      if (sort === "price-asc") return parsePriceValue(a.price) - parsePriceValue(b.price);
      if (sort === "price-desc") return parsePriceValue(b.price) - parsePriceValue(a.price);
      if (sort === "surface-desc") return b.surface - a.surface;
      return 0; // "recent" garde l'ordre naturel des données
    });

    return items;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(initial), sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function resetAll() {
    window.location.href = path;
  }

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-5 py-8 md:grid-cols-[280px_1fr]">
      {/* Sidebar filters — desktop */}
      <aside className="hidden rounded-2xl border border-slate-200 bg-white p-5 md:block md:h-fit md:sticky md:top-24">
        <h3 className="mb-4 font-heading text-base font-extrabold text-slate-900">Filtres</h3>
        <FiltersPanel
          dict={dict} locale={locale} initial={initial} basePath={path}
          hideTransactionToggle={Boolean(fixedTransaction)}
        />
      </aside>

      {/* Mobile filters drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="absolute inset-0 bg-slate-900/40" onClick={() => setMobileFiltersOpen(false)} />
          <div className="relative ms-auto flex h-full w-[86vw] max-w-sm flex-col bg-white p-5">
            <FiltersPanel
              dict={dict} locale={locale} initial={initial} basePath={path}
              hideTransactionToggle={Boolean(fixedTransaction)}
              onClose={() => setMobileFiltersOpen(false)}
            />
          </div>
        </div>
      )}

      <div>
        <ResultsToolbar
          count={filtered.length}
          sort={sort}
          onSortChange={(s) => { setSort(s); setPage(1); }}
          onOpenFilters={() => setMobileFiltersOpen(true)}
        />

        {paged.length === 0 ? (
          <EmptyState onReset={resetAll} />
        ) : (
          <>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {paged.map((p) => <PropertyCard key={p.id} property={p} locale={locale} />)}
            </div>

            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`h-9 w-9 rounded-lg text-sm font-bold ${
                      page === i + 1
                        ? "bg-gradient-to-br from-maroon-700 to-maroon-500 text-white"
                        : "border border-slate-200 text-slate-700"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
