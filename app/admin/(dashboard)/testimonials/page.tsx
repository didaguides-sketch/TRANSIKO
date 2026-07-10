import { listTestimonials } from "@/lib/data/testimonials";
import { createTestimonialAction, toggleTestimonialApprovalAction, deleteTestimonialAction } from "./actions";
import PageHeader from "@/components/admin/PageHeader";
import NoDatabaseBanner from "@/components/admin/NoDatabaseBanner";
import ConfirmDeleteButton from "@/components/admin/ConfirmDeleteButton";
import { TextInput, TextArea } from "@/components/admin/FormFields";
import { Star, Check, X, Plus } from "lucide-react";

export default async function TestimonialsAdminPage() {
  const testimonials = await listTestimonials();

  return (
    <div>
      <PageHeader title="Témoignages" description="Validez les avis clients avant leur publication sur le site." />
      {testimonials.length === 0 && <NoDatabaseBanner />}

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_320px]">
        <div className="space-y-3">
          {testimonials.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
              Aucun témoignage pour le moment.
            </div>
          ) : (
            testimonials.map((t) => (
              <div key={t.id} className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="mb-2 flex items-start justify-between">
                  <div>
                    <div className="font-heading text-sm font-extrabold text-slate-900">{t.authorName}</div>
                    <div className="text-xs text-slate-500">{t.authorRole}</div>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${t.approved ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                    {t.approved ? "Publié" : "En attente"}
                  </span>
                </div>
                <div className="mb-3 flex gap-0.5 text-amber-400">
                  {Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={13} fill="currentColor" />)}
                </div>
                <p className="mb-3 text-sm text-slate-600">{t.content}</p>
                <div className="flex gap-2">
                  {!t.approved ? (
                    <form action={toggleTestimonialApprovalAction.bind(null, t.id, true)}>
                      <button className="flex items-center gap-1.5 rounded-lg bg-green-600 px-3 py-1.5 text-xs font-bold text-white">
                        <Check size={13} /> Approuver
                      </button>
                    </form>
                  ) : (
                    <form action={toggleTestimonialApprovalAction.bind(null, t.id, false)}>
                      <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600">
                        <X size={13} /> Retirer
                      </button>
                    </form>
                  )}
                  <ConfirmDeleteButton id={t.id} onDelete={deleteTestimonialAction} />
                </div>
              </div>
            ))
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 lg:sticky lg:top-24 lg:h-fit">
          <h3 className="mb-3 flex items-center gap-2 font-heading text-sm font-extrabold text-slate-900">
            <Plus size={15} /> Ajouter un témoignage
          </h3>
          <form action={createTestimonialAction} className="space-y-3">
            <TextInput name="authorName" required placeholder="Nom du client" />
            <TextInput name="authorRole" placeholder="Rôle (ex : Acquéreur, Alger)" />
            <TextArea name="content" rows={4} required placeholder="Contenu du témoignage" />
            <TextInput type="number" name="rating" min={1} max={5} defaultValue={5} />
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <input type="checkbox" name="approved" className="h-4 w-4 accent-maroon-700" /> Publier immédiatement
            </label>
            <button className="w-full rounded-xl bg-gradient-to-br from-maroon-700 to-maroon-500 py-2.5 text-sm font-bold text-white">
              Ajouter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
