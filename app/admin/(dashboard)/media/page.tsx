import { listMedia } from "@/lib/data/media";
import { addMediaAction, deleteMediaAction } from "./actions";
import PageHeader from "@/components/admin/PageHeader";
import NoDatabaseBanner from "@/components/admin/NoDatabaseBanner";
import ConfirmDeleteButton from "@/components/admin/ConfirmDeleteButton";
import { TextInput, Select } from "@/components/admin/FormFields";
import { Video, ImagePlus } from "lucide-react";

export default async function MediaAdminPage() {
  const media = await listMedia();

  return (
    <div>
      <PageHeader title="Bibliothèque média" description="Images et vidéos utilisées sur le site." />
      <div className="mb-5 rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-500">
        L'envoi direct de fichiers nécessite de connecter le stockage <b>Supabase Storage</b> (variables déjà prévues
        dans <code className="rounded bg-slate-100 px-1">.env.example</code>). En attendant, ajoutez vos médias par URL ci-dessous.
      </div>
      {media.length === 0 && <NoDatabaseBanner />}

      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5">
        <form action={addMediaAction} className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_140px_140px_auto]">
          <TextInput name="url" type="url" required placeholder="https://…" />
          <Select name="type" defaultValue="IMAGE">
            <option value="IMAGE">Image</option>
            <option value="VIDEO">Vidéo</option>
          </Select>
          <Select name="folder" defaultValue="general">
            <option value="general">Général</option>
            <option value="properties">Propriétés</option>
            <option value="projects">Projets</option>
            <option value="blog">Blog</option>
            <option value="agents">Agents</option>
          </Select>
          <button className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-maroon-700 to-maroon-500 px-4 py-2.5 text-sm font-bold text-white">
            <ImagePlus size={15} /> Ajouter
          </button>
        </form>
      </div>

      {media.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
          Aucun média pour le moment.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {media.map((m) => (
            <div key={m.id} className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white">
              {m.type === "VIDEO" ? (
                <div className="flex h-28 items-center justify-center bg-slate-900 text-white/70">
                  <Video size={26} />
                </div>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={m.url} alt={m.altText ?? ""} className="h-28 w-full object-cover" />
              )}
              <div className="p-2">
                <div className="truncate text-xs font-semibold text-slate-700">{m.filename}</div>
                <div className="text-[10px] uppercase tracking-wide text-slate-400">{m.folder}</div>
              </div>
              <div className="absolute end-1.5 top-1.5 opacity-0 transition group-hover:opacity-100">
                <ConfirmDeleteButton id={m.id} onDelete={deleteMediaAction} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
