import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import FaqAccordion from '@/components/FaqAccordion';
import ShadowbanChecker from '@/components/ShadowbanChecker';
import { pageMetadata, faqPageSchema } from '@/lib/seo';

export const metadata = pageMetadata({
  path: '/tools/reddit-shadowban-checker',
  title: 'Reddit Shadowban Checker · Free shadowban test',
  description:
    'Find out if your Reddit account is shadowbanned. Enter any username for a free, instant result, plus what the check misses and how to fix it.',
});

const CAL = 'https://calendly.com/kirkco/chat';

// Single source for the visible FAQ and its FAQPage JSON-LD.
const faqs = [
  {
    q: 'What is a Reddit shadowban?',
    a: 'A shadowban hides your whole account from everyone but you. You can still post and comment as normal, but nobody else sees it, and logged-out visitors get a "page not found" for your profile. Reddit uses it against accounts it suspects of spam or ban evasion.',
  },
  {
    q: 'How does this checker work?',
    a: 'It asks Reddit for your public profile, exactly as a logged-out visitor would. A normal profile means no site-wide shadowban. "Not found" means the account is shadowbanned, deleted or was never created, because Reddit answers all three the same way. We do not store the usernames you check.',
  },
  {
    q: 'Can my posts be hidden even if I am not shadowbanned?',
    a: "Yes. A subreddit can ban you, and AutoModerator or Reddit's spam filter can remove a single post or comment, while your profile stays public. This checker cannot see those. Open the post in a private browser window: if it is missing or marked as removed, it was filtered.",
  },
  {
    q: 'How do I fix a Reddit shadowban?',
    a: 'Slow down, rebuild trust in the account and change the pattern that got it flagged, such as dropping the same link across many subreddits. Our shadowban guide covers the fixes, a 21-day account warming timeline and a safe posting system.',
  },
];

const faqSchema = faqPageSchema(faqs);

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
            <FaqAccordion faqs={faqs} />
          </div>
        </section>

        {/* Closing CTA band */}
        <section className="sect">
          <div className="pad" style={{ paddingTop: '64px', paddingBottom: '64px' }}>
            <div className="svc-mid sb-cta">
              <div className="svc-mid-copy">
                <span className="eyebrow">Ready when you are</span>
                <h2 className="svc-mid-h">Want your brand on Reddit without the bans?</h2>
                <p className="svc-mid-p">We get your brand mentioned naturally, by real community members, in the threads your buyers and the AI models already read. No bots, no spam.</p>
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
