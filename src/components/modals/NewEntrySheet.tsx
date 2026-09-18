import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, FileText, Check, Plus, Minus } from 'lucide-react';
import { CategoryId } from '../../types/finance';
import { useFinance } from '../../context/FinanceContext';
import { CategoryIcon } from '../common/CategoryIcon';

interface NewEntrySheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewEntrySheet: React.FC<NewEntrySheetProps> = ({ isOpen, onClose }) => {
  const { categories, profile, addTransaction } = useFinance();

  const [amountStr, setAmountStr] = useState<string>('15.00');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('food');
  const [personName, setPersonName] = useState<string>('');
  const [dateStr, setDateStr] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [note, setNote] = useState<string>('');

  if (!isOpen) return null;

  const numAmount = parseFloat(amountStr) || 0;
  const isLendingOrDebt = selectedCategory === 'lending' || selectedCategory === 'debt';
  const isValid = numAmount > 0 && selectedCategory && (!isLendingOrDebt || personName.trim().length > 0);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    addTransaction({
      amount: numAmount,
      category: selectedCategory,
      personName: isLendingOrDebt ? personName.trim() : undefined,
      note: note.trim() || undefined,
      date: new Date(dateStr).toISOString(),
    });

    // Reset fields & close
    setAmountStr('15.00');
    setPersonName('');
    setNote('');
    onClose();
  };

  const handleStepAmount = (delta: number) => {
    const current = parseFloat(amountStr) || 0;
    const next = Math.max(0, current + delta);
    setAmountStr(next.toFixed(2));
  };

  const quickValues = [5, 10, 20, 50, 100];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="w-full max-w-[430px] bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-base font-bold text-slate-900">New Entry</h2>

            <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 shadow-sm">
              <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
            </div>
          </div>

          <form onSubmit={handleSave} className="mt-5 space-y-5">
            {/* Amount Field */}
            <div className="text-center bg-surface-field rounded-2xl p-4 border border-slate-200/80">
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                Transaction Amount
              </span>

              <div className="mt-2 flex items-center justify-center space-x-3">
                <button
                  type="button"
                  onClick={() => handleStepAmount(-5)}
                  className="w-10 h-10 rounded-full bg-white text-slate-700 font-bold shadow-sm border border-slate-200 flex items-center justify-center hover:bg-slate-50 active:scale-95 transition-all"
                >
                  <Minus className="w-4 h-4" />
                </button>

                <div className="relative inline-flex items-center">
                  <span className="text-3xl font-extrabold text-forest-900 font-mono mr-1">$</span>
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={amountStr}
                    onChange={(e) => setAmountStr(e.target.value)}
                    className="w-36 text-center text-3xl font-extrabold font-mono text-forest-900 bg-transparent focus:outline-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => handleStepAmount(5)}
                  className="w-10 h-10 rounded-full bg-white text-slate-700 font-bold shadow-sm border border-slate-200 flex items-center justify-center hover:bg-slate-50 active:scale-95 transition-all"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Amount Pills */}
              <div className="flex items-center justify-center space-x-2 mt-3">
                {quickValues.map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setAmountStr(val.toFixed(2))}
                    className="px-2.5 py-1 bg-white rounded-lg border border-slate-200 text-xs font-semibold font-mono text-slate-700 hover:border-forest-600 hover:text-forest-800 transition-colors"
                  >
                    +${val}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Selector Pills */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                Category
              </label>

              <div className="flex flex-wrap gap-2">
                {allCategories.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-full text-xs font-bold transition-all active:scale-95 ${
                        isSelected
                          ? 'bg-forest-800 text-white shadow-md'
                          : 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200'
                      }`}
                    >
                      <CategoryIcon category={cat.id} size={14} className="!p-0 !bg-transparent" />
                      <span>{cat.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Conditional To/From Name Field */}
            {isLendingOrDebt && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-1"
              >
                <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-400">
                  {selectedCategory === 'lending' ? 'Lent To (Person Name)' : 'Borrowed From (Person Name)'}
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={personName}
                    onChange={(e) => setPersonName(e.target.value)}
                    placeholder="Enter name (e.g. Sarah Jenkins)..."
                    className="w-full pl-10 pr-4 py-3 bg-surface-field border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-forest-700"
                    required={isLendingOrDebt}
                  />
                </div>
              </motion.div>
            )}

            {/* Date Field */}
            <div className="space-y-1">
              <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-400">
                Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="date"
                  value={dateStr}
                  onChange={(e) => setDateStr(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-surface-field border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:border-forest-700"
                />
              </div>
            </div>

            {/* Note Field */}
            <div className="space-y-1">
              <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-400">
                Note (Optional)
              </label>
              <div className="relative">
                <FileText className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <textarea
                  rows={2}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Add details about this entry..."
                  className="w-full pl-10 pr-4 py-2.5 bg-surface-field border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-forest-700"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isValid}
              className={`w-full py-4 px-6 rounded-2xl font-bold text-sm shadow-md flex items-center justify-center space-x-2 transition-all ${
                isValid
                  ? 'bg-forest-800 hover:bg-forest-900 text-white active:scale-98 cursor-pointer'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Check className="w-5 h-5 stroke-[2.5]" />
              <span>Save Entry</span>
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const allCategories: { id: CategoryId; name: string }[] = [
  { id: 'food', name: 'Food & Dining' },
  { id: 'movies', name: 'Movies' },
  { id: 'novels', name: 'Novels' },
  { id: 'lending', name: 'Lending (Friend)' },
  { id: 'debt', name: 'Debt (Friend)' },
  { id: 'shopping', name: 'Shopping' },
  { id: 'utilities', name: 'Utilities' },
];
