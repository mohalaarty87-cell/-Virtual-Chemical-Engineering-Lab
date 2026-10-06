import React, { useEffect, useState } from 'react';
import { Play, Pause, Square, Volume2 } from 'lucide-react';
import { narrator, sfx } from '../utils/audio';

interface AudioBarProps {
  lang: 'ar' | 'en';
}

export const AudioBar: React.FC<AudioBarProps> = ({ lang }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentText, setCurrentText] = useState<string>('');

  useEffect(() => {
    const cleanup = narrator.addListener({
      onStart: (text) => {
        setIsPlaying(true);
        setCurrentText(text);
      },
      onEnd: () => {
        setIsPlaying(false);
        setCurrentText('');
      },
      onError: () => {
        setIsPlaying(false);
        setCurrentText('');
      },
    });

    return cleanup;
  }, []);

  if (!isPlaying && !currentText) return null;

  const handleToggle = () => {
    sfx.playClick();
    const paused = narrator.togglePause();
    setIsPlaying(!paused);
  };

  const handleStop = () => {
    sfx.playClick();
    narrator.stop();
    setIsPlaying(false);
    setCurrentText('');
  };

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 max-w-xl w-[92%] sm:w-auto bg-slate-900/90 backdrop-blur-2xl border border-cyan-500/40 rounded-full py-2 px-5 shadow-[0_10px_40px_rgba(0,0,0,0.6)] flex items-center justify-between gap-4 animate-slideUp">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 animate-pulse">
          <Volume2 className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <div className="text-xs font-bold text-white truncate max-w-[200px] sm:max-w-xs">
            {currentText || (lang === 'ar' ? 'شرح صوتي مفعّل' : 'Audio Narration Active')}
          </div>
          <div className="text-[10px] text-cyan-400 font-mono">
            ENG ALAA MOHAMMED · Virtual Lab
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={handleToggle}
          className="w-8 h-8 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black flex items-center justify-center transition shadow-md shadow-cyan-500/20"
          title={isPlaying ? 'إيقاف مؤقت' : 'متابعة'}
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ms-0.5" />}
        </button>

        <button
          onClick={handleStop}
          className="w-8 h-8 rounded-full bg-rose-500/80 hover:bg-rose-500 text-white flex items-center justify-center transition"
          title="إيقاف"
        >
          <Square className="w-3.5 h-3.5 fill-current" />
        </button>
      </div>
    </div>
  );
};
