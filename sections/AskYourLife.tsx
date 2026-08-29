'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'motion/react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/SectionHeading';
import { Reveal } from '@/animations/Reveal';
import { LineReveal } from '@/animations/TextReveal';
import { askQuestions, askResults } from '@/data/ask';
import { toneSurface } from '@/components/art/palette';
import { useCalmMotion } from '@/animations/useCalmMotion';
import { cn } from '@/lib/utils';

type Phase = 'typing' | 'searching' | 'results';

/** Anchor points for the connector lines, in the overlay's 0–100 space. */
const ANCHORS = [
  [17, 40],
  [50, 34],
  [83, 40],
  [17, 82],
  [50, 88],
  [83, 82],
];

/**
 * Section 6 — searching your own history.
 *
 * The question types itself, a light travels down into the collection, and
 * six memories come up out of the paper one at a time. Deliberately not a
 * chat: there is no assistant here, only your own days answering back.
 */
export function AskYourLife() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const { enabled } = useCalmMotion();

  const [qIndex, setQIndex] = useState(0);
  const [typed, setTyped] = useState('');
  const [phase, setPhase] = useState<Phase>('typing');

  const question = askQuestions[qIndex];
  const revealed = phase === 'results' || !enabled;

  // Type the question out one character at a time.
  useEffect(() => {
    if (!inView) return;
    if (!enabled) {
      setTyped(question);
      setPhase('results');
      return;
    }
    if (phase !== 'typing') return;
    setTyped('');
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setTyped(question.slice(0, i));
      if (i >= question.length) {
        window.clearInterval(id);
        window.setTimeout(() => setPhase('searching'), 480);
      }
    }, 34);
    return () => window.clearInterval(id);
  }, [question, phase, inView, enabled]);

  // searching → results → next question
  useEffect(() => {
    if (!inView || !enabled) return;
    if (phase === 'searching') {
      const id = window.setTimeout(() => setPhase('results'), 1250);
      return () => window.clearTimeout(id);
    }
    if (phase === 'results') {
      const id = window.setTimeout(() => {
        setQIndex((n) => (n + 1) % askQuestions.length);
        setPhase('typing');
      }, 6600);
      return () => window.clearTimeout(id);
    }
  }, [phase, inView, enabled]);

  const ask = useCallback((i: number) => {
    setQIndex(i);
    setPhase('typing');
  }, []);

  return (
    <Section id="ask" tone="paper" label="Ask your life">
      <Container wide>
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Eyebrow>Ask my life</Eyebrow>
          </Reveal>
          <LineReveal
            as="h2"
            onScroll
            lines={['Ask your life anything.']}
            className="mt-5 display text-[clamp(2.1rem,5vw,4rem)] text-ink"
          />
          <Reveal delay={0.14}>
            <p className="mx-auto mt-6 max-w-prose font-sans text-[17px] leading-[1.65] text-ink-soft">
              Not a search box for notes. A way back into your own history — the moments you would
              never have thought to look for.
            </p>
          </Reveal>
        </div>

        <div ref={ref} className="relative mx-auto mt-16 max-w-4xl">
          {/* The question */}
          <Reveal>
            <div className="relative z-10 flex items-center gap-4 rounded-pill border border-ink/[0.09] bg-ivory px-6 py-5 shadow-soft sm:px-8">
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="shrink-0 text-ink-faint"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M16.5 16.5 21 21" strokeLinecap="round" />
              </svg>
              <p
                className="min-w-0 flex-1 truncate font-serif text-[16px] tracking-editorial text-ink sm:text-[20px]"
                aria-live="polite"
              >
                {typed}
                {enabled && phase === 'typing' ? (
                  <motion.span
                    className="ml-[1px] inline-block h-[1em] w-[2px] translate-y-[0.12em] bg-clay"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                ) : null}
              </p>
              <span className="hidden shrink-0 font-sans text-[12px] text-ink-faint sm:block">
                {phase === 'searching' ? 'Looking…' : 'Ask'}
              </span>
            </div>
          </Reveal>

          {/* Results */}
          <div className="relative mt-10 min-h-[430px] sm:min-h-[390px]">
            {/* A light travels from the question down into the collection */}
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {ANCHORS.map(([x, y], i) => {
                const d = `M50 -6 C50 ${y * 0.35} ${x} ${y * 0.5} ${x} ${y}`;
                return (
                  <g key={i}>
                    <motion.path
                      d={d}
                      fill="none"
                      stroke="#BE6F4C"
                      strokeWidth="1"
                      strokeOpacity="0.2"
                      vectorEffect="non-scaling-stroke"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: revealed || phase === 'searching' ? 1 : 0 }}
                      transition={{ duration: 0.8, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
                    />
                    {/* The pulse itself: a short dash chasing down the path */}
                    <motion.path
                      d={d}
                      pathLength={1}
                      fill="none"
                      stroke="#BE6F4C"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeDasharray="0.14 1"
                      vectorEffect="non-scaling-stroke"
                      initial={{ strokeDashoffset: 0.14, opacity: 0 }}
                      animate={
                        phase === 'searching' && enabled
                          ? { strokeDashoffset: [0.14, -1], opacity: [0, 0.9, 0] }
                          : { opacity: 0 }
                      }
                      transition={{ duration: 1.1, delay: 0.08 * i, ease: 'easeIn' }}
                    />
                  </g>
                );
              })}
            </svg>

            <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {askResults.map((r, i) => (
                <motion.div
                  key={r.id}
                  initial={false}
                  animate={{
                    opacity: revealed ? 1 : 0.1,
                    y: revealed ? 0 : 18,
                    scale: revealed ? 1 : 0.96,
                    filter: revealed ? 'blur(0px)' : 'blur(3px)',
                    boxShadow: revealed
                      ? '0 1px 2px rgba(42,37,33,0.04), 0 14px 30px -18px rgba(42,37,33,0.2)'
                      : '0 0 0 rgba(42,37,33,0)',
                  }}
                  transition={{
                    duration: 0.75,
                    // Cards come up in the order the light reached them.
                    delay: revealed ? 0.1 * i : 0,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={cn(
                    'gpu rounded-card border p-5',
                    toneSurface[r.tone],
                    i % 2 === 1 && 'sm:mt-6',
                  )}
                >
                  <p className="font-sans text-[10px] font-semibold uppercase tracking-wide2 text-ink/45">
                    {r.date}
                  </p>
                  <p className="mt-2 font-serif text-[17px] leading-[1.3] tracking-editorial text-ink">
                    {r.line}
                  </p>
                </motion.div>
              ))}
            </div>

            <AnimatePresence>
              {revealed ? (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="mt-10 text-center font-serif text-[19px] tracking-editorial text-ink sm:text-[22px]"
                >
                  &ldquo;I found {askResults.length} moments that might answer that.&rdquo;
                </motion.p>
              ) : null}
            </AnimatePresence>
          </div>

          {/* Let people drive it themselves */}
          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-wrap justify-center gap-2">
              {askQuestions.map((q, i) => (
                <motion.button
                  key={q}
                  type="button"
                  onClick={() => ask(i)}
                  data-cursor="cta"
                  whileHover={enabled ? { y: -2 } : undefined}
                  whileTap={enabled ? { scale: 0.97 } : undefined}
                  transition={{ type: 'spring', stiffness: 420, damping: 28 }}
                  className={cn(
                    'rounded-pill border px-4 py-2 text-left font-sans text-[12.5px] transition-colors duration-300',
                    i === qIndex
                      ? 'border-clay/30 bg-[#FBEADD] text-ink'
                      : 'border-ink/[0.08] bg-ivory text-ink-soft hover:text-ink',
                  )}
                >
                  {q}
                </motion.button>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
