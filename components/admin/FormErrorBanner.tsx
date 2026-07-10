import { AlertTriangle } from "lucide-react";

export default function FormErrorBanner({ error }: { error?: string }) {
  if (!error) return null;
  return (
    <div className="mb-4 flex items-center gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
      <AlertTriangle size={16} /> {error}
    </div>
  );
}
