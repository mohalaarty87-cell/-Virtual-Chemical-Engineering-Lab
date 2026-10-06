import React from 'react';
import {
  X,
  ExternalLink,
  Volume2,
  Bookmark,
  Share2,
  Paperclip,
  Check,
  Cpu,
  Layers,
  Atom,
  Flame,
  Activity,
  Sliders,
} from 'lucide-react';
import { SimulatorItem, SimulatorAttachment } from '../types';
import { InteractiveSimCanvas } from './InteractiveSimCanvas';
import { sfx, narrator } from '../utils/audio';

interface SimulatorModalProps {
  simulator: SimulatorItem | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  lang: 'ar' | 'en';
  attachments: SimulatorAttachment[];
  onOpenResourceManager: () => void;
}

export const SimulatorModal: React.FC<SimulatorModalProps> = ({
  simulator,
  onClose,
  isFavorite,
  onToggleFavorite,
  lang,
  attachments,
  onOpenResourceManager,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!simulator) return null;

  const handleLaunch = () => {
    sfx.playLaunch();
    narrator.speak(
      lang === 'ar' ? `جارٍ فتح ${simulator.title_ar}` : `Opening ${simulator.title_en}`,
      lang
    );
    window.open(simulator.url, '_blank');
  };

  const handleNarrate = () => {
    sfx.playClick();
    const textToRead =
      lang === 'ar'
        ? `${simulator.title_ar}. ${simulator.desc_ar}. إشراف المهندس علاء محمد.`
        : `${simulator.title_en}. ${simulator.desc_en}. Supervised by Engineer Alaa Mohammed.`;
    narrator.speak(textToRead, lang);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(simulator.url);
    sfx.playBeep();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-slate-900/95 border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Bar */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
              {simulator.category === 'reactor' ? (
                <Atom className="w-5 h-5" />
              ) : simulator.category === 'transfer' ? (
                <Flame className="w-5 h-5" />
              ) : simulator.category === 'phenomena' ? (
                <Activity className="w-5 h-5" />
              ) : (
                <Sliders className="w-5 h-5" />
              )}
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                {lang === 'ar' ? simulator.title_ar : simulator.title_en}
              </h2>
              <div className="text-xs text-slate-400 font-mono">
                {lang === 'ar' ? simulator.title_en : simulator.title_ar}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => {
                sfx.playClick();
                onToggleFavorite(simulator.id);
              }}
              className={`p-2 rounded-lg transition ${
                isFavorite
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
              title={lang === 'ar' ? 'المفضلة' : 'Favorite'}
            >
              <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={handleNarrate}
              className="p-2 rounded-lg bg-slate-800 text-cyan-400 hover:bg-slate-700 transition"
              title={lang === 'ar' ? 'استمع للشرح الصوتي' : 'Voice Narration'}
            >
              <Volume2 className="w-4 h-4" />
            </button>

            <button
              onClick={handleCopy}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
              title={lang === 'ar' ? 'نسخ الرابط' : 'Copy Link'}
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>

            <button
              onClick={() => {
                sfx.playClick();
                onClose();
              }}
              className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition ms-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          {/* Main Description */}
          <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-4">
            <h3 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">
              {lang === 'ar' ? 'الوصف العلمي ونطاق التجربة' : 'Scientific Scope & Description'}
            </h3>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              {lang === 'ar' ? simulator.desc_ar : simulator.desc_en}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-slate-700/40 text-xs">
              {simulator.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md bg-slate-800 text-cyan-300 border border-slate-700 font-mono text-[11px]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Live Interactive 2D/3D Diagram */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                {lang === 'ar' ? 'نموذج المحاكاة التفاعلية المباشرة' : 'Live Interactive Dynamic Model'}
              </h3>
              <span className="text-[11px] text-slate-400">
                {lang === 'ar' ? 'تفاعل مع المتغيرات أدناه' : 'Interact with parameters below'}
              </span>
            </div>
            <InteractiveSimCanvas
              category={simulator.category}
              simulatorId={simulator.id}
              title={lang === 'ar' ? simulator.title_ar : simulator.title_en}
            />
          </div>

          {/* Governing Equation */}
          {simulator.equation && (
            <div className="bg-gradient-to-r from-slate-900 to-indigo-950/40 border border-cyan-500/20 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-cyan-300 font-mono flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  {lang === 'ar' ? 'المعادلة الحاكمة (Governing Equation)' : 'Governing Equation'}
                </span>
              </div>
              <div className="p-3 bg-black/50 rounded-lg text-center font-mono text-cyan-200 text-sm sm:text-base border border-slate-800 overflow-x-auto">
                {simulator.equation}
              </div>
              <p className="text-xs text-slate-400 mt-2">
                {lang === 'ar'
                  ? simulator.equationDescription_ar
                  : simulator.equationDescription_en}
              </p>
            </div>
          )}

          {/* Key Parameters Table */}
          {simulator.keyParameters && simulator.keyParameters.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">
                {lang === 'ar' ? 'المتغيرات الهندسية الأساسية' : 'Key Engineering Parameters'}
              </h3>
              <div className="overflow-x-auto border border-slate-800 rounded-xl">
                <table className="w-full text-xs text-start">
                  <thead className="bg-slate-800/80 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="py-2.5 px-3 text-start">
                        {lang === 'ar' ? 'المتغير' : 'Parameter'}
                      </th>
                      <th className="py-2.5 px-3 text-start">
                        {lang === 'ar' ? 'الوحدة' : 'Unit'}
                      </th>
                      <th className="py-2.5 px-3 text-start">
                        {lang === 'ar' ? 'النطاق النموذجي' : 'Typical Range'}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {simulator.keyParameters.map((p, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/30">
                        <td className="py-2.5 px-3 font-medium text-white">
                          {lang === 'ar' ? p.name_ar : p.name_en}
                        </td>
                        <td className="py-2.5 px-3 font-mono text-cyan-400">{p.unit || '-'}</td>
                        <td className="py-2.5 px-3 font-mono text-slate-400">{p.typicalRange || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Attached User Files & Custom Resources */}
          <div className="p-4 bg-slate-800/30 border border-slate-700/50 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold text-white flex items-center gap-2">
                <Paperclip className="w-4 h-4 text-cyan-400" />
                <span>
                  {lang === 'ar' ? 'الملفات والمرفقات المرتبطة' : 'Linked Resources & Files'} (
                  {attachments.length})
                </span>
              </h3>
              <button
                onClick={() => {
                  sfx.playClick();
                  onOpenResourceManager();
                }}
                className="text-xs text-cyan-400 hover:text-cyan-300 underline font-medium flex items-center gap-1"
              >
                <span>{lang === 'ar' ? '+ إضافة ملفات أو روابط' : '+ Attach More Files'}</span>
              </button>
            </div>

            {attachments.length === 0 ? (
              <p className="text-xs text-slate-400">
                {lang === 'ar'
                  ? 'لم يتم ربط ملفات إضافية بهذا المحاكي حتى الآن. اضغط أعلاه لربط تقارير أو حسابات.'
                  : 'No extra files attached yet. Click above to attach reports or links.'}
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {attachments.map((att) => (
                  <div
                    key={att.id}
                    className="p-2.5 bg-slate-900/60 border border-slate-700/60 rounded-lg flex items-center justify-between gap-2 text-xs"
                  >
                    <div className="min-w-0">
                      <div className="font-semibold text-white truncate">{att.name}</div>
                      <div className="text-[10px] text-slate-400">
                        {att.type.toUpperCase()} · {att.addedAt}
                      </div>
                    </div>
                    {att.url && (
                      <a
                        href={att.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2 py-1 rounded bg-slate-800 text-cyan-400 hover:bg-slate-700"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal Actions Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/80 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <span className="font-semibold text-cyan-400">ENG ALAA MOHAMMED</span>
            <span>·</span>
            <span>جامعة البصرة 2026</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sfx.playClick();
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
            >
              {lang === 'ar' ? 'إغلاق' : 'Close'}
            </button>

            <button
              onClick={handleLaunch}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/25 transition hover:scale-105"
            >
              <span>{lang === 'ar' ? 'تشغيل المحاكي الكامل (3D)' : 'Launch 3D Simulator'}</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
