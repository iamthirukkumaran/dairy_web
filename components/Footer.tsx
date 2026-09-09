import { Container } from '@/components/ui/Container';
import { NavLink } from '@/components/ui/NavLink';
import { footerColumns, site } from '@/data/site';

export function Footer() {
  return (
    <footer className="border-t border-line bg-ivory">
      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] lg:gap-16">
          <div>
            <p className="font-serif text-[20px] tracking-[0.18em] text-ink">AURA</p>
            <p className="mt-3 max-w-xs font-sans text-[15px] leading-relaxed text-ink-soft">
              {site.tagline}
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h2 className="eyebrow">{col.title}</h2>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <NavLink
                        href={link.href}
                        className="font-sans text-[14px] text-ink-soft hover:text-ink"
                      >
                        {link.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans text-[13px] text-ink-faint">© {site.year} Aura</p>
          <p className="font-sans text-[13px] text-ink-faint">{site.supportingLine}</p>
        </div>
      </Container>
    </footer>
  );
}
