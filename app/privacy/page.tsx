import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { StoreBadges } from '@/components/StoreBadges';
import { NavLink } from '@/components/ui/NavLink';
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
        <Container className="section">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow text-clay">Zero AI · Absolute Confidentiality</span>
            <h1 className="mt-3 display text-[clamp(2.1rem,5vw,3rem)] text-ink">
              A personal diary should
              <br />
              <span className="italic font-normal text-clay">always stay personal.</span>
            </h1>
            <p className="mt-5 text-[16px] leading-[1.75] text-ink-soft">
              Your reflections are recorded for one reader: you. Aura is intentionally built without generative AI models, language scraping algorithms, or behavioral tracking.
            </p>
          </div>

          <ul className="mt-14 grid gap-5 sm:grid-cols-2">
            {privacyControls.map((item) => (
              <li key={item.title} className="card card-hover border border-line bg-paper p-6 sm:p-7 shadow-soft">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cream text-clay">
                    ✓
                  </span>
                  <h2 className="text-[16px] font-semibold text-ink">{item.title}</h2>
                </div>
                <p className="mt-3 text-[14px] leading-[1.7] text-ink-soft">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-14 rounded-card border border-line bg-cream p-6 text-center sm:p-8">
            <h2 className="heading text-[18px] text-ink">
              This page describes the product. The Privacy Policy governs.
            </h2>
            <p className="mx-auto mt-3 max-w-prose text-[15px] leading-[1.7] text-ink-soft">
              For what we collect, why, who it reaches, how long we keep it and the rights you have
              over it, read the policy itself.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2">
              <NavLink href="/legal/privacy-policy" className="transition-ui inline-block py-1 text-[14px] text-clay hover:text-ink">
                Privacy Policy
              </NavLink>
              <NavLink href="/legal/cookies" className="transition-ui inline-block py-1 text-[14px] text-clay hover:text-ink">
                Cookie Policy
              </NavLink>
              <NavLink href="/legal" className="transition-ui inline-block py-1 text-[14px] text-clay hover:text-ink">
                All policies
              </NavLink>
            </div>
          </div>

          <div className="mt-14 border-t border-line pt-10 text-center">
            <p className="heading text-[18px] text-ink">Start remembering today.</p>
            <StoreBadges align="center" className="mt-6" />
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
