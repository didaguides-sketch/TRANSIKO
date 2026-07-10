"use client";

import { useTransition } from "react";

const STATUS_OPTIONS = [
  { v: "NOUVEAU", l: "Nouveau" },
  { v: "TRAITE", l: "Traité" },
  { v: "ARCHIVE", l: "Archivé" },
];

const STATUS_STYLE: Record<string, string> = {
  NOUVEAU: "bg-amber-100 text-amber-700",
  TRAITE: "bg-green-100 text-green-700",
  ARCHIVE: "bg-slate-100 text-slate-500",
};

export default function StatusSelect({
  id,
  status,
  onChange,
}: {
  id: string;
  status: string;
  onChange: (id: string, status: any) => Promise<void>;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      value={status}
      disabled={pending}
      onChange={(e) => startTransition(() => onChange(id, e.target.value))}
      className={`rounded-full border-0 px-2.5 py-1 text-xs font-bold outline-none ${STATUS_STYLE[status] ?? "bg-slate-100 text-slate-600"}`}
    >
      {STATUS_OPTIONS.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}
    </select>
  );
}
