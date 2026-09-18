import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Category,
  CategoryId,
  LedgerEntry,
  Transaction,
  UserProfile,
} from '../types/finance';
import {
  INITIAL_CATEGORIES,
  INITIAL_LEDGER,
  INITIAL_TRANSACTIONS,
  INITIAL_PROFILE,
} from '../data/mockData';
import { getInitials, getColorForName } from '../utils/formatters';

interface FinanceContextType {
  balance: number;
  balancePercentChange: number;
  categories: Category[];
  ledger: LedgerEntry[];
  transactions: Transaction[];
  profile: UserProfile;
  rewardPoints: number;
  toastMessage: string | null;
  
  // Actions
  addTransaction: (data: {
    amount: number;
    category: CategoryId;
    personName?: string;
    note?: string;
    date?: string;
    title?: string;
  }) => void;
  settleLedgerEntry: (id: string) => void;
  updateCategoryCap: (categoryId: CategoryId, newCap: number) => void;
  updateAllowance: (newAllowance: number) => void;
  addFunds: (amount: number, sourceName: string) => void;
  sendMoney: (amount: number, recipientName: string, category: CategoryId, note?: string) => void;
  redeemPoints: (pointsCost: number, rewardTitle: string) => boolean;
  resetAllData: () => void;
  showToast: (msg: string) => void;
  clearToast: () => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'walletwise_finance_data_v1';

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [balance, setBalance] = useState<number>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved).balance ?? 1845.50;
      } catch {
        return 1845.50;
      }
    }
    return 1845.50;
  });

  const [balancePercentChange] = useState<number>(4.2);

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved).categories ?? INITIAL_CATEGORIES;
      } catch {
        return INITIAL_CATEGORIES;
      }
    }
    return INITIAL_CATEGORIES;
  });

  const [ledger, setLedger] = useState<LedgerEntry[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved).ledger ?? INITIAL_LEDGER;
      } catch {
        return INITIAL_LEDGER;
      }
    }
    return INITIAL_LEDGER;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved).transactions ?? INITIAL_TRANSACTIONS;
      } catch {
        return INITIAL_TRANSACTIONS;
      }
    }
    return INITIAL_TRANSACTIONS;
  });

  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved).profile ?? INITIAL_PROFILE;
      } catch {
        return INITIAL_PROFILE;
      }
    }
    return INITIAL_PROFILE;
  });

  const [rewardPoints, setRewardPoints] = useState<number>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved).rewardPoints ?? 450;
      } catch {
        return 450;
      }
    }
    return 450;
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync state to local storage
  useEffect(() => {
    const stateToSave = {
      balance,
      categories,
      ledger,
      transactions,
      profile,
      rewardPoints,
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
  }, [balance, categories, ledger, transactions, profile, rewardPoints]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const clearToast = () => {
    setToastMessage(null);
  };

  const addTransaction = (data: {
    amount: number;
    category: CategoryId;
    personName?: string;
    note?: string;
    date?: string;
    title?: string;
  }) => {
    const { amount, category, personName, note, date, title } = data;
    const isLending = category === 'lending';
    const isDebt = category === 'debt';
    const transactionType = isLending ? 'lent' : isDebt ? 'debt' : 'expense';

    // 1. Calculate impact on balance
    // Expense or Lending money out reduces total available cash
    // Borrowed money (Debt) increases cash held or is an inflow/debt obligation
    let balanceDelta = 0;
    if (isLending || transactionType === 'expense') {
      balanceDelta = -amount;
    } else if (isDebt) {
      balanceDelta = amount; // borrowing money increases immediate cash balance
    }

    setBalance(prev => prev + balanceDelta);

    // 2. Update category spent amount if applicable
    if (!isLending && !isDebt) {
      setCategories(prev =>
        prev.map(cat => (cat.id === category ? { ...cat, spent: cat.spent + amount } : cat))
      );
    }

    // 3. Create Transaction item
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      title: title || personName || getCategoryTitle(category),
      category,
      subcategory: isLending ? 'Lent to friend' : isDebt ? 'Borrowed debt' : 'Expense',
      amount,
      type: transactionType,
      date: date || new Date().toISOString(),
      timestamp: 'Today, Just Now',
      personName,
      note,
    };

    setTransactions(prev => [newTx, ...prev]);

    // 4. Create Ledger item if Lending or Debt
    if ((isLending || isDebt) && personName) {
      const newLedger: LedgerEntry = {
        id: `led-${Date.now()}`,
        personName,
        personInitials: getInitials(personName),
        personColor: getColorForName(personName),
        note: note || (isLending ? 'Lent money' : 'Borrowed money'),
        type: isLending ? 'LENT' : 'DEBT',
        status: 'Pending',
        amount,
        date: date || new Date().toISOString(),
        createdAt: new Date().toISOString(),
      };
      setLedger(prev => [newLedger, ...prev]);
    }

    showToast(isLending ? `Lent $${amount.toFixed(2)} to ${personName}` : isDebt ? `Borrowed $${amount.toFixed(2)} from ${personName}` : `Added $${amount.toFixed(2)} transaction`);
  };

  const settleLedgerEntry = (id: string) => {
    setLedger(prev =>
      prev.map(entry => {
        if (entry.id === id) {
          const isLent = entry.type === 'LENT';
          // When a lent amount is settled, money is received back (+ balance)
          // When a debt amount is settled, money is paid back (- balance)
          if (entry.status === 'Pending') {
            setBalance(b => b + (isLent ? entry.amount : -entry.amount));
            showToast(`Marked ${entry.personName}'s ${entry.type.toLowerCase()} as Settled!`);
            return { ...entry, status: 'Settled' };
          }
        }
        return entry;
      })
    );
  };

  const updateCategoryCap = (categoryId: CategoryId, newCap: number) => {
    setCategories(prev =>
      prev.map(cat => (cat.id === categoryId ? { ...cat, cap: Math.max(1, newCap) } : cat))
    );
    showToast(`Updated cap for category!`);
  };

  const updateAllowance = (newAllowance: number) => {
    setProfile(prev => ({ ...prev, monthlyAllowance: newAllowance }));
    showToast(`Monthly allowance updated to $${newAllowance}`);
  };

  const addFunds = (amount: number, sourceName: string) => {
    setBalance(prev => prev + amount);
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      title: `Deposit: ${sourceName}`,
      category: 'other',
      subcategory: 'Allowance Top-Up',
      amount,
      type: 'income',
      date: new Date().toISOString(),
      timestamp: 'Today, Just Now',
      note: 'Added funds to allowance',
    };
    setTransactions(prev => [newTx, ...prev]);
    showToast(`Added $${amount.toFixed(2)} to Available Balance!`);
  };

  const sendMoney = (amount: number, recipientName: string, category: CategoryId, note?: string) => {
    if (amount > balance) {
      showToast(`Insufficient balance for this transfer.`);
      return;
    }
    addTransaction({
      amount,
      category,
      personName: recipientName,
      note: note || `Transfer to ${recipientName}`,
      title: `Sent to ${recipientName}`,
    });
  };

  const redeemPoints = (pointsCost: number, rewardTitle: string): boolean => {
    if (rewardPoints < pointsCost) {
      showToast(`Not enough points for ${rewardTitle}`);
      return false;
    }
    setRewardPoints(prev => prev - pointsCost);
    showToast(`Redeemed "${rewardTitle}" for ${pointsCost} pts!`);
    return true;
  };

  const resetAllData = () => {
    setBalance(1845.50);
    setCategories(INITIAL_CATEGORIES);
    setLedger(INITIAL_LEDGER);
    setTransactions(INITIAL_TRANSACTIONS);
    setProfile(INITIAL_PROFILE);
    setRewardPoints(450);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    showToast(`App data reset to default seed state.`);
  };

  return (
    <FinanceContext.Provider
      value={{
        balance,
        balancePercentChange,
        categories,
        ledger,
        transactions,
        profile,
        rewardPoints,
        toastMessage,
        addTransaction,
        settleLedgerEntry,
        updateCategoryCap,
        updateAllowance,
        addFunds,
        sendMoney,
        redeemPoints,
        resetAllData,
        showToast,
        clearToast,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};

function getCategoryTitle(catId: CategoryId): string {
  switch (catId) {
    case 'food': return 'Food & Dining';
    case 'movies': return 'Movies & Entertainment';
    case 'novels': return 'Novels & Books';
    case 'lending': return 'Money Lent';
    case 'debt': return 'Debt Incurred';
    case 'shopping': return 'Shopping';
    case 'utilities': return 'Utilities';
    default: return 'General Transaction';
  }
}
