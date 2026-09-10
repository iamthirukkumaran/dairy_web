import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { LegalDocument } from '@/components/legal/LegalDocument';
import { getLegalDoc, isDraft, legalDocs } from '@/data/legal';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return legalDocs.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getLegalDoc(slug);
  if (!doc) return {};

  return {
    title: doc.title,
    description: doc.description,
    alternates: { canonical: `/legal/${doc.slug}` },
    // An unfinished policy should not be the version a search engine surfaces.
    robots: isDraft(doc) ? { index: false, follow: true } : undefined,
  };
}

export default async function LegalDocPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const doc = getLegalDoc(slug);
  if (!doc) notFound();

  return (
    <>
      <Navbar />
      <main id="main">
        <LegalDocument doc={doc} />
      </main>
      <Footer />
    </>
  );
}
