import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface IPhoneMockupProps {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  statusTime?: string;
  dynamicIslandContent?: ReactNode;
  showStatusBar?: boolean;
  showHomeIndicator?: boolean;
  /** Whether the screen should have a subtle glass glare overlay */
  hasGlare?: boolean;
}

export function IPhoneMockup({
  children,
  className,
  innerClassName,
  statusTime = '9:41',
  dynamicIslandContent,
  showStatusBar = true,
  showHomeIndicator = true,
  hasGlare = true,
}: IPhoneMockupProps) {
  return (
    <div
      className={cn(
        'relative mx-auto select-none w-[310px] sm:w-[325px] md:w-[335px] aspect-[1/2.06] shrink-0 flex flex-col',
        className,
      )}
    >
      {/* Physical Side Buttons (positioned proportionally to true iPhone hardware) */}
      {/* Left: Action Button */}
      <span
        className="pointer-events-none absolute -left-[2.5px] top-[14%] h-6 w-[2.5px] rounded-l-[1px] bg-[#3a352f] shadow-[-1px_0_1px_rgba(0,0,0,0.5)]"
        aria-hidden="true"
      />
      {/* Left: Volume Up */}
      <span
        className="pointer-events-none absolute -left-[2.5px] top-[21%] h-11 w-[2.5px] rounded-l-[1px] bg-[#3a352f] shadow-[-1px_0_1px_rgba(0,0,0,0.5)]"
        aria-hidden="true"
      />
      {/* Left: Volume Down */}
      <span
        className="pointer-events-none absolute -left-[2.5px] top-[29%] h-11 w-[2.5px] rounded-l-[1px] bg-[#3a352f] shadow-[-1px_0_1px_rgba(0,0,0,0.5)]"
        aria-hidden="true"
      />
      {/* Right: Power / Lock Button */}
      <span
        className="pointer-events-none absolute -right-[2.5px] top-[22%] h-16 w-[2.5px] rounded-r-[1px] bg-[#3a352f] shadow-[1px_0_1px_rgba(0,0,0,0.5)]"
        aria-hidden="true"
      />

      {/* Main Titanium Chassis with True Bezel Curvature */}
      <div className="relative h-full w-full rounded-[48px] sm:rounded-[52px] p-[9px] sm:p-[10px] bg-gradient-to-b from-[#35312b] via-[#1c1a17] to-[#121110] shadow-[0_24px_55px_-12px_rgba(34,31,28,0.45),0_0_0_1px_rgba(255,255,255,0.14)_inset,0_2px_4px_rgba(0,0,0,0.5)] ring-1 ring-black/40 flex flex-col">
        
        {/* Inner Screen Display */}
        <div
          className={cn(
            'relative h-full w-full rounded-[39px] sm:rounded-[42px] overflow-hidden bg-paper flex flex-col',
            innerClassName,
          )}
        >
          {/* Glass Glare Reflection (Subtle 3D Depth) */}
          {hasGlare && (
            <div
              className="pointer-events-none absolute -top-40 -right-40 h-80 w-80 rotate-45 bg-gradient-to-b from-white/18 via-white/5 to-transparent blur-xl z-30"
              aria-hidden="true"
            />
          )}

          {/* iOS Status Bar & Dynamic Island */}
          {showStatusBar && (
            <div className="relative z-20 shrink-0 pt-2.5 pb-1 px-5 flex items-center justify-between text-ink select-none bg-inherit">
              {/* Left: Time */}
              <span className="text-[11.5px] font-semibold tracking-tight tabular-nums pl-0.5">
                {statusTime}
              </span>

              {/* Dynamic Island */}
              <div className="absolute left-1/2 -translate-x-1/2 top-2 h-[22px] w-[84px] sm:w-[90px] rounded-full bg-black flex items-center justify-between px-2.5 shadow-inner">
                {/* Camera Lens */}
                <span className="h-2 w-2 rounded-full bg-[#0a0a0f] ring-1 ring-white/15" />
                {/* Sensor or Live Content */}
                {dynamicIslandContent ? (
                  dynamicIslandContent
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-[#18181f]" />
                )}
              </div>

              {/* Right: Cellular, Wi-Fi, Battery */}
              <div className="flex items-center gap-1.5 pr-0.5 text-ink">
                {/* 4-bar Signal */}
                <svg className="h-2.5 w-3 fill-current" viewBox="0 0 17 12" aria-hidden="true">
                  <rect x="0" y="9" width="2.5" height="3" rx="0.5" />
                  <rect x="4" y="6" width="2.5" height="6" rx="0.5" />
                  <rect x="8" y="3" width="2.5" height="9" rx="0.5" />
                  <rect x="12" y="0" width="2.5" height="12" rx="0.5" />
                </svg>
                {/* Wi-Fi */}
                <svg className="h-2.5 w-3 fill-current" viewBox="0 0 16 12" aria-hidden="true">
                  <path d="M8 9.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm-3.5-3a5 5 0 0 1 7 0 .75.75 0 0 1-1.06 1.06 3.5 3.5 0 0 0-4.88 0A.75.75 0 0 1 4.5 6.5Zm-3-3a9.5 9.5 0 0 1 13 0 .75.75 0 0 1-1.06 1.06 8 8 0 0 0-10.88 0A.75.75 0 0 1 1.5 3.5Z" />
                </svg>
                {/* Battery */}
                <div className="relative flex items-center" aria-hidden="true">
                  <div className="h-[9.5px] w-[18px] rounded-[3px] border border-ink/50 p-[1px]">
                    <div className="h-full w-full rounded-[1px] bg-ink" />
                  </div>
                  <div className="h-1 w-[1.5px] rounded-r-[1px] bg-ink/50 ml-[1px]" />
                </div>
              </div>
            </div>
          )}

          {/* Screen Body Content (Strictly within true phone screen) */}
          <div className="relative z-10 flex-1 min-h-0 overflow-y-auto no-scrollbar flex flex-col">
            {children}
          </div>

          {/* Home Indicator Bar */}
          {showHomeIndicator && (
            <div className="relative z-20 shrink-0 pb-2 pt-1 flex justify-center pointer-events-none bg-inherit">
              <div className="h-1 w-28 rounded-full bg-ink/25" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
