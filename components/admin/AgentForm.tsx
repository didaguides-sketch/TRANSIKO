import { Field, TextInput, TextArea, FormActions } from "@/components/admin/FormFields";
import type { Agent } from "@prisma/client";

export default function AgentForm({
  agent,
  action,
}: {
  agent?: Agent | null;
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className="space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Nom complet *">
          <TextInput name="fullName" required defaultValue={agent?.fullName} placeholder="Karim Belkacem" />
        </Field>
        <Field label="Fonction">
          <TextInput name="role" defaultValue={agent?.role ?? ""} placeholder="Directeur des ventes" />
        </Field>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Téléphone *">
          <TextInput name="phone" required defaultValue={agent?.phone} placeholder="+213 551 87 51 79" />
        </Field>
        <Field label="WhatsApp">
          <TextInput name="whatsapp" defaultValue={agent?.whatsapp ?? ""} placeholder="+213 558 20 77 93" />
        </Field>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Email">
          <TextInput type="email" name="email" defaultValue={agent?.email ?? ""} placeholder="agent@transiko.dz" />
        </Field>
        <Field label="Photo (URL)">
          <TextInput type="url" name="photoUrl" defaultValue={agent?.photoUrl ?? ""} />
        </Field>
      </div>
      <Field label="Langues parlées" hint="Séparées par des virgules">
        <TextInput name="languages" defaultValue={agent?.languages?.join(", ") ?? ""} placeholder="Arabe, Français, Anglais" />
      </Field>
      <Field label="Biographie">
        <TextArea name="bio" rows={4} defaultValue={agent?.bio ?? ""} />
      </Field>
      <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
        <input type="checkbox" name="active" defaultChecked={agent?.active ?? true} className="h-4 w-4 accent-maroon-700" />
        Agent actif (visible sur le site)
      </label>
      <FormActions pending={false} submitLabel={agent ? "Enregistrer les modifications" : "Créer l'agent"} />
    </form>
  );
}
