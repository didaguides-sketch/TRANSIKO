import PageHeader from "@/components/admin/PageHeader";
import FormErrorBanner from "@/components/admin/FormErrorBanner";
import FaqForm from "@/components/admin/FaqForm";
import { createFaqAction } from "../actions";

export default function NewFaqPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <div>
      <PageHeader title="Nouvelle question" description="Ajoutez une question à la FAQ." />
      <FormErrorBanner error={searchParams.error} />
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <FaqForm action={createFaqAction} />
      </div>
    </div>
  );
}
