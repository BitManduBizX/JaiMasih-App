// Web Audio API based authentic melodic hymn synthesizer

class HymnAudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private currentTimeout: any = null;
  private onEndCallback: (() => void) | null = null;
  private onNoteCallback: ((noteIndex: number) => void) | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playMelody(
    frequencies: number[],
    onNote?: (noteIndex: number) => void,
    onComplete?: () => void,
    volume: number = 0.5
  ) {
    this.stop();
    this.initContext();
    if (!this.ctx || frequencies.length === 0) return;

    this.isPlaying = true;
    this.onEndCallback = onComplete || null;
    this.onNoteCallback = onNote || null;

    let index = 0;
    const noteDuration = 0.8; // seconds per note
    const now = this.ctx.currentTime;

    const playNext = () => {
      if (!this.isPlaying || !this.ctx) return;

      if (index >= frequencies.length) {
        this.isPlaying = false;
        if (this.onEndCallback) this.onEndCallback();
        return;
      }

      if (this.onNoteCallback) {
        this.onNoteCallback(index);
      }

      const freq = frequencies[index];
      this.playHarmonicNote(freq, noteDuration, volume);

      index++;
      this.currentTimeout = setTimeout(playNext, noteDuration * 1000);
    };

    playNext();
  }

  private playHarmonicNote(frequency: number, duration: number, volume: number) {
    if (!this.ctx) return;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();

    // Warm Organ/Harmonium tone
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(frequency, this.ctx.currentTime);

    // Subtle rich harmonic overtone
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(frequency * 1.5, this.ctx.currentTime);

    const now = this.ctx.currentTime;
    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.exponentialRampToValueAtTime(Math.max(0.01, volume * 0.4), now + 0.08);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(this.ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration);
    osc2.stop(now + duration);
  }

  public stop() {
    this.isPlaying = false;
    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout);
      this.currentTimeout = null;
    }
  }

  public getIsPlaying() {
    return this.isPlaying;
  }
}

export const hymnSynthesizer = new HymnAudioSynthesizer();
