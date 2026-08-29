'use client';

import { motion } from 'motion/react';
import { PhoneStatusBar } from '@/components/PhoneMockup';
import { useCalmMotion } from '@/animations/useCalmMotion';

/** The Aura "Today" screen shown floating in the hero. */
export function TodayScreen() {
  const { enabled } = useCalmMotion();

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-[#FFF7E9] via-paper to-[#F1F5EC]">
      <PhoneStatusBar />

      <div className="px-6 pt-8">
        <p className="font-sans text-[10px] font-semibold uppercase tracking-wide2 text-ink-faint">
          Wednesday, 26 August
        </p>
        <p className="mt-2 font-serif text-[26px] leading-[1.15] tracking-editorial text-ink">
          Good evening,
          <br />
          Suriya.
        </p>
      </div>

      {/* Today's entry, already written */}
      <div className="mx-5 mt-6 rounded-[20px] border border-[#E7C7AC] bg-[#FBEADD] p-4">
        <p className="font-sans text-[9px] font-semibold uppercase tracking-wide2 text-clay/80">
          Today&rsquo;s story
        </p>
        <p className="mt-2 font-serif text-[15px] leading-snug text-ink">
          The day things finally started to feel right.
        </p>
        <p className="mt-2 font-sans text-[11px] leading-relaxed text-ink-soft">
          You walked home the long way and let the week settle.
        </p>
      </div>

      <div className="mx-5 mt-3 flex gap-3">
        <div className="flex-1 rounded-[16px] border border-[#C3D5BD] bg-[#E9F0E5] p-3">
          <p className="font-sans text-[9px] font-semibold uppercase tracking-wide2 text-sage-deep">
            People
          </p>
          <p className="mt-1 font-sans text-[11px] text-ink-soft">Priya · Amma</p>
        </div>
        <div className="flex-1 rounded-[16px] border border-[#CFC7E1] bg-[#EDEAF5] p-3">
          <p className="font-sans text-[9px] font-semibold uppercase tracking-wide2 text-lavender-deep">
            Themes
          </p>
          <p className="mt-1 font-sans text-[11px] text-ink-soft">Work · Growth</p>
        </div>
      </div>

      {/* Talk button with a slow breathing halo */}
      <div className="mt-auto flex flex-col items-center pb-9">
        <div className="relative flex h-[74px] w-[74px] items-center justify-center">
          {enabled ? (
            <motion.span
              className="absolute inset-0 rounded-full bg-sage/45"
              animate={{ scale: [1, 1.45, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: 'easeOut' }}
            />
          ) : null}
          <div className="relative flex h-[62px] w-[62px] items-center justify-center rounded-full bg-ink text-ivory shadow-lift">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <rect x="9" y="2.5" width="6" height="12" rx="3" />
              <path d="M5 11a7 7 0 0 0 14 0M12 18v3.5" />
            </svg>
          </div>
        </div>
        <p className="mt-3 font-sans text-[12px] text-ink-soft">Tell me about your day</p>
      </div>
    </div>
  );
}
