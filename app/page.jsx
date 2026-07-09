export const metadata = {
  title: 'ReddiReach · Get AI to recommend your brand',
  description:
    'ReddiReach is the leading Reddit marketing and AI search optimization (GEO) agency. We get your brand cited and recommended by ChatGPT, Perplexity, Gemini and Google AI Overviews through authentic Reddit marketing.',
  alternates: { canonical: 'https://www.reddireach.com' },
  openGraph: {
    type: 'website',
    url: 'https://www.reddireach.com',
    title: 'ReddiReach · Get AI to recommend your brand',
    description: 'The leading Reddit marketing and GEO agency. Get your brand recommended by ChatGPT, Perplexity, Gemini and Google AI.',
  },
};

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
