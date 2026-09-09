import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { StoreBadges } from '@/components/StoreBadges';
import { privacyControls } from '@/data/privacy';

export const metadata: Metadata = {
  title: 'Privacy',
  description:
    'What Aura keeps, what you control, and how to take your diary with you or delete it.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Container className="py-16 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Privacy</p>
            <h1 className="mt-3 display text-[clamp(2.1rem,5vw,3.2rem)] text-ink">
              A diary should stay a diary.
            </h1>
            <p className="mt-5 font-sans text-[16px] leading-[1.65] text-ink-soft">
              Your entries are written for one reader. You decide how much Aura does, and you can
              take everything with you or delete it at any time.
            </p>
          </div>

          <ul className="mt-14 grid gap-4 sm:grid-cols-2">
            {privacyControls.map((item) => (
              <li key={item.title} className="rounded-card border border-line bg-paper p-6">
                <h2 className="font-sans text-[15px] font-medium text-ink">{item.title}</h2>
                <p className="mt-2 font-sans text-[14px] leading-[1.7] text-ink-soft">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-14 border-t border-line pt-10 text-center">
            <p className="font-serif text-[20px] tracking-editorial text-ink">
              Start remembering today.
            </p>
            <StoreBadges align="center" className="mt-6" />
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
