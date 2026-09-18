export type TransactionType = 'expense' | 'income' | 'lent' | 'debt';

export type CategoryId = 'food' | 'movies' | 'novels' | 'lending' | 'debt' | 'shopping' | 'utilities' | 'other';

export interface Category {
  id: CategoryId;
  name: string;
  icon: string;
  colorTint: string;
  bgTint: string;
  cap: number;
  spent: number;
}

export type LedgerStatus = 'Pending' | 'Settled';
export type LedgerType = 'LENT' | 'DEBT';

export interface LedgerEntry {
  id: string;
  personName: string;
  personInitials: string;
  personColor: string;
  note: string;
  type: LedgerType;
  status: LedgerStatus;
  amount: number;
  date: string; // ISO or formatted date
  createdAt: string;
}

export interface Transaction {
  id: string;
  title: string;
  category: CategoryId;
  subcategory?: string;
  amount: number;
  type: TransactionType;
  date: string;
  timestamp: string;
  personName?: string;
  note?: string;
  coverImage?: string;
  itemPrice?: number;
}

export interface UserProfile {
  name: string;
  avatar: string;
  email: string;
  monthlyAllowance: number;
  currency: string;
  notificationsEnabled: boolean;
  theme: 'light' | 'dark' | 'system';
}

export interface CategoryPurchase {
  id: string;
  title: string;
  category: CategoryId;
  price: number;
  date: string;
  coverImage?: string;
  typeLabel?: string;
}
