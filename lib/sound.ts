'use client';

type Cue = 'tap' | 'page' | 'paper' | 'bloom';

/**
 * Tiny synthesised sound kit — no audio files, no autoplay, nothing before a
 * user gesture. Sound is OFF until the visitor turns it on, and the choice is
 * remembered. Every cue is a short shaped noise or tone; there is no music.
 */
class SoundKit {
  private ctx: AudioContext | null = null;
  private enabled = false;
  private listeners = new Set<(on: boolean) => void>();
  private noise: AudioBuffer | null = null;

  init() {
    if (typeof window === 'undefined') return;
    try {
      this.enabled = window.localStorage.getItem('aura-sound') === 'on';
    } catch {
      this.enabled = false;
    }
    this.emit();
  }

  isEnabled() {
    return this.enabled;
  }

  subscribe(fn: (on: boolean) => void) {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  }

  private emit() {
    this.listeners.forEach((fn) => fn(this.enabled));
  }

  toggle() {
    this.enabled = !this.enabled;
    try {
      window.localStorage.setItem('aura-sound', this.enabled ? 'on' : 'off');
    } catch {
      /* storage can be blocked; the session still works */
    }
    if (this.enabled) {
      // Created inside the click handler, which is what browsers require.
      this.context();
      this.play('tap');
    }
    this.emit();
  }

  private context(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return null;
      this.ctx = new Ctor();
    }
    if (this.ctx.state === 'suspended') void this.ctx.resume();
    return this.ctx;
  }

  private noiseBuffer(ctx: AudioContext) {
    if (this.noise) return this.noise;
    const length = ctx.sampleRate * 0.5;
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i += 1) data[i] = Math.random() * 2 - 1;
    this.noise = buffer;
    return buffer;
  }

  play(cue: Cue) {
    if (!this.enabled) return;
    const ctx = this.context();
    if (!ctx) return;

    const now = ctx.currentTime;
    const gain = ctx.createGain();
    gain.connect(ctx.destination);

    if (cue === 'tap' || cue === 'bloom') {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(cue === 'tap' ? 620 : 880, now);
      osc.frequency.exponentialRampToValueAtTime(cue === 'tap' ? 380 : 1240, now + 0.09);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.05, now + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
      osc.connect(gain);
      osc.start(now);
      osc.stop(now + 0.24);
      return;
    }

    // Page turn / paper rustle: band-passed noise with a quick swell.
    const src = ctx.createBufferSource();
    src.buffer = this.noiseBuffer(ctx);
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(cue === 'page' ? 1400 : 2600, now);
    filter.frequency.exponentialRampToValueAtTime(cue === 'page' ? 620 : 1500, now + 0.3);
    filter.Q.value = 0.7;
    const dur = cue === 'page' ? 0.34 : 0.2;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(cue === 'page' ? 0.055 : 0.03, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);
    src.connect(filter).connect(gain);
    src.start(now);
    src.stop(now + dur + 0.05);
  }
}

export const sound = new SoundKit();
