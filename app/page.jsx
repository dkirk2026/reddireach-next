import Nav from '@/components/Nav';
import HeroSplit from '@/components/HeroSplit';
import Logos from '@/components/Logos';
import SearchShift from '@/components/SearchShift';
import Conversations from '@/components/Conversations';
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
