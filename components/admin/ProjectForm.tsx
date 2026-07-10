import { Field, TextInput, TextArea, FormActions } from "@/components/admin/FormFields";
import type { Project } from "@prisma/client";

export default function ProjectForm({
  project,
  action,
}: {
  project?: Project | null;
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className="space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Nom du programme (français) *">
          <TextInput name="nameFr" required defaultValue={project?.nameFr} placeholder="Résidence Les Jardins" />
        </Field>
        <Field label="Slug (URL) *">
          <TextInput name="slug" required defaultValue={project?.slug} placeholder="residence-les-jardins" />
        </Field>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Nom (arabe)">
          <TextInput dir="rtl" name="nameAr" defaultValue={project?.nameAr} />
        </Field>
        <Field label="Nom (anglais)">
          <TextInput name="nameEn" defaultValue={project?.nameEn} />
        </Field>
      </div>
      <Field label="Image de couverture (URL)">
        <TextInput type="url" name="coverUrl" defaultValue={project?.coverUrl ?? ""} placeholder="https://…" />
      </Field>
      <Field label="Description">
        <TextArea name="descriptionFr" rows={5} defaultValue={project?.descriptionFr ?? ""} />
      </Field>
      <FormActions pending={false} submitLabel={project ? "Enregistrer les modifications" : "Créer le programme"} />
    </form>
  );
}
