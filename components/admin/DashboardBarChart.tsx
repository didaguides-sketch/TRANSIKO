"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import type { ChartPoint } from "@/lib/data/dashboard";

export default function DashboardBarChart({ data, color = "#7A2331" }: { data: ChartPoint[]; color?: string }) {
  if (data.length === 0) {
    return <p className="py-10 text-center text-sm text-slate-400">Pas encore de données à afficher.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E4E6E9" />
        <XAxis dataKey="label" tick={{ fontSize: 12, fill: "#7A828C" }} />
        <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: "#7A828C" }} />
        <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E4E6E9", fontSize: 13 }} />
        <Bar dataKey="value" fill={color} radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
