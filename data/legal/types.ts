/**
 * The block model every legal document is written in.
 *
 * Policies are data, not markup: keeping them as structured blocks means the
 * wording can be reviewed and edited by a lawyer without touching a component,
 * and every document renders with the same typography and anchor links.
 */
export type Block =
  | { kind: 'p'; text: string }
  | { kind: 'ul'; items: string[] }
  | { kind: 'ol'; items: string[] }
  | { kind: 'table'; head: string[]; rows: string[][] }
  /** A short aside — used for statutory contact blocks and cautions. */
  | { kind: 'note'; text: string };

export type LegalSection = {
  /** Stable anchor. Never rename one that has been published; law gets cited. */
  id: string;
  heading: string;
  blocks: Block[];
};

export type LegalDoc = {
  slug: string;
  /** Full legal title, used as the page heading. */
  title: string;
  /** Short label for navigation and the footer. */
  shortTitle: string;
  description: string;
  /** Plain-language summary. Explanatory only — the sections govern. */
  summary: string[];
  sections: LegalSection[];
};
