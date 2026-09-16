import { Container } from '@/components/ui/Container';
import { StoreBadges } from '@/components/StoreBadges';
import { asset } from '@/lib/utils';

export function FinalCta() {
  return (
    <section aria-label="Get Aura" className="relative isolate overflow-hidden">
      <img
        src={asset('/images/horizon.jpg')}
        alt=""
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        width={2000}
        height={700}
        loading="lazy"
        decoding="async"
      />
      {/*
       * Heaviest under the headline, lighter at the edges: the photograph still
       * reads, and the type keeps its contrast wherever the crop lands.
       */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ivory/45 via-ivory/65 to-ivory/50" />

      <Container className="section text-center">
        <h2 className="display mx-auto max-w-2xl text-[clamp(1.7rem,6.5vw,2.5rem)] text-ink sm:text-[clamp(1.75rem,3.6vw,2.5rem)]">
          Start remembering your life.
        </h2>
        <div className="mx-auto mt-8 max-w-md">
          <StoreBadges align="center" />
        </div>
      </Container>
    </section>
  );
}
