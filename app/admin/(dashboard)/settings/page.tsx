import { getSettings } from "@/lib/data/settings";
import { updateSettingsAction } from "./actions";
import PageHeader from "@/components/admin/PageHeader";
import { Field, TextInput, TextArea, FormActions } from "@/components/admin/FormFields";

export default async function SettingsAdminPage() {
  const settings = await getSettings();

  return (
    <div>
      <PageHeader title="Paramètres du site" description="Ces informations alimentent l'en-tête, le pied de page et le référencement du site public." />

      <form action={updateSettingsAction} className="space-y-6">
        <section className="rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="mb-4 font-heading text-sm font-extrabold uppercase tracking-wide text-slate-500">Identité de l'agence</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Nom du site / de l'agence">
              <TextInput name="siteName" defaultValue={settings.siteName} />
            </Field>
            <Field label="Logo (URL)">
              <TextInput type="url" name="logoUrl" defaultValue={settings.logoUrl} />
            </Field>
          </div>
          <div className="mt-4">
            <Field label="Couleur principale" hint="Utilisée pour les boutons et accents du site">
              <input type="color" name="primaryColor" defaultValue={settings.primaryColor} className="h-11 w-20 rounded-lg border border-slate-200" />
            </Field>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="mb-4 font-heading text-sm font-extrabold uppercase tracking-wide text-slate-500">Coordonnées</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Téléphone">
              <TextInput name="phone" defaultValue={settings.phone} />
            </Field>
            <Field label="WhatsApp">
              <TextInput name="whatsapp" defaultValue={settings.whatsapp} />
            </Field>
            <Field label="Email">
              <TextInput type="email" name="email" defaultValue={settings.email} />
            </Field>
            <Field label="Adresse">
              <TextInput name="address" defaultValue={settings.address} />
            </Field>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="mb-4 font-heading text-sm font-extrabold uppercase tracking-wide text-slate-500">Réseaux sociaux</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Field label="Facebook">
              <TextInput type="url" name="facebook" defaultValue={settings.facebook} placeholder="https://facebook.com/…" />
            </Field>
            <Field label="Instagram">
              <TextInput type="url" name="instagram" defaultValue={settings.instagram} placeholder="https://instagram.com/…" />
            </Field>
            <Field label="YouTube">
              <TextInput type="url" name="youtube" defaultValue={settings.youtube} placeholder="https://youtube.com/…" />
            </Field>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="mb-4 font-heading text-sm font-extrabold uppercase tracking-wide text-slate-500">Référencement (SEO) par défaut</h3>
          <div className="space-y-4">
            <Field label="Titre SEO par défaut">
              <TextInput name="seoTitle" defaultValue={settings.seoTitle} />
            </Field>
            <Field label="Description SEO par défaut">
              <TextArea name="seoDescription" rows={3} defaultValue={settings.seoDescription} />
            </Field>
          </div>
        </section>

        <FormActions pending={false} submitLabel="Enregistrer les paramètres" />
      </form>
    </div>
  );
}
