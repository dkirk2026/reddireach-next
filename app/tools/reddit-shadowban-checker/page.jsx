import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import FaqAccordion from '@/components/FaqAccordion';
import ShadowbanChecker from '@/components/ShadowbanChecker';
import { pageMetadata, faqPageSchema } from '@/lib/seo';
import { SHADOWBAN_FAQS } from '@/data/shadowban';

export const metadata = pageMetadata({
  path: '/tools/reddit-shadowban-checker',
  title: 'Reddit Shadowban Checker · Free shadowban test',
  description:
    'Find out if your Reddit account is shadowbanned. Enter any username for a free, instant result, plus what the check misses and how to fix it.',
});

const CAL = 'https://calendly.com/kirkco/chat';

// The visible FAQ and its FAQPage JSON-LD read the same array.
const faqSchema = faqPageSchema(SHADOWBAN_FAQS);

export default function ShadowbanCheckerPage() {
  return (
    <>
      <Nav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="frame">

        {/* Hero with the checker */}
        <section className="sect hero sb-hero">
          <div className="hero-glow"></div>
          <div className="pad hero-in" style={{ maxWidth: '880px' }}>
            <span className="eyebrow" style={{ justifyContent: 'center' }}>Shadowban test</span>
            <h1 className="display">
              Free Reddit <span className="u" style={{ color: 'var(--brand)' }}>shadowban</span> checker
            </h1>
            <p className="lead sb-lead">
              Getting zero replies and no upvotes? Check in seconds whether Reddit is hiding your whole account from everyone but you.
            </p>
            <div className="checker-band">
              <ShadowbanChecker />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="sect dots sb-faq" id="faq">
          <div className="pad">
            <div className="sect-head" style={{ marginBottom: '32px' }}>
              <span className="eyebrow">FAQ</span>
              <h2 className="h2">Reddit shadowban questions.</h2>
            </div>
            <FaqAccordion faqs={SHADOWBAN_FAQS} />
          </div>
        </section>

        {/* Closing CTA band */}
        <section className="sect">
          <div className="pad" style={{ paddingTop: '64px', paddingBottom: '64px' }}>
            <div className="svc-mid sb-cta">
              <div className="svc-mid-copy">
                <span className="eyebrow">Ready when you are</span>
                <h2 className="svc-mid-h">Want help running Reddit for your brand?</h2>
                <p className="svc-mid-p">We plan your brand's Reddit discussions and comments, log every contribution with its live link, and review the results with you each month.</p>
              </div>
              <div className="svc-mid-action">
                <a href="/services/reddit" className="btn btn-primary">See the full service</a>
                <a href={CAL} target="_blank" rel="noopener noreferrer" className="svc-mid-sub sb-cta-call">Or book a free call</a>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
