import { Field, TextInput, TextArea, Select, FormActions } from "@/components/admin/FormFields";
import type { Article, BlogCategory } from "@prisma/client";

export default function ArticleForm({
  article,
  categories,
  action,
}: {
  article?: (Article & { tags: string[] }) | null;
  categories: BlogCategory[];
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className="space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Titre (français) *">
          <TextInput name="titleFr" required defaultValue={article?.titleFr} />
        </Field>
        <Field label="Slug (URL) *">
          <TextInput name="slug" required defaultValue={article?.slug} placeholder="acheter-a-alger-2026" />
        </Field>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Titre (arabe)">
          <TextInput dir="rtl" name="titleAr" defaultValue={article?.titleAr} />
        </Field>
        <Field label="Titre (anglais)">
          <TextInput name="titleEn" defaultValue={article?.titleEn} />
        </Field>
      </div>

      <Field label="Extrait" hint="Résumé court affiché dans la liste des articles">
        <TextArea name="excerptFr" rows={2} defaultValue={article?.excerptFr ?? ""} />
      </Field>

      <Field label="Contenu *">
        <TextArea name="contentFr" rows={10} required defaultValue={article?.contentFr ?? ""} placeholder="Rédigez l'article ici (Markdown supporté)…" />
      </Field>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Catégorie">
          <Select name="categoryId" defaultValue={(article as any)?.categoryId ?? ""}>
            <option value="">Aucune catégorie</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.nameFr}</option>)}
          </Select>
        </Field>
        <Field label="Tags" hint="Séparés par des virgules">
          <TextInput name="tags" defaultValue={article?.tags?.join(", ") ?? ""} placeholder="alger, guide, investissement" />
        </Field>
      </div>

      <Field label="Image de couverture (URL)">
        <TextInput type="url" name="coverUrl" defaultValue={article?.coverUrl ?? ""} />
      </Field>

      <div className="rounded-2xl border border-slate-200 p-4">
        <h4 className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500">Référencement (SEO)</h4>
        <div className="space-y-3">
          <Field label="Titre SEO">
            <TextInput name="seoTitle" defaultValue={article?.seoTitle ?? ""} />
          </Field>
          <Field label="Description SEO">
            <TextArea name="seoDescription" rows={2} defaultValue={article?.seoDescription ?? ""} />
          </Field>
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
        <input type="checkbox" name="published" defaultChecked={article?.published} className="h-4 w-4 accent-maroon-700" />
        Publier l'article sur le site
      </label>

      <FormActions pending={false} submitLabel={article ? "Enregistrer les modifications" : "Créer l'article"} />
    </form>
  );
}
