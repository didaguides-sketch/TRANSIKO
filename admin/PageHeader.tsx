import Link from "next/link";
import { Plus } from "lucide-react";

export default function PageHeader({
  title,
  description,
  actionHref,
  actionLabel = "Nouveau",
}: {
  title: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="font-heading text-2xl font-extrabold text-slate-900">{title}</h1>
        {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
      </div>
      {actionHref && (
        <Link
          href={actionHref as any}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-maroon-700 to-maroon-500 px-4 py-2.5 text-sm font-bold text-white"
        >
          <Plus size={16} /> {actionLabel}
        </Link>
      )}
    </div>
  );
}
