"use client";

import { useState } from "react";
import { CalendarCheck, CheckCircle2 } from "lucide-react";

export default function VisitRequestForm({ propertyId }: { propertyId: string }) {
  const [form, setForm] = useState({ name: "", phone: "", date: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return;
    setLoading(true);
    // TODO: brancher sur POST /api/visit-requests { propertyId, ...form }
    // qui créera un enregistrement VisitRequest via Prisma une fois la base connectée.
    await new Promise((r) => setTimeout(r, 500));
    setLoading(false);
    setSent(true);
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-6 text-center">
        <CheckCircle2 size={30} className="mb-2 text-green-600" />
        <h4 className="font-heading text-base font-extrabold text-slate-900">Demande envoyée</h4>
        <p className="mt-1 text-sm text-slate-500">
          Un conseiller Transiko vous contactera rapidement pour confirmer votre visite du bien {propertyId}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="mb-4 flex items-center gap-2">
        <CalendarCheck size={18} className="text-maroon-700" />
        <h4 className="font-heading text-base font-extrabold text-slate-900">Demander une visite</h4>
      </div>
      <div className="space-y-3">
        <input
          required
          placeholder="Nom complet"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm"
        />
        <input
          required
          placeholder="Téléphone"
          value={form.phone}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm"
        />
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
          className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-700"
        />
        <textarea
          placeholder="Message (optionnel)"
          rows={3}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm"
        />
        <button
          disabled={loading}
          className="w-full rounded-xl bg-gradient-to-br from-maroon-700 to-maroon-500 py-3 text-sm font-bold text-white disabled:opacity-60"
        >
          {loading ? "Envoi en cours…" : "Envoyer la demande"}
        </button>
      </div>
    </form>
  );
}
