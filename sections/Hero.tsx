import { Container } from '@/components/ui/Container';
import { StoreBadges } from '@/components/StoreBadges';
import { PhoneMockup } from '@/components/PhoneMockup';
import { TodayScreen } from '@/components/screens/TodayScreen';

export function Hero() {
  return (
    <div id="top" className="bg-ivory">
      <Container className="pb-16 pt-16 text-center sm:pb-20 sm:pt-24">
        <p className="eyebrow">A voice-first diary</p>
        <h1 className="mx-auto mt-5 max-w-3xl display text-[clamp(2.4rem,6vw,4rem)] text-ink">
          Your life, beautifully remembered.
        </h1>
        <p className="mx-auto mt-5 max-w-xl font-sans text-[17px] leading-[1.65] text-ink-soft">
          Talk about your day. Aura writes the diary for you, keeps what mattered, and helps you
          find it again later.
        </p>

        <div id="get" className="mt-8 scroll-mt-24">
          <StoreBadges align="center" />
          <p className="mt-4 font-sans text-[13px] text-ink-faint">
            Free to start · iPhone and Android
          </p>
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
