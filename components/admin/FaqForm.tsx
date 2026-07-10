import { Field, TextInput, TextArea, FormActions } from "@/components/admin/FormFields";
import type { Faq } from "@prisma/client";

export default function FaqForm({ faq, action }: { faq?: Faq | null; action: (formData: FormData) => void }) {
  return (
    <form action={action} className="space-y-5">
      <Field label="Question *">
        <TextInput name="questionFr" required defaultValue={faq?.questionFr} />
      </Field>
      <Field label="Réponse *">
        <TextArea name="answerFr" rows={5} required defaultValue={faq?.answerFr} />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Catégorie">
          <TextInput name="category" defaultValue={faq?.category ?? "Général"} />
        </Field>
        <Field label="Ordre d'affichage">
          <TextInput type="number" name="order" defaultValue={faq?.order ?? 0} />
        </Field>
      </div>
      <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
        <input type="checkbox" name="published" defaultChecked={faq?.published ?? true} className="h-4 w-4 accent-maroon-700" />
        Publier sur le site
      </label>
      <FormActions pending={false} submitLabel={faq ? "Enregistrer les modifications" : "Créer la question"} />
    </form>
  );
}
