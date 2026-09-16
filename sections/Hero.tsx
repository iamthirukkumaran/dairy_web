import { Container } from '@/components/ui/Container';
import { StoreBadges } from '@/components/StoreBadges';
import { asset } from '@/lib/utils';

export function Hero() {
  return (
    <section
      id="top"
      aria-label="Aura"
      className="section-tight-b relative overflow-hidden bg-ivory pt-10 sm:pt-14 lg:pt-16"
    >
      <Container>
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] md:gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <div className="max-w-xl md:self-center md:py-4 lg:py-10">
            <p className="text-[13px] text-ink-soft sm:text-[14px]">
              A personal diary for a fuller tomorrow
            </p>

            <h1 className="display display-broken mt-4 text-[clamp(1.95rem,7.5vw,2.9rem)] text-ink sm:mt-5 md:text-[clamp(1.95rem,4.2vw,2.9rem)]">
              Your life,
              <br />
              beautifully remembered.
            </h1>

            <p className="mt-5 max-w-sm text-[16px] leading-[1.65] text-ink-soft sm:mt-6 sm:text-[17px] sm:leading-[1.6]">
              Talk about your day. Aura writes the diary, keeps the people and places, and hands your
              year back to you.
            </p>

            <div id="get" className="mt-8 max-w-md scroll-mt-28 sm:mt-9">
              <StoreBadges />
            </div>

            <a
              href="#remember"
              className="transition-ui group mt-8 inline-flex items-center gap-3 text-[14px] text-ink-soft hover:text-ink sm:mt-9"
            >
              <span className="transition-ui flex h-9 w-9 items-center justify-center rounded-full border border-line bg-paper text-clay group-hover:border-clay/40">
                <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
                  <path d="M7 4.5v11l9-5.5-9-5.5Z" />
                </svg>
              </span>
              Explore the experience
            </a>
          </div>

          {/*
           * One photograph, cropped two ways: a landscape band below the copy on
           * phones, a tall column beside it from tablet up, where it also runs
           * out past the container to the right edge of the screen.
           */}
          <div className="relative min-h-[280px] overflow-hidden rounded-panel shadow-lift sm:min-h-[380px] md:min-h-[460px] lg:bleed-right lg:min-h-[540px] lg:rounded-r-none">
            <picture>
              <source
                media="(min-width: 768px) and (max-width: 1023px)"
                srcSet={asset('/images/hero-desk-tall.jpg')}
              />
              <img
                src={asset('/images/hero-desk.jpg')}
                alt="An open journal and pen on a sunlit wooden desk beside coffee and dried flowers"
                className="absolute inset-0 h-full w-full object-cover"
                width={1500}
                height={1000}
                fetchPriority="high"
                decoding="async"
              />
            </picture>
          </div>
        </div>
      </Container>
    </section>
  );
}
