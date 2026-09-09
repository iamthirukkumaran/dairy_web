import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { StoreBadges } from '@/components/StoreBadges';

export function FinalCta() {
  return (
    <Section tone="paper" label="Get Aura">
      <Container className="text-center">
        <h2 className="mx-auto max-w-2xl display text-[clamp(2rem,4.4vw,3.2rem)] text-ink">
          Start remembering today.
        </h2>
        <StoreBadges align="center" className="mt-8" />
      </Container>
    </Section>
  );
}
