import React from 'react';
import {
  Utensils,
  Film,
  BookOpen,
  Handshake,
  CreditCard,
  ShoppingBag,
  Zap,
  Tag,
} from 'lucide-react';
import { CategoryId } from '../../types/finance';
import { CATEGORY_THEMES } from '../../utils/colors';

interface CategoryIconProps {
  category: CategoryId;
  size?: number;
  className?: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({
  category,
  size = 20,
  className = '',
}) => {
  const theme = CATEGORY_THEMES[category] || CATEGORY_THEMES.other;

  const renderIcon = () => {
    switch (category) {
      case 'food':
        return <Utensils size={size} style={{ color: theme.text }} />;
      case 'movies':
        return <Film size={size} style={{ color: theme.text }} />;
      case 'novels':
        return <BookOpen size={size} style={{ color: theme.text }} />;
      case 'lending':
        return <Handshake size={size} style={{ color: theme.text }} />;
      case 'debt':
        return <CreditCard size={size} style={{ color: theme.text }} />;
      case 'shopping':
        return <ShoppingBag size={size} style={{ color: theme.text }} />;
      case 'utilities':
        return <Zap size={size} style={{ color: theme.text }} />;
      default:
        return <Tag size={size} style={{ color: theme.text }} />;
    }
  };

  return (
    <div
      className={`flex items-center justify-center rounded-full p-2.5 transition-transform active:scale-95 ${className}`}
      style={{ backgroundColor: theme.iconBg }}
    >
      {renderIcon()}
    </div>
  );
};
