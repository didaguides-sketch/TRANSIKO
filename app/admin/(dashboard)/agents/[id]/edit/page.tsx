import { notFound } from "next/navigation";
import PageHeader from "@/components/admin/PageHeader";
import FormErrorBanner from "@/components/admin/FormErrorBanner";
import AgentForm from "@/components/admin/AgentForm";
import { getAgent } from "@/lib/data/agents";
import { updateAgentAction } from "../../actions";

export default async function EditAgentPage({
  params, searchParams,
}: { params: { id: string }; searchParams: { error?: string } }) {
  const agent = await getAgent(params.id);
  if (!agent) notFound();

  return (
    <div>
      <PageHeader title="Modifier l'agent" description={agent.fullName} />
      <FormErrorBanner error={searchParams.error} />
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <AgentForm agent={agent} action={updateAgentAction.bind(null, params.id)} />
      </div>
    </div>
  );
}
