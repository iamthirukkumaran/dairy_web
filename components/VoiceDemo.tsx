'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, type MotionValue } from 'motion/react';
import { PhoneMockup, PhoneStatusBar } from '@/components/PhoneMockup';
import { VoiceWave } from '@/components/VoiceWave';
import { useCalmMotion } from '@/animations/useCalmMotion';
import { transcript, entry } from '@/data/voice';
import { sound } from '@/lib/sound';
import { cn } from '@/lib/utils';

export type VoicePhase = 'home' | 'listening' | 'writing' | 'diary' | 'memory';

const ORDER: VoicePhase[] = ['home', 'listening', 'writing', 'diary', 'memory'];

/** How long each state holds before the demo moves on, in ms. */
const DWELL: Record<VoicePhase, number> = {
  home: 1900,
  listening: transcript.length * 132 + 1000,
  writing: 2600,
  diary: 5200,
  memory: 4200,
};

export const voiceSteps = [
  { key: 'home', label: 'Tap to talk', detail: 'One button. No blank page waiting for you.' },
  { key: 'listening', label: 'Aura listens', detail: 'Ramble, backtrack, trail off. It follows.' },
  { key: 'writing', label: 'Aura writes', detail: 'The filler falls away. What you meant stays.' },
  { key: 'diary', label: 'Your diary', detail: 'Titled, dated, and already saved.' },
  { key: 'memory', label: 'Your memory', detail: 'Filed with everything else you have lived.' },
] as const;

/**
 * The signature product moment: a spoken ramble physically reorganising
 * itself into a written entry. The words on screen during `listening` are the
 * same DOM nodes that reflow during `writing` — the filler is popped out of
 * layout and the rest slides into place, so nothing is faked with a crossfade.
 */
export function VoiceDemo({
  onPhaseChange,
  className,
  depth,
}: {
  onPhaseChange?: (phase: VoicePhase) => void;
  className?: string;
  depth?: { x: MotionValue<number>; y: MotionValue<number> };
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.45 });
  const { enabled } = useCalmMotion();
  const [phase, setPhase] = useState<VoicePhase>('home');
  const [spoken, setSpoken] = useState(0);
  const [pressed, setPressed] = useState(false);

  useEffect(() => onPhaseChange?.(phase), [phase, onPhaseChange]);

  // Advance only while on screen, so an off-screen demo costs nothing.
  useEffect(() => {
    if (!inView || !enabled) return;
    const id = window.setTimeout(() => {
      setPhase((p) => ORDER[(ORDER.indexOf(p) + 1) % ORDER.length]);
    }, DWELL[phase]);
    return () => window.clearTimeout(id);
  }, [phase, inView, enabled]);

  // Sound cues, only if the visitor turned sound on.
  useEffect(() => {
    if (phase === 'writing') sound.play('paper');
    if (phase === 'memory') sound.play('bloom');
  }, [phase]);

  // Words arrive as they are spoken.
  useEffect(() => {
    if (phase !== 'listening') {
      setSpoken(phase === 'home' ? 0 : transcript.length);
      return;
    }
    if (!enabled) {
      setSpoken(transcript.length);
      return;
    }
    setSpoken(0);
    const id = window.setInterval(() => {
      setSpoken((c) => (c >= transcript.length ? c : c + 1));
    }, 132);
    return () => window.clearInterval(id);
  }, [phase, enabled]);

  const start = useCallback(() => {
    sound.play('tap');
    setPhase('listening');
  }, []);

  return (
    <div ref={ref} className={cn('relative', className)}>
      <PhoneMockup width={312} float={false} depth={depth} tilt={0.7}>
        <div className="flex h-full flex-col bg-gradient-to-b from-paper to-[#F4F6EF]">
          <PhoneStatusBar />

          <AnimatePresence mode="wait">
            {phase === 'home' ? (
              <HomeScreen
                key="home"
                onStart={start}
                pressed={pressed}
                setPressed={setPressed}
              />
            ) : phase === 'memory' ? (
              <MemoryScreen key="memory" onReplay={start} />
            ) : (
              <WritingScreen key="writing" phase={phase} spoken={spoken} inView={inView} />
            )}
          </AnimatePresence>
        </div>
      </PhoneMockup>
    </div>
  );
}

const screenMotion = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
};

/* ------------------------------------------------------------------- home */

