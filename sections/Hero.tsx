import { Container } from '@/components/ui/Container';
import { StoreBadges } from '@/components/StoreBadges';
import { asset } from '@/lib/utils';

export function Hero() {
  return (
    <section id="top" aria-label="Aura" className="relative overflow-hidden bg-ivory">
      {/* The photograph sits behind the copy on small screens and beside it on large ones. */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[52%] lg:block">
        <img
          src={asset('/images/hero-desk-tall.jpg')}
          alt="An open journal and pen on a sunlit wooden desk beside coffee and dried flowers"
          className="h-full w-full object-cover"
          width={900}
          height={1180}
        />
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-ivory to-transparent" />

        <p className="hand absolute left-[12%] top-[16%] text-[25px] leading-tight text-[#FDF6EA] [text-shadow:0_1px_10px_rgba(34,31,28,0.55)]">
          Same you.
          <br />
          More memories.
          <span className="mt-1 block">&#9825;</span>
        </p>
      </div>

      <Container className="relative pb-14 pt-14 sm:pt-20 lg:pb-28 lg:pt-24">
        <div className="max-w-xl lg:max-w-[440px]">
          <p className="font-sans text-[13px] text-ink-soft">
            A personal diary for a <span className="italic text-clay">fuller</span> tomorrow
          </p>

          <h1 className="mt-5 display display-broken text-[clamp(2.5rem,6vw,4rem)] text-ink">
            Your life,
            <br />
            <span className="display-accent">beautifully remembered.</span>
          </h1>

          <p className="mt-6 max-w-sm font-sans text-[17px] leading-[1.6] text-ink-soft">
            Talk about your day. Aura writes the diary, keeps the people and places, and hands your
            year back to you.
          </p>

          <div id="get" className="mt-9 scroll-mt-24">
            <StoreBadges />
          </div>

          <a
            href="#remember"
            className="mt-9 inline-flex items-center gap-3 font-sans text-[14px] text-ink-soft hover:text-ink"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-paper text-clay">
              <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
                <path d="M7 4.5v11l9-5.5-9-5.5Z" />
              </svg>
            </span>
            Explore the experience
          </a>
        </div>

        {/* Mobile and tablet get the same photograph, laid out below the copy. */}
        <div className="mt-12 overflow-hidden rounded-panel shadow-lift lg:hidden">
          <img
            src={asset('/images/hero-desk.jpg')}
            alt="An open journal and pen on a sunlit wooden desk beside coffee and dried flowers"
            className="h-[300px] w-full object-cover sm:h-[400px]"
            width={1500}
            height={1000}
          />
        </div>
      </Container>
    </section>
  );
}
