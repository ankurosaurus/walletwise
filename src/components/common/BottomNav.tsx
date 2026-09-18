import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutGrid, ReceiptText, Tags, User } from 'lucide-react';
import { motion } from 'framer-motion';

export const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 'home', label: 'Home', icon: LayoutGrid, path: '/' },
    { id: 'ledger', label: 'Ledger', icon: ReceiptText, path: '/ledger' },
    { id: 'categories', label: 'Categories', icon: Tags, path: '/categories' },
    { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-40 bg-white border-t border-slate-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] px-4 py-2">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className="relative flex flex-col items-center py-1 px-3 rounded-2xl transition-all duration-200"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabPill"
                  className="absolute inset-0 bg-forest-50 rounded-2xl -z-10"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              
              <div className={`p-1 transition-colors duration-200 ${isActive ? 'text-forest-800' : 'text-slate-400'}`}>
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
              </div>
              
              <span
                className={`text-[11px] font-medium tracking-tight mt-0.5 transition-colors duration-200 ${
                  isActive ? 'text-forest-900 font-semibold' : 'text-slate-500'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
