import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, PlusCircle } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';

interface AddFundsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddFundsModal: React.FC<AddFundsModalProps> = ({ isOpen, onClose }) => {
  const { addFunds, profile } = useFinance();
  const [amountStr, setAmountStr] = useState<string>('100.00');
  const [source, setSource] = useState<string>('Monthly Allowance Deposit');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(amountStr) || 0;
    if (amount <= 0) return;

    addFunds(amount, source);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-[380px] bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 relative"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900">Add Funds to Allowance</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1">
                Deposit Amount
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-lg font-bold text-forest-800">
                  {profile.currency}
                </span>
                <input
                  type="number"
                  step="1"
                  min="1"
                  value={amountStr}
                  onChange={(e) => setAmountStr(e.target.value)}
                  className="w-full pl-9 pr-4 py-3 bg-surface-field border border-slate-200 rounded-xl text-xl font-bold font-mono text-forest-900 focus:outline-none focus:border-forest-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1">
                Source Description
              </label>
              <input
                type="text"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                placeholder="e.g. Bank Transfer, Gift..."
                className="w-full px-4 py-3 bg-surface-field border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-forest-700"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-2xl bg-forest-800 hover:bg-forest-900 text-white font-bold text-sm shadow-md flex items-center justify-center space-x-2 transition-all active:scale-98"
            >
              <PlusCircle className="w-4 h-4 text-emerald-400" />
              <span>Confirm Deposit</span>
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
