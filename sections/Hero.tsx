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
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16 items-center">
          <div className="w-full md:self-center md:py-4 lg:py-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-clay/20 bg-cream/80 px-3.5 py-1 text-[11px] font-semibold tracking-wide2 uppercase text-clay backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-sage" />
              Private Voice Journaling · Zero AI
            </div>

            <h1 className="display display-broken mt-5 text-[clamp(2.4rem,4.8vw,3.6rem)] text-ink sm:mt-6">
              Your life,
              <br />
              <span className="italic font-normal text-clay">beautifully</span> remembered.
            </h1>

            <p className="mt-5 max-w-xl text-[16px] leading-[1.75] text-ink-soft sm:mt-6 sm:text-[18px]">
              Speak your thoughts or write quietly. Aura archives your daily reflections, keeps the people and places that shaped you, and binds your year into an heirloom linen book.
            </p>

            <div id="get" className="mt-8 scroll-mt-28 sm:mt-9">
              <StoreBadges />
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line/80 pt-6 text-[13px] text-ink-soft sm:mt-9">
              <div className="flex items-center gap-2">
                <svg viewBox="0 0 20 20" className="h-4 w-4 text-clay" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                </svg>
                <span>Voice & handwritten entries</span>
              </div>
              <div className="flex items-center gap-2">
                <svg viewBox="0 0 20 20" className="h-4 w-4 text-clay" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                </svg>
                <span>Zero AI model training</span>
              </div>
              <div className="flex items-center gap-2">
                <svg viewBox="0 0 20 20" className="h-4 w-4 text-clay" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                </svg>
                <span>Cloth-bound physical books</span>
              </div>
            </div>
          </div>

          {/* Hero photograph with floating tactile memory card */}
          <div className="relative min-h-[340px] overflow-hidden rounded-panel border border-line/70 shadow-lift sm:min-h-[440px] md:min-h-[500px] lg:min-h-[580px]">
            <picture>
              <source
                media="(min-width: 768px) and (max-width: 1023px)"
                srcSet={asset('/images/hero-desk-tall.jpg')}
              />
              <img
                src={asset('/images/hero-desk.jpg')}
                alt="An open journal and pen on a sunlit wooden desk beside coffee and dried flowers"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                width={1500}
                height={1000}
                fetchPriority="high"
                decoding="async"
              />
            </picture>

            <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent pointer-events-none" />

            {/* Floating Audio Memory Excerpt */}
            <div className="absolute bottom-6 left-6 right-6 sm:left-auto sm:right-8 sm:max-w-sm rounded-card border border-white/40 bg-paper/95 p-4 shadow-lift backdrop-blur-md">
              <div className="flex items-center justify-between gap-3 border-b border-line pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-clay text-ivory">
                    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
                      <path d="M10 3a2.5 2.5 0 0 1 2.5 2.5v4a2.5 2.5 0 0 1-5 0v-4A2.5 2.5 0 0 1 10 3Zm5 6.5a5 5 0 0 1-10 0H3.5a6.5 6.5 0 0 0 5.5 6.4V18h2v-2.1a6.5 6.5 0 0 0 5.5-6.4H15Z" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-[12px] font-semibold text-ink">Spoken Voice Entry</p>
                    <p className="text-[10px] text-ink-faint">Wednesday · August 26</p>
                  </div>
                </div>
                <div className="flex items-end gap-0.5 h-4">
                  <span className="w-1 bg-clay rounded-full waveform-bar" style={{ animationDelay: '0ms' }} />
                  <span className="w-1 bg-clay rounded-full waveform-bar" style={{ animationDelay: '200ms' }} />
                  <span className="w-1 bg-clay rounded-full waveform-bar" style={{ animationDelay: '400ms' }} />
                  <span className="w-1 bg-clay rounded-full waveform-bar" style={{ animationDelay: '150ms' }} />
                  <span className="w-1 bg-clay rounded-full waveform-bar" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
              <p className="mt-2.5 font-serif italic text-[13px] leading-relaxed text-ink-soft">
                “I walked home the long way instead of taking the metro. Nothing loud happened, and somehow that was exactly the point.”
              </p>
              <div className="mt-2.5 flex items-center justify-between text-[11px] text-ink-faint">
                <span>02:14 recording</span>
                <span className="font-medium text-clay">✓ Saved to Vault</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
