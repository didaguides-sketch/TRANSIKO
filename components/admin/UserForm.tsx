import { Field, TextInput, Select, FormActions } from "@/components/admin/FormFields";

type UserLike = { name: string; email: string; role: string; active?: boolean } | null | undefined;

export default function UserForm({ user, action }: { user?: UserLike; action: (formData: FormData) => void }) {
  return (
    <form action={action} className="space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Nom complet *">
          <TextInput name="name" required defaultValue={user?.name} />
        </Field>
        <Field label="Email *">
          <TextInput type="email" name="email" required defaultValue={user?.email} />
        </Field>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Rôle *">
          <Select name="role" required defaultValue={user?.role ?? "AGENT"}>
            <option value="ADMIN">Administrateur — accès complet</option>
            <option value="EDITOR">Éditeur — contenu (blog, biens, projets, agents)</option>
            <option value="AGENT">Agent — biens et leads uniquement</option>
          </Select>
        </Field>
        <Field label={user ? "Nouveau mot de passe" : "Mot de passe *"} hint={user ? "Laisser vide pour ne pas changer" : "8 caractères minimum"}>
          <TextInput type="password" name="password" required={!user} minLength={8} />
        </Field>
      </div>
      {user && (
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <input type="checkbox" name="active" defaultChecked={user.active ?? true} className="h-4 w-4 accent-maroon-700" />
          Compte actif
        </label>
      )}
      <FormActions pending={false} submitLabel={user ? "Enregistrer les modifications" : "Créer l'utilisateur"} />
    </form>
  );
}
