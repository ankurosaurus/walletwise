import React from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

interface FABProps {
  onClick: () => void;
}

export const FAB: React.FC<FABProps> = ({ onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      onClick={onClick}
      className="fixed bottom-20 right-5 z-40 w-14 h-14 rounded-full bg-forest-800 text-white shadow-float flex items-center justify-center border-2 border-emerald-400/20 focus:outline-none"
      aria-label="Add New Entry"
    >
      <Plus className="w-7 h-7 stroke-[2.5]" />
    </motion.button>
  );
};
