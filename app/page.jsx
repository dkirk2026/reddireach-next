import { pageMetadata, faqPageSchema } from '@/lib/seo';
import { homeFaqs } from '@/data/faqs';

export const metadata = pageMetadata({
  path: '/',
  title: 'Reddit Marketing Agency · ReddiReach',
  description:
    'ReddiReach is a Reddit marketing agency that gets brands cited and recommended by ChatGPT, Perplexity, Gemini and Google AI.',
  ogDescription:
    'ReddiReach is a Reddit marketing agency that gets brands cited and recommended by ChatGPT, Perplexity, Gemini and Google AI.',
});

// The homepage renders the same 7 FAQs as the <Faq /> accordion, so it gets the
// same FAQPage structured data the about page already had.
const faqSchema = faqPageSchema(homeFaqs);

import Nav from '@/components/Nav';
import HeroSplit from '@/components/HeroSplit';
import Logos from '@/components/Logos';
import SearchShift from '@/components/SearchShift';
import Conversations from '@/components/Conversations';
import HeroChecker from '@/components/HeroChecker';
import Approach from '@/components/Approach';
import MidCta from '@/components/MidCta';
import Services from '@/components/Services';
import Tools from '@/components/Tools';
import WhyUs from '@/components/WhyUs';
import Stats from '@/components/Stats';
import Faq from '@/components/Faq';
import Cta from '@/components/Cta';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Nav />
      <div className="frame">
        <HeroSplit />
        <Logos />
        <SearchShift />
        <Conversations />
        <section className="sect dots vis-sect" id="visibility">
          <div className="pad">
            <div className="sect-head center">
              <span className="eyebrow" style={{ display: 'inline-flex' }}>AI visibility check</span>
              <h2 className="h2" style={{ marginTop: '18px' }}>How visible is your brand in AI search?</h2>
              <p className="lead" style={{ marginTop: '14px' }}>Drop in your website and get an instant AI-visibility score across Reddit, ChatGPT, Perplexity and Google AI.</p>
            </div>
            <div className="checker-band">
              <HeroChecker />
            </div>
          </div>
        </section>
        <Approach />
        <MidCta />
        <Services />
        <Tools />
        <WhyUs />
        <Stats />
        <Faq />
        <Cta />
        <Footer />
      </div>
    </>
  );
}
