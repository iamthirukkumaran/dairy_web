import { Container } from '@/components/ui/Container';
import { NavLink } from '@/components/ui/NavLink';
import { Wordmark } from '@/components/Mark';
import { footerColumns, site } from '@/data/site';
import { entity, hasPlaceholder } from '@/data/legal/entity';

export function Footer() {
  const identityKnown = !hasPlaceholder(entity.legalName + entity.registeredAddress);

  return (
    <footer className="border-t border-line bg-ivory">
      <Container className="py-12 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.9fr)] lg:gap-16">
          <div>
            <Wordmark />
            <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-ink-soft">
              {site.tagline}
            </p>
            <NavLink
              href={site.links.contact}
              className="transition-ui mt-4 inline-block text-[14px] text-ink-soft underline decoration-line underline-offset-4 hover:text-ink hover:decoration-clay"
            >
              {site.links.contact.replace('mailto:', '')}
            </NavLink>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-4 sm:gap-x-8">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h2 className="eyebrow">{col.title}</h2>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <NavLink
                        href={link.href}
                        className="transition-ui inline-block py-1 text-[14px] text-ink-soft hover:text-ink"
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

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <p className="text-[13px] text-ink-faint">
              © {site.year} Aura ·{' '}
              <NavLink href="/legal" className="transition-ui hover:text-ink">
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
