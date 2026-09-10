import type { LegalDoc } from './types';
import { entity } from './entity';

/**
 * This site is a static export with no analytics, no tag manager, no embeds and
 * self-hosted fonts, so it genuinely sets no cookies. That is a factual claim
 * about the current build — if anything is ever added that sets a cookie or
 * calls a third-party host, this file has to change in the same commit.
 */
export const cookies: LegalDoc = {
  slug: 'cookies',
  title: 'Cookie Policy',
  shortTitle: 'Cookies',
  description:
    'What this website and the Aura app store on your device, and what they do not.',
  summary: [
    'This website sets no cookies. There is no analytics, no advertising pixel and no third-party tracker on it.',
    'The app keeps a small amount of data on your own device so you stay signed in and your settings survive a restart.',
    'If that ever changes, we will ask for your consent before setting anything that is not strictly necessary.',
  ],
  sections: [
    {
      id: 'what-they-are',
      heading: '1. What cookies and similar technologies are',
      blocks: [
        {
          kind: 'p',
          text: 'A cookie is a small file a website asks your browser to store. Similar technologies — local storage, session storage, device identifiers and software development kits — do comparable jobs in a browser or an app. They can be strictly necessary, or they can be used to measure behaviour and target advertising.',
        },
      ],
    },
    {
      id: 'this-website',
      heading: '2. What this website uses',
      blocks: [
        {
          kind: 'p',
          text: 'Nothing. This site is a set of static pages. It sets no cookies, runs no analytics or advertising scripts, embeds no third-party content, and loads its fonts and images from its own domain rather than from another company’s servers.',
        },
        {
          kind: 'p',
          text: 'Because no non-essential technology is in use, there is no consent banner to click and nothing to opt out of. Your web server logs are still processed by our host for security and reliability, as described in the Privacy Policy.',
        },
      ],
    },
    {
      id: 'the-app',
      heading: '3. What the app stores on your device',
      blocks: [
        {
          kind: 'p',
          text: 'The app keeps a small amount of data locally so it can work at all:',
        },
        {
          kind: 'table',
          head: ['What', 'Why', 'How long'],
          rows: [
            ['Authentication token', 'Keeps you signed in so you are not asked for credentials every time you open the app', 'Until you sign out or it expires'],
            ['Preferences', 'Remembers your settings, including whether AI features are on', 'Until you clear them or uninstall the app'],
            ['Cached diary content', 'Lets you read and write entries when you are offline, and makes the app fast', 'Until you sign out or uninstall the app'],
            ['Crash and diagnostic identifiers', 'Groups crash reports so a bug can be traced and fixed', '[[DIAGNOSTIC_RETENTION]]'],
          ],
        },
        {
          kind: 'p',
          text: 'None of this is used for advertising. Deleting the app removes the locally stored data from your device; your account is deleted separately, from inside the app or by asking us.',
        },
      ],
    },
    {
      id: 'third-parties',
      heading: '4. Third parties',
      blocks: [
        {
          kind: 'p',
          text: `We do not permit advertising networks or data brokers to place technology in the app or on this site. The service providers we do use are listed in section 7 of the Privacy Policy, and they act on our instructions rather than for their own purposes. Any advertising identifier your operating system holds — Apple’s IDFA or Google’s Advertising ID — is not requested or read by us: ${'[[ADVERTISING_ID_STANCE]]'}.`,
        },
      ],
    },
    {
      id: 'control',
      heading: '5. Your controls',
      blocks: [
        {
          kind: 'ul',
          items: [
            'Your browser can block or clear cookies and site data for any site, including this one.',
            'Your device settings let you reset or limit the advertising identifier your operating system holds.',
            'Signing out of the app clears its stored token; uninstalling removes its local data.',
          ],
        },
        {
          kind: 'p',
          text: `Questions about any of this go to ${entity.privacyEmail}.`,
        },
      ],
    },
    {
      id: 'changes',
      heading: '6. Changes',
      blocks: [
        {
          kind: 'p',
          text: `If we ever add analytics or any other non-essential technology, we will update this policy and ask for your consent before it runs. This version takes effect on ${entity.effectiveDate} and was last updated on ${entity.lastUpdated}.`,
        },
      ],
    },
  ],
};
