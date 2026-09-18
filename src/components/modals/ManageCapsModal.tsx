import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { CategoryId } from '../../types/finance';
import { CategoryIcon } from '../common/CategoryIcon';

interface ManageCapsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ManageCapsModal: React.FC<ManageCapsModalProps> = ({ isOpen, onClose }) => {
  const { categories, updateCategoryCap, profile } = useFinance();

  const [capsState, setCapsState] = useState<Record<CategoryId, number>>(() => {
    const initial: Record<string, number> = {};
    categories.forEach(c => {
      initial[c.id] = c.cap;
    });
    return initial as Record<CategoryId, number>;
  });

  if (!isOpen) return null;

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    Object.entries(capsState).forEach(([catId, newCap]) => {
      updateCategoryCap(catId as CategoryId, newCap);
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-[400px] bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 relative max-h-[85vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">Manage Category Caps</h2>
              <p className="text-xs text-slate-400">Set monthly spending boundaries</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSaveAll} className="mt-4 space-y-4">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-100"
              >
                <div className="flex items-center space-x-3">
                  <CategoryIcon category={cat.id} size={18} />
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">{cat.name}</h3>
                    <span className="text-[11px] text-slate-400">Currently spent: ${cat.spent}</span>
                  </div>
                </div>

                <div className="relative flex items-center">
                  <span className="text-sm font-bold text-slate-500 mr-1">{profile.currency}</span>
                  <input
                    type="number"
                    min="1"
                    step="10"
                    value={capsState[cat.id] ?? cat.cap}
                    onChange={(e) =>
                      setCapsState((prev) => ({
                        ...prev,
                        [cat.id]: parseFloat(e.target.value) || 0,
                      }))
                    }
                    className="w-20 text-right font-mono font-bold text-slate-900 bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-sm focus:outline-none focus:border-forest-700"
                  />
                </div>
              </div>
            ))}

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-2xl bg-forest-800 hover:bg-forest-900 text-white font-bold text-sm shadow-md flex items-center justify-center space-x-2 transition-all active:scale-98"
              >
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Save All Category Caps</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
