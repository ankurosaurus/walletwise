# WalletWise — Budget & Allowance Tracker

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-teal.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.1-purple.svg)](https://vitejs.dev/)

A modern, mobile-first personal finance web application built with **React**, **TypeScript**, and **Tailwind CSS**. Designed around a 390–430px mobile viewport, **WalletWise** simplifies allowance tracking, peer lending/borrowing ledgers, category-based spending caps, and automated financial insights.

---

## Key Features

- **Hero Balance Card**:
  - Live available allowance balance with tabular currency styling.
  - Percentage change trend indicator badge.
  - Quick deposit (**Add Funds**) and transfer (**Send**) actions.
- **Quick Summary Tiles**:
  - Peer lending summary (total lent out to friends).
  - Debt summary (total owed to peers) with one-tap deep navigation to pre-filtered ledgers.
- **Allowance Tracking & Cap Management**:
  - Category spending caps (Food, Movies, Novels, Shopping, Utilities).
  - Dynamic progress bars shifting color (emerald $\rightarrow$ amber $\rightarrow$ rose) as limits approach 100%.
  - Live cap editor modal for setting personal budgets.
- **Peer Financial Ledger**:
  - Real-time search by person name and memo details.
  - Filter chips: **All**, **Lending**, and **Debts**.
  - Metric cards: Total Lent, Total Debt, and Settled with target completion badges.
  - Interactive settlement drawer with "Mark as Settled" action.
- **Categories & Hobbies**:
  - **Novels & Books**: Budget progress and horizontal scroll gallery of recent purchases.
  - **Movies & Entertainment**: AMC monthly pass status and point redemption rewards.
  - **Dining Out & Cafes**: Tagged line-item breakdown with status pills.
  - **Smart Insights**: Auto-generated spending analysis and budget headroom metrics.
- **New Entry Flow (FAB)**:
  - Slide-up bottom sheet triggered by persistent floating action button.
  - Numeric stepper with quick increment presets.
  - Dynamic To/From person field for peer loans and debts.
- **Profile & Settings**:
  - Configurable monthly allowance baseline.
  - Notification preferences and spending threshold alerts.
  - One-tap prototype reset for restoring seed datasets.

---

## Tech Stack

- **Framework**: React 18
- **Language**: TypeScript 5.7
- **Styling**: Tailwind CSS 3.4
- **Routing**: React Router DOM 6.28
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Build Tool**: Vite 6.1
- **Persistence**: HTML5 LocalStorage with state synchronization

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ankurosaurus/walletwise.git
   cd walletwise
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

---

## Project Structure

```text
walletwise/
├── src/
│   ├── components/
│   │   ├── categories/   # Category spending and hobby cards
│   │   ├── common/       # BottomNav, FAB, CategoryIcon, Toast
│   │   ├── home/         # BalanceCard, SummaryTile, AllowanceTracker
│   │   ├── ledger/       # LedgerItem, LedgerFilter, LedgerDetailModal
│   │   ├── modals/       # NewEntrySheet, ManageCapsModal, AddFundsModal
│   │   └── profile/      # Profile settings and cap config
│   ├── context/          # Central FinanceContext and persistence layer
│   ├── data/             # Initial mock data and seeds
│   ├── types/            # TypeScript domain interfaces
│   ├── utils/            # Formatters and color palettes
│   ├── views/            # Top-level view containers
│   ├── App.tsx           # Router and mobile frame layout
│   └── main.tsx          # Application entry point
├── index.html
├── tailwind.config.js
├── vite.config.ts
└── tsconfig.json
```

---

## License

This project is licensed under the [MIT License](LICENSE).
