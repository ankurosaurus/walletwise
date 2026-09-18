import { CategoryId } from '../types/finance';

export interface CategoryColorTheme {
  bg: string;
  text: string;
  iconBg: string;
  pillBg: string;
  pillText: string;
  progressColor: string;
}

export const CATEGORY_THEMES: Record<CategoryId, CategoryColorTheme> = {
  food: {
    bg: '#E6F6F0',
    text: '#0E5A3C',
    iconBg: '#D1FAE5',
    pillBg: '#ECFDF5',
    pillText: '#065F46',
    progressColor: '#10B981',
  },
  movies: {
    bg: '#F3E8FF',
    text: '#6B21A8',
    iconBg: '#E9D5FF',
    pillBg: '#FAF5FF',
    pillText: '#7E22CE',
    progressColor: '#A855F7',
  },
  novels: {
    bg: '#E0F2FE',
    text: '#0369A1',
    iconBg: '#BAE6FD',
    pillBg: '#F0F9FF',
    pillText: '#0284C7',
    progressColor: '#0284C7',
  },
  lending: {
    bg: '#DCFCE7',
    text: '#15803D',
    iconBg: '#BBF7D0',
    pillBg: '#F0FDF4',
    pillText: '#166534',
    progressColor: '#22C55E',
  },
  debt: {
    bg: '#FEE2E2',
    text: '#B91C1C',
    iconBg: '#FCA5A5',
    pillBg: '#FEF2F2',
    pillText: '#991B1B',
    progressColor: '#EF4444',
  },
  shopping: {
    bg: '#FCE7F3',
    text: '#BE185D',
    iconBg: '#FBCFE8',
    pillBg: '#FDF2F8',
    pillText: '#9D174D',
    progressColor: '#EC4899',
  },
  utilities: {
    bg: '#FEF3C7',
    text: '#B45309',
    iconBg: '#FDE68A',
    pillBg: '#FFFBEB',
    pillText: '#92400E',
    progressColor: '#F59E0B',
  },
  other: {
    bg: '#F3F4F6',
    text: '#374151',
    iconBg: '#E5E7EB',
    pillBg: '#F9FAFB',
    pillText: '#4B5563',
    progressColor: '#6B7280',
  },
};

export function getProgressBarColor(percent: number): string {
  if (percent >= 100) return 'bg-red-500';
  if (percent >= 80) return 'bg-amber-500';
  return 'bg-emerald-500';
}
