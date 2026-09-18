import React from 'react';
import { BookOpen, Plus } from 'lucide-react';
import { Category, CategoryPurchase } from '../../types/finance';
import { formatCurrency } from '../../utils/formatters';
import { NOVEL_PURCHASES } from '../../data/mockData';

interface HobbyBudgetCardProps {
  category: Category;
  currency: string;
  onAddPurchase: () => void;
}

export const HobbyBudgetCard: React.FC<HobbyBudgetCardProps> = ({
  category,
  currency,
  onAddPurchase,
}) => {
  const remaining = Math.max(0, category.cap - category.spent);
  const percent = Math.min(100, Math.round((category.spent / category.cap) * 100));

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-soft space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Novels & Books</h3>
            <span className="text-xs text-slate-400">Monthly Hobby Budget</span>
          </div>
        </div>

        <button
          onClick={onAddPurchase}
          className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          title="Add novel purchase"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Budget Progress Box */}
      <div className="bg-sky-50/60 rounded-2xl p-3.5 border border-sky-100">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="font-semibold text-sky-900">Remaining Budget</span>
          <span className="font-bold font-mono text-sky-800">
            {formatCurrency(remaining, currency)} left
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-sky-200/60 h-2 rounded-full overflow-hidden">
          <div
            className="bg-sky-600 h-full rounded-full transition-all duration-300"
            style={{ width: `${percent}%` }}
          />
        </div>

        <div className="flex justify-between text-[11px] text-sky-700/80 mt-1 font-mono">
          <span>Spent: {formatCurrency(category.spent, currency)}</span>
          <span>Cap: {formatCurrency(category.cap, currency)}</span>
        </div>
      </div>

      {/* Horizontal Scroll Gallery of Purchases */}
      <div>
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
          Recent Library Additions
        </h4>

        <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-none snap-x">
          {NOVEL_PURCHASES.map((book) => (
            <div
              key={book.id}
              className="snap-start shrink-0 w-28 bg-slate-50 rounded-2xl p-2 border border-slate-100 hover:border-slate-200 transition-all"
            >
              <div className="h-28 w-full rounded-xl overflow-hidden bg-slate-200 mb-2 relative">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1 right-1 bg-slate-900/80 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                  {book.typeLabel}
                </span>
              </div>
              <h5 className="text-xs font-bold text-slate-800 line-clamp-1">{book.title}</h5>
              <p className="text-[11px] font-mono text-sky-700 font-bold mt-0.5">
                {formatCurrency(book.price, currency)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
