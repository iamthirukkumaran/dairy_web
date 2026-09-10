import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Container } from '@/components/ui/Container';
import { NavLink } from '@/components/ui/NavLink';
import { LegalText } from '@/components/legal/LegalText';
import { entity } from '@/data/legal/entity';
import { isDraft, legalDocs } from '@/data/legal';

export const metadata: Metadata = {
  title: 'Policies',
  description:
    'Aura’s Privacy Policy, Terms of Service, Refunds and Cancellations Policy, Shipping Policy and Cookie Policy.',
  alternates: { canonical: '/legal' },
};

export default function LegalIndexPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Container className="py-16 sm:py-24">
          <div className="mx-auto max-w-[760px]">
            <p className="eyebrow">Legal</p>
            <h1 className="mt-3 display text-[clamp(1.9rem,4vw,2.6rem)] text-ink">
              The paperwork, in plain language.
            </h1>
            <p className="mt-5 max-w-prose text-[16px] leading-[1.7] text-ink-soft">
              Every policy below opens with a short summary you can actually read, followed by the
              sections that govern. Nothing in them claims Aura does something it does not do.
            </p>

            <ul className="mt-12 divide-y divide-line border-y border-line">
              {legalDocs.map((doc) => (
                <li key={doc.slug}>
                  <NavLink
                    href={`/legal/${doc.slug}`}
                    className="group flex items-start justify-between gap-6 py-6"
                  >
                    <span>
                      <span className="flex items-center gap-3">
                        <span className="heading text-[17px] text-ink">{doc.title}</span>
                        {isDraft(doc) ? (
                          <span className="rounded-pill border border-clay/30 bg-clay/[0.08] px-2 py-0.5 text-[10px] uppercase tracking-wide2 text-clay">
                            Draft
                          </span>
                        ) : null}
                      </span>
                      <span className="mt-1.5 block max-w-prose text-[14px] leading-[1.7] text-ink-soft">
                        {doc.description}
                      </span>
                    </span>
                    <svg
                      viewBox="0 0 20 20"
                      className="mt-1.5 h-4 w-4 shrink-0 text-ink-faint group-hover:text-ink"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-hidden="true"
                    >
                      <path d="M3 10h13M11.5 5.5 16 10l-4.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="mt-12 rounded-card border border-line bg-cream p-6">
              <h2 className="eyebrow">Grievance Officer</h2>
              <p className="mt-3 text-[14px] leading-[1.8] text-ink-soft">
                Appointed under Rule 3(2) of the Information Technology (Intermediary Guidelines and
                Digital Media Ethics Code) Rules, 2021. Complaints are acknowledged within 24 hours
                and resolved within 15 days.
              </p>
              <p className="mt-4 text-[14px] leading-[1.8] text-ink">
                <LegalText text={entity.grievanceOfficerName} />
                <br />
                <LegalText text={entity.grievanceOfficerAddress} />
                <br />
                <LegalText text={entity.grievanceOfficerEmail} />
                {' · '}
                <LegalText text={entity.grievanceOfficerPhone} />
              </p>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
