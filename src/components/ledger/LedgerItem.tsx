import React from 'react';
import { LedgerEntry } from '../../types/finance';
import { formatCurrency, formatDateRelative } from '../../utils/formatters';

interface LedgerItemProps {
  entry: LedgerEntry;
  currency: string;
  onClick: (entry: LedgerEntry) => void;
}

export const LedgerItem: React.FC<LedgerItemProps> = ({
  entry,
  currency,
  onClick,
}) => {
  const isLent = entry.type === 'LENT';
  const isSettled = entry.status === 'Settled';

  return (
    <div
      onClick={() => onClick(entry)}
      className="group bg-white p-4 rounded-2xl border border-slate-100 shadow-soft hover:shadow-md hover:border-slate-200 transition-all cursor-pointer active:scale-[0.98]"
    >
      <div className="flex items-start justify-between">
        {/* Person Avatar & Name */}
        <div className="flex items-center space-x-3">
          <div
            className="w-11 h-11 rounded-full text-white font-bold text-sm flex items-center justify-center shadow-inner shrink-0"
            style={{ backgroundColor: entry.personColor }}
          >
            {entry.personInitials}
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-bold text-slate-800">{entry.personName}</h3>
              {/* Type Pill */}
              <span
                className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  isLent
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    : 'bg-rose-100 text-rose-800 border border-rose-200'
                }`}
              >
                {entry.type}
              </span>
            </div>

            {/* Quoted Note */}
            <p className="text-xs text-slate-500 italic mt-0.5 line-clamp-1">
              "{entry.note}"
            </p>
          </div>
        </div>

        {/* Amount */}
        <div className="text-right shrink-0">
          <span
            className={`text-base font-extrabold font-mono ${
              isLent ? 'text-emerald-600' : 'text-rose-500'
            }`}
          >
            {isLent ? '+' : '-'}{formatCurrency(entry.amount, currency)}
          </span>

          {/* Status Dot */}
          <div className="flex items-center justify-end space-x-1.5 mt-1">
            <span
              className={`w-2 h-2 rounded-full ${
                isSettled ? 'bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]' : 'bg-amber-500'
              }`}
            />
            <span
              className={`text-[11px] font-semibold ${
                isSettled ? 'text-emerald-700' : 'text-amber-700'
              }`}
            >
              {entry.status}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-2.5 pt-2 border-t border-slate-100/80 flex items-center justify-between text-[11px] text-slate-400">
        <span>Logged: {formatDateRelative(entry.date)}</span>
        <span className="font-semibold group-hover:text-forest-700 transition-colors">
          Tap for details →
        </span>
      </div>
    </div>
  );
};
