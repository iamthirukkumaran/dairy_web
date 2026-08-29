import { faqs } from '@/data/faq';
import { site } from '@/data/site';

/**
 * Only facts the page itself states. No ratings, no prices — those would be
 * claims we cannot back up yet.
 */
export function StructuredData() {
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: site.name,
        applicationCategory: 'LifestyleApplication',
        operatingSystem: 'iOS, Android',
        description: site.description,
        url: site.url,
      },
      {
        '@type': 'WebSite',
        name: site.name,
        url: site.url,
        description: site.description,
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Content is static and authored in this repo.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
