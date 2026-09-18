import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Transaction } from '../../types/finance';
import { CategoryIcon } from '../common/CategoryIcon';
import { formatCurrency, formatDateRelative } from '../../utils/formatters';

interface RecentActivityProps {
  transactions: Transaction[];
  currency: string;
  onViewAll: () => void;
}

export const RecentActivity: React.FC<RecentActivityProps> = ({
  transactions,
  currency,
  onViewAll,
}) => {
  const recent = transactions.slice(0, 4);

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-soft">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
        <h2 className="text-base font-bold text-slate-800 tracking-tight">Recent Activity</h2>
        <button
          onClick={onViewAll}
          className="group inline-flex items-center space-x-1 text-xs font-bold text-forest-700 hover:text-forest-900 transition-colors"
        >
          <span>History</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* List */}
      {recent.length === 0 ? (
        <div className="text-center py-6 text-slate-400 text-sm">
          No transactions yet — tap <span className="font-bold text-forest-700">+</span> to add one.
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {recent.map((tx) => {
            const isNegative = tx.type === 'expense' || tx.type === 'debt';
            const isPositive = tx.type === 'income' || tx.type === 'lent';

            return (
              <div
                key={tx.id}
                className="flex items-center justify-between py-3 first:pt-0 last:pb-0 hover:bg-slate-50/50 px-1 rounded-xl transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <CategoryIcon category={tx.category} size={18} />
                  <div>
                    <h3 className="text-sm font-semibold text-slate-800 leading-tight">
                      {tx.title}
                    </h3>
                    <div className="flex items-center space-x-2 text-[11px] text-slate-400 mt-0.5">
                      <span>{tx.subcategory || tx.category}</span>
                      <span>•</span>
                      <span>{formatDateRelative(tx.date)}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`text-sm font-bold font-mono ${
                      isNegative ? 'text-rose-500' : 'text-emerald-600'
                    }`}
                  >
                    {isNegative ? '-' : '+'}{formatCurrency(tx.amount, currency)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
