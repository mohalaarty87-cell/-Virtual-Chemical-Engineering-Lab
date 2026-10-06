import React from 'react';
import {
  X,
  Award,
  Building2,
  GraduationCap,
  Volume2,
  Mail,
  Share2,
  CheckCircle2,
  BookOpen,
} from 'lucide-react';
import { narrator, sfx } from '../utils/audio';

interface AuthorModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'ar' | 'en';
}

export const AuthorModal: React.FC<AuthorModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  if (!isOpen) return null;

  const handlePlayVoice = () => {
    sfx.playClick();
    narrator.playIntro(lang);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-slate-900 border border-cyan-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Banner */}
        <div className="h-28 bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-700 relative p-4 flex items-end">
          <button
            onClick={() => {
              sfx.playClick();
              onClose();
            }}
            className="absolute top-3 end-3 p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Avatar & Title */}
        <div className="px-6 pb-6 pt-0 relative flex-1 text-sm">
          <div className="-mt-12 mb-3 flex items-end justify-between">
            <div className="w-24 h-24 rounded-2xl bg-slate-900 border-4 border-slate-900 shadow-xl flex items-center justify-center text-cyan-400 bg-gradient-to-tr from-cyan-950 to-slate-900">
              <Award className="w-12 h-12" />
            </div>

            <button
              onClick={handlePlayVoice}
              className="px-3.5 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <Volume2 className="w-4 h-4 text-cyan-400" />
              <span>{lang === 'ar' ? 'التعريف الصوتي' : 'Audio Intro'}</span>
            </button>
          </div>

          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <span>ENG. ALAA MOHAMMED</span>
            <CheckCircle2 className="w-5 h-5 text-cyan-400 inline" />
          </h2>
          <div className="text-xs text-cyan-300 font-medium mt-0.5">
            {lang === 'ar' ? 'المهندس علاء محمد' : 'Chemical Engineering Specialist'}
          </div>

          <div className="space-y-3 mt-4 text-slate-300 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <Building2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>
                {lang === 'ar'
                  ? 'قسم الهندسة الكيمياوية والصناعات النفطية'
                  : 'Dept. of Chemical Engineering & Petroleum Industries'}
              </span>
            </div>

            <div className="flex items-center gap-2.5 text-slate-300">
              <GraduationCap className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>
                {lang === 'ar'
                  ? 'جامعة البصرة - 2026'
                  : 'University of Basrah - 2026'}
              </span>
            </div>

            <div className="flex items-center gap-2.5 text-slate-300">
              <BookOpen className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                {lang === 'ar'
                  ? 'إعداد وإشراف 31 محاكياً تفاعلياً لمقرري تصميم المفاعلات وانتقال الكتلة'
                  : '31 Interactive 3D Simulations for Reactor Design & Mass Transfer'}
              </span>
            </div>
          </div>

          <div className="mt-5 p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs leading-relaxed text-slate-300">
            {lang === 'ar'
              ? 'مرحباً بكم في منصة المختبر الافتراضي للهندسة الكيمياوية. صُممت هذه المنصة لتوفير تجربة تعليمية وبحثية تفاعلية تمكّن الطلبة والمهندسين من اختبار النماذج الرياضية والحركية في بيئة محاكاة واقعية. جميع الحقوق الفكرية والصوتية والكتابية محفوظة.'
              : 'Welcome to the Virtual Chemical Engineering Laboratory platform. Developed to deliver an interactive educational and research experience enabling students and engineers to test kinetic and mathematical models in a realistic simulated environment. All intellectual, audio and written copyrights reserved.'}
          </div>

          <div className="mt-5 flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-800">
            <span className="font-mono">© 2026 ENG ALAA MOHAMMED</span>
            <button
              onClick={() => {
                sfx.playClick();
                onClose();
              }}
              className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition"
            >
              {lang === 'ar' ? 'إغلاق' : 'Close'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
