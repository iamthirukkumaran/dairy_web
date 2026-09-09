import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Hero } from '@/sections/Hero';
import { HowItWorks } from '@/sections/HowItWorks';
import { Features } from '@/sections/Features';
import { TheBook } from '@/sections/TheBook';
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
        <TheBook />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
