import React, { useState } from 'react';
import {
  User,
  Bell,
  DollarSign,
  Sliders,
  RotateCcw,
  ShieldCheck,
  ChevronRight,
  LogOut,
} from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';

interface ProfileViewProps {
  onOpenManageCaps: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ onOpenManageCaps }) => {
  const { profile, updateAllowance, resetAllData, showToast } = useFinance();
  const [isEditingAllowance, setIsEditingAllowance] = useState(false);
  const [allowanceInput, setAllowanceInput] = useState(profile.monthlyAllowance.toString());

  const handleSaveAllowance = () => {
    const val = parseFloat(allowanceInput);
    if (val > 0) {
      updateAllowance(val);
      setIsEditingAllowance(false);
    }
  };

  return (
    <div className="space-y-5 pb-24">
      {/* Header Profile Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-soft text-center relative overflow-hidden">
        <div className="w-20 h-20 rounded-full mx-auto overflow-hidden border-2 border-forest-600 shadow-md">
          <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
        </div>

        <h2 className="text-xl font-bold text-slate-900 mt-3">{profile.name}</h2>
        <p className="text-xs text-slate-400 font-medium">{profile.email}</p>

        <div className="mt-4 inline-flex items-center space-x-1 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>WalletWise Premium Member</span>
        </div>
      </div>

      {/* Allowance Settings */}
      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-soft space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Allowance & Financial Settings
        </h3>

        {/* Monthly Allowance Row */}
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-forest-100 text-forest-800 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800">Monthly Allowance</h4>
              <span className="text-xs text-slate-400 font-mono">
                {profile.currency}{profile.monthlyAllowance.toLocaleString()} / month
              </span>
            </div>
          </div>

          {isEditingAllowance ? (
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={allowanceInput}
                onChange={(e) => setAllowanceInput(e.target.value)}
                className="w-20 px-2 py-1 bg-white border border-slate-300 rounded-lg text-xs font-mono font-bold text-slate-900 focus:outline-none"
              />
              <button
                onClick={handleSaveAllowance}
                className="px-2.5 py-1 bg-forest-800 text-white rounded-lg text-xs font-bold"
              >
                Save
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditingAllowance(true)}
              className="text-xs font-bold text-forest-700 hover:text-forest-900 bg-white border border-slate-200 px-3 py-1.5 rounded-xl hover:bg-slate-50 transition-colors"
            >
              Edit
            </button>
          )}
        </div>

        {/* Manage Category Caps Button */}
        <button
          onClick={onOpenManageCaps}
          className="w-full flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-slate-100/70 transition-colors text-left"
        >
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800">Category Spending Caps</h4>
              <span className="text-xs text-slate-400">Configure monthly limits for Food, Movies, etc.</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      {/* Preferences & System */}
      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-soft space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Preferences</h3>

        {/* Notifications toggle */}
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800">Spending Alerts</h4>
              <span className="text-xs text-slate-400">Get notified when reaching 80% of cap</span>
            </div>
          </div>
          <div className="w-11 h-6 bg-forest-700 rounded-full p-1 cursor-pointer">
            <div className="w-4 h-4 bg-white rounded-full translate-x-5 transition-transform" />
          </div>
        </div>

        {/* Reset App Seed Data */}
        <button
          onClick={() => {
            if (window.confirm('Reset all transactions and ledger back to default seed data?')) {
              resetAllData();
            }
          }}
          className="w-full flex items-center justify-between p-3 bg-rose-50/70 rounded-2xl border border-rose-100 hover:bg-rose-100/70 transition-colors text-left"
        >
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-rose-900">Reset Prototype Data</h4>
              <span className="text-xs text-rose-700/80">Restore initial seed transactions & ledger</span>
            </div>
          </div>
        </button>

        {/* Logout Mock Button */}
        <button
          onClick={() => showToast('Logged out of session (Mock action)')}
          className="w-full flex items-center justify-center space-x-2 p-3 rounded-2xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-xs transition-colors mt-2"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};
