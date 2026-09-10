import { site } from '@/data/site';
import { cn } from '@/lib/utils';

/**
 * The two store buttons, drawn as the familiar black boxes.
 * Static markup — no hover motion, no animation.
 */
export function StoreBadges({
  className,
  align = 'start',
}: {
  className?: string;
  align?: 'start' | 'center';
}) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-3',
        align === 'center' && 'justify-center',
        className,
      )}
    >
      <AppStoreBadge />
      <PlayStoreBadge />
    </div>
  );
}

const box =
  'inline-flex h-[52px] min-w-[196px] items-center gap-3 rounded-[10px] border border-white/15 bg-ink px-4 text-ivory hover:bg-[#39332d]';

function AppStoreBadge() {
  return (
    <a href={site.links.ios} className={box} aria-label="Download Aura on the App Store">
      <svg viewBox="0 0 384 512" className="h-7 w-7 shrink-0" fill="currentColor" aria-hidden="true">
        <path d="M318.7 268c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-36.8-2.8-77 21.5-91.7 21.5-15.6 0-51.4-20.5-79.4-20.5C56.7 141.3 0 184.7 0 273.1c0 26.1 4.8 53.1 14.3 80.9 12.7 36.7 60.3 126.2 108.7 124.7 22.4-.5 38.2-15.9 67.4-15.9 28.3 0 42.9 15.9 67.9 15.9 48.9-.7 92-82.1 104-118.9-65.4-30.8-43.6-90.4-43.6-91.8zm-46.1-159c22.2-26.4 20.2-50.4 19.6-59-19.7 1.1-42.5 13.4-55.5 28.5-14.3 16.2-22.7 36.2-20.9 58.6 21.3 1.6 40.8-9.4 56.8-28.1z" />
      </svg>
      <span className="text-left leading-none">
        <span className="block text-[9px] uppercase tracking-[0.14em] text-ivory/70">
          Download on the
        </span>
        <span className="mt-[5px] block text-[17px] font-medium">App Store</span>
      </span>
    </a>
  );
}

function PlayStoreBadge() {
  return (
    <a href={site.links.android} className={box} aria-label="Get Aura on Google Play">
      <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0" aria-hidden="true">
        <path d="M3.06 2.36A1.5 1.5 0 0 0 2.66 3.4v17.2c0 .4.15.77.4 1.03l9.13-9.63-9.13-9.64z" fill="#00A0FF" />
        <path d="M12.19 12l3.87-3.35 1.3-.74 3.12 1.79c.9.51.9 1.68 0 2.2l-3.12 1.79-1.3-.74L12.19 12z" fill="#FFC900" />
        <path d="M16.06 15.35 12.19 12l-9.13 9.63c.42.44 1.1.5 1.63.2l11.37-6.48z" fill="#F9414D" />
        <path d="M16.06 8.65 4.69 2.17c-.53-.3-1.21-.24-1.63.19L12.19 12l3.87-3.35z" fill="#00D24D" />
      </svg>
      <span className="text-left leading-none">
        <span className="block text-[9px] uppercase tracking-[0.14em] text-ivory/70">
          Get it on
        </span>
        <span className="mt-[5px] block text-[17px] font-medium">Google Play</span>
      </span>
    </a>
  );
}
