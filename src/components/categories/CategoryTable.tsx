import React from 'react';
import { Utensils, ArrowUpRight } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

interface DiningItem {
  id: string;
  merchant: string;
  tag: 'Coffee' | 'Dinner' | 'Lunch' | 'Snacks';
  tagColor: 'green' | 'orange' | 'blue' | 'purple';
  amount: number;
  date: string;
}

interface CategoryTableProps {
  currency: string;
  onViewAll: () => void;
}

export const CategoryTable: React.FC<CategoryTableProps> = ({ currency, onViewAll }) => {
  const diningItems: DiningItem[] = [
    {
      id: 'din-1',
      merchant: 'Artisan Espresso Bar',
      tag: 'Coffee',
      tagColor: 'green',
      amount: 6.50,
      date: 'Today, 10:15 AM',
    },
    {
      id: 'din-2',
      merchant: 'Osteria Italian Bistro',
      tag: 'Dinner',
      tagColor: 'orange',
      amount: 38.00,
      date: 'Yesterday, 8:30 PM',
    },
    {
      id: 'din-3',
      merchant: 'Green Bowl Salad Co.',
      tag: 'Lunch',
      tagColor: 'blue',
      amount: 14.20,
      date: 'Jul 23, 1:10 PM',
    },
    {
      id: 'din-4',
      merchant: 'Sweet Tooth Bakery',
      tag: 'Snacks',
      tagColor: 'purple',
      amount: 8.75,
      date: 'Jul 22, 4:00 PM',
    },
  ];

  const getTagBadge = (tag: string, color: string) => {
    switch (color) {
      case 'green':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'orange':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'blue':
        return 'bg-sky-100 text-sky-800 border-sky-200';
      case 'purple':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-soft space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <Utensils className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Dining Out & Cafes</h3>
            <span className="text-xs text-slate-400">Food line item breakdown</span>
          </div>
        </div>

        <button
          onClick={onViewAll}
          className="text-xs font-bold text-forest-700 hover:text-forest-900 inline-flex items-center space-x-1"
        >
          <span>View All</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider font-semibold">
              <th className="py-2 pl-1">Merchant</th>
              <th className="py-2 px-2 text-center">Tag</th>
              <th className="py-2 pr-1 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {diningItems.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                <td className="py-2.5 pl-1">
                  <div className="font-bold text-slate-800">{item.merchant}</div>
                  <div className="text-[10px] text-slate-400">{item.date}</div>
                </td>
                <td className="py-2.5 px-2 text-center">
                  <span
                    className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border ${getTagBadge(
                      item.tag,
                      item.tagColor
                    )}`}
                  >
                    {item.tag}
                  </span>
                </td>
                <td className="py-2.5 pr-1 text-right font-mono font-bold text-rose-500">
                  -{formatCurrency(item.amount, currency)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
