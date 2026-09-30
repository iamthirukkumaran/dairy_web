import { Container } from '@/components/ui/Container';
import { NavLink } from '@/components/ui/NavLink';

export function PrivacyNote() {
  return (
    <section aria-label="Privacy" className="section-b bg-ivory">
      <Container>
        <div className="mx-auto max-w-3xl rounded-card border border-line bg-paper/90 p-8 sm:p-10 shadow-soft">
          <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-center sm:gap-8 sm:text-left">
            <span className="wash flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-line sm:h-24 sm:w-24">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-clay text-ivory shadow-card sm:h-14 sm:w-14">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
                  <path d="M12 2a5 5 0 0 0-5 5v3H6a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1h-1V7a5 5 0 0 0-5-5Zm3 8H9V7a3 3 0 1 1 6 0v3Zm-3 4a1.6 1.6 0 0 1 .8 3v2.2h-1.6V17a1.6 1.6 0 0 1 .8-3Z" />
                </svg>
              </span>
            </span>

            <div className="min-w-0">
              <span className="eyebrow text-clay">Zero AI · 100% Confidential</span>
              <h2 className="display mt-1 text-[clamp(1.5rem,4vw,2.1rem)] text-ink">
                Your memories belong to you. Not to AI models.
              </h2>
              <p className="mt-3 text-[15px] leading-[1.75] text-ink-soft">
                Your voice recordings and written entries are encrypted at rest with AES-256 and protected by device biometrics. We never deploy generative AI bots on your journal, we never feed your life stories to machine learning datasets, and we never advertise against your thoughts.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-[13.5px]">
                <NavLink href="/privacy" className="font-medium text-clay hover:underline underline-offset-4">
                  Explore our Privacy Principles →
                </NavLink>
                <span className="text-line">•</span>
                <NavLink href="/legal/privacy-policy" className="text-ink-soft hover:text-ink">
                  Full Privacy Policy
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
