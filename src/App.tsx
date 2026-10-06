import React, { useState, useEffect, useMemo } from 'react';
import {
  ArrowUp,
  Atom,
  Flame,
  Activity,
  Sliders,
  Search,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { INITIAL_SIMULATORS, CATEGORIES_META } from './data/simulators';
import { SimulatorItem, CategoryType, SimulatorAttachment } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FilterControls } from './components/FilterControls';
import { SimulatorCard } from './components/SimulatorCard';
import { SimulatorModal } from './components/SimulatorModal';
import { ResourceManagerModal } from './components/ResourceManagerModal';
import { AuthorModal } from './components/AuthorModal';
import { AudioBar } from './components/AudioBar';
import { Footer } from './components/Footer';
import { narrator, sfx } from './utils/audio';

export default function App() {
  const [lang, setLang] = useState<'ar' | 'en'>(() => {
    return (localStorage.getItem('chem_lab_lang') as 'ar' | 'en') || 'ar';
  });

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('chem_lab_theme') as 'dark' | 'light') || 'dark';
  });

  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(() => {
    const val = localStorage.getItem('chem_lab_voice');
    return val !== null ? val === 'true' : true;
  });

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<CategoryType | 'all' | 'favorites'>('all');

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('chem_lab_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [attachmentsMap, setAttachmentsMap] = useState<Record<string, SimulatorAttachment[]>>(() => {
    try {
      const saved = localStorage.getItem('chem_lab_custom_attachments');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [selectedSimulator, setSelectedSimulator] = useState<SimulatorItem | null>(null);
  const [isResourceManagerOpen, setIsResourceManagerOpen] = useState<boolean>(false);
  const [isAuthorModalOpen, setIsAuthorModalOpen] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  // Sync theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'light') {
      document.body.classList.remove('bg-[#0a0e27]', 'text-white');
      document.body.classList.add('bg-[#f0f4ff]', 'text-slate-900');
    } else {
      document.body.classList.remove('bg-[#f0f4ff]', 'text-slate-900');
      document.body.classList.add('bg-[#0a0e27]', 'text-white');
    }
    localStorage.setItem('chem_lab_theme', theme);
  }, [theme]);

  // Sync lang & dir
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('chem_lab_lang', lang);
  }, [lang]);

  // Sync voice
  useEffect(() => {
    narrator.enabled = voiceEnabled;
    sfx.enabled = voiceEnabled;
    localStorage.setItem('chem_lab_voice', String(voiceEnabled));
    if (!voiceEnabled) {
      narrator.stop();
    }
  }, [voiceEnabled]);

  // Sync favorites
  useEffect(() => {
    localStorage.setItem('chem_lab_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Sync attachments
  useEffect(() => {
    localStorage.setItem('chem_lab_custom_attachments', JSON.stringify(attachmentsMap));
  }, [attachmentsMap]);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleToggleLang = () => {
    const nextLang = lang === 'ar' ? 'en' : 'ar';
    setLang(nextLang);
    if (voiceEnabled) {
      narrator.speak(
        nextLang === 'ar' ? 'تم التبديل إلى اللغة العربية' : 'Switched to English',
        nextLang
      );
    }
  };

  const handleToggleVoice = () => {
    setVoiceEnabled((prev) => !prev);
  };

  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddAttachment = (simulatorId: string, attachment: SimulatorAttachment) => {
    setAttachmentsMap((prev) => ({
      ...prev,
      [simulatorId]: [...(prev[simulatorId] || []), attachment],
    }));
  };

  const handleDeleteAttachment = (simulatorId: string, attachmentId: string) => {
    setAttachmentsMap((prev) => ({
      ...prev,
      [simulatorId]: (prev[simulatorId] || []).filter((a) => a.id !== attachmentId),
    }));
  };

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<CategoryType, number> = {
      reactor: 0,
      transfer: 0,
      phenomena: 0,
      control: 0,
    };
    INITIAL_SIMULATORS.forEach((sim) => {
      counts[sim.category] = (counts[sim.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filtered simulators
  const filteredSimulators = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return INITIAL_SIMULATORS.filter((sim) => {
      // Category filter
      if (activeFilter === 'favorites') {
        if (!favorites.includes(sim.id)) return false;
      } else if (activeFilter !== 'all') {
        if (sim.category !== activeFilter) return false;
      }

      // Search filter
      if (!q) return true;
      const matchAr = sim.title_ar.toLowerCase().includes(q) || sim.desc_ar.toLowerCase().includes(q);
      const matchEn = sim.title_en.toLowerCase().includes(q) || sim.desc_en.toLowerCase().includes(q);
      const matchTag = sim.tags.some((t) => t.toLowerCase().includes(q));
      const matchEq = sim.equation?.toLowerCase().includes(q);
      return matchAr || matchEn || matchTag || matchEq;
    });
  }, [searchTerm, activeFilter, favorites]);

  // Categories present in filtered list
  const activeCategories = useMemo(() => {
    const order: CategoryType[] = ['reactor', 'transfer', 'phenomena', 'control'];
    if (activeFilter !== 'all' && activeFilter !== 'favorites') {
      return [activeFilter];
    }
    return order.filter((cat) =>
      filteredSimulators.some((sim) => sim.category === cat)
    );
  }, [activeFilter, filteredSimulators]);

  const getCategoryHeaderIcon = (category: CategoryType) => {
    switch (category) {
      case 'reactor':
        return <Atom className="w-6 h-6 text-amber-400" />;
      case 'transfer':
        return <Flame className="w-6 h-6 text-cyan-400" />;
      case 'phenomena':
        return <Activity className="w-6 h-6 text-emerald-400" />;
      case 'control':
        return <Sliders className="w-6 h-6 text-fuchsia-400" />;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col font-cairo">
      {/* Background Animated Gradient */}
      <div className="fixed inset-0 -z-20 bg-gradient-to-br from-[#0a0e27] via-[#101642] to-[#070a1e] pointer-events-none transition-colors"></div>

      {/* Grid Pattern */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 212, 255, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.15) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      ></div>

      {/* Header */}
      <Header
        theme={theme}
        onToggleTheme={handleToggleTheme}
        voiceEnabled={voiceEnabled}
        onToggleVoice={handleToggleVoice}
        lang={lang}
        onToggleLang={handleToggleLang}
        favoritesCount={favorites.length}
        onOpenFavorites={() => setActiveFilter('favorites')}
        onOpenResourceManager={() => setIsResourceManagerOpen(true)}
        onOpenAuthorInfo={() => setIsAuthorModalOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero lang={lang} totalSimulators={INITIAL_SIMULATORS.length} />

        {/* Filter and Search Bar */}
        <FilterControls
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          lang={lang}
          categoryCounts={categoryCounts}
          totalCount={INITIAL_SIMULATORS.length}
          favoritesCount={favorites.length}
        />

        {/* Simulator Groups by Category */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-14">
          {activeCategories.length === 0 ? (
            <div className="text-center py-20 px-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto mb-4 text-slate-500">
                <Search className="w-8 h-8 opacity-40" />
              </div>
              <h3 className="text-lg font-bold text-slate-300">
                {lang === 'ar' ? 'لا توجد نتائج مطابقة' : 'No matching simulators found'}
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                {lang === 'ar'
                  ? 'جرب البحث بكلمات أخرى أو اختر قسماً علمياً مختلفاً.'
                  : 'Try searching with different terms or selecting another category.'}
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setActiveFilter('all');
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition"
              >
                {lang === 'ar' ? 'إعادة ضبط عوامل التصفية' : 'Reset Filters'}
              </button>
            </div>
          ) : (
            activeCategories.map((catKey) => {
              const meta = CATEGORIES_META[catKey];
              const categorySims = filteredSimulators.filter(
                (sim) => sim.category === catKey
              );

              if (categorySims.length === 0) return null;

              return (
                <section key={catKey} className="space-y-6">
                  {/* Category Header */}
                  <div className="flex items-center gap-3.5 pb-4 border-b border-slate-800/80 relative">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center shadow-lg shadow-black/40 shrink-0">
                      {getCategoryHeaderIcon(catKey)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl sm:text-2xl font-black text-white">
                          {lang === 'ar' ? meta.title_ar : meta.title_en}
                        </h2>
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-slate-800 text-cyan-400 border border-slate-700">
                          {categorySims.length}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-400 mt-0.5 truncate font-tajawal">
                        {lang === 'ar' ? meta.subtitle_ar : meta.subtitle_en}
                      </p>
                    </div>

                    {/* Gradient accent line */}
                    <div className="absolute bottom-0 start-0 w-28 h-0.5 bg-gradient-to-r from-cyan-400 to-indigo-500"></div>
                  </div>

                  {/* Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {categorySims.map((sim, index) => (
                      <SimulatorCard
                        key={sim.id}
                        simulator={sim}
                        index={index}
                        lang={lang}
                        isFavorite={favorites.includes(sim.id)}
                        onToggleFavorite={handleToggleFavorite}
                        onOpenDetails={setSelectedSimulator}
                        attachments={attachmentsMap[sim.id] || []}
                      />
                    ))}
                  </div>
                </section>
              );
            })
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer lang={lang} onOpenAuthorInfo={() => setIsAuthorModalOpen(true)} />

      {/* Floating Audio Player */}
      <AudioBar lang={lang} />

      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={() => {
            sfx.playClick();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="fixed bottom-6 end-6 z-40 w-11 h-11 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white flex items-center justify-center shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all hover:scale-110"
          title={lang === 'ar' ? 'إلى الأعلى' : 'Scroll to Top'}
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Simulator Inspection Modal */}
      <SimulatorModal
        simulator={selectedSimulator}
        onClose={() => setSelectedSimulator(null)}
        isFavorite={selectedSimulator ? favorites.includes(selectedSimulator.id) : false}
        onToggleFavorite={handleToggleFavorite}
        lang={lang}
        attachments={selectedSimulator ? attachmentsMap[selectedSimulator.id] || [] : []}
        onOpenResourceManager={() => setIsResourceManagerOpen(true)}
      />

      {/* Custom Resource & File Attachment Manager */}
      <ResourceManagerModal
        isOpen={isResourceManagerOpen}
        onClose={() => setIsResourceManagerOpen(false)}
        simulators={INITIAL_SIMULATORS}
        attachmentsMap={attachmentsMap}
        onAddAttachment={handleAddAttachment}
        onDeleteAttachment={handleDeleteAttachment}
        lang={lang}
      />

      {/* Author & Credits Modal for ENG ALAA MOHAMMED */}
      <AuthorModal
        isOpen={isAuthorModalOpen}
        onClose={() => setIsAuthorModalOpen(false)}
        lang={lang}
      />
    </div>
  );
}
