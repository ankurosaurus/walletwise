import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFinance } from '../context/FinanceContext';
import { BalanceCard } from '../components/home/BalanceCard';
import { SummaryTile } from '../components/home/SummaryTile';
import { AllowanceTracker } from '../components/home/AllowanceTracker';
import { RecentActivity } from '../components/home/RecentActivity';

interface HomeViewProps {
  onOpenManageCaps: () => void;
  onOpenAddFunds: () => void;
  onOpenSendMoney: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onOpenManageCaps,
  onOpenAddFunds,
  onOpenSendMoney,
}) => {
  const { balance, balancePercentChange, categories, ledger, transactions, profile } = useFinance();
  const navigate = useNavigate();

  const totalLent = ledger
    .filter((l) => l.type === 'LENT' && l.status === 'Pending')
    .reduce((sum, item) => sum + item.amount, 0);

  const totalDebt = ledger
    .filter((l) => l.type === 'DEBT' && l.status === 'Pending')
    .reduce((sum, item) => sum + item.amount, 0);

  const handleNavigateLedger = (filter: 'Lending' | 'Debts') => {
    navigate(`/ledger?filter=${filter}`);
  };

  return (
    <div className="space-y-5 pb-24">
      {/* 1.1 Balance Card (Hero Element) */}
      <BalanceCard
        balance={balance}
        percentChange={balancePercentChange}
        currency={profile.currency}
        onAddFunds={onOpenAddFunds}
        onSendMoney={onOpenSendMoney}
      />

      {/* 1.2 Quick Summary Tiles */}
      <SummaryTile
        totalLent={totalLent}
        totalDebt={totalDebt}
        currency={profile.currency}
        onNavigateLedger={handleNavigateLedger}
      />

      {/* 1.3 Allowance Tracking Module */}
      <AllowanceTracker
        categories={categories}
        currency={profile.currency}
        onManageCaps={onOpenManageCaps}
      />

      {/* 1.4 Recent Activity Feed */}
      <RecentActivity
        transactions={transactions}
        currency={profile.currency}
        onViewAll={() => navigate('/ledger')}
      />
    </div>
  );
};
