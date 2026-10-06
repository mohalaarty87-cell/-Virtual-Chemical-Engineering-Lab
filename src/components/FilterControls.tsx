import React from 'react';
import {
  Search,
  X,
  Layers,
  Atom,
  Flame,
  Activity,
  Sliders,
  Bookmark,
} from 'lucide-react';
import { CategoryType } from '../types';
import { sfx } from '../utils/audio';

interface FilterControlsProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  activeFilter: CategoryType | 'all' | 'favorites';
  onFilterChange: (filter: CategoryType | 'all' | 'favorites') => void;
  lang: 'ar' | 'en';
  categoryCounts: Record<CategoryType, number>;
  totalCount: number;
  favoritesCount: number;
}

export const FilterControls: React.FC<FilterControlsProps> = ({
  searchTerm,
  onSearchChange,
  activeFilter,
  onFilterChange,
  lang,
  categoryCounts,
  totalCount,
  favoritesCount,
}) => {
  const filters: {
    id: CategoryType | 'all' | 'favorites';
    name_ar: string;
    name_en: string;
    count: number;
    icon: React.ReactNode;
  }[] = [
    {
      id: 'all',
      name_ar: 'الكل',
      name_en: 'All',
      count: totalCount,
      icon: <Layers className="w-3.5 h-3.5" />,
    },
    {
      id: 'reactor',
      name_ar: 'المفاعلات',
      name_en: 'Reactors',
      count: categoryCounts.reactor,
      icon: <Atom className="w-3.5 h-3.5" />,
    },
    {
      id: 'transfer',
      name_ar: 'انتقال الكتلة والحرارة',
      name_en: 'Mass & Heat',
      count: categoryCounts.transfer,
      icon: <Flame className="w-3.5 h-3.5" />,
    },
    {
      id: 'phenomena',
      name_ar: 'ظواهر الانتقال',
      name_en: 'Phenomena',
      count: categoryCounts.phenomena,
      icon: <Activity className="w-3.5 h-3.5" />,
    },
    {
      id: 'control',
      name_ar: 'السيطرة',
      name_en: 'Control',
      count: categoryCounts.control,
      icon: <Sliders className="w-3.5 h-3.5" />,
    },
    {
      id: 'favorites',
      name_ar: 'المفضلة',
      name_en: 'Favorites',
      count: favoritesCount,
      icon: <Bookmark className="w-3.5 h-3.5 text-amber-400" />,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-4">
      {/* Search Bar */}
      <div className="max-w-xl mx-auto relative">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={
              lang === 'ar'
                ? 'ابحث باسم المحاكي، المعادلة، أو المفهوم العلمي...'
                : 'Search simulator by name, equation, or keyword...'
            }
            className="w-full bg-slate-900/80 backdrop-blur-xl border border-slate-700/80 rounded-2xl py-3 px-11 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition shadow-inner"
          />
          <Search className="w-4 h-4 text-cyan-400 absolute top-3.5 start-4 pointer-events-none" />

          {searchTerm && (
            <button
              onClick={() => {
                sfx.playClick();
                onSearchChange('');
              }}
              className="absolute top-3 end-3 p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs / Segmented Controls */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap">
        {filters.map((f) => {
          const isActive = activeFilter === f.id;
          return (
            <button
              key={f.id}
              onClick={() => {
                sfx.playClick();
                onFilterChange(f.id);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-[0_0_20px_rgba(0,212,255,0.3)] scale-105'
                  : 'bg-slate-900/70 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              {f.icon}
              <span>{lang === 'ar' ? f.name_ar : f.name_en}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isActive ? 'bg-black/30 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {f.count}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