function HomeScreen({
  onStart,
  pressed,
  setPressed,
}: {
  onStart: () => void;
  pressed: boolean;
  setPressed: (v: boolean) => void;
}) {
  const { enabled } = useCalmMotion();

  return (
    <motion.div
      {...screenMotion}
      className="flex h-full flex-col items-center justify-center px-8 text-center"
    >
      <p className="font-sans text-[10px] font-semibold uppercase tracking-wide2 text-ink-faint">
        Wednesday, 26 August
      </p>
      <p className="mt-3 font-serif text-[22px] leading-snug tracking-editorial text-ink">
        How was today?
      </p>

      <motion.button
        type="button"
        onClick={onStart}
        onPointerDown={() => setPressed(true)}
        onPointerUp={() => setPressed(false)}
        onPointerLeave={() => setPressed(false)}
        data-cursor="cta"
        className="relative mt-9 flex h-[92px] w-[92px] items-center justify-center rounded-full"
        animate={{ scale: pressed ? 0.94 : 1 }}
        transition={{ type: 'spring', stiffness: 460, damping: 26 }}
      >
        {enabled ? (
          <motion.span
            className="absolute inset-0 rounded-full bg-sage/40"
            animate={{ scale: [1, 1.38, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeOut' }}
          />
        ) : null}
        <motion.span
          className="relative flex items-center justify-center rounded-full bg-ink text-ivory"
          animate={{
            width: pressed ? 66 : 72,
            height: pressed ? 66 : 72,
            boxShadow: pressed
              ? '0 2px 6px rgba(42,37,33,0.3)'
              : '0 14px 30px -12px rgba(42,37,33,0.55)',
          }}
          transition={{ type: 'spring', stiffness: 420, damping: 26 }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <rect x="9" y="2.5" width="6" height="12" rx="3" />
            <path d="M5 11a7 7 0 0 0 14 0M12 18v3.5" />
          </svg>
        </motion.span>
        <span className="sr-only">Play the Aura voice demo</span>
      </motion.button>

      <p className="mt-4 font-sans text-[13px] text-ink-soft">Tell me about your day</p>
    </motion.div>
  );
}

/* -------------------------------------------------- listening → diary */

function WritingScreen({
  phase,
  spoken,
  inView,
}: {
  phase: VoicePhase;
  spoken: number;
  inView: boolean;
}) {
  const listening = phase === 'listening';
  const written = phase === 'writing' || phase === 'diary';
  const showMeta = phase === 'diary';
  const tokens = listening ? transcript : transcript.filter((t) => t.keep);

  return (
    <motion.div {...screenMotion} className="flex h-full flex-col px-6 pb-6 pt-5">
      {/* Header changes state without the layout jumping */}
      <div className="flex h-6 items-center gap-2">
        <AnimatePresence mode="wait">
          {listening ? (
            <motion.div
              key="listening"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <motion.span
                className="h-[7px] w-[7px] rounded-full bg-clay"
                animate={{ opacity: [1, 0.25, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
              <span className="font-sans text-[13px] font-medium text-ink">
                I&rsquo;m listening…
              </span>
            </motion.div>
          ) : phase === 'writing' ? (
            <motion.span
              key="writing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-sans text-[13px] font-medium text-ink-soft"
            >
              Writing your day…
            </motion.span>
          ) : (
            <motion.span
              key="date"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-sans text-[9.5px] font-semibold uppercase tracking-wide2 text-ink-faint"
            >
              {entry.date} · {entry.weekday}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* The title arrives once the words have settled */}
      <div className="mt-2 min-h-[46px]">
        <AnimatePresence>
          {showMeta ? (
            <motion.p
              initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-[19px] leading-[1.18] tracking-editorial text-ink"
            >
              {entry.title}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>

      {/* The words themselves — same nodes throughout */}
      <div
        className={cn(
          'relative flex flex-wrap items-baseline transition-[gap] duration-700',
          listening
            ? 'gap-x-[0.3em] gap-y-[0.34em] font-sans text-[13.5px] text-ink-soft'
            : 'gap-x-[0.26em] gap-y-[0.18em] font-sans text-[11.5px] leading-[1.7] text-ink/70',
        )}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {buildTokenNodes(tokens, listening, written, spoken)}
        </AnimatePresence>
      </div>

      {/* Themes, mood, people — each on its own beat */}
      <div className="mt-4 space-y-2.5">
        <AnimatePresence>
          {showMeta ? (
            <>
              <MetaRow key="themes" label="Themes" delay={0.55}>
                {entry.themes.map((t) => (
                  <Chip key={t} tone="sage">
                    {t}
                  </Chip>
                ))}
              </MetaRow>
              <MetaRow key="mood" label="Mood" delay={0.85}>
                <Chip tone="peach">{entry.mood}</Chip>
              </MetaRow>
              <MetaRow key="people" label="People" delay={1.15}>
                {entry.people.map((p) => (
                  <Chip key={p} tone="lavender">
                    {p}
                  </Chip>
                ))}
              </MetaRow>
            </>
          ) : null}
        </AnimatePresence>
      </div>

      {/* The trace lives at the bottom while you are speaking */}
      <div className="mt-auto">
        <VoiceWave active={listening && inView} className="h-[70px] w-full" />
        {listening ? (
          <div className="mt-2 flex items-center justify-center gap-3">
            <span className="rounded-pill bg-ink px-5 py-2 font-sans text-[12px] font-medium text-ivory">
              Done
            </span>
            <span className="font-sans text-[11px] tabular-nums text-ink-faint">
              0:{String(Math.min(59, 6 + Math.floor(spoken / 2.6))).padStart(2, '0')}
            </span>
          </div>
        ) : null}
      </div>
    </motion.div>
  );
}

/**
 * A flat list of nodes for AnimatePresence — paragraph breaks are siblings of
 * the words, not wrappers, so `popLayout` can reflow the whole block.
 */
function buildTokenNodes(
  tokens: typeof transcript,
  listening: boolean,
  written: boolean,
  spoken: number,
) {
  const nodes: React.ReactNode[] = [];

  tokens.forEach((token, i) => {
    const key = `${token.raw}-${i}`;
    const heard = !listening || i < spoken;

    if (written && token.break && i > 0) {
      nodes.push(<span key={`${key}-br`} className="w-full" />);
    }

    nodes.push(
      <motion.span
        key={key}
        layout="position"
        initial={{ opacity: 0, filter: 'blur(4px)' }}
        animate={{
          opacity: heard ? 1 : 0,
          filter: 'blur(0px)',
          color: listening ? '#6B6157' : 'rgba(42,37,33,0.72)',
        }}
        exit={{ opacity: 0, scale: 0.7, filter: 'blur(6px)' }}
        transition={{
          layout: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
          opacity: { duration: 0.35 },
          default: { duration: 0.5 },
        }}
        className="inline-block"
      >
        {written ? token.final ?? token.raw : token.raw}
      </motion.span>,
    );
  });

  return nodes;
}

function MetaRow({
  label,
  delay,
  children,
}: {
  label: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center gap-2"
    >
      <span className="w-[42px] shrink-0 font-sans text-[8.5px] font-semibold uppercase tracking-wide2 text-ink-faint">
        {label}
      </span>
      <span className="flex flex-wrap gap-1.5">{children}</span>
    </motion.div>
  );
}

function Chip({ tone, children }: { tone: 'sage' | 'peach' | 'lavender'; children: React.ReactNode }) {
  const tones = {
    sage: 'border-[#C3D5BD] bg-[#E9F0E5] text-sage-deep',
    peach: 'border-[#E7C7AC] bg-[#FBEADD] text-clay',
    lavender: 'border-[#CFC7E1] bg-[#EDEAF5] text-lavender-deep',
  } as const;
  return (
    <span className={cn('rounded-pill border px-2.5 py-[3px] font-sans text-[10px]', tones[tone])}>
      {children}
    </span>
  );
}

/* ----------------------------------------------------------------- memory */

function MemoryScreen({ onReplay }: { onReplay: () => void }) {
  return (
    <motion.div {...screenMotion} className="flex h-full flex-col px-5 pb-6 pt-5">
      <p className="px-1 font-sans text-[9.5px] font-semibold uppercase tracking-wide2 text-ink-faint">
        Saved to your memories
      </p>

      <motion.div
        initial={{ opacity: 0, y: 22, rotate: -2.5, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, rotate: -1.5, scale: 1 }}
        transition={{ type: 'spring', stiffness: 110, damping: 17, delay: 0.15 }}
        className="mt-3 rounded-[18px] border border-[#E7C7AC] bg-[#FBEADD] p-4 shadow-soft"
      >
        <p className="font-sans text-[9px] font-semibold uppercase tracking-wide2 text-clay/80">
          Aug 26
        </p>
        <p className="mt-2 font-serif text-[16px] leading-[1.22] tracking-editorial text-ink">
          {entry.title}
        </p>
        <p className="mt-2 font-sans text-[10.5px] leading-relaxed text-ink-soft">
          You walked home the long way and let the week settle.
        </p>
        <div className="mt-3 flex gap-1.5">
          <Chip tone="sage">Growth</Chip>
          <Chip tone="lavender">Priya</Chip>
        </div>
      </motion.div>

      {/* The rest of the collection, sitting just underneath */}
      <div className="relative mt-3 space-y-2">
        {[
          { d: 'Aug 25', t: 'The walk home.', c: 'border-[#C3D5BD] bg-[#E9F0E5]' },
          { d: 'Aug 21', t: 'Rain, and the whole street smelled like beginnings.', c: 'border-[#CFC7E1] bg-[#EDEAF5]' },
        ].map((m, i) => (
          <motion.div
            key={m.d}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 + i * 0.16 }}
            className={cn('rounded-[16px] border p-3', m.c)}
          >
            <p className="font-sans text-[8.5px] font-semibold uppercase tracking-wide2 text-ink/40">
              {m.d}
            </p>
            <p className="mt-1 font-serif text-[12.5px] leading-snug text-ink">{m.t}</p>
          </motion.div>
        ))}
      </div>

      <button
        type="button"
        onClick={onReplay}
        data-cursor="cta"
        className="mt-auto self-center rounded-pill border border-ink/10 px-4 py-1.5 font-sans text-[11px] text-ink-soft transition-colors hover:text-ink"
      >
        Replay
      </button>
    </motion.div>
  );
}
