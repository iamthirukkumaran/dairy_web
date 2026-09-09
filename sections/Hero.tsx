import { Container } from '@/components/ui/Container';
import { StoreBadges } from '@/components/StoreBadges';
import { PhoneMockup } from '@/components/PhoneMockup';
import { TodayScreen } from '@/components/screens/TodayScreen';

export function Hero() {
  return (
    <div id="top" className="bg-ivory">
      <Container className="pb-16 pt-16 text-center sm:pb-20 sm:pt-24">
        <h1 className="mx-auto max-w-3xl display text-[clamp(2.4rem,6vw,4rem)] text-ink">
          Your life, beautifully remembered.
        </h1>
        <p className="mx-auto mt-5 max-w-md font-sans text-[17px] leading-[1.6] text-ink-soft">
          Talk about your day. Aura writes the diary.
        </p>

        <div id="get" className="mt-8 scroll-mt-24">
          <StoreBadges align="center" />
        </div>

        <div className="mt-16 flex justify-center">
          <PhoneMockup width={288}>
            <TodayScreen />
          </PhoneMockup>
        </div>
      </Container>
    </div>
  );
}
