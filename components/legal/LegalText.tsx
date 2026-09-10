import { Fragment } from 'react';
import { placeholderPattern } from '@/data/legal/entity';

/**
 * Renders a string of policy text, marking any unfilled placeholder so it is
 * impossible to read the page and not notice that a fact is missing.
 */
export function LegalText({ text }: { text: string }) {
  const parts = text.split(placeholderPattern());
  const found = text.match(placeholderPattern()) ?? [];

  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {part}
          {found[i] ? (
            <span
              title="Unfilled placeholder — see data/legal/entity.ts"
              className="rounded bg-clay/10 px-1.5 py-0.5 text-[0.85em] font-medium text-clay"
            >
              {found[i].slice(2, -2).replace(/_/g, ' ').toLowerCase()}
            </span>
          ) : null}
        </Fragment>
      ))}
    </>
  );
}
