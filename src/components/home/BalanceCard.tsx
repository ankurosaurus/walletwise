import React from 'react';
import { ArrowUpRight, Plus, Send, TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

interface BalanceCardProps {
  balance: number;
  percentChange: number;
  currency: string;
  onAddFunds: () => void;
  onSendMoney: () => void;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({
  balance,
  percentChange,
  currency,
  onAddFunds,
  onSendMoney,
}) => {
  const isPositive = percentChange >= 0;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-forest-900 via-forest-800 to-forest-700 text-white p-6 shadow-float border border-forest-600/30">
      {/* Background glowing circle highlights */}
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-emerald-400/10 rounded-full blur-xl pointer-events-none" />

      <div className="relative z-10">
        {/* Eyebrow Label */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-300/80">
            Total Available Balance
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-950/60 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live Allowance
          </span>
        </div>

        {/* Amount & Change Badge */}
        <div className="mt-3 flex items-baseline space-x-3">
          <h1 className="text-4xl font-extrabold tracking-tight font-mono text-white">
            {formatCurrency(balance, currency)}
          </h1>
          <div
            className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold ${
              isPositive
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
            }`}
          >
            {isPositive ? (
              <TrendingUp className="w-3 h-3 mr-1 text-emerald-400" />
            ) : (
              <TrendingDown className="w-3 h-3 mr-1 text-rose-400" />
            )}
            {isPositive ? `+${percentChange}%` : `${percentChange}%`}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            onClick={onAddFunds}
            className="flex items-center justify-center space-x-2 py-3 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-forest-900 font-bold text-sm transition-all shadow-md"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add Funds</span>
          </button>

          <button
            onClick={onSendMoney}
            className="flex items-center justify-center space-x-2 py-3 px-4 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-95 text-white font-semibold text-sm transition-all border border-white/15 backdrop-blur-sm"
          >
            <Send className="w-4 h-4" />
            <span>Send</span>
          </button>
        </div>
      </div>
    </div>
  );
};
