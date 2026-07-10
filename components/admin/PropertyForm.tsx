import { Field, TextInput, TextArea, Select, FormActions } from "@/components/admin/FormFields";
import type { Property } from "@prisma/client";

const LISTING_TYPES = [{ v: "VENTE", l: "Vente" }, { v: "LOCATION", l: "Location" }];
const PROPERTY_TYPES = [
  { v: "VILLA", l: "Villa" }, { v: "APPARTEMENT", l: "Appartement" }, { v: "MAISON", l: "Maison" },
  { v: "TERRAIN", l: "Terrain" }, { v: "LOCAL_COMMERCIAL", l: "Local commercial" }, { v: "BUREAU", l: "Bureau" },
  { v: "FERME", l: "Ferme" },
];
const STATUSES = [
  { v: "BROUILLON", l: "Brouillon" }, { v: "PUBLIE", l: "Publié" }, { v: "VENDU", l: "Vendu" },
  { v: "LOUE", l: "Loué" }, { v: "ARCHIVE", l: "Archivé" },
];

export default function PropertyForm({
  property,
  action,
  pending,
}: {
  property?: Property | null;
  action: (formData: FormData) => void;
  pending?: boolean;
}) {
  return (
    <form action={action} className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Référence *">
          <TextInput name="reference" required defaultValue={property?.reference} placeholder="TRK-1013" />
        </Field>
        <Field label="Slug (URL) *" hint="Utilisé dans l'adresse de la page, ex: villa-hydra-alger">
          <TextInput name="slug" required defaultValue={property?.slug} placeholder="villa-hydra-alger" />
        </Field>
      </div>

      <Field label="Titre (français) *">
        <TextInput name="titleFr" required defaultValue={property?.titleFr} placeholder="Villa moderne avec piscine" />
      </Field>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Titre (arabe)">
          <TextInput dir="rtl" name="titleAr" defaultValue={property?.titleAr} />
        </Field>
        <Field label="Titre (anglais)">
          <TextInput name="titleEn" defaultValue={property?.titleEn} />
        </Field>
      </div>

      <Field label="Description">
        <TextArea name="descriptionFr" rows={5} defaultValue={property?.descriptionFr ?? ""} placeholder="Description détaillée du bien…" />
      </Field>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <Field label="Transaction *">
          <Select name="listingType" required defaultValue={property?.listingType ?? "VENTE"}>
            {LISTING_TYPES.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}
          </Select>
        </Field>
        <Field label="Type de bien *">
          <Select name="propertyType" required defaultValue={property?.propertyType ?? "VILLA"}>
            {PROPERTY_TYPES.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}
          </Select>
        </Field>
        <Field label="Statut *">
          <Select name="status" required defaultValue={property?.status ?? "BROUILLON"}>
            {STATUSES.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}
          </Select>
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Field label="Prix (DA) *">
          <TextInput type="number" name="price" required min={0} step="1" defaultValue={property ? Number(property.price) : undefined} />
        </Field>
        <Field label="Surface (m²) *">
          <TextInput type="number" name="surface" required min={0} step="0.01" defaultValue={property?.surface} />
        </Field>
        <Field label="Pièces">
          <TextInput type="number" name="rooms" min={0} defaultValue={property?.rooms ?? 0} />
        </Field>
        <Field label="Chambres">
          <TextInput type="number" name="bedrooms" min={0} defaultValue={property?.bedrooms ?? 0} />
        </Field>
        <Field label="Salles de bain">
          <TextInput type="number" name="bathrooms" min={0} defaultValue={property?.bathrooms ?? 0} />
        </Field>
      </div>

      <Field label="Adresse">
        <TextInput name="address" defaultValue={property?.address ?? ""} placeholder="Rue, quartier, ville" />
      </Field>

      <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
        <input type="checkbox" name="featured" defaultChecked={property?.featured} className="h-4 w-4 accent-maroon-700" />
        Mettre en avant sur la page d'accueil (propriété "à la une")
      </label>

      <FormActions pending={!!pending} submitLabel={property ? "Enregistrer les modifications" : "Créer la propriété"} />
    </form>
  );
}
