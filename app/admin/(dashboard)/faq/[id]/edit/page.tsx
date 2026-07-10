import { notFound } from "next/navigation";
import PageHeader from "@/components/admin/PageHeader";
import FormErrorBanner from "@/components/admin/FormErrorBanner";
import FaqForm from "@/components/admin/FaqForm";
import { getFaq } from "@/lib/data/faq";
import { updateFaqAction } from "../../actions";

export default async function EditFaqPage({
  params, searchParams,
}: { params: { id: string }; searchParams: { error?: string } }) {
  const faq = await getFaq(params.id);
  if (!faq) notFound();

  return (
    <div>
      <PageHeader title="Modifier la question" description={faq.questionFr} />
      <FormErrorBanner error={searchParams.error} />
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <FaqForm faq={faq} action={updateFaqAction.bind(null, params.id)} />
      </div>
    </div>
  );
}
