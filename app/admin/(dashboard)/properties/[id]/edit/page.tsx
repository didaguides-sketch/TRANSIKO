import { notFound } from "next/navigation";
import PageHeader from "@/components/admin/PageHeader";
import FormErrorBanner from "@/components/admin/FormErrorBanner";
import PropertyForm from "@/components/admin/PropertyForm";
import PropertyImageManager from "@/components/admin/PropertyImageManager";
import { getProperty, listPropertyImages } from "@/lib/data/properties";
import { updatePropertyAction } from "../../actions";

export default async function EditPropertyPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { error?: string };
}) {
  const property = await getProperty(params.id);
  if (!property) notFound();

  const images = await listPropertyImages(params.id);
  const boundAction = updatePropertyAction.bind(null, params.id);

  return (
    <div>
      <PageHeader title="Modifier la propriété" description={property.titleFr} />
      <FormErrorBanner error={searchParams.error} />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_360px]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <PropertyForm property={property} action={boundAction} />
        </div>
        <PropertyImageManager propertyId={property.id} images={images} />
      </div>
    </div>
  );
}
