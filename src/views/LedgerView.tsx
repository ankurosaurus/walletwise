import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle2, TrendingUp, TrendingDown, Layers } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { LedgerEntry } from '../types/finance';
import { LedgerFilter, LedgerFilterType } from '../components/ledger/LedgerFilter';
import { LedgerItem } from '../components/ledger/LedgerItem';
import { LedgerDetailModal } from '../components/ledger/LedgerDetailModal';
import { formatCurrency } from '../utils/formatters';

export const LedgerView: React.FC = () => {
  const { ledger, profile, settleLedgerEntry } = useFinance();
  const [searchParams] = useSearchParams();

  // Read initial filter from query param if available e.g., ?filter=Lending
  const initialFilterParam = searchParams.get('filter');
  const [activeFilter, setActiveFilter] = useState<LedgerFilterType>(() => {
    if (initialFilterParam === 'Lending') return 'Lending';
    if (initialFilterParam === 'Debts') return 'Debts';
    return 'All';
  });

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedEntry, setSelectedEntry] = useState<LedgerEntry | null>(null);
  const [displayCount, setDisplayCount] = useState<number>(5);

  // Statistics calculation
  const totalLent = useMemo(() => {
    return ledger
      .filter((e) => e.type === 'LENT' && e.status === 'Pending')
      .reduce((sum, e) => sum + e.amount, 0);
  }, [ledger]);

  const totalDebt = useMemo(() => {
    return ledger
      .filter((e) => e.type === 'DEBT' && e.status === 'Pending')
      .reduce((sum, e) => sum + e.amount, 0);
  }, [ledger]);

  const settledThisMonth = useMemo(() => {
    return ledger
      .filter((e) => e.status === 'Settled')
      .reduce((sum, e) => sum + e.amount, 0);
  }, [ledger]);

  // Filtering list logic
  const filteredLedger = useMemo(() => {
    return ledger.filter((entry) => {
      // Filter tab match
      if (activeFilter === 'Lending' && entry.type !== 'LENT') return false;
      if (activeFilter === 'Debts' && entry.type !== 'DEBT') return false;

      // Search match
      if (searchQuery.trim().length > 0) {
        const query = searchQuery.toLowerCase();
        const matchesName = entry.personName.toLowerCase().includes(query);
        const matchesNote = entry.note.toLowerCase().includes(query);
        return matchesName || matchesNote;
      }

      return true;
    });
  }, [ledger, activeFilter, searchQuery]);

  const visibleLedger = filteredLedger.slice(0, displayCount);
  const hasMore = displayCount < filteredLedger.length;

  return (
    <div className="space-y-5 pb-24">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Financial Ledger</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Your complete history of lending, debts, and transfers
        </p>
      </div>

      {/* 3 Stat Cards Row */}
      <div className="grid grid-cols-3 gap-2.5">
        {/* Total Lent */}
        <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-soft">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Total Lent
          </span>
          <p className="text-sm font-extrabold font-mono text-emerald-600 mt-1">
            {formatCurrency(totalLent, profile.currency)}
          </p>
          <div className="flex items-center text-[10px] font-semibold text-emerald-600 mt-1">
            <TrendingUp className="w-3 h-3 mr-0.5" />
            <span>+5.4%</span>
          </div>
        </div>

        {/* Total Debt */}
        <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-soft">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Total Debt
          </span>
          <p className="text-sm font-extrabold font-mono text-rose-500 mt-1">
            {formatCurrency(totalDebt, profile.currency)}
          </p>
          <div className="flex items-center text-[10px] font-semibold text-rose-500 mt-1">
            <TrendingDown className="w-3 h-3 mr-0.5" />
            <span>-2.1%</span>
          </div>
        </div>

        {/* Settled This Month */}
        <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-soft relative overflow-hidden">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Settled
          </span>
          <p className="text-sm font-extrabold font-mono text-slate-800 mt-1">
            {formatCurrency(settledThisMonth, profile.currency)}
          </p>
          <div className="mt-1">
            <span className="inline-flex items-center text-[9px] font-extrabold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full">
              <CheckCircle2 className="w-2.5 h-2.5 mr-0.5 text-emerald-600" />
              Target met
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <LedgerFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {/* Ledger Entry List */}
      <div className="space-y-3">
        {visibleLedger.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center border border-slate-100 shadow-soft">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">No ledger entries found</h3>
            <p className="text-xs text-slate-400 mt-1">
              Try adjusting your search query or filter chips.
            </p>
          </div>
        ) : (
          visibleLedger.map((entry) => (
            <LedgerItem
              key={entry.id}
              entry={entry}
              currency={profile.currency}
              onClick={setSelectedEntry}
            />
          ))
        )}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="pt-2 text-center">
          <button
            onClick={() => setDisplayCount((prev) => prev + 5)}
            className="w-full py-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-2xl shadow-sm transition-colors"
          >
            Load More Entries ({filteredLedger.length - displayCount} remaining)
          </button>
        </div>
      )}

      {/* Entry Detail Modal */}
      <LedgerDetailModal
        entry={selectedEntry}
        currency={profile.currency}
        onClose={() => setSelectedEntry(null)}
        onSettle={settleLedgerEntry}
      />
    </div>
  );
};
