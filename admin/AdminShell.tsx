"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { UserRole } from "@prisma/client";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AdminShell({
  role,
  name,
  children,
}: {
  role: UserRole;
  name: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar — desktop */}
      <aside className="hidden w-64 shrink-0 bg-slate-900 lg:block">
        <Sidebar role={role} />
      </aside>

      {/* Sidebar — mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="relative h-full w-64 bg-slate-900">
            <button
              onClick={() => setOpen(false)}
              className="absolute end-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white"
            >
              <X size={16} />
            </button>
            <Sidebar role={role} />
          </div>
        </div>
      )}

      <div className="flex min-h-screen flex-1 flex-col">
        <Topbar name={name} role={role} onOpenSidebar={() => setOpen(true)} />
        <main className="flex-1 p-5">{children}</main>
      </div>
    </div>
  );
}
