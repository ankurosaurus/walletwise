import React from 'react';
import { Lightbulb, TrendingDown, Sparkles } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

interface SmartInsightCardProps {
  totalSpent: number;
  totalCap: number;
  currency: string;
}

export const SmartInsightCard: React.FC<SmartInsightCardProps> = ({
  totalSpent,
  totalCap,
  currency,
}) => {
  const headroom = Math.max(0, totalCap - totalSpent);
  const trendPercent = 14; // month-over-month decrease

  return (
    <div className="bg-emerald-50/60 rounded-3xl p-5 border border-emerald-100 border-l-4 border-l-emerald-500 shadow-soft relative overflow-hidden">
      <div className="flex items-start space-x-3.5">
        <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-md">
          <Lightbulb className="w-5 h-5 fill-emerald-200 text-white" />
        </div>

        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-800">
              Smart Monthly Insight
            </span>
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          </div>

          <h4 className="text-sm font-bold text-slate-900 mt-1">
            Great job! Spending is down{' '}
            <span className="text-emerald-700 font-extrabold">{trendPercent}%</span> compared to last month.
          </h4>

          <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
            You currently have <strong className="text-slate-900 font-bold">{formatCurrency(headroom, currency)}</strong> of total budget headroom remaining across your allowance caps. Keep it up!
          </p>
        </div>
      </div>
    </div>
  );
};
