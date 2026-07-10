import PageHeader from "@/components/admin/PageHeader";
import FormErrorBanner from "@/components/admin/FormErrorBanner";
import PropertyForm from "@/components/admin/PropertyForm";
import { createPropertyAction } from "../actions";

export default function NewPropertyPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <div>
      <PageHeader title="Nouvelle propriété" description="Créez une nouvelle annonce immobilière." />
      <FormErrorBanner error={searchParams.error} />
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <PropertyForm action={createPropertyAction} />
      </div>
    </div>
  );
}
