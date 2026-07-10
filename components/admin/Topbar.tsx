"use client";

import { signOut } from "next-auth/react";
import { LogOut, Menu } from "lucide-react";
import { UserRole } from "@prisma/client";

const ROLE_LABEL: Record<UserRole, string> = {
  ADMIN: "Administrateur",
  EDITOR: "Éditeur",
  AGENT: "Agent",
};

export default function Topbar({
  name,
  role,
  onOpenSidebar,
}: {
  name: string;
  role: UserRole;
  onOpenSidebar?: () => void;
}) {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-3">
      <button onClick={onOpenSidebar} className="rounded-lg border border-slate-200 p-2 lg:hidden">
        <Menu size={18} />
      </button>
      <div className="hidden lg:block" />
      <div className="flex items-center gap-3">
        <div className="text-end">
          <div className="text-sm font-bold text-slate-900">{name}</div>
          <div className="text-xs text-slate-500">{ROLE_LABEL[role]}</div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:border-maroon-500"
        >
          <LogOut size={15} /> Déconnexion
        </button>
      </div>
    </header>
  );
}
