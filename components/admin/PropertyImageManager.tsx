import { ImagePlus, Star, Trash2 } from "lucide-react";
import { addPropertyImageAction, deletePropertyImageAction, setCoverImageAction } from "@/app/admin/(dashboard)/properties/actions";
import type { PropertyImage } from "@prisma/client";

export default function PropertyImageManager({
  propertyId,
  images,
}: {
  propertyId: string;
  images: PropertyImage[];
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <h3 className="mb-1 font-heading text-base font-extrabold text-slate-900">Photos du bien</h3>
      <p className="mb-4 text-sm text-slate-500">
        Ajoutez des images par URL (ex. depuis votre bibliothèque média ou Supabase Storage). L'envoi de fichiers
        directement depuis votre ordinateur nécessite de connecter le stockage Supabase — voir le README.
      </p>

      {images.length > 0 && (
        <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {images.map((img) => (
            <div key={img.id} className="group relative overflow-hidden rounded-xl border border-slate-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.url} alt="" className="h-24 w-full object-cover" />
              {img.isCover && (
                <span className="absolute start-1.5 top-1.5 rounded-full bg-maroon-700 px-2 py-0.5 text-[10px] font-bold text-white">
                  Couverture
                </span>
              )}
              <div className="absolute inset-x-0 bottom-0 flex justify-end gap-1 bg-black/50 p-1 opacity-0 transition group-hover:opacity-100">
                {!img.isCover && (
                  <form action={setCoverImageAction.bind(null, propertyId, img.id)}>
                    <button className="flex h-7 w-7 items-center justify-center rounded-md bg-white/90 text-slate-700" title="Définir comme couverture">
                      <Star size={13} />
                    </button>
                  </form>
                )}
                <form action={deletePropertyImageAction.bind(null, propertyId, img.id)}>
                  <button className="flex h-7 w-7 items-center justify-center rounded-md bg-white/90 text-red-600" title="Supprimer">
                    <Trash2 size={13} />
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}

      <form action={addPropertyImageAction.bind(null, propertyId)} className="flex gap-2">
        <input
          name="url" type="url" required placeholder="https://…"
          className="flex-1 rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-maroon-500"
        />
        <button className="flex items-center gap-1.5 rounded-xl bg-gradient-to-br from-maroon-700 to-maroon-500 px-4 py-2.5 text-sm font-bold text-white">
          <ImagePlus size={15} /> Ajouter
        </button>
      </form>
    </div>
  );
}
