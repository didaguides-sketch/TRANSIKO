"use client";

import Link from "next/link";
import { Pencil } from "lucide-react";
import ConfirmDeleteButton from "./ConfirmDeleteButton";

export type Column<T> = {
  header: string;
  render: (row: T) => React.ReactNode;
  className?: string;
};

export default function DataTable<T extends { id: string }>({
  columns,
  rows,
  editHrefBase,
  onDelete,
  emptyMessage = "Aucun élément pour le moment.",
}: {
  columns: Column<T>[];
  rows: T[];
  editHrefBase?: string;
  onDelete?: (id: string) => Promise<void>;
  emptyMessage?: string;
}) {
  if (rows.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
      <table className="w-full min-w-[640px] text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50 text-start text-xs font-bold uppercase tracking-wide text-slate-500">
            {columns.map((c) => (
              <th key={c.header} className={`px-4 py-3 text-start ${c.className ?? ""}`}>{c.header}</th>
            ))}
            {(editHrefBase || onDelete) && <th className="px-4 py-3 text-end">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
              {columns.map((c) => (
                <td key={c.header} className={`px-4 py-3 ${c.className ?? ""}`}>{c.render(row)}</td>
              ))}
              {(editHrefBase || onDelete) && (
                <td className="px-4 py-3 text-end">
                  <div className="flex justify-end gap-2">
                    {editHrefBase && (
                      <Link
                        href={`${editHrefBase}/${row.id}/edit` as any}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:border-maroon-500 hover:text-maroon-700"
                      >
                        <Pencil size={14} />
                      </Link>
                    )}
                    {onDelete && <ConfirmDeleteButton id={row.id} onDelete={onDelete} />}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
