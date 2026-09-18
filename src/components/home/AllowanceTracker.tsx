import React from 'react';
import { Category } from '../../types/finance';
import { CategoryIcon } from '../common/CategoryIcon';
import { formatCurrency } from '../../utils/formatters';
import { getProgressBarColor } from '../../utils/colors';

interface AllowanceTrackerProps {
  categories: Category[];
  currency: string;
  onManageCaps: () => void;
}

export const AllowanceTracker: React.FC<AllowanceTrackerProps> = ({
  categories,
  currency,
  onManageCaps,
}) => {
  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-soft">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-800 tracking-tight">Allowance Tracking</h2>
          <p className="text-xs text-slate-400">Category spending caps</p>
        </div>
        <button
          onClick={onManageCaps}
          className="text-xs font-bold text-forest-700 hover:text-forest-900 bg-forest-50 px-3 py-1.5 rounded-full border border-forest-100 hover:bg-forest-100 transition-all active:scale-95"
        >
          Manage Caps
        </button>
      </div>

      {/* Category Rows */}
      <div className="mt-4 space-y-4">
        {categories.map((cat) => {
          const percent = Math.min(100, Math.round((cat.spent / cat.cap) * 100));
          const isOver = cat.spent > cat.cap;
          const barColorClass = getProgressBarColor(percent);

          return (
            <div key={cat.id} className="group">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center space-x-3">
                  <CategoryIcon category={cat.id} size={18} />
                  <div>
                    <span className="text-sm font-semibold text-slate-800">{cat.name}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold font-mono text-slate-800">
                    {formatCurrency(cat.spent, currency)}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {' / '}{formatCurrency(cat.cap, currency)}
                  </span>
                </div>
              </div>

              {/* Progress Bar Container */}
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden p-0.5">
                <div
                  className={`h-full rounded-full transition-all duration-500 ease-out ${barColorClass}`}
                  style={{ width: `${percent}%` }}
                />
              </div>

              {/* Exceeded Warning */}
              {isOver && (
                <p className="text-[10px] font-semibold text-rose-500 mt-1">
                  Exceeded cap by {formatCurrency(cat.spent - cat.cap, currency)}!
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
