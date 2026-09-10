import type { LegalDoc } from './types';
import { entity } from './entity';

/**
 * Terms of use for the app, the website and the printed book service.
 *
 * Indian consumer law is not waivable by contract: nothing here may be drafted
 * to remove a right the Consumer Protection Act, 2019 gives a user. The
 * liability and jurisdiction clauses are written on that assumption.
 */
export const terms: LegalDoc = {
  slug: 'terms',
  title: 'Terms of Service',
  shortTitle: 'Terms',
  description:
    'The agreement between you and Aura: your account, your content, subscriptions, printed books, and the limits of what the service promises.',
  summary: [
    'Your diary is yours. You keep every right in what you write; we get only the narrow permission we need to store it, write it up and show it back to you.',
    'Aura is a journalling app. It is not a medical, psychological or emergency service, and what it writes can be wrong.',
    'Subscriptions are billed by Apple or Google. Printed books are ordered from us and covered by separate shipping and refund policies.',
    'You can stop using Aura and delete everything at any time.',
  ],
  sections: [
    {
      id: 'agreement',
      heading: '1. This agreement',
      blocks: [
        {
          kind: 'p',
          text: `These Terms are a binding agreement between you and ${entity.legalName}, ${entity.entityDescription}, with its registered office at ${entity.registeredAddress} ("${entity.tradingName}", "we", "us"). They apply when you create an account, use the app or this website, or order a printed book.`,
        },
        {
          kind: 'p',
          text: 'They are published in accordance with Rule 3(1)(a) of the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021. Our Privacy Policy, Cookie Policy, Shipping Policy and Refunds and Cancellations Policy form part of them.',
        },
        { kind: 'p', text: 'If you do not agree with them, do not use Aura.' },
      ],
    },
    {
      id: 'eligibility',
      heading: '2. Who may use Aura',
      blocks: [
        {
          kind: 'p',
          text: 'You must be at least 18 years old to hold an account. If you are under 18, you may use Aura only with the involvement and verifiable consent of a parent or lawful guardian, who accepts these Terms on your behalf and is responsible for your use of the service.',
        },
        {
          kind: 'p',
          text: 'You must be legally capable of entering into a contract under the Indian Contract Act, 1872, or the equivalent law where you live, and not barred from receiving the service under any applicable law.',
        },
      ],
    },
    {
      id: 'account',
      heading: '3. Your account',
      blocks: [
        {
          kind: 'p',
          text: 'You are responsible for your account and for keeping your sign-in credentials and device secure. Tell us promptly if you believe someone else has access to your account.',
        },
        {
          kind: 'p',
          text: 'Give us accurate information when you sign up and keep it current. Do not impersonate anyone, and do not create an account on someone else’s behalf without their authority.',
        },
      ],
    },
    {
      id: 'the-service',
      heading: '4. What Aura does',
      blocks: [
        {
          kind: 'p',
          text: 'Aura records what you say about your day, transcribes it, writes it into a diary entry, keeps the people, places and themes it recognises so you can search them later, and can lay a year of entries out as a book.',
        },
        {
          kind: 'p',
          text: 'We may add, change or withdraw features. If we withdraw a feature you rely on, or discontinue the service, we will give you reasonable notice and a way to export your diary before it happens.',
        },
        {
          kind: 'p',
          text: 'The service needs a working internet connection and a supported device. We do not promise it will be uninterrupted or error-free, and maintenance and outages happen.',
        },
      ],
    },
    {
      id: 'your-content',
      heading: '5. Your content stays yours',
      blocks: [
        {
          kind: 'p',
          text: 'You own everything you put into Aura — your recordings, entries, edits, photographs and attachments. Nothing in these Terms transfers ownership of any of it to us.',
        },
        {
          kind: 'p',
          text: 'You grant us a limited, worldwide, non-exclusive, royalty-free licence to host, store, back up, transmit, transcribe, reformat and display your content, solely so that we can operate the service for you and do the things described in the Privacy Policy. The licence exists only to run Aura for you. It ends when you delete the content or your account, apart from copies retained in backups for the period stated in the Privacy Policy and anything we must keep by law.',
        },
        {
          kind: 'p',
          text: 'We will not publish your diary, share it with other users, sell it, or use it in marketing. We will not use your content to train AI models except as described in section 5 of the Privacy Policy, and never without asking you first.',
        },
      ],
    },
    {
      id: 'acceptable-use',
      heading: '6. Acceptable use',
      blocks: [
        { kind: 'p', text: 'You agree not to use Aura to:' },
        {
          kind: 'ul',
          items: [
            'break any law, or infringe anyone’s intellectual property, privacy or publicity rights;',
            'store or transmit material that is unlawful under Indian law, including material that is obscene, paedophilic, or that invades another person’s privacy;',
            'record another person without the consent the law where you are requires;',
            'attempt to gain unauthorised access to the service, another user’s account, or any system connected to it;',
            'probe, scan, reverse engineer, decompile or interfere with the service, except to the extent that applicable law expressly permits it despite this restriction;',
            'introduce malware or anything designed to disrupt the service;',
            'scrape, resell, sublicense or commercially exploit the service or any part of it without our written permission;',
            'use the service in a way that imposes an unreasonable load on our infrastructure.',
          ],
        },
        {
          kind: 'p',
          text: 'We do not routinely read your diary. Where we are required by law to act on unlawful content, or where we detect abuse of the service, we may suspend or remove access in accordance with section 11.',
        },
      ],
    },
    {
      id: 'ai-limits',
      heading: '7. AI output, and what Aura is not',
      blocks: [
        {
          kind: 'p',
          text: 'Aura writes with the help of automated speech recognition and language models. They misheard things, miss things, and occasionally invent things. An entry Aura writes is a draft of your day for you to correct — not a record of fact, not evidence, and not a transcript you should rely on for any legal, medical or financial purpose.',
        },
        {
          kind: 'p',
          text: 'Aura is not a medical device, a mental health service, a diagnosis, a therapy, or professional advice of any kind. Nothing it writes or suggests is a substitute for a qualified professional.',
        },
        {
          kind: 'note',
          text: 'Aura cannot help in an emergency and does not monitor entries for signs of crisis. If you or someone else is in danger, contact your local emergency services or a crisis helpline immediately.',
        },
      ],
    },
    {
      id: 'subscriptions',
      heading: '8. Subscriptions and billing',
      blocks: [
        {
          kind: 'p',
          text: 'Aura has a free tier and a paid subscription. Prices, inclusive of applicable taxes, are shown before you buy.',
        },
        {
          kind: 'p',
          text: 'Subscriptions bought inside the app are sold and billed by Apple or Google under their own terms. They renew automatically at the end of each period unless you cancel at least 24 hours before it ends, and you manage or cancel them in your App Store or Google Play account settings, not here.',
        },
        {
          kind: 'p',
          text: 'If we change the price of a subscription, the change applies from your next renewal and we will tell you before it takes effect, so you can cancel first if you would rather.',
        },
        {
          kind: 'p',
          text: 'Refunds for subscriptions are dealt with in our Refunds and Cancellations Policy.',
        },
      ],
    },
    {
      id: 'books',
      heading: '9. Printed books',
      blocks: [
        {
          kind: 'p',
          text: 'A printed book is made to order from the entries you choose. You confirm the contents in a preview before anything is printed, and you are responsible for what that preview contains — including any personal data about other people that appears in your entries.',
        },
        {
          kind: 'p',
          text: 'Because each book is manufactured to your specification, cancellation is only possible before it goes to print. Delivery, cancellation and refund terms are set out in the Shipping Policy and the Refunds and Cancellations Policy, which apply to every book order.',
        },
        {
          kind: 'p',
          text: 'Printing, colour and binding vary slightly between copies. A minor variation from the on-screen preview is not a defect.',
        },
      ],
    },
    {
      id: 'ip',
      heading: '10. Our intellectual property',
      blocks: [
        {
          kind: 'p',
          text: `The ${entity.tradingName} name, logo, software, design, and the text and images on this website belong to ${entity.legalName} or our licensors. These Terms give you a personal, non-transferable, non-exclusive, revocable licence to use the app for your own personal, non-commercial use, and nothing more.`,
        },
        {
          kind: 'p',
          text: 'If you send us feedback or a suggestion, we may use it to improve the product without owing you anything for it. You are not obliged to send us any.',
        },
      ],
    },
    {
      id: 'suspension',
      heading: '11. Suspension and termination',
      blocks: [
        {
          kind: 'p',
          text: 'You may stop using Aura at any time and delete your account from inside the app. Deleting your account deletes your diary, as described in the Privacy Policy.',
        },
        {
          kind: 'p',
          text: 'We may suspend or terminate your access if you materially breach these Terms, if we are required to by law, or if your use puts the service or other users at risk. Except where the breach is serious or the law requires immediate action, we will give you notice and a fair chance to put it right first.',
        },
        {
          kind: 'p',
          text: 'If we terminate your account other than for a serious breach, we will give you a reasonable opportunity to export your diary, and refund the unused portion of any subscription you have paid for in advance.',
        },
      ],
    },
    {
      id: 'warranties',
      heading: '12. Disclaimers',
      blocks: [
        {
          kind: 'p',
          text: 'Beyond what these Terms and applicable law expressly provide, the service is provided as it is and as it is available. We do not warrant that it will be uninterrupted, secure against every attack, free of errors, or that transcription and AI output will be accurate.',
        },
        {
          kind: 'p',
          text: 'Nothing in this section limits any warranty, guarantee or right that the Consumer Protection Act, 2019 or any other applicable law gives you and does not allow to be excluded.',
        },
      ],
    },
    {
      id: 'liability',
      heading: '13. Limitation of liability',
      blocks: [
        {
          kind: 'p',
          text: 'We are not liable for indirect, incidental, special, punitive or consequential loss, or for loss of profits, revenue, goodwill or anticipated savings, arising out of or in connection with your use of Aura.',
        },
        {
          kind: 'p',
          text: 'Our total aggregate liability arising out of or in connection with these Terms in any twelve-month period is limited to the greater of the amount you paid us in that period, or ₹1,000.',
        },
        {
          kind: 'p',
          text: 'These limits do not apply to liability for death or personal injury caused by our negligence, for fraud or fraudulent misrepresentation, for a breach of your rights under the Consumer Protection Act, 2019, or to any other liability that cannot lawfully be limited or excluded.',
        },
        {
          kind: 'p',
          text: 'Keep your own copies of anything you cannot bear to lose. Aura gives you export at any time for exactly that reason.',
        },
      ],
    },
    {
      id: 'indemnity',
      heading: '14. Indemnity',
      blocks: [
        {
          kind: 'p',
          text: 'You agree to indemnify us against claims, losses and reasonable costs arising from your breach of these Terms or your unlawful use of the service. This does not apply to the extent the claim arises from our own act or omission, and we will notify you of any claim promptly and not settle it without your agreement.',
        },
      ],
    },
    {
      id: 'complaints',
      heading: '15. Complaints',
      blocks: [
        {
          kind: 'p',
          text: 'If something has gone wrong, tell our Grievance Officer. We acknowledge complaints within 24 hours and resolve them within 15 days, as the IT Rules, 2021 require.',
        },
        {
          kind: 'note',
          text: `${entity.grievanceOfficerName}, Grievance Officer\n${entity.legalName}\n${entity.grievanceOfficerAddress}\nEmail: ${entity.grievanceOfficerEmail}\nPhone: ${entity.grievanceOfficerPhone}`,
        },
        {
          kind: 'p',
          text: 'You may also take a consumer complaint to the appropriate consumer forum under the Consumer Protection Act, 2019, or use the National Consumer Helpline. Nothing here requires you to come to us first.',
        },
      ],
    },
    {
      id: 'governing-law',
      heading: '16. Governing law and disputes',
      blocks: [
        {
          kind: 'p',
          text: `These Terms are governed by the laws of India. Subject to the paragraph below, the courts at ${entity.jurisdictionCity} have jurisdiction over any dispute arising out of them.`,
        },
        {
          kind: 'p',
          text: 'If you are a consumer, this does not deprive you of the protection of the mandatory laws of the country where you live, or of your right under the Consumer Protection Act, 2019 to bring proceedings where you reside. If you are in the EU or the UK, you keep the right to bring proceedings in your own country of residence.',
        },
        { kind: 'p', text: 'Let us try to resolve it directly before either of us goes to court. Most things are a misunderstanding and a reply away.' },
      ],
    },
    {
      id: 'general',
      heading: '17. General',
      blocks: [
        {
          kind: 'p',
          text: 'If a provision of these Terms is held unenforceable, the rest continues in force. Our not enforcing a term is not a waiver of it. You may not transfer your rights under these Terms without our consent; we may transfer ours to a successor of the business, on notice to you.',
        },
        {
          kind: 'p',
          text: 'We may update these Terms. If a change materially affects your rights we will give you reasonable notice before it takes effect, and continuing to use Aura after that date means you accept the change. If you do not, you can stop using the service and delete your account.',
        },
        { kind: 'p', text: `These Terms take effect on ${entity.effectiveDate} and were last updated on ${entity.lastUpdated}.` },
      ],
    },
    {
      id: 'contact',
      heading: '18. How to contact us',
      blocks: [
        {
          kind: 'note',
          text: `${entity.legalName}\n${entity.registeredAddress}\nSupport: ${entity.supportEmail}\nGrievance Officer: ${entity.grievanceOfficerEmail}`,
        },
      ],
    },
  ],
};
