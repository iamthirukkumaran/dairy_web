import type { Block, LegalDoc } from './types';
import { hasPlaceholder } from './entity';
import { privacyPolicy } from './privacy-policy';
import { terms } from './terms';
import { cookies } from './cookies';
import { refunds } from './refunds';
import { shipping } from './shipping';

export type { Block, LegalDoc, LegalSection } from './types';

/** Order here is the order they appear in the index and the footer. */
export const legalDocs: LegalDoc[] = [privacyPolicy, terms, refunds, shipping, cookies];

export function getLegalDoc(slug: string): LegalDoc | undefined {
  return legalDocs.find((doc) => doc.slug === slug);
}

function blockText(block: Block): string[] {
  switch (block.kind) {
    case 'p':
    case 'note':
      return [block.text];
    case 'ul':
    case 'ol':
      return block.items;
    case 'table':
      return [...block.head, ...block.rows.flat()];
  }
}

/**
 * True while any company-specific fact in the document is still unfilled.
 * A document in that state is shown with a draft banner and asked not to be
 * indexed — a half-written policy should not be the version a court reads.
 */
export function isDraft(doc: LegalDoc): boolean {
  const strings = [
    doc.title,
    doc.description,
    ...doc.summary,
    ...doc.sections.flatMap((section) => [section.heading, ...section.blocks.flatMap(blockText)]),
  ];
  return strings.some(hasPlaceholder);
}
