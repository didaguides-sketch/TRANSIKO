import PageHeader from "@/components/admin/PageHeader";
import FormErrorBanner from "@/components/admin/FormErrorBanner";
import UserForm from "@/components/admin/UserForm";
import { createUserAction } from "../actions";

export default function NewUserPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <div>
      <PageHeader title="Nouvel utilisateur" description="Donnez accès à l'espace d'administration à un membre de l'équipe." />
      <FormErrorBanner error={searchParams.error} />
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <UserForm action={createUserAction} />
      </div>
    </div>
  );
}
