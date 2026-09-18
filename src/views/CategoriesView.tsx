import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { HobbyBudgetCard } from '../components/categories/HobbyBudgetCard';
import { MoviesPassCard } from '../components/categories/MoviesPassCard';
import { CategoryTable } from '../components/categories/CategoryTable';
import { SmartInsightCard } from '../components/categories/SmartInsightCard';

interface CategoriesViewProps {
  onOpenNewEntry: () => void;
}

export const CategoriesView: React.FC<CategoriesViewProps> = ({ onOpenNewEntry }) => {
  const { categories, profile, rewardPoints, redeemPoints, showToast } = useFinance();

  const novelsCategory = categories.find((c) => c.id === 'novels') || {
    id: 'novels',
    name: 'Novels & Books',
    icon: 'BookOpen',
    colorTint: '#0369A1',
    bgTint: '#BAE6FD',
    cap: 80,
    spent: 65,
  };

  const moviesCategory = categories.find((c) => c.id === 'movies') || {
    id: 'movies',
    name: 'Movies & Ent.',
    icon: 'Film',
    colorTint: '#6B21A8',
    bgTint: '#E9D5FF',
    cap: 120,
    spent: 95,
  };

  const totalSpentAll = categories.reduce((sum, c) => sum + c.spent, 0);
  const totalCapAll = categories.reduce((sum, c) => sum + c.cap, 0);

  const handleRedeemPoints = () => {
    const success = redeemPoints(200, 'Free AMC Movie Snack Combo');
    if (success) {
      showToast('Redeemed 200 pts for Movie Snack Voucher!');
    }
  };

  return (
    <div className="space-y-5 pb-24">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Categories & Hobbies</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Detailed spending breakdowns by interest and hobby caps
        </p>
      </div>

      {/* 1. Smart Insight Card */}
      <SmartInsightCard
        totalSpent={totalSpentAll}
        totalCap={totalCapAll}
        currency={profile.currency}
      />

      {/* 2. Novels & Books Hobby Card */}
      <HobbyBudgetCard
        category={novelsCategory}
        currency={profile.currency}
        onAddPurchase={onOpenNewEntry}
      />

      {/* 3. Movies & Entertainment Monthly Pass Card */}
      <MoviesPassCard
        category={moviesCategory}
        rewardPoints={rewardPoints}
        currency={profile.currency}
        onRedeemPoints={handleRedeemPoints}
      />

      {/* 4. Dining Out Line Items Breakdown Table */}
      <CategoryTable
        currency={profile.currency}
        onViewAll={() => showToast('Filtered view: Dining Out line items')}
      />
    </div>
  );
};
