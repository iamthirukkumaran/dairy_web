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
  legalName: '[[LEGAL_ENTITY_NAME]]',
  /** The name users know the product by. */
  tradingName: 'Aura',
  /** e.g. "a private limited company incorporated under the Companies Act, 2013". */
  entityDescription: '[[ENTITY_TYPE_AND_INCORPORATION]]',
  /** CIN, LLPIN or other registration number. */
  registrationNumber: '[[CIN_OR_REGISTRATION_NUMBER]]',
  gstin: '[[GSTIN]]',
  registeredAddress: '[[REGISTERED_OFFICE_ADDRESS]]',
  /** Home country. The policies are written India-primary. */
  country: 'India',
  /** Seat of jurisdiction for disputes, e.g. "Chennai, Tamil Nadu". */
  jurisdictionCity: '[[CITY_AND_STATE_OF_JURISDICTION]]',

  supportEmail: '[[SUPPORT_EMAIL]]',
  privacyEmail: '[[PRIVACY_EMAIL]]',

  /** Required by Rule 3(2) of the IT (Intermediary Guidelines) Rules, 2021. */
  grievanceOfficerName: '[[GRIEVANCE_OFFICER_NAME]]',
  grievanceOfficerEmail: '[[GRIEVANCE_OFFICER_EMAIL]]',
  grievanceOfficerPhone: '[[GRIEVANCE_OFFICER_PHONE]]',
  grievanceOfficerAddress: '[[GRIEVANCE_OFFICER_POSTAL_ADDRESS]]',

  /** DPDP Act contact for consent, rights requests and erasure. */
  dataProtectionContact: '[[DATA_PROTECTION_CONTACT_NAME_AND_EMAIL]]',
  /** GDPR Art. 27 representative, if you offer the app in the EU/UK. */
  euRepresentative: '[[EU_UK_REPRESENTATIVE_OR_NOT_APPLICABLE]]',

  /** Date these documents take effect, e.g. "1 January 2027". */
  effectiveDate: '[[EFFECTIVE_DATE]]',
  lastUpdated: '[[LAST_UPDATED_DATE]]',
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
