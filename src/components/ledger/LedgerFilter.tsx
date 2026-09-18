import React from 'react';
import { Search } from 'lucide-react';

export type LedgerFilterType = 'All' | 'Lending' | 'Debts';

interface LedgerFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeFilter: LedgerFilterType;
  onFilterChange: (filter: LedgerFilterType) => void;
}

export const LedgerFilter: React.FC<LedgerFilterProps> = ({
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
}) => {
  const filterOptions: LedgerFilterType[] = ['All', 'Lending', 'Debts'];

  return (
    <div className="space-y-3">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Filter by person name or note..."
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-forest-700 focus:ring-2 focus:ring-forest-100 shadow-sm transition-all"
        />
      </div>

      {/* Filter Chips */}
      <div className="flex items-center space-x-2">
        {filterOptions.map((filter) => {
          const isActive = activeFilter === filter;
          return (
            <button
              key={filter}
              onClick={() => onFilterChange(filter)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all active:scale-95 ${
                isActive
                  ? 'bg-forest-800 text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>
    </div>
  );
};
