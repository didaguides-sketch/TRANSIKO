"use client";

import { useMemo, useState } from "react";
import { Calculator } from "lucide-react";
import { formatNumberFr } from "@/lib/utils";

export default function MortgageCalculator({ priceValue }: { priceValue: number }) {
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [rate, setRate] = useState(6);
  const [years, setYears] = useState(20);

  const result = useMemo(() => {
    const downPayment = (priceValue * downPaymentPct) / 100;
    const principal = priceValue - downPayment;
    const monthlyRate = rate / 100 / 12;
    const months = years * 12;
    const monthly =
      monthlyRate === 0
        ? principal / months
        : (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
    return { downPayment, principal, monthly: Math.round(monthly) };
  }, [priceValue, downPaymentPct, rate, years]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="mb-4 flex items-center gap-2">
        <Calculator size={18} className="text-maroon-700" />
        <h4 className="font-heading text-base font-extrabold text-slate-900">Simulateur de financement</h4>
      </div>

      <div className="space-y-4">
        <div>
          <div className="mb-1.5 flex justify-between text-xs font-bold uppercase tracking-wide text-slate-500">
            <span>Apport initial</span><span>{downPaymentPct}%</span>
          </div>
          <input
            type="range" min={0} max={80} step={5}
            value={downPaymentPct}
            onChange={(e) => setDownPaymentPct(Number(e.target.value))}
            className="w-full accent-maroon-700"
          />
        </div>
        <div>
          <div className="mb-1.5 flex justify-between text-xs font-bold uppercase tracking-wide text-slate-500">
            <span>Taux d'intérêt annuel</span><span>{rate}%</span>
          </div>
          <input
            type="range" min={0} max={12} step={0.5}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full accent-maroon-700"
          />
        </div>
        <div>
          <div className="mb-1.5 flex justify-between text-xs font-bold uppercase tracking-wide text-slate-500">
            <span>Durée du crédit</span><span>{years} ans</span>
          </div>
          <input
            type="range" min={5} max={30} step={1}
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full accent-maroon-700"
          />
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4 text-sm">
        <div>
          <div className="text-xs text-slate-500">Apport</div>
          <div className="font-heading font-extrabold text-slate-900">{formatNumberFr(result.downPayment)} DA</div>
        </div>
        <div>
          <div className="text-xs text-slate-500">Montant emprunté</div>
          <div className="font-heading font-extrabold text-slate-900">{formatNumberFr(result.principal)} DA</div>
        </div>
        <div className="col-span-2 rounded-xl bg-maroon-100 p-3 text-center">
          <div className="text-xs font-semibold text-maroon-700">Mensualité estimée</div>
          <div className="font-heading text-xl font-extrabold text-maroon-700">{formatNumberFr(result.monthly)} DA / mois</div>
        </div>
      </div>
      <p className="mt-3 text-[11px] text-slate-400">
        Simulation indicative, hors frais de dossier et d'assurance. Ne constitue pas une offre de crédit.
      </p>
    </div>
  );
}
