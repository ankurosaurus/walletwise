import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';

export const Toast: React.FC = () => {
  const { toastMessage, clearToast } = useFinance();

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        clearToast();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage, clearToast]);

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: -40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-[380px] bg-forest-900 text-white px-4 py-3 rounded-2xl shadow-float flex items-center justify-between border border-forest-700/50 backdrop-blur-md"
        >
          <div className="flex items-center space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="text-sm font-medium tracking-tight text-emerald-50">{toastMessage}</span>
          </div>
          <button
            onClick={clearToast}
            className="p-1 rounded-full text-emerald-200 hover:text-white hover:bg-forest-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
