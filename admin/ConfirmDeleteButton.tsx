"use client";

import { useState, useTransition } from "react";
import { Trash2, Loader2 } from "lucide-react";

export default function ConfirmDeleteButton({
  id,
  onDelete,
  label = "cet élément",
}: {
  id: string;
  onDelete: (id: string) => Promise<void>;
  label?: string;
}) {
  const [pending, startTransition] = useTransition();
  const [confirming, setConfirming] = useState(false);

  if (confirming) {
    return (
      <div className="flex items-center gap-1.5">
        <button
          disabled={pending}
          onClick={() => startTransition(async () => { await onDelete(id); setConfirming(false); })}
          className="rounded-lg bg-red-600 px-2.5 py-1.5 text-xs font-bold text-white disabled:opacity-60"
        >
          {pending ? <Loader2 size={13} className="animate-spin" /> : "Confirmer"}
        </button>
        <button
          disabled={pending}
          onClick={() => setConfirming(false)}
          className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-600"
        >
          Annuler
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      title={`Supprimer ${label}`}
      className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:border-red-400 hover:text-red-600"
    >
      <Trash2 size={14} />
    </button>
  );
}
