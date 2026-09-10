import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Hero } from '@/sections/Hero';
import { Remember } from '@/sections/Remember';
import { HowItWorks } from '@/sections/HowItWorks';
import { Connections } from '@/sections/Connections';
import { Features } from '@/sections/Features';
import { TheBook } from '@/sections/TheBook';
import { Pricing } from '@/sections/Pricing';
import { PrivacyNote } from '@/sections/PrivacyNote';
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
        <Remember />
        <HowItWorks />
        <Connections />
        <Features />
        <TheBook />
        <Pricing />
        <PrivacyNote />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
