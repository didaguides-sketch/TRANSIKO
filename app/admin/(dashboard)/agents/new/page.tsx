import PageHeader from "@/components/admin/PageHeader";
import FormErrorBanner from "@/components/admin/FormErrorBanner";
import AgentForm from "@/components/admin/AgentForm";
import { createAgentAction } from "../actions";

export default function NewAgentPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <div>
      <PageHeader title="Nouvel agent" description="Ajoutez un membre de l'équipe commerciale." />
      <FormErrorBanner error={searchParams.error} />
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <AgentForm action={createAgentAction} />
      </div>
    </div>
  );
}
