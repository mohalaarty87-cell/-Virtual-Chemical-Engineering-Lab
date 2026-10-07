import React from 'react';
import { Volume2, Sparkles, Building2, GraduationCap } from 'lucide-react';
import { sfx, narrator } from '../utils/audio';

interface HeroProps {
  lang: 'ar' | 'en';
  totalSimulators: number;
}

export const Hero: React.FC<HeroProps> = ({ lang, totalSimulators }) => {
  const handlePlayVoiceIntro = () => {
    sfx.playClick();
    narrator.playIntro(lang);
  };

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8 text-center">
      {/* Supervised Banner Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-6 shadow-[0_0_20px_rgba(0,212,255,0.15)] animate-bounce duration-1000">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
        <span>
          {lang === 'ar'
            ? 'منصة تعليمية متقدمة | إشراف وإعداد Engineer Alaa Mohammed'
            : 'Advanced Virtual Lab | Supervised by Engineer Alaa Mohammed'}
        </span>
      </div>

      {/* Main Title */}
      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-4 bg-gradient-to-r from-white via-cyan-200 to-indigo-300 bg-clip-text text-transparent drop-shadow-sm font-cairo">
        {lang === 'ar'
          ? 'المختبر الافتراضي للهندسة الكيمياوية'
          : 'Virtual Chemical Engineering Laboratory'}
      </h1>

      {/* Institution Credits */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm text-slate-400 mb-4 font-tajawal">
        <span className="flex items-center gap-1.5">
          <Building2 className="w-4 h-4 text-cyan-400" />
          {lang === 'ar'
            ? 'قسم هندسة المواد'
            : 'Department of Materials Engineering'}
        </span>
        <span className="text-slate-600">·</span>
        <span className="flex items-center gap-1.5">
          <GraduationCap className="w-4 h-4 text-indigo-400" />
          {lang === 'ar' ? 'جامعة البصرة 2026' : 'University of Basrah 2026'}
        </span>
      </div>

      {/* Description */}
      <p className="max-w-3xl mx-auto text-sm sm:text-base text-slate-300 leading-relaxed mb-6 font-tajawal">
        {lang === 'ar'
          ? 'واحد وثلاثون محاكياً تفاعلياً ثلاثي الأبعاد لمقرري تصميم المفاعلات وانتقال الكتلة والسيطرة على العمليات الصناعية. استكشف، تعلّم، وجرّب في بيئة هندسية افتراضية متقدمة.'
          : 'Thirty-one interactive 3D simulators for Reactor Design, Mass Transfer, and Process Control courses. Explore, learn, and experiment in a cutting-edge virtual environment.'}
      </p>

      {/* Audio Intro Button */}
      <div className="flex justify-center mb-8">
        <button
          onClick={handlePlayVoiceIntro}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 hover:from-cyan-500/30 hover:to-indigo-500/30 border border-cyan-500/40 text-cyan-300 text-xs sm:text-sm font-semibold transition-all hover:scale-105 shadow-md shadow-cyan-500/10"
        >
          <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>
            {lang === 'ar'
              ? 'الاستماع إلى الترحيب والتعريف الصوتي (Engineer Alaa Mohammed)'
              : 'Listen to Voice Welcome by Engineer Alaa Mohammed'}
          </span>
        </button>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-4 transition hover:-translate-y-1">
          <div className="text-2xl sm:text-3xl font-black font-orbitron text-cyan-400">
            {totalSimulators}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            {lang === 'ar' ? 'محاكي تفاعلي' : 'Simulators'}
          </div>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 hover:border-indigo-500/40 rounded-2xl p-4 transition hover:-translate-y-1">
          <div className="text-2xl sm:text-3xl font-black font-orbitron text-indigo-400">
            4
          </div>
          <div className="text-xs text-slate-400 mt-1">
            {lang === 'ar' ? 'أقسام علمية' : 'Scientific Fields'}
          </div>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-4 transition hover:-translate-y-1">
          <div className="text-2xl sm:text-3xl font-black font-orbitron text-emerald-400">
            3D
          </div>
          <div className="text-xs text-slate-400 mt-1">
            {lang === 'ar' ? 'محاكاة ثلاثية الأبعاد' : '3D Simulations'}
          </div>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 hover:border-amber-500/40 rounded-2xl p-4 transition hover:-translate-y-1">
          <div className="text-2xl sm:text-3xl font-black font-orbitron text-amber-400">
            24/7
          </div>
          <div className="text-xs text-slate-400 mt-1">
            {lang === 'ar' ? 'متاح دائماً' : 'Always Available'}
          </div>
        </div>
      </div>
    </section>
  );
};
