import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { privacyControls } from '@/data/privacy';

export function Privacy() {
  return (
    <Section id="privacy" label="Privacy">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Privacy"
          title="A diary should stay a diary."
          intro="Your entries are written for one reader. You decide how much Aura does, and you can take everything with you or delete it at any time."
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {privacyControls.map((item) => (
            <li key={item.title} className="rounded-card border border-line bg-paper p-6">
              <h3 className="font-sans text-[15px] font-medium text-ink">{item.title}</h3>
              <p className="mt-2 font-sans text-[14px] leading-[1.7] text-ink-soft">{item.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
