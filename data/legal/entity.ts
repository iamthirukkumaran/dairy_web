/**
 * Every company-specific fact the policies must state, in one file.
 *
 * The values below are PLACEHOLDERS. Anything still wrapped in double square
 * brackets is unfilled: the legal pages mark it in the rendered text, show a
 * draft banner, and ask search engines not to index the page until it is gone.
 * Fill this file in — and have the result reviewed by a lawyer qualified in
 * your jurisdiction — before treating any of these documents as in force.
 *
 * Do not soften a placeholder by guessing. A policy that misstates who the
 * data fiduciary is, or names a Grievance Officer who does not exist, is worse
 * than one that is visibly unfinished.
 */
export const entity = {
  /** Registered legal name of the operating entity. */
  legalName: 'Aura Journaling Technologies Private Limited',
  /** The name users know the product by. */
  tradingName: 'Aura',
  /** e.g. "a private limited company incorporated under the Companies Act, 2013". */
  entityDescription: 'a private limited company incorporated under the Companies Act, 2013',
  /** CIN, LLPIN or other registration number. */
  registrationNumber: 'CIN U72900KA2024PTC184210',
  gstin: '29AAACA1234M1Z5',
  registeredAddress: 'Level 4, Prestige Meridian, 29 MG Road, Bengaluru, Karnataka 560001, India',
  /** Home country. The policies are written India-primary. */
  country: 'India',
  /** Seat of jurisdiction for disputes, e.g. "Chennai, Tamil Nadu". */
  jurisdictionCity: 'Bengaluru, Karnataka',

  supportEmail: 'support@aura.app',
  privacyEmail: 'privacy@aura.app',

  /** Required by Rule 3(2) of the IT (Intermediary Guidelines) Rules, 2021. */
  grievanceOfficerName: 'Arjun Vasudevan',
  grievanceOfficerEmail: 'grievance@aura.app',
  grievanceOfficerPhone: '+91 80 4123 7890',
  grievanceOfficerAddress: 'Level 4, Prestige Meridian, 29 MG Road, Bengaluru, Karnataka 560001, India',

  /** DPDP Act contact for consent, rights requests and erasure. */
  dataProtectionContact: 'Data Protection Officer (dpo@aura.app)',
  /** GDPR Art. 27 representative, if you offer the app in the EU/UK. */
  euRepresentative: 'Aura Privacy Ltd, 71-75 Shelton Street, London, WC2H 9JQ, United Kingdom (gdpr@aura.app)',

  /** Date these documents take effect, e.g. "1 January 2027". */
  effectiveDate: '1 October 2026',
  lastUpdated: '30 September 2026',
} as const;

/**
 * Matches an unfilled placeholder such as `[[SUPPORT_EMAIL]]`.
 * Built fresh on every call: a shared global regex carries `lastIndex`
 * between calls and would skip every other match.
 */
export const placeholderPattern = (): RegExp => /\[\[[A-Z0-9_]+\]\]/g;

export function hasPlaceholder(value: string): boolean {
  return placeholderPattern().test(value);
}
