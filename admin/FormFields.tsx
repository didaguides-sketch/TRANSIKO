export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">{label}</label>
      {children}
      {hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-800 outline-none focus:border-maroon-500";

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputClass} ${props.className ?? ""}`} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${inputClass} ${props.className ?? ""}`} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`${inputClass} ${props.className ?? ""}`} />;
}

export function FormActions({ pending, submitLabel = "Enregistrer" }: { pending: boolean; submitLabel?: string }) {
  return (
    <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
      <button
        type="submit"
        disabled={pending}
        className="rounded-xl bg-gradient-to-br from-maroon-700 to-maroon-500 px-6 py-2.5 text-sm font-bold text-white disabled:opacity-60"
      >
        {pending ? "Enregistrement…" : submitLabel}
      </button>
    </div>
  );
}
