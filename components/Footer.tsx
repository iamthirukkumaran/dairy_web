import { Container } from '@/components/ui/Container';
import { NavLink } from '@/components/ui/NavLink';
import { Wordmark } from '@/components/Mark';
import { footerColumns, site } from '@/data/site';
import { entity, hasPlaceholder } from '@/data/legal/entity';

export function Footer() {
  const identityKnown = !hasPlaceholder(entity.legalName + entity.registeredAddress);

  return (
    <footer className="border-t border-line bg-ivory">
      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] lg:gap-16">
          <div>
            <Wordmark />
            <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-ink-soft">
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
                        className="text-[14px] text-ink-soft hover:text-ink"
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

        <div className="mt-12 border-t border-line pt-6">
          {identityKnown ? (
            <p className="mb-4 max-w-prose text-[12px] leading-[1.7] text-ink-faint">
              {entity.legalName} · {entity.registeredAddress} · {entity.supportEmail}
            </p>
          ) : null}

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[13px] text-ink-faint">
              © {site.year} Aura ·{' '}
              <NavLink href="/legal" className="hover:text-ink">
                Policies
              </NavLink>
            </p>
            <p className="text-[13px] text-ink-faint">{site.supportingLine}</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
