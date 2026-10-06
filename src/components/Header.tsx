import React from 'react';
import {
  FlaskConical,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Languages,
  Upload,
  Bookmark,
  Award,
} from 'lucide-react';
import { sfx, narrator } from '../utils/audio';

interface HeaderProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  voiceEnabled: boolean;
  onToggleVoice: () => void;
  lang: 'ar' | 'en';
  onToggleLang: () => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
  onOpenResourceManager: () => void;
  onOpenAuthorInfo: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  onToggleTheme,
  voiceEnabled,
  onToggleVoice,
  lang,
  onToggleLang,
  favoritesCount,
  onOpenFavorites,
  onOpenResourceManager,
  onOpenAuthorInfo,
}) => {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-2xl bg-slate-950/80 border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4 flex-wrap">
        {/* Brand Logo */}
        <div
          onClick={() => {
            sfx.playClick();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(0,212,255,0.4)] group-hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] group-hover:scale-105 transition-all">
            <FlaskConical className="w-6 h-6 animate-pulse" />
          </div>

          <div>
            <div className="text-base sm:text-lg font-black tracking-wide font-orbitron bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              {lang === 'ar' ? 'المختبر الافتراضي' : 'VIRTUAL CHEM LAB'}
            </div>
            <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
              <span>{lang === 'ar' ? 'للهندسة الكيمياوية' : 'Chemical Engineering'}</span>
              <span className="text-cyan-500/80">·</span>
              <span className="text-cyan-400/90 font-mono">ENG ALAA MOHAMMED</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          {/* Author Badge Modal Button */}
          <button
            onClick={() => {
              sfx.playClick();
              onOpenAuthorInfo();
            }}
            className="px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold flex items-center gap-1.5 transition hover:-translate-y-0.5"
            title={lang === 'ar' ? 'معلومات المشرف' : 'Author & Credits'}
          >
            <Award className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-mono hidden sm:inline">ENG ALAA MOHAMMED</span>
            <span className="font-mono sm:hidden">ENG ALAA</span>
          </button>

          {/* Attachments / Resource Manager */}
          <button
            onClick={() => {
              sfx.playClick();
              onOpenResourceManager();
            }}
            className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 text-xs font-medium flex items-center gap-1.5 transition hover:-translate-y-0.5"
            title={lang === 'ar' ? 'مركز المرفقات والملفات' : 'Resource Hub'}
          >
            <Upload className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline">
              {lang === 'ar' ? 'ربط المرفقات' : 'Attachments'}
            </span>
          </button>

          {/* Bookmarks */}
          <button
            onClick={() => {
              sfx.playClick();
              onOpenFavorites();
            }}
            className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 text-xs font-medium flex items-center gap-1.5 transition hover:-translate-y-0.5"
            title={lang === 'ar' ? 'المفضلة' : 'Favorites'}
          >
            <Bookmark className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">
              {lang === 'ar' ? 'المفضلة' : 'Saved'}
            </span>
            <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono">
              {favoritesCount}
            </span>
          </button>

          {/* Audio Voice Narration Toggle */}
          <button
            onClick={() => {
              sfx.playClick();
              onToggleVoice();
            }}
            className={`p-2 rounded-xl text-xs font-medium transition border flex items-center gap-1.5 ${
              voiceEnabled
                ? 'bg-slate-900 text-cyan-400 border-cyan-500/30 shadow-[0_0_15px_rgba(0,212,255,0.15)]'
                : 'bg-slate-900/60 text-slate-500 border-slate-800 hover:text-slate-300'
            }`}
            title={lang === 'ar' ? 'التعليق الصوتي' : 'Voice Narration'}
          >
            {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => {
              sfx.playClick();
              onToggleTheme();
            }}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 transition"
            title={lang === 'ar' ? 'تبديل المظهر' : 'Toggle Theme'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-400" />
            )}
          </button>

          {/* Language Toggle */}
          <button
            onClick={() => {
              sfx.playClick();
              onToggleLang();
            }}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20 transition hover:-translate-y-0.5"
            title={lang === 'ar' ? 'English' : 'العربية'}
          >
            <Languages className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
