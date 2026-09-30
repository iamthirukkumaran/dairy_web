'use client';

import { useEffect, useRef, useState } from 'react';
import { Container } from '@/components/ui/Container';
import { asset } from '@/lib/utils';

type VoiceSample = {
  id: string;
  tabLabel: string;
  location: string;
  date: string;
  time: string;
  durationSeconds: number;
  tags: string[];
  image: string;
  transcript: string;
};

const samples: VoiceSample[] = [
  {
    id: 'walk',
    tabLabel: 'Evening Walk',
    location: 'Bangalore, India',
    date: 'Wednesday · August 26',
    time: '7:42 PM',
    durationSeconds: 16,
    tags: ['Quiet Moments', 'Evening Walk', 'Growth'],
    image: '/images/memory-sunset.jpg',
    transcript:
      'I took the long route home through the rain tree avenue tonight. The air was cool and smelled of wet earth. I realized how rare it is to just let your mind wander without reaching for a phone or rushing to be anywhere. Today was quiet, and that was more than enough.',
  },
  {
    id: 'ooty',
    tabLabel: 'Rain in Ooty',
    location: 'Nilgiris, Tamil Nadu',
    date: 'Saturday · December 14',
    time: '8:15 AM',
    durationSeconds: 14,
    tags: ['Ooty', 'Priya', 'Travel'],
    image: '/images/place.jpg',
    transcript:
      'We woke up to heavy mist rolling over the hills. Priya made cardamom tea while the morning rain drummed softly on the roof. We didn’t talk about work or schedules—we just sat by the window and listened to the valley breathe.',
  },
  {
    id: 'friend',
    tabLabel: 'Coffee with Dev',
    location: 'Indiranagar, Bangalore',
    date: 'Sunday · September 20',
    time: '11:30 AM',
    durationSeconds: 15,
    tags: ['Friendship', 'Dev', 'Memories'],
    image: '/images/people.jpg',
    transcript:
      'Met Dev after nearly two years. It is extraordinary how within five minutes of sitting down, you pick up right where you left off years ago. The world changes fast, but some friendships never lose their cadence.',
  },
];

