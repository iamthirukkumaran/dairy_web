/** Emitted as a static file by `output: 'export'`. */
export const dynamic = 'force-static';

import type { MetadataRoute } from 'next';
import { site } from '@/data/site';
import { isDraft, legalDocs } from '@/data/legal';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${site.url}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    { url: `${site.url}/legal`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.4 },
    // A draft policy is served `noindex`, so it has no business in the sitemap.
    ...legalDocs
      .filter((doc) => !isDraft(doc))
      .map((doc) => ({
        url: `${site.url}/legal/${doc.slug}`,
        lastModified: new Date(),
        changeFrequency: 'yearly' as const,
        priority: 0.4,
      })),
  ];
}
