import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Clock, Calendar, User, FileText } from 'lucide-react';
import { LedgerEntry } from '../../types/finance';
import { formatCurrency, formatDateRelative } from '../../utils/formatters';

interface LedgerDetailModalProps {
  entry: LedgerEntry | null;
  currency: string;
  onClose: () => void;
  onSettle: (id: string) => void;
}

export const LedgerDetailModal: React.FC<LedgerDetailModalProps> = ({
  entry,
  currency,
  onClose,
  onSettle,
}) => {
  if (!entry) return null;

  const isLent = entry.type === 'LENT';
  const isSettled = entry.status === 'Settled';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-[390px] bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 relative overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center pt-2">
            <div
              className="w-16 h-16 rounded-full text-white font-bold text-xl flex items-center justify-center mx-auto shadow-md"
              style={{ backgroundColor: entry.personColor }}
            >
              {entry.personInitials}
            </div>

            <h2 className="text-xl font-bold text-slate-900 mt-3">{entry.personName}</h2>

            <div className="flex items-center justify-center space-x-2 mt-1">
              <span
                className={`text-xs font-bold uppercase tracking-wider px-3 py-0.5 rounded-full ${
                  isLent ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                }`}
              >
                {entry.type === 'LENT' ? 'Money Lent Out' : 'Debt Owed'}
              </span>

              <span className="flex items-center space-x-1 text-xs font-semibold">
                <span
                  className={`w-2 h-2 rounded-full ${
                    isSettled ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}
                />
                <span className={isSettled ? 'text-emerald-700' : 'text-amber-700'}>
                  {entry.status}
                </span>
              </span>
            </div>

            <div className="mt-4">
              <span className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Transaction Amount
              </span>
              <p
                className={`text-3xl font-extrabold font-mono mt-0.5 ${
                  isLent ? 'text-emerald-600' : 'text-rose-500'
                }`}
              >
                {isLent ? '+' : '-'}{formatCurrency(entry.amount, currency)}
              </p>
            </div>
          </div>

          {/* Detailed Info Card */}
          <div className="mt-6 bg-slate-50 rounded-2xl p-4 space-y-3 border border-slate-100 text-sm">
            <div className="flex items-start space-x-3">
              <FileText className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-slate-400 font-medium">Memo / Note</span>
                <p className="text-slate-800 font-medium italic">"{entry.note}"</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 pt-2 border-t border-slate-200/60">
              <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
              <div>
                <span className="text-xs text-slate-400 font-medium">Date Logged</span>
                <p className="text-slate-800 font-semibold">{formatDateRelative(entry.date)}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 pt-2 border-t border-slate-200/60">
              <Clock className="w-4 h-4 text-slate-400 shrink-0" />
              <div>
                <span className="text-xs text-slate-400 font-medium">Settlement Status</span>
                <p className="text-slate-800 font-semibold">
                  {isSettled
                    ? 'Settled and accounted for'
                    : 'Pending settlement verification'}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 space-y-2">
            {!isSettled && (
              <button
                onClick={() => {
                  onSettle(entry.id);
                  onClose();
                }}
                className="w-full py-3.5 px-4 rounded-2xl bg-forest-800 hover:bg-forest-900 text-white font-bold text-sm shadow-md flex items-center justify-center space-x-2 transition-all active:scale-98"
              >
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Mark as Settled</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="w-full py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
