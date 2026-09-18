import React from 'react';
import { Film, Ticket, Gift, Sparkles } from 'lucide-react';
import { Category } from '../../types/finance';
import { formatCurrency } from '../../utils/formatters';

interface MoviesPassCardProps {
  category: Category;
  rewardPoints: number;
  currency: string;
  onRedeemPoints: () => void;
}

export const MoviesPassCard: React.FC<MoviesPassCardProps> = ({
  category,
  rewardPoints,
  currency,
  onRedeemPoints,
}) => {
  const recentMovieEntries = [
    {
      id: 'mov-1',
      title: 'AMC Stubs Monthly Pass',
      type: 'Subscription',
      date: 'Jul 24',
      amount: 19.99,
      iconBg: 'bg-purple-100 text-purple-700',
    },
    {
      id: 'mov-2',
      title: 'IMAX - Interstellar Re-release',
      type: 'Ticket Purchase',
      date: 'Jul 20',
      amount: 22.50,
      iconBg: 'bg-indigo-100 text-indigo-700',
    },
    {
      id: 'mov-3',
      title: 'Cinema Snack & Popcorn Combo',
      type: 'Concession',
      date: 'Jul 20',
      amount: 16.00,
      iconBg: 'bg-fuchsia-100 text-fuchsia-700',
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-soft space-y-4">
      {/* Top Banner */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center">
            <Film className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Movies & Entertainment</h3>
            <span className="text-xs text-slate-400">Monthly Pass Perks</span>
          </div>
        </div>

        {/* Reward Points Pill */}
        <div className="flex items-center space-x-1.5 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full text-amber-800 font-bold text-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
          <span>{rewardPoints} pts</span>
        </div>
      </div>

      {/* Monthly Pass Callout Box */}
      <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white rounded-2xl p-4 shadow-md relative overflow-hidden">
        <div className="flex items-center justify-between relative z-10">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-purple-200">
              Pass Status: Active
            </span>
            <h4 className="text-lg font-bold mt-0.5">AMC Cinema Pass</h4>
            <p className="text-xs text-purple-200 mt-0.5">2 of 3 movies watched this week</p>
          </div>
          <Ticket className="w-8 h-8 text-purple-300 stroke-[1.5]" />
        </div>

        {/* CTA Redeem Points Button */}
        <button
          onClick={onRedeemPoints}
          className="mt-3.5 w-full py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow"
        >
          <Gift className="w-4 h-4 text-slate-900" />
          <span>Redeem Rewards ({rewardPoints} pts available)</span>
        </button>
      </div>

      {/* Recent Entries */}
      <div className="space-y-2.5">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Recent Cinema Spending
        </h4>

        {recentMovieEntries.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-2.5 bg-slate-50 rounded-2xl border border-slate-100"
          >
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-xl ${item.iconBg} flex items-center justify-center text-xs font-bold`}>
                <Film className="w-4 h-4" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-slate-800">{item.title}</h5>
                <span className="text-[10px] text-slate-400">{item.type} • {item.date}</span>
              </div>
            </div>
            <span className="text-xs font-bold font-mono text-purple-800">
              -{formatCurrency(item.amount, currency)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
