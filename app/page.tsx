import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Hero } from '@/sections/Hero';
import { Features } from '@/sections/Features';
import { HowItWorks } from '@/sections/HowItWorks';
import { Memories } from '@/sections/Memories';
import { TheBook } from '@/sections/TheBook';
import { Privacy } from '@/sections/Privacy';
import { Pricing } from '@/sections/Pricing';
import { Faq } from '@/sections/Faq';
import { FinalCta } from '@/sections/FinalCta';
import { StructuredData } from '@/components/StructuredData';

export default function HomePage() {
  return (
    <>
      <StructuredData />
      <Navbar />
      <main id="main">
        <Hero />
        <HowItWorks />
        <Features />
        <Memories />
        <TheBook />
        <Privacy />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
