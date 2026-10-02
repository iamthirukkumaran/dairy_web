import { Container } from '@/components/ui/Container';
import { StoreBadges } from '@/components/StoreBadges';
import { asset } from '@/lib/utils';

export function FinalCta() {
  return (
    <section aria-label="Get Aura" className="relative isolate overflow-hidden border-t border-line/80">
      <img
        src={asset('/images/horizon.jpg')}
        alt="Calm evening horizon"
        className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
        width={2000}
        height={700}
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ivory/70 via-ivory/85 to-ivory/90 backdrop-blur-[2px]" />

      <Container className="section text-center py-18 sm:py-24">
        <div className="inline-flex items-center gap-2 rounded-full border border-clay/20 bg-ivory/90 px-3.5 py-1 text-[11px] font-semibold tracking-wide2 uppercase text-clay backdrop-blur-sm mb-5 shadow-soft">
          <span className="h-1.5 w-1.5 rounded-full bg-sage" />
          Your Story Deserves Keeping
        </div>
        <h2 className="display mx-auto max-w-3xl text-[clamp(2.2rem,5vw,3.4rem)] text-ink">
          Start remembering your life,
          <br />
          <span className="italic font-normal text-clay">beginning tonight.</span>
        </h2>
        <p className="mt-4 max-w-xl mx-auto text-[16px] text-ink-soft leading-relaxed sm:text-[17px]">
          Record your daily reflections, keep the people and places you cherish, and hold your year in your hands.
        </p>
        <div className="mx-auto mt-8 max-w-lg">
          <StoreBadges align="center" />
        </div>
        <p className="mt-5 text-[12.5px] text-ink-faint">
          Available for iOS and Android · Free to start · Zero AI models · Complete privacy
        </p>
      </Container>
    </section>
  );
}
