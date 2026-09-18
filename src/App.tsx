import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FinanceProvider } from './context/FinanceContext';
import { HomeView } from './views/HomeView';
import { LedgerView } from './views/LedgerView';
import { CategoriesView } from './views/CategoriesView';
import { ProfileView } from './components/profile/ProfileView';
import { BottomNav } from './components/common/BottomNav';
import { FAB } from './components/common/FAB';
import { Toast } from './components/common/Toast';
import { NewEntrySheet } from './components/modals/NewEntrySheet';
import { ManageCapsModal } from './components/modals/ManageCapsModal';
import { AddFundsModal } from './components/modals/AddFundsModal';
import { SendMoneyModal } from './components/modals/SendMoneyModal';
import { Wallet } from 'lucide-react';

const AppContent: React.FC = () => {
  const [isNewEntryOpen, setIsNewEntryOpen] = useState(false);
  const [isManageCapsOpen, setIsManageCapsOpen] = useState(false);
  const [isAddFundsOpen, setIsAddFundsOpen] = useState(false);
  const [isSendMoneyOpen, setIsSendMoneyOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-0 sm:p-4">
      {/* Toast Notification Container */}
      <Toast />

      {/* Mobile Shell Wrapper (390px - 430px Max Width Centered) */}
      <div className="w-full max-w-[430px] bg-[#F5F7F8] min-h-screen sm:min-h-[860px] sm:h-[860px] sm:rounded-[40px] shadow-2xl relative flex flex-col overflow-hidden border border-slate-700/30">
        
        {/* App Top Header Bar */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-forest-800 text-white flex items-center justify-center shadow-md">
              <Wallet className="w-4 h-4 stroke-[2.5]" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-forest-900 font-sans">
              WalletWise
            </span>
          </div>

          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-2.5 py-1 rounded-full">
            Allowance Mode
          </div>
        </header>

        {/* Scrollable Main View Container */}
        <main className="flex-1 overflow-y-auto px-4 pt-4 pb-20 scrollbar-none">
          <Routes>
            <Route
              path="/"
              element={
                <HomeView
                  onOpenManageCaps={() => setIsManageCapsOpen(true)}
                  onOpenAddFunds={() => setIsAddFundsOpen(true)}
                  onOpenSendMoney={() => setIsSendMoneyOpen(true)}
                />
              }
            />
            <Route path="/ledger" element={<LedgerView />} />
            <Route
              path="/categories"
              element={<CategoriesView onOpenNewEntry={() => setIsNewEntryOpen(true)} />}
            />
            <Route
              path="/profile"
              element={<ProfileView onOpenManageCaps={() => setIsManageCapsOpen(true)} />}
            />
          </Routes>
        </main>

        {/* Floating Action Button (FAB) */}
        <FAB onClick={() => setIsNewEntryOpen(true)} />

        {/* Persistent Bottom Navigation */}
        <BottomNav />

        {/* Modals & Sheets */}
        <NewEntrySheet isOpen={isNewEntryOpen} onClose={() => setIsNewEntryOpen(false)} />
        <ManageCapsModal isOpen={isManageCapsOpen} onClose={() => setIsManageCapsOpen(false)} />
        <AddFundsModal isOpen={isAddFundsOpen} onClose={() => setIsAddFundsOpen(false)} />
        <SendMoneyModal isOpen={isSendMoneyOpen} onClose={() => setIsSendMoneyOpen(false)} />
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <Router>
      <FinanceProvider>
        <AppContent />
      </FinanceProvider>
    </Router>
  );
};
