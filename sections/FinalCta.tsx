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
      />
      <div className="absolute inset-0 -z-10 bg-ivory/55" />

      <Container className="py-20 text-center sm:py-24">
        <h2 className="mx-auto max-w-2xl display text-[clamp(1.9rem,4.4vw,3rem)] text-ink">
          Start remembering your life.
        </h2>
        <StoreBadges align="center" className="mt-8" />
      </Container>
    </section>
  );
}
