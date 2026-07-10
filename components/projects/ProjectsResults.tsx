"use client";

import { useMemo, useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectFiltersPanel, { ProjectFilters } from "./ProjectFiltersPanel";
import ResultsToolbar, { SortDefinition } from "@/components/ui/ResultsToolbar";
import EmptyState from "@/components/properties/EmptyState";
import { DEMO_PROJECTS } from "@/data/demo";

const PAGE_SIZE = 6;

const SORT_OPTIONS: SortDefinition[] = [
  { value: "recent", label: "Plus récents" },
  { value: "price-asc", label: "Prix croissant" },
  { value: "price-desc", label: "Prix décroissant" },
  { value: "delivery-asc", label: "Livraison la plus proche" },
];

export default function ProjectsResults({
  locale,
  searchParams,
  basePath,
}: {
  locale: string;
  searchParams: Record<string, string | undefined>;
  basePath: string;
}) {
  const initial: ProjectFilters = {
    wilaya: searchParams.wilaya ?? "",
    type: searchParams.type ?? "",
    status: searchParams.status ?? "",
    keyword: searchParams.keyword ?? "",
  };

  const [sort, setSort] = useState("recent");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let items = DEMO_PROJECTS.filter((p) => {
      if (initial.wilaya && p.wilaya !== initial.wilaya) return false;
      if (initial.type && p.type !== initial.type) return false;
      if (initial.status && p.status !== initial.status) return false;
      if (initial.keyword) {
        const k = initial.keyword.toLowerCase();
        if (!p.name.toLowerCase().includes(k) && !p.city.toLowerCase().includes(k) && !p.wilaya.toLowerCase().includes(k)) {
          return false;
        }
      }
      return true;
    });

    items = [...items].sort((a, b) => {
      if (sort === "price-asc") return a.priceFromValue - b.priceFromValue;
      if (sort === "price-desc") return b.priceFromValue - a.priceFromValue;
      if (sort === "delivery-asc") return Number(a.delivery) - Number(b.delivery);
      return 0;
    });

    return items;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(initial), sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function resetAll() {
    window.location.href = basePath;
  }

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-5 py-8 md:grid-cols-[280px_1fr]">
      <aside className="hidden rounded-2xl border border-slate-200 bg-white p-5 md:block md:h-fit md:sticky md:top-24">
        <h3 className="mb-4 font-heading text-base font-extrabold text-slate-900">Filtres</h3>
        <ProjectFiltersPanel initial={initial} basePath={basePath} />
      </aside>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="absolute inset-0 bg-slate-900/40" onClick={() => setMobileFiltersOpen(false)} />
          <div className="relative ms-auto flex h-full w-[86vw] max-w-sm flex-col bg-white p-5">
            <ProjectFiltersPanel initial={initial} basePath={basePath} onClose={() => setMobileFiltersOpen(false)} />
          </div>
        </div>
      )}

      <div>
        <ResultsToolbar
          count={filtered.length}
          sort={sort}
          onSortChange={(s) => { setSort(s); setPage(1); }}
          onOpenFilters={() => setMobileFiltersOpen(true)}
          sortOptions={SORT_OPTIONS}
          label="programme"
        />

        {paged.length === 0 ? (
          <EmptyState
            onReset={resetAll}
            title="Aucun programme ne correspond à votre recherche"
            message="Essayez d'élargir vos critères (wilaya, statut ou type de programme) ou contactez un conseiller Transiko."
          />
        ) : (
          <>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {paged.map((p) => <ProjectCard key={p.id} project={p} locale={locale} />)}
            </div>

            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`h-9 w-9 rounded-lg text-sm font-bold ${
                      page === i + 1 ? "bg-gradient-to-br from-maroon-700 to-maroon-500 text-white" : "border border-slate-200 text-slate-700"
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
