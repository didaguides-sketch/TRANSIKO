"use client";

import { useMemo, useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectFiltersPanel, { ProjectFilters } from "./ProjectFiltersPanel";
import { DEMO_PROJECTS } from "@/data/demo";

const PAGE_SIZE = 6;

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
        if (!p.name.toLowerCase().includes(k) && !p.city.toLowerCase().includes(k))
          return false;
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
  }, [JSON.stringify(initial), sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function resetAll() {
    window.location.href = basePath;
  }

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-5 py-8 md:grid-cols-[280px_1fr]">
      <aside className="hidden rounded-2xl border border-slate-200 bg-white p-5 md:block md:sticky md:top-24">
        <h3 className="mb-4 font-heading text-base font-extrabold text-slate-900">Filtres</h3>
        <ProjectFiltersPanel initial={initial} basePath={basePath} />
      </aside>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="absolute inset-0 bg-slate-900/40" onClick={() => setMobileFiltersOpen(false)} />
          <div className="relative ms-auto flex h-full w-[86vw] max-w-sm flex-col bg-white p-6 shadow-2xl">
            <ProjectFiltersPanel initial={initial} basePath={basePath} onClose={() => setMobileFiltersOpen(false)} />
          </div>
        </div>
      )}

      <div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {paged.map((p) => (
            <ProjectCard key={p.id} project={p} locale={locale} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`h-9 w-9 rounded-lg text-sm font-bold ${
                  page === i + 1 ? "bg-gradient-to-br from-maroon-700 to-maroon-900 text-white" : "bg-white text-slate-900 border border-slate-200"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
