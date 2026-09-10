import { Container } from '@/components/ui/Container';

export function PrivacyNote() {
  return (
    <section aria-label="Privacy" className="bg-ivory py-16 sm:py-20">
      <Container>
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:justify-center md:gap-10 md:text-left">
          <span className="wash relative flex h-24 w-24 shrink-0 items-center justify-center rounded-full border border-line">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-clay text-ivory shadow-card">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
                <path d="M12 2a5 5 0 0 0-5 5v3H6a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1h-1V7a5 5 0 0 0-5-5Zm3 8H9V7a3 3 0 1 1 6 0v3Zm-3 4a1.6 1.6 0 0 1 .8 3v2.2h-1.6V17a1.6 1.6 0 0 1 .8-3Z" />
              </svg>
            </span>
          </span>

          <div className="max-w-xl">
            <h2 className="display text-[clamp(1.45rem,2.6vw,1.9rem)] text-ink">
              Your memories belong to you.
            </h2>
            <p className="mx-auto mt-3 max-w-md text-[15px] leading-[1.7] text-ink-soft md:mx-0">
              Your entries are private and encrypted. Nothing is sold, nothing is published, and you
              can take everything with you.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
