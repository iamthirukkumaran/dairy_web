import type { LegalDoc } from './types';
import { entity } from './entity';

/**
 * Required by Rule 5(3)(d) and 6(5) of the Consumer Protection (E-Commerce)
 * Rules, 2020, and by most Indian payment gateways before they will onboard a
 * merchant. A printed book is goods made to a consumer's specification, so the
 * general right to change your mind is limited — but the right to a remedy for
 * a defective, damaged or wrong item is not, and cannot be signed away.
 */
export const refunds: LegalDoc = {
  slug: 'refunds',
  title: 'Refunds and Cancellations Policy',
  shortTitle: 'Refunds',
  description:
    'When you can cancel a subscription or a book order, when you get your money back, and how long a refund takes.',
  summary: [
    'Subscriptions are billed by Apple or Google. Cancel in your store account and you keep access until the period you paid for ends.',
    'A book can be cancelled for a full refund at any point before it goes to print. After that it is being manufactured for you alone.',
    'If a book arrives damaged, defective or wrong, we replace it or refund it in full. Photographs of the problem are all we ask for.',
  ],
  sections: [
    {
      id: 'subscriptions',
      heading: '1. Subscriptions',
      blocks: [
        {
          kind: 'p',
          text: 'Aura Plus is sold through the Apple App Store and Google Play, which handle the billing and the refunds under their own policies.',
        },
        {
          kind: 'ul',
          items: [
            'Cancel any time from your App Store or Google Play account settings. Cancelling stops the next renewal; it does not end the period you have already paid for, and you keep Aura Plus until that period runs out.',
            'Cancel at least 24 hours before a period ends, or the store will charge the renewal.',
            'Refund requests for a store purchase go to Apple or Google. We cannot process them, because we never took the payment.',
            'If a store declines a refund and you believe the charge was wrong, write to us anyway and we will look at it and help where we can.',
          ],
        },
        {
          kind: 'p',
          text: 'If we terminate your account for a reason other than a serious breach of the Terms, we refund the unused part of any subscription you paid for in advance.',
        },
        {
          kind: 'p',
          text: 'Downgrading to the free tier does not delete your diary. Your entries stay in your account, and features that need a subscription stop being available.',
        },
      ],
    },
    {
      id: 'book-cancellation',
      heading: '2. Cancelling a book order',
      blocks: [
        {
          kind: 'p',
          text: 'A printed book is made to order from the entries you chose, so there is a point after which it cannot be un-made.',
        },
        {
          kind: 'table',
          head: ['When you cancel', 'What happens'],
          rows: [
            ['Before the order goes to print', 'Cancelled in full, refunded in full'],
            ['After printing has started', `The book is already being manufactured to your specification and cannot be cancelled. ${'[[PARTIAL_CANCELLATION_TERMS]]'}`],
            ['After dispatch', 'Not cancellable, but sections 3 and 4 still apply if anything is wrong with it'],
          ],
        },
        {
          kind: 'p',
          text: `Printing usually begins ${'[[PRINT_START_WINDOW]]'} after you confirm the order. You can cancel from your order screen in the app, or by writing to ${entity.supportEmail} with your order number.`,
        },
        {
          kind: 'p',
          text: 'A digital PDF edition is delivered immediately and cannot be cancelled once it has been generated and downloaded, unless the file itself is faulty.',
        },
      ],
    },
    {
      id: 'damaged',
      heading: '3. Damaged, defective or wrong items',
      blocks: [
        {
          kind: 'p',
          text: 'This is where you are protected regardless of anything above. If your book arrives damaged, defective, incomplete, misbound, badly printed, or is simply not what you ordered, you are entitled to a replacement or a refund. Nothing in this policy limits your rights under the Consumer Protection Act, 2019.',
        },
        {
          kind: 'p',
          text: `Tell us within ${'[[DAMAGE_REPORT_WINDOW]]'} of delivery, at ${entity.supportEmail}, with your order number and photographs of the problem and the packaging. We do not ask you to post the book back before we act, and we do not charge you for the replacement or its delivery.`,
        },
        {
          kind: 'p',
          text: 'We reprint by default, because the point was to have the book. If you would rather have the money, say so and we will refund instead.',
        },
      ],
    },
    {
      id: 'not-a-defect',
      heading: '4. What is not a defect',
      blocks: [
        {
          kind: 'p',
          text: 'Printing is a physical process and every copy differs a little. The following are not defects:',
        },
        {
          kind: 'ul',
          items: [
            'minor variation in colour between the on-screen preview and the printed page, or between two copies;',
            'the natural texture, tone and grain of uncoated paper and cloth;',
            'trimming variation within normal binding tolerance;',
            'content you approved in the preview — including a typo, a wrong date or an entry you meant to remove. Check the preview; it is the last point at which the contents can change.',
          ],
        },
        {
          kind: 'p',
          text: 'If you are unsure whether something is a defect, send us a photograph and ask. We would rather look than argue.',
        },
      ],
    },
    {
      id: 'how-refunds-are-paid',
      heading: '5. How refunds are paid',
      blocks: [
        {
          kind: 'ul',
          items: [
            'A refund goes back to the original payment method. We cannot redirect it to a different card, account or person.',
            `We initiate an approved refund within ${'[[REFUND_INITIATION_WINDOW]]'} of approving it.`,
            `Your bank or card issuer then takes its own time to post it — usually ${'[[REFUND_SETTLEMENT_WINDOW]]'}. That part is outside our control.`,
            'Where a refund is made, any applicable taxes we collected are refunded with it.',
            'Delivery charges are refunded in full when the fault is ours, and not refunded when an order is cancelled after dispatch for a reason unrelated to a fault.',
          ],
        },
        {
          kind: 'p',
          text: 'We will tell you when we initiate a refund and give you a reference you can quote to your bank.',
        },
      ],
    },
    {
      id: 'failed-payments',
      heading: '6. Failed and duplicate payments',
      blocks: [
        {
          kind: 'p',
          text: 'If a payment is debited but the order does not appear, it is usually reversed automatically by the payment processor within a few working days. If it is not, write to us with the transaction reference and we will trace it and refund it. A duplicate charge is always refunded in full.',
        },
      ],
    },
    {
      id: 'how-to-ask',
      heading: '7. How to ask for a refund',
      blocks: [
        {
          kind: 'note',
          text: `Email ${entity.supportEmail} with your order number, what went wrong, and photographs where the item is damaged or wrong.\nWe acknowledge within 24 hours and resolve within 15 days.\nUnresolved? Our Grievance Officer is ${entity.grievanceOfficerName} — ${entity.grievanceOfficerEmail}, ${entity.grievanceOfficerPhone}.`,
        },
        {
          kind: 'p',
          text: `You can also take a complaint to the consumer forum with jurisdiction where you live, or to the National Consumer Helpline, under the Consumer Protection Act, 2019. This policy takes effect on ${entity.effectiveDate} and was last updated on ${entity.lastUpdated}.`,
        },
      ],
    },
  ],
};
