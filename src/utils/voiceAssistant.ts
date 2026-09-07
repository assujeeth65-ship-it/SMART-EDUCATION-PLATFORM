import { VoiceGender } from '../types';

type VoiceCallbacks = {
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (message: string) => void;
};

class VoiceEngine {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private recognition: any = null;
  private isListeningActive = false;
  private realtime = false;
  private realtimeLang = 'en-IN';
  private realtimeResult?: (transcript: string) => void;
  private realtimeCallbacks: VoiceCallbacks = {};

  constructor() {
    if (typeof window !== 'undefined') {
      if ('speechSynthesis' in window) this.synth = window.speechSynthesis;
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        try {
          this.recognition = new SpeechRecognition();
          this.recognition.continuous = false;
          this.recognition.interimResults = true;
          this.recognition.maxAlternatives = 1;
        } catch (error) {
          console.warn('SpeechRecognition initialization error:', error);
        }
      }
    }
  }

  public speak(text: string, gender: VoiceGender = 'female', speechLang = 'en-IN', onStart?: () => void, onEnd?: () => void) {
    if (!text.trim()) return;
    if (!this.synth) {
      onEnd?.();
      return;
    }

    this.stop();
    const utterance = new SpeechSynthesisUtterance(text.replace(/[*_#`]/g, ''));
    this.currentUtterance = utterance;
    utterance.lang = speechLang;
    utterance.rate = gender === 'female' ? 1.0 : 0.98;
    utterance.pitch = gender === 'female' ? 1.08 : 0.95;

    const voices = this.synth.getVoices();
    const prefix = speechLang.toLowerCase().split('-')[0];
    const candidates = voices.filter(v => v.lang.toLowerCase().startsWith(prefix));
    const femaleNames = ['zira', 'samantha', 'heera', 'susan', 'karen', 'victoria', 'female', 'priya', 'veena'];
    const maleNames = ['david', 'ravi', 'mark', 'daniel', 'alex', 'prabhat', 'male'];
    const names = gender === 'female' ? femaleNames : maleNames;
    const preferred = candidates.find(v => names.some(n => v.name.toLowerCase().includes(n))) || candidates[0] || voices[0];
    if (preferred) utterance.voice = preferred;

    utterance.onstart = () => onStart?.();
    utterance.onend = () => { this.currentUtterance = null; onEnd?.(); };
    utterance.onerror = () => { this.currentUtterance = null; onEnd?.(); };
    this.synth.speak(utterance);
  }

  public stop() {
    if (this.synth) this.synth.cancel();
    this.currentUtterance = null;
  }

  public isSpeaking() { return !!this.synth?.speaking; }

  private configureRecognition(speechLang: string, result: (text: string) => void, callbacks: VoiceCallbacks, continuous = false) {
    if (!this.recognition) {
      callbacks.onError?.('Speech recognition is not available in this browser. Please use Chrome or Edge and allow microphone access.');
      callbacks.onEnd?.();
      return;
    }

    this.recognition.lang = speechLang;
    this.recognition.continuous = continuous;
    this.recognition.interimResults = true;
    this.recognition.onstart = () => { this.isListeningActive = true; callbacks.onStart?.(); };
    this.recognition.onresult = (event: any) => {
      let finalText = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const text = event.results[i][0]?.transcript || '';
        if (event.results[i].isFinal) finalText += text;
      }
      if (finalText.trim()) result(finalText.trim());
    };
    this.recognition.onerror = (event: any) => {
      const code = event?.error || 'unknown';
      const friendly: Record<string,string> = {
        'not-allowed': 'Microphone permission was denied. Allow microphone access in the browser address bar and try again.',
        'service-not-allowed': 'Speech recognition is blocked by the browser. Try Chrome or Edge.',
        'no-speech': 'I did not hear anything. Please speak again.',
        'audio-capture': 'No microphone was found. Check your microphone and try again.',
        'network': 'Speech recognition needs a network connection in this browser.',
      };
      this.isListeningActive = false;
      callbacks.onError?.(friendly[code] || `Speech recognition error: ${code}`);
      if (!this.realtime) callbacks.onEnd?.();
    };
    this.recognition.onend = () => {
      this.isListeningActive = false;
      if (this.realtime) {
        // The realtime loop is restarted by the app after the AI finishes speaking.
        return;
      }
      callbacks.onEnd?.();
    };

    try { this.recognition.start(); }
    catch (error: any) {
      this.isListeningActive = false;
      callbacks.onError?.(error?.message || 'Could not start microphone.');
      callbacks.onEnd?.();
    }
  }

  public listen(onResult: (transcript: string) => void, speechLang = 'en-IN', onStart?: () => void, onEnd?: () => void, onError?: (errorMsg: string) => void) {
    if (this.isListeningActive) { this.stopListening(); return; }
    this.realtime = false;
    this.configureRecognition(speechLang, onResult, { onStart, onEnd, onError }, false);
  }

  public startRealtime(onResult: (transcript: string) => void, speechLang = 'en-IN', onStart?: () => void, onError?: (message: string) => void) {
    if (!this.recognition) {
      onError?.('Live voice is not supported here. Please use Chrome or Edge and allow microphone access.');
      return;
    }
    this.realtime = true;
    this.realtimeLang = speechLang;
    this.realtimeResult = onResult;
    this.realtimeCallbacks = { onStart, onError };
    this.startRealtimeListening();
  }

  private startRealtimeListening() {
    if (!this.realtime || this.isListeningActive) return;
    this.configureRecognition(this.realtimeLang, (text) => this.realtimeResult?.(text), this.realtimeCallbacks, false);
  }

  public continueRealtimeListening() { this.startRealtimeListening(); }

  public stopRealtime() {
    this.realtime = false;
    this.realtimeResult = undefined;
    this.realtimeCallbacks = {};
    this.stopListening();
  }

  public stopListening() {
    if (this.recognition && this.isListeningActive) {
      try { this.recognition.stop(); } catch { /* ignore */ }
    }
    this.isListeningActive = false;
  }

  public isListening() { return this.isListeningActive; }
}

export const voiceEngine = new VoiceEngine();
