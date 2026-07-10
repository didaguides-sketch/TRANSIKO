import { DatabaseZap } from "lucide-react";

export default function NoDatabaseBanner() {
  return (
    <div className="mb-5 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
      <DatabaseZap size={18} className="mt-0.5 shrink-0" />
      <div>
        <b className="block font-heading font-extrabold">Base de données non connectée</b>
        Ajoutez <code className="rounded bg-amber-100 px-1">DATABASE_URL</code> dans <code className="rounded bg-amber-100 px-1">.env</code>,
        exécutez <code className="rounded bg-amber-100 px-1">npx prisma migrate dev</code> puis{" "}
        <code className="rounded bg-amber-100 px-1">npx prisma db seed</code> pour activer cette page avec vos données réelles.
      </div>
    </div>
  );
}
