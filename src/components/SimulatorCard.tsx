import React from 'react';
import {
  ExternalLink,
  Volume2,
  Bookmark,
  Paperclip,
  Atom,
  Flame,
  Activity,
  Sliders,
  Eye,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import { SimulatorItem, SimulatorAttachment } from '../types';
import { sfx, narrator } from '../utils/audio';

interface SimulatorCardProps {
  simulator: SimulatorItem;
  index: number;
  lang: 'ar' | 'en';
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onOpenDetails: (sim: SimulatorItem) => void;
  attachments?: SimulatorAttachment[];
}

export const SimulatorCard: React.FC<SimulatorCardProps> = ({
  simulator,
  index,
  lang,
  isFavorite,
  onToggleFavorite,
  onOpenDetails,
  attachments = [],
}) => {
  const getCategoryIcon = () => {
    switch (simulator.category) {
      case 'reactor':
        return <Atom className="w-5 h-5 text-amber-300" />;
      case 'transfer':
        return <Flame className="w-5 h-5 text-cyan-300" />;
      case 'phenomena':
        return <Activity className="w-5 h-5 text-emerald-300" />;
      case 'control':
        return <Sliders className="w-5 h-5 text-fuchsia-300" />;
    }
  };

  const handleOpenSimulator = (e: React.MouseEvent) => {
    e.stopPropagation();
    sfx.playLaunch();
    narrator.speak(
      lang === 'ar' ? `جارٍ فتح ${simulator.title_ar}` : `Opening ${simulator.title_en}`,
      lang
    );
    setTimeout(() => {
      window.open(simulator.url, '_blank');
    }, 250);
  };

  const handleVoice = (e: React.MouseEvent) => {
    e.stopPropagation();
    sfx.playClick();
    const text =
      lang === 'ar'
        ? `${simulator.title_ar}. ${simulator.desc_ar}. إشراف المهندس علاء محمد.`
        : `${simulator.title_en}. ${simulator.desc_en}. Supervised by Engineer Alaa Mohammed.`;
    narrator.speak(text, lang);
  };

  const handleFav = (e: React.MouseEvent) => {
    e.stopPropagation();
    sfx.playClick();
    onToggleFavorite(simulator.id);
  };

  return (
    <div
      onClick={() => {
        sfx.playClick();
        onOpenDetails(simulator);
      }}
      className="group relative bg-slate-900/60 hover:bg-slate-900/90 backdrop-blur-xl border border-slate-800 hover:border-cyan-500/60 rounded-2xl p-5 cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_40px_rgba(0,212,255,0.18)] flex flex-col justify-between"
      style={{ animationDelay: `${(index % 8) * 0.05}s` }}
    >
      {/* Top Header */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-3.5">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/80 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
            {getCategoryIcon()}
          </div>

          <div className="flex items-center gap-1.5">
            {attachments.length > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-cyan-950/60 text-cyan-300 border border-cyan-800/60 flex items-center gap-1">
                <Paperclip className="w-2.5 h-2.5" />
                <span>{attachments.length}</span>
              </span>
            )}
            <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/25">
              3D
            </span>
            <button
              onClick={handleFav}
              className={`p-1.5 rounded-lg transition ${
                isFavorite
                  ? 'text-amber-400 bg-amber-400/10'
                  : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'
              }`}
              title={lang === 'ar' ? 'إضافة إلى المفضلة' : 'Favorite'}
            >
              <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Titles */}
        <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 mb-1">
          {lang === 'ar' ? simulator.title_ar : simulator.title_en}
        </h3>
        <p className="text-xs text-slate-400 italic font-tajawal mb-3 line-clamp-1">
          {lang === 'ar' ? simulator.title_en : simulator.title_ar}
        </p>

        {/* Description */}
        <p className="text-xs text-slate-300/80 leading-relaxed line-clamp-3 mb-4">
          {lang === 'ar' ? simulator.desc_ar : simulator.desc_en}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {simulator.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/70 text-slate-400 border border-slate-700/50"
            >
              {tag}
            </span>
          ))}
          {simulator.tags.length > 2 && (
            <span className="text-[10px] text-slate-500 font-mono self-center">
              +{simulator.tags.length - 2}
            </span>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-slate-800/70 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={handleOpenSimulator}
          className="text-xs font-bold text-cyan-400 group-hover:text-cyan-300 flex items-center gap-1.5 transition-all group-hover:gap-2.5 py-1"
        >
          <span>{lang === 'ar' ? 'فتح المحاكي' : 'Open Simulator'}</span>
          {lang === 'ar' ? (
            <ArrowLeft className="w-3.5 h-3.5" />
          ) : (
            <ArrowRight className="w-3.5 h-3.5" />
          )}
        </button>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleVoice}
            className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition"
            title={lang === 'ar' ? 'استمع للشرح' : 'Listen'}
          >
            <Volume2 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              sfx.playClick();
              onOpenDetails(simulator);
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title={lang === 'ar' ? 'معاينة النموذج' : 'Inspect'}
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
