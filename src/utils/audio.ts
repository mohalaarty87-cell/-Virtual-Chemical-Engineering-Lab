// Audio utility for scientific sound effects & speech synthesis

class SoundFX {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  playClick() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {
      // AudioContext may be blocked before gesture
    }
  }

  playLaunch() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(960, this.ctx.currentTime + 0.22);

      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.25);
    } catch {}
  }

  playBeep() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch {}
  }
}

export const sfx = new SoundFX();

export interface VoiceNarratorListener {
  onStart?: (text: string) => void;
  onEnd?: () => void;
  onError?: () => void;
}

class VoiceNarrator {
  private activeUtterance: SpeechSynthesisUtterance | null = null;
  public enabled: boolean = true;
  private listeners: VoiceNarratorListener[] = [];
  public currentText: string = '';
  public isPaused: boolean = false;

  addListener(listener: VoiceNarratorListener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  speak(text: string, lang: 'ar' | 'en' = 'ar', rate: number = 0.95) {
    if (!this.enabled || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    this.stop();
    this.currentText = text;
    this.isPaused = false;

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = lang === 'ar' ? 'ar-SA' : 'en-US';
    utter.rate = rate;
    utter.pitch = 1.0;

    // Pick suitable voice if available
    const voices = window.speechSynthesis.getVoices();
    const prefix = lang === 'ar' ? 'ar' : 'en';
    const match = voices.find((v) => v.lang.toLowerCase().startsWith(prefix));
    if (match) {
      utter.voice = match;
    }

    utter.onstart = () => {
      this.listeners.forEach((l) => l.onStart?.(text));
    };

    utter.onend = () => {
      this.currentText = '';
      this.isPaused = false;
      this.activeUtterance = null;
      this.listeners.forEach((l) => l.onEnd?.());
    };

    utter.onerror = () => {
      this.currentText = '';
      this.isPaused = false;
      this.activeUtterance = null;
      this.listeners.forEach((l) => l.onError?.());
    };

    this.activeUtterance = utter;
    window.speechSynthesis.speak(utter);
  }

  togglePause(): boolean {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false;
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      this.isPaused = false;
      return false; // Not paused now
    } else if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      this.isPaused = true;
      return true; // Is paused now
    }
    return false;
  }

  stop() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.currentText = '';
    this.isPaused = false;
    this.activeUtterance = null;
    this.listeners.forEach((l) => l.onEnd?.());
  }

  playIntro(lang: 'ar' | 'en' = 'ar') {
    const text =
      lang === 'ar'
        ? 'مرحباً بكم في المختبر الافتراضي للهندسة الكيمياوية. إشراف وإعداد المهندس علاء محمد، قسم الهندسة الكيمياوية والصناعات النفطية، كلية العمارة الجامعة. استكشفوا واحداً وثلاثين محاكياً تفاعلياً.'
        : 'Welcome to the Virtual Chemical Engineering Laboratory, supervised and developed by Engineer Alaa Mohammed, Department of Chemical Engineering and Petroleum Industries, Al-Amara University College.';
    this.speak(text, lang, 0.95);
  }
}

export const narrator = new VoiceNarrator();
