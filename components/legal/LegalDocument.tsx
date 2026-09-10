import { Container } from '@/components/ui/Container';
import { LegalText } from '@/components/legal/LegalText';
import { NavLink } from '@/components/ui/NavLink';
import { entity } from '@/data/legal/entity';
import { isDraft, type Block, type LegalDoc } from '@/data/legal';

export function LegalDocument({ doc }: { doc: LegalDoc }) {
  const draft = isDraft(doc);

  return (
    <Container className="py-14 sm:py-20">
      <div className="mx-auto max-w-[760px]">
        <NavLink
          href="/legal"
          className="text-[13px] text-ink-soft hover:text-ink"
        >
          ← All policies
        </NavLink>

        <h1 className="mt-6 display text-[clamp(1.85rem,3.8vw,2.5rem)] text-ink">{doc.title}</h1>

        <p className="mt-4 text-[13px] text-ink-faint">
          <LegalText text={`Effective ${entity.effectiveDate} · Last updated ${entity.lastUpdated}`} />
        </p>

        {draft ? <DraftBanner /> : null}

        <div className="mt-10 rounded-card border border-line bg-cream p-6 sm:p-7">
          <h2 className="eyebrow">In short</h2>
          <div className="mt-4 space-y-3">
            {doc.summary.map((line) => (
              <p key={line} className="text-[15px] leading-[1.7] text-ink-soft">
                <LegalText text={line} />
              </p>
            ))}
          </div>
          <p className="mt-5 text-[13px] text-ink-faint">
            This summary is for reading. The sections below are what govern.
          </p>
        </div>

        <nav aria-label="Contents" className="mt-10 border-y border-line py-6">
          <h2 className="eyebrow">Contents</h2>
          <ol className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
            {doc.sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-[14px] text-ink-soft hover:text-ink"
                >
                  {section.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-4">
          {doc.sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-28 pt-10">
              <h2 className="heading text-[18px] text-ink">{section.heading}</h2>
              <div className="mt-4 space-y-4">
                {section.blocks.map((block, i) => (
                  <PolicyBlock key={i} block={block} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </Container>
  );
}

function DraftBanner() {
  return (
    <div className="mt-8 rounded-card border border-clay/30 bg-clay/[0.06] p-5">
      <p className="text-[14px] font-medium text-clay">Draft — not yet in force</p>
      <p className="mt-2 text-[14px] leading-[1.7] text-ink-soft">
        The highlighted values below have not been filled in yet, so this document does not
        accurately describe who operates Aura or how it processes data. Complete{' '}
        <code className="rounded bg-ivory px-1 py-0.5 text-[13px]">data/legal/entity.ts</code>, and
        have the result reviewed by a lawyer qualified in your jurisdiction, before relying on it.
      </p>
    </div>
  );
}

function PolicyBlock({ block }: { block: Block }) {
  switch (block.kind) {
    case 'p':
      return (
        <p className="text-[15px] leading-[1.75] text-ink-soft">
          <LegalText text={block.text} />
        </p>
      );

    case 'ul':
      return (
        <ul className="space-y-2.5">
          {block.items.map((item) => (
            <li
              key={item}
              className="relative pl-5 text-[15px] leading-[1.75] text-ink-soft before:absolute before:left-0 before:top-[0.7em] before:h-1 before:w-1 before:rounded-full before:bg-clay"
            >
              <LegalText text={item} />
            </li>
          ))}
        </ul>
      );

    case 'ol':
      return (
        <ol className="list-decimal space-y-2.5 pl-5 marker:marker:text-[13px] marker:text-ink-faint">
          {block.items.map((item) => (
            <li key={item} className="text-[15px] leading-[1.75] text-ink-soft">
              <LegalText text={item} />
            </li>
          ))}
        </ol>
      );

    case 'table':
      return (
        <div className="overflow-x-auto rounded-card border border-line">
          <table className="w-full min-w-[520px] border-collapse text-left">
            <thead>
              <tr className="bg-cream">
                {block.head.map((cell) => (
                  <th
                    key={cell}
                    scope="col"
                    className="border-b border-line px-4 py-3 text-[12px] font-semibold uppercase tracking-wide2 text-ink-faint"
                  >
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className="align-top">
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className="border-b border-line px-4 py-3 text-[14px] leading-[1.65] text-ink-soft last:border-r-0"
                    >
                      <LegalText text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case 'note':
      return (
        <div className="rounded-card border border-line bg-ivory p-5">
          {block.text.split('\n').map((line) => (
            <p key={line} className="text-[14px] leading-[1.8] text-ink">
              <LegalText text={line} />
            </p>
          ))}
        </div>
      );
  }
}
