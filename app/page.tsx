import dynamic from 'next/dynamic';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Hero } from '@/sections/Hero';
import { JustTalk } from '@/sections/JustTalk';
import { AuraRemembers } from '@/sections/AuraRemembers';
import { Memories } from '@/sections/Memories';
import { HowItWorks } from '@/sections/HowItWorks';
import { Pricing } from '@/sections/Pricing';
import { Faq } from '@/sections/Faq';
import { FinalCta } from '@/sections/FinalCta';
import { StructuredData } from '@/components/StructuredData';

/**
 * The heavy, scroll-driven scenes are split out of the initial bundle.
 * They still render on the server, so the copy in them stays indexable.
 */
const Garden = dynamic(() => import('@/sections/Garden').then((m) => m.Garden));
const AskYourLife = dynamic(() => import('@/sections/AskYourLife').then((m) => m.AskYourLife));
const YearInReview = dynamic(() => import('@/sections/YearInReview').then((m) => m.YearInReview));
const BookStory = dynamic(() => import('@/sections/BookStory').then((m) => m.BookStory));
const TheBook = dynamic(() => import('@/sections/TheBook').then((m) => m.TheBook));
const Privacy = dynamic(() => import('@/sections/Privacy').then((m) => m.Privacy));
const Gifting = dynamic(() => import('@/sections/Gifting').then((m) => m.Gifting));

export default function HomePage() {
  return (
    <>
      <StructuredData />
      <Navbar />
      <main id="main" className="relative">
        <Hero />
        <JustTalk />
        <AuraRemembers />
        <Memories />
        <Garden />
        <AskYourLife />
        <YearInReview />
        <BookStory />
        <HowItWorks />
        <Privacy />
        <TheBook />
        <Gifting />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
