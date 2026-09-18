import React from 'react';
import { ChevronRight, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

interface SummaryTileProps {
  totalLent: number;
  totalDebt: number;
  currency: string;
  onNavigateLedger: (filter: 'Lending' | 'Debts') => void;
}

export const SummaryTile: React.FC<SummaryTileProps> = ({
  totalLent,
  totalDebt,
  currency,
  onNavigateLedger,
}) => {
  return (
    <div className="grid grid-cols-2 gap-3.5">
      {/* Lending Card */}
      <div
        onClick={() => onNavigateLedger('Lending')}
        className="group relative bg-white p-4 rounded-2xl border border-slate-100 shadow-soft cursor-pointer hover:border-emerald-200 hover:shadow-md transition-all active:scale-[0.98]"
      >
        <div className="flex items-center justify-between">
          <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
        </div>

        <div className="mt-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Lending</span>
          <p className="text-lg font-bold font-mono text-emerald-600 mt-0.5">
            +{formatCurrency(totalLent, currency)}
          </p>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Lent to friends</span>
        </div>
      </div>

      {/* Debts Card */}
      <div
        onClick={() => onNavigateLedger('Debts')}
        className="group relative bg-white p-4 rounded-2xl border border-slate-100 shadow-soft cursor-pointer hover:border-rose-200 hover:shadow-md transition-all active:scale-[0.98]"
      >
        <div className="flex items-center justify-between">
          <div className="w-9 h-9 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center">
            <ArrowDownLeft className="w-5 h-5 stroke-[2.5]" />
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-rose-500 group-hover:translate-x-0.5 transition-all" />
        </div>

        <div className="mt-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Debts</span>
          <p className="text-lg font-bold font-mono text-rose-500 mt-0.5">
            -{formatCurrency(totalDebt, currency)}
          </p>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Total owed to others</span>
        </div>
      </div>
    </div>
  );
};
