import { Container } from '@/components/ui/Container';
import { footerColumns, site } from '@/data/site';

export function Footer() {
  return (
    <footer className="border-t border-ink/[0.08] bg-ivory">
      <Container wide className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)] lg:gap-20">
          <div>
            <p className="font-serif text-[24px] tracking-[0.2em] text-ink">AURA</p>
            <p className="mt-4 max-w-xs font-serif text-[20px] leading-snug tracking-editorial text-ink-soft">
              {site.tagline}
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h2 className="eyebrow">{col.title}</h2>
                <ul className="mt-5 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        data-cursor="cta"
                        className="link-underline font-sans text-[14px] text-ink-soft transition-colors duration-300 hover:text-ink"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-ink/[0.08] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans text-[13px] text-ink-faint">
            © {site.year} Aura. Made for people who want to remember.
          </p>
          <p className="font-sans text-[13px] text-ink-faint">
            {site.supportingLine}
          </p>
        </div>
      </Container>
    </footer>
  );
}
