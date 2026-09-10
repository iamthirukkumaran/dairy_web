import type { LegalDoc } from './types';
import { entity } from './entity';

/**
 * Required by Rule 6(5) of the Consumer Protection (E-Commerce) Rules, 2020,
 * which obliges a seller to publish delivery and shipment terms before a
 * consumer commits to an order.
 */
export const shipping: LegalDoc = {
  slug: 'shipping',
  title: 'Shipping and Delivery Policy',
  shortTitle: 'Shipping',
  description:
    'Where we ship printed books, how long printing and delivery take, what it costs, and what happens when a parcel goes astray.',
  summary: [
    'A book is printed after you approve the preview, then bound, then dispatched with a tracking number.',
    'Production and delivery are separate clocks. The total is printing time plus transit time.',
    'Get the delivery address right — once a book is dispatched we cannot change it.',
  ],
  sections: [
    {
      id: 'where',
      heading: '1. Where we ship',
      blocks: [
        { kind: 'p', text: `We deliver printed books to ${'[[SHIPPING_DESTINATIONS]]'}.` },
        {
          kind: 'p',
          text: 'The digital PDF edition has no delivery at all — it is generated and made available for download in your account as soon as it is ready.',
        },
      ],
    },
    {
      id: 'timelines',
      heading: '2. How long it takes',
      blocks: [
        {
          kind: 'p',
          text: 'Two things happen in sequence, and the order confirmation shows both.',
        },
        {
          kind: 'table',
          head: ['Stage', 'What happens', 'Typical time'],
          rows: [
            ['Preview and approval', 'You review every page and confirm the contents. Nothing is printed until you do.', 'Up to you'],
            ['Production', 'Printing, binding and quality checking', '[[PRODUCTION_TIME]]'],
            ['Dispatch', 'The parcel is handed to the courier and you get a tracking number', '[[DISPATCH_TIME]]'],
            ['Delivery within India', 'Transit to your address', '[[DOMESTIC_TRANSIT_TIME]]'],
            ['International delivery', 'Transit and customs clearance', '[[INTERNATIONAL_TRANSIT_TIME]]'],
          ],
        },
        {
          kind: 'p',
          text: 'These are estimates, not guarantees. Festivals, weather, strikes and customs inspections add time, and a premium edition takes longer to finish than a softcover. If an order is going to be materially late we will tell you rather than let you wonder.',
        },
      ],
    },
    {
      id: 'charges',
      heading: '3. Delivery charges, taxes and duties',
      blocks: [
        {
          kind: 'ul',
          items: [
            `Delivery charges are calculated at checkout from the destination and the edition, and shown to you in full before you pay: ${'[[SHIPPING_CHARGES]]'}.`,
            'Prices for delivery within India include applicable GST. Your invoice shows the tax separately.',
            'For international orders, import duties, customs charges and local taxes are payable by you to the carrier or the authorities on arrival. They are not included in what you pay us, and we cannot tell you in advance what they will be.',
            'If you refuse to pay an import charge and the parcel is returned or destroyed, we can refund the value of the book less our production and return costs.',
          ],
        },
      ],
    },
    {
      id: 'tracking',
      heading: '4. Tracking',
      blocks: [
        {
          kind: 'p',
          text: `We dispatch with ${'[[LOGISTICS_PARTNERS]]'}. You get a tracking number by email and in the app when the parcel leaves. Tracking can take a day to start updating; that is normal and does not mean the parcel is lost.`,
        },
      ],
    },
    {
      id: 'address',
      heading: '5. Your delivery address',
      blocks: [
        {
          kind: 'p',
          text: 'You are responsible for the address, postcode and phone number you give us. Check them before confirming the order.',
        },
        {
          kind: 'ul',
          items: [
            'We can change an address before dispatch if you write to us quickly. After dispatch, we cannot.',
            'A parcel returned to us because the address was wrong or incomplete can be resent, and you pay the second delivery charge.',
            'Couriers usually attempt delivery more than once and then hold the parcel locally. If it is unclaimed and comes back to us, we will contact you before doing anything with it.',
          ],
        },
      ],
    },
    {
      id: 'lost',
      heading: '6. Lost, delayed or damaged in transit',
      blocks: [
        {
          kind: 'p',
          text: `If tracking has not moved for ${'[[STALLED_TRACKING_WINDOW]]'}, or the parcel is marked delivered and you do not have it, tell us at ${entity.supportEmail}. We will raise it with the courier and keep you updated.`,
        },
        {
          kind: 'p',
          text: 'A parcel lost in transit is reprinted and resent at our cost, or refunded in full if you would rather. If it arrives damaged, the Refunds and Cancellations Policy applies — photograph the packaging and the book and send them to us.',
        },
        {
          kind: 'p',
          text: 'Risk of loss passes to you on delivery, not on dispatch. Until it is in your hands, it is our problem.',
        },
      ],
    },
    {
      id: 'privacy',
      heading: '7. What the delivery involves sharing',
      blocks: [
        {
          kind: 'p',
          text: 'Printing and delivering a book means giving your name, address and phone number to our print partner and our courier, and giving the print partner the entries you chose to include. Both are bound by contract to use it only to fulfil your order. This is set out in section 7 of the Privacy Policy.',
        },
      ],
    },
    {
      id: 'contact',
      heading: '8. Questions about an order',
      blocks: [
        {
          kind: 'note',
          text: `Email ${entity.supportEmail} with your order number.\nWe acknowledge within 24 hours and resolve within 15 days.\nGrievance Officer: ${entity.grievanceOfficerName} — ${entity.grievanceOfficerEmail}, ${entity.grievanceOfficerPhone}.`,
        },
        { kind: 'p', text: `This policy takes effect on ${entity.effectiveDate} and was last updated on ${entity.lastUpdated}.` },
      ],
    },
  ],
};
