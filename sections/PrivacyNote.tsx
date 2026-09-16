import { Container } from '@/components/ui/Container';

export function PrivacyNote() {
  return (
    <section aria-label="Privacy" className="section-b bg-ivory">
      <Container>
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center sm:flex-row sm:items-center sm:gap-8 sm:text-left">
          <span className="wash flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-line sm:h-24 sm:w-24">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-clay text-ivory shadow-card sm:h-14 sm:w-14">
              <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" aria-hidden="true">
                <path d="M12 2a5 5 0 0 0-5 5v3H6a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1h-1V7a5 5 0 0 0-5-5Zm3 8H9V7a3 3 0 1 1 6 0v3Zm-3 4a1.6 1.6 0 0 1 .8 3v2.2h-1.6V17a1.6 1.6 0 0 1 .8-3Z" />
              </svg>
            </span>
          </span>

          <div className="min-w-0">
            <h2 className="display text-[clamp(1.35rem,5vw,1.9rem)] text-ink sm:text-[clamp(1.45rem,2.6vw,1.9rem)]">
              Your memories belong to you.
            </h2>
            <p className="mt-3 text-[15px] leading-[1.7] text-ink-soft">
              Your entries are private and encrypted. Nothing is sold, nothing is published, and you
              can take everything with you.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
