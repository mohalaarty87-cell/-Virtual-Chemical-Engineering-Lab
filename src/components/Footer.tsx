import React from 'react';
import { Mail, GraduationCap, Building2, ExternalLink } from 'lucide-react';
import { sfx } from '../utils/audio';

interface FooterProps {
  lang: 'ar' | 'en';
  onOpenAuthorInfo: () => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onOpenAuthorInfo }) => {
  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-xl py-12 px-4 sm:px-6 lg:px-8 text-center transition-colors">
      <div className="max-w-7xl mx-auto space-y-5">
        {/* Brand */}
        <div className="text-xl sm:text-2xl font-black font-orbitron bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
          VIRTUAL CHEM LAB
        </div>

        {/* Written Copyright - User Request: ENG ALAA MOHAMMED */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-slate-300 font-medium">
          <span>{lang === 'ar' ? 'جميع الحقوق محفوظة' : 'All Rights Reserved'}</span>
          <span>© 2026</span>
          <span className="text-slate-600">|</span>
          <button
            onClick={() => {
              sfx.playClick();
              onOpenAuthorInfo();
            }}
            className="font-bold text-cyan-400 hover:text-cyan-300 hover:underline transition"
          >
            ENG. ALAA MOHAMMED
          </button>
        </div>

        {/* Department & University */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400 font-tajawal">
          <Building2 className="w-3.5 h-3.5 text-cyan-400 inline" />
          <span>
            {lang === 'ar'
              ? 'قسم الهندسة الكيمياوية والصناعات النفطية - جامعة البصرة'
              : 'Chemical Engineering & Petroleum Industries Dept. - University of Basrah'}
          </span>
        </div>

        {/* Browser Note */}
        <p className="max-w-2xl mx-auto text-xs text-slate-500 leading-relaxed font-tajawal">
          {lang === 'ar'
            ? 'كل محاكٍ يعمل في المتصفح باللغتين العربية والإنكليزية، ويحتاج اتصالاً بالإنترنت عند أول تحميل. يُفضَّل استخدام متصفح Microsoft Edge أو Google Chrome لسماع الشرح الصوتي باللغة العربية بوضوح.'
            : 'Each simulator runs directly in the browser in Arabic and English, requiring an internet connection on first load. Microsoft Edge or Google Chrome is recommended for clear speech narration.'}
        </p>

        {/* Social / Links */}
        <div className="flex items-center justify-center gap-3 pt-3">
          <button
            onClick={() => {
              sfx.playClick();
              onOpenAuthorInfo();
            }}
            className="w-9 h-9 rounded-full bg-slate-900 border border-slate-700/80 hover:border-cyan-400 hover:text-cyan-400 text-slate-400 flex items-center justify-center transition hover:-translate-y-1"
            title="Author Info"
          >
            <GraduationCap className="w-4 h-4" />
          </button>
          <a
            href="mailto:contact@virtualchemlab.edu"
            className="w-9 h-9 rounded-full bg-slate-900 border border-slate-700/80 hover:border-cyan-400 hover:text-cyan-400 text-slate-400 flex items-center justify-center transition hover:-translate-y-1"
            title="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
};