export function VoiceToDiary() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [charCount, setCharCount] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const sample = samples[selectedIdx];
  const words = sample.transcript.split(' ');
  const totalChars = sample.transcript.length;

  // Typing timer simulation
  useEffect(() => {
    setCharCount(0);
    setSeconds(0);
    setIsPlaying(true);
  }, [selectedIdx]);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCharCount((prev) => {
        if (prev >= totalChars) {
          return totalChars;
        }
        // Advance characters with natural typing cadence
        return Math.min(totalChars, prev + 3);
      });
    }, 60);

    return () => clearInterval(interval);
  }, [isPlaying, totalChars]);

  // Audio recording second ticker
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev >= sample.durationSeconds) {
          return sample.durationSeconds;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, sample.durationSeconds]);

  const isComplete = charCount >= totalChars;
  const currentText = sample.transcript.slice(0, charCount);

  const togglePlay = () => {
    if (isComplete) {
      setCharCount(0);
      setSeconds(0);
      setIsPlaying(true);
    } else {
      setIsPlaying((v) => !v);
    }
  };

  return (
    <section aria-label="Voice to Diary Writing Animation" className="section-b bg-ivory">
      <Container>
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-clay/20 bg-cream/80 px-3.5 py-1 text-[11px] font-semibold tracking-wide2 uppercase text-clay backdrop-blur-sm shadow-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-clay animate-pulse" />
            Live Experience
          </div>
          <h2 className="display mt-3 text-[clamp(2.1rem,5vw,3rem)] text-ink">
            Speak your day.
            <br />
            <span className="italic font-normal text-clay">Watch it become your journal.</span>
          </h2>
          <p className="mt-4 text-[16px] leading-[1.75] text-ink-soft">
            Just speak the way you would to an old friend. Aura converts your audio directly into a private handwritten-style journal page, preserving your raw voice alongside the text.
          </p>

          {/* Sample Selectors */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {samples.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSelectedIdx(idx)}
                className={`transition-all rounded-pill px-4 py-2 text-[13px] font-medium ${
                  selectedIdx === idx
                    ? 'bg-ink text-ivory shadow-soft'
                    : 'bg-paper border border-line text-ink-soft hover:border-clay/50 hover:text-ink'
                }`}
              >
                🎙 {s.tabLabel}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Experience Grid */}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-10 items-start">
          {/* Left: Live Audio Recording Studio Deck */}
          <div className="card border border-line bg-paper p-6 sm:p-8 shadow-card flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-line pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-3 w-3">
                    {isPlaying && !isComplete && (
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-clay opacity-75" />
                    )}
                    <span className={`relative inline-flex rounded-full h-3 w-3 ${isComplete ? 'bg-sage' : 'bg-clay'}`} />
                  </span>
                  <span className="text-[12px] font-semibold uppercase tracking-wider text-ink">
                    {isComplete ? 'Voice Note Preserved' : isPlaying ? 'Recording Spoken Voice' : 'Recording Paused'}
                  </span>
                </div>
                <span className="text-[12px] font-mono tabular-nums text-ink-faint">
                  00:{seconds < 10 ? `0${seconds}` : seconds} / 00:{sample.durationSeconds}
                </span>
              </div>

              {/* Central Mic Visualizer */}
              <div className="my-8 flex flex-col items-center justify-center">
                <div className="relative flex items-center justify-center">
                  {isPlaying && !isComplete && (
                    <div className="absolute h-24 w-24 rounded-full border-2 border-clay/30 pulse-ring-active" />
                  )}
                  <button
                    type="button"
                    onClick={togglePlay}
                    aria-label={isPlaying ? 'Pause voice simulation' : 'Play voice simulation'}
                    className="transition-ui group relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-clay text-ivory shadow-lift hover:scale-105 active:scale-95"
                  >
                    {isPlaying && !isComplete ? (
                      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="currentColor" aria-hidden="true">
                        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2H3v2a9 9 0 0 0 8 8.94V23h2v-2.06A9 9 0 0 0 21 12v-2h-2Z" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" className="h-8 w-8 ml-1" fill="currentColor" aria-hidden="true">
                        <path d="M8 5.14v14l11-7-11-7Z" />
                      </svg>
                    )}
                  </button>
                </div>

                <p className="mt-4 text-[13px] font-medium text-ink">
                  {isComplete
                    ? 'Transcription finished. Click to replay.'
                    : isPlaying
                    ? 'Speaking your reflections...'
                    : 'Paused. Click to resume dictation.'}
                </p>

                {/* Animated Waveform Frequencies */}
                <div className="mt-5 flex items-center gap-1 sm:gap-1.5 h-10 px-4">
                  {[4, 12, 20, 16, 26, 14, 8, 22, 18, 10, 28, 14, 22, 10, 18, 24, 12, 6, 20, 14].map(
                    (baseHeight, i) => (
                      <span
                        key={i}
                        className={`w-1 rounded-full transition-all duration-150 ${
                          isPlaying && !isComplete ? 'bg-clay' : 'bg-line'
                        }`}
                        style={{
                          height: isPlaying && !isComplete ? `${Math.max(6, (baseHeight * (i % 3 + 1)) % 32)}px` : '6px',
                          animationDelay: `${i * 70}ms`,
                        }}
                      />
                    ),
                  )}
                </div>
              </div>

              {/* Technical Trust Bar */}
              <div className="rounded-card border border-line bg-ivory/70 p-4 text-[12.5px] leading-relaxed text-ink-soft space-y-2">
                <div className="flex items-center gap-2 text-ink font-medium">
                  <span className="text-clay">✦</span>
                  <span>Deterministic Voice-to-Text</span>
                </div>
                <p>
                  Zero generative rewrite models. Transcribed word-for-word in your unique speech cadence, stored with AES-256 encryption.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-line flex items-center justify-between text-[12px] text-ink-faint">
              <span>Location: {sample.location}</span>
              <button
                type="button"
                onClick={togglePlay}
                className="text-clay font-medium hover:underline underline-offset-4"
              >
                {isComplete ? 'Replay Audio Note' : isPlaying ? 'Pause' : 'Resume'}
              </button>
            </div>
          </div>

          {/* Right: The Tactile Handwritten Journal Notebook */}
          <div className="card relative overflow-hidden border border-line bg-paper shadow-lift">
            {/* Notebook Header Bar */}
            <div className="flex items-center justify-between border-b border-line bg-cream/50 px-6 py-3.5">
              <div className="flex items-center gap-2 text-[12px] text-ink font-medium">
                <span className="h-2 w-2 rounded-full bg-clay" />
                <span>Personal Journal</span>
                <span className="text-line">/</span>
                <span className="text-ink-faint">{sample.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-ink-faint">{sample.time}</span>
                <span className="rounded-pill bg-paper border border-line px-2 py-0.5 text-[10px] font-semibold text-clay">
                  PAGE 142
                </span>
              </div>
            </div>

            {/* Notebook Lined Paper Body */}
            <div className="lined-paper p-6 sm:p-8 min-h-[360px] relative">
              {/* Red Margin Hairline */}
              <div className="absolute left-10 sm:left-14 top-0 bottom-0 w-px bg-clay/20 pointer-events-none" />

              <div className="pl-6 sm:pl-10">
                <h3 className="font-serif text-[22px] sm:text-[24px] font-medium text-ink tracking-tight mb-2">
                  {sample.tabLabel}
                </h3>

                <p className="font-serif text-[16px] sm:text-[17px] text-ink leading-[32px] whitespace-pre-line">
                  {currentText}
                  {!isComplete && isPlaying && (
                    <span className="inline-block w-2 h-5 ml-1 bg-clay align-middle cursor-caret" />
                  )}
                </p>

                {/* Attached Photo preview once words progress past 50% */}
                {charCount > totalChars * 0.4 && (
                  <div className="mt-6 flex items-start gap-4 transition-all duration-700 animate-fadeIn">
                    <div className="relative overflow-hidden rounded-lg border-2 border-paper shadow-card max-w-[140px] shrink-0 rotate-[-2deg]">
                      <img
                        src={asset(sample.image)}
                        alt={sample.tabLabel}
                        className="aspect-[4/3] w-full object-cover"
                        width={280}
                        height={210}
                      />
                    </div>
                    <div className="pt-2">
                      <span className="text-[11px] font-semibold tracking-wider uppercase text-clay block">
                        Photo Attached
                      </span>
                      <span className="text-[12px] text-ink-faint block mt-0.5">{sample.location}</span>
                    </div>
                  </div>
                )}

                {/* Tags row */}
                <div className="mt-8 flex flex-wrap gap-2 pt-2">
                  {sample.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-pill border border-line bg-paper/90 px-3 py-1 text-[11px] font-medium text-ink-soft shadow-soft"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Notebook Bottom Status Footer */}
            <div className="flex items-center justify-between border-t border-line bg-ivory px-6 py-3 text-[12px]">
              <span className="flex items-center gap-1.5 text-ink-soft">
                <svg viewBox="0 0 20 20" className="h-4 w-4 text-clay" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z" clipRule="evenodd" />
                </svg>
                <span>Encrypted & Private</span>
              </span>
              <span className="text-clay font-medium">
                {isComplete ? '✓ Stored in Keepsake Vault' : 'Streaming voice to paper...'}
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
