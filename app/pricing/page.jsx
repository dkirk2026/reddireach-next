import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import FaqAccordion from '@/components/FaqAccordion';

export const metadata = {
  title: 'Pricing · Reddit Marketing & AI Search Optimization (GEO) · ReddiReach',
  description:
    'Simple, transparent pricing for Reddit marketing and Generative Engine Optimization (GEO). Plans from $1,500/month to get your brand recommended by ChatGPT, Perplexity, Gemini and Google AI.',
};

const CAL = 'https://calendly.com/kirkco/chat';
const s2 = (d) => `https://www.google.com/s2/favicons?domain=${d}&sz=64`;

const B = {
  reddit: { domain: 'reddit.com', name: 'Reddit' },
  chatgpt: { domain: 'chatgpt.com', name: 'ChatGPT' },
  gemini: { domain: 'gemini.google.com', name: 'Gemini' },
  perplexity: { domain: 'perplexity.ai', name: 'Perplexity' },
  google: { domain: 'google.com', name: 'Google AI' },
  peekaboo: { domain: 'aipeekaboo.com', name: 'AI Peekaboo' },
  gsc: { domain: 'search.google.com', name: 'Search Console', icon: 'https://brandlogos.net/wp-content/uploads/2025/07/google_search_console_icon-vector_brandlogos.net_hxtfr-512x512.png' },
  ga: { domain: 'analytics.google.com', name: 'Analytics', icon: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons@main/png/google-analytics.png' },
};

const plans = [
  {
    name: 'Reddit Growth', price: '$1,500', period: '/month', featured: false,
    desc: 'Perfect for businesses wanting to scale with Reddit marketing.',
    cta: 'Get started', href: CAL,
    features: [
      { text: '20 targeted comments/month in r/[Niche] and adjacent subreddits', brands: [B.reddit] },
      { text: 'Thread monitoring to spot relevant conversations as they happen', brands: [B.reddit] },
      { text: 'Mention-share tracking versus your key competitors' },
      { text: 'Monthly report on reach, engagement and AI citation frequency', brands: [B.peekaboo] },
    ],
  },
  {
    name: 'AI Search Optimization', price: '$4,000', period: '/month', featured: true, badge: 'Most popular',
    desc: 'Perfect for businesses that want to show up in AI search results.',
    cta: 'Start growing', href: CAL,
    features: [
      { text: '12 articles/month targeting high-intent queries' },
      { text: 'Technical SEO: schema, metadata and title optimization across all pages', brands: [B.gsc] },
      { text: 'AI visibility tracked across ChatGPT, Gemini, Perplexity, Google AI Mode and AIO', brands: [B.chatgpt, B.gemini, B.perplexity, B.google] },
      { text: 'Link building from high-authority, relevant sites' },
      { text: 'Weekly strategy and alignment calls' },
    ],
  },
  {
    name: 'Custom', price: 'Custom', period: '', featured: false,
    desc: 'Major scale for brands that want to take the world by storm.',
    cta: 'Contact sales', href: 'mailto:filipe@aipeekaboo.com?subject=ReddiReach%20custom%20plan',
    features: [
      { text: 'Unlimited subreddits', brands: [B.reddit] },
      { text: 'Unlimited engagements' },
      { text: 'Digital PR mentions' },
      { text: 'Content marketing' },
      { text: 'SEO site optimization', brands: [B.google] },
      { text: 'Custom analytics integration', brands: [B.ga] },
      { text: 'Dedicated account manager' },
      { text: 'Priority support' },
    ],
  },
];

const includes = [
  { title: '100% human engagement', body: 'Real Reddit natives write every comment and post. No bots, no spam, ever.' },
  { title: 'A senior team on every account', body: 'The people who plan your strategy do the work. No junior hand-offs.' },
  { title: 'AI citation tracking', body: 'We monitor your mentions across ChatGPT, Perplexity, Gemini and Google AI.' },
  { title: 'Transparent monthly reporting', body: 'Clear reporting on reach, engagement and the AI recommendations you are winning.' },
];

const approach = [
  { title: 'Strategic research', body: 'We identify the platforms, communities and sources AI models trust and reference when making recommendations.' },
  { title: 'Authentic presence', body: 'We build genuine brand presence across Reddit, publications and other sources that influence AI responses.' },
  { title: 'Content optimization', body: 'We create and optimize content designed to be cited and referenced by AI assistants.' },
  { title: 'Performance tracking', body: "We monitor your brand's visibility across AI platforms and track progress over time." },
];

const faqs = [
  { q: "What's included in each plan?", a: 'Each plan includes a different level of service tailored to your goals. Reddit Growth focuses on authentic Reddit presence, while AI Search Optimization adds content, technical SEO, link building and AI visibility tracking to get your brand recommended by AI assistants. Custom is built around large-scale, multi-channel programs.' },
  { q: 'How long until I see results?', a: 'AI search optimization is a long-term strategy. It typically takes 3 to 6 months for AI search engines to start picking up and recommending your brand. Reddit engagement results are often visible sooner, within 4 to 8 weeks.' },
  { q: 'Can I upgrade or downgrade my plan?', a: 'Yes, you can upgrade at any time. Downgrades can be made at the end of each 3-month commitment period.' },
  { q: "What's your refund policy?", a: 'We do not offer refunds. Our services require significant upfront investment in strategy, research and content creation. We recommend booking a call first to make sure we are the right fit before committing.' },
  { q: 'Do you require long-term contracts?', a: 'Yes, we require a minimum 3-month commitment. Authentic Reddit marketing and AI search optimization take time to show results, and a 3-month engagement lets us execute a real strategy and demonstrate meaningful ROI.' },
  { q: 'Can you work with my existing marketing team?', a: 'Absolutely. We regularly collaborate with in-house teams and other agencies, integrating with your existing workflows and marketing strategy.' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const check = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>`;

export default function PricingPage() {
  return (
    <>
      <Nav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="frame">

        {/* Hero */}
        <section className="sect hero pr-hero">
          <div className="hero-glow"></div>
          <div className="pad hero-in" style={{ maxWidth: '780px', paddingTop: '54px', paddingBottom: '28px' }}>
            <span className="eyebrow" style={{ justifyContent: 'center' }}>Pricing</span>
            <h1 className="display" style={{ margin: '18px 0 14px', fontSize: 'clamp(30px,4.4vw,48px)' }}>
              Simple, transparent pricing for <span className="u" style={{ color: 'var(--brand)' }}>Reddit and AI search</span>.
            </h1>
            <p className="lead" style={{ maxWidth: '620px', margin: '0 auto', fontSize: 'clamp(15px,1.8vw,18px)' }}>
              Choose the plan that fits your goals. Every plan gets your brand recommended by ChatGPT, Perplexity, Gemini and Google AI, through authentic Reddit marketing and Generative Engine Optimization.
            </p>
          </div>
        </section>

        {/* Pricing tiers */}
        <section className="sect dots" id="plans">
          <div className="pad" style={{ paddingTop: '36px' }}>
            <div className="pr-grid">
              {plans.map((p) => (
                <div key={p.name} className={`pr-card${p.featured ? ' pr-feat' : ''}`}>
                  {p.badge && <span className="pr-badge">{p.badge}</span>}
                  <div className="pr-name">{p.name}</div>
                  <div className="pr-price">
                    <span className="pr-amount">{p.price}</span>
                    {p.period && <span className="pr-period">{p.period}</span>}
                  </div>
                  <p className="pr-desc">{p.desc}</p>
                  <a
                    href={p.href}
                    target={p.href.startsWith('http') ? '_blank' : undefined}
                    rel={p.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={`btn ${p.featured ? 'btn-primary' : 'btn-ghost'} pr-cta`}
                  >
                    {p.cta}
                  </a>
                  <div className="pr-feats">
                    {p.features.map((f, fi) => (
                      <div key={fi} className="pr-feat-row">
                        <span className="pr-check" aria-hidden="true" dangerouslySetInnerHTML={{ __html: check }} />
                        <span className="pr-feat-text">{f.text}</span>
                        {f.brands && (
                          <span className="pr-favs">
                            {f.brands.map((b) => (
                              <img
                                key={b.name}
                                className="pr-fav"
                                src={b.icon ?? s2(b.domain)}
                                alt={b.name}
                                title={b.name}
                                loading="lazy"
                              />
                            ))}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Context: every plan includes */}
            <div className="pr-includes">
              <div className="pr-inc-head">Every plan includes</div>
              <div className="pr-inc-grid">
                {includes.map((it) => (
                  <div key={it.title} className="pr-inc">
                    <h3>{it.title}</h3>
                    <p>{it.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Context: how pricing works */}
        <section className="sect">
          <div className="pad">
            <div className="sect-head">
              <span className="eyebrow">How our pricing works</span>
              <h2 className="h2">Built for the long game, priced with no surprises.</h2>
              <p className="lead">AI search and authentic Reddit marketing compound over time. Our pricing reflects a real strategy, not a quick fix.</p>
            </div>
            <div className="pr-how">
              <div className="pr-how-item"><div className="pr-how-k">3-month</div><div className="pr-how-v">minimum commitment, so we can run a real strategy and prove ROI</div></div>
              <div className="pr-how-item"><div className="pr-how-k">No setup fees</div><div className="pr-how-v">flat monthly pricing with no hidden costs or long onboarding</div></div>
              <div className="pr-how-item"><div className="pr-how-k">Works with your team</div><div className="pr-how-v">we integrate with in-house teams and other agencies</div></div>
            </div>
          </div>
        </section>

        {/* Our approach */}
        <section className="sect dots">
          <div className="pad" style={{ paddingBottom: '0' }}>
            <div className="sect-head">
              <span className="eyebrow">Our approach</span>
              <h2 className="h2">Our approach to AI search optimization.</h2>
              <p className="lead">The same method behind every plan: find the sources AI trusts, build a genuine presence there, and track the recommendations as they land.</p>
            </div>
          </div>
          <div className="grid-2" style={{ marginTop: '48px' }}>
            {approach.map((a, i) => (
              <div key={a.title} className="cell">
                <div className={`pr-anum pr-c${i % 6}`}>{String(i + 1).padStart(2, '0')}</div>
                <h3>{a.title}</h3>
                <p>{a.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="sect" id="faq">
          <div className="pad">
            <div className="sect-head" style={{ marginBottom: '32px' }}>
              <span className="eyebrow">Pricing FAQ</span>
              <h2 className="h2">Frequently asked questions.</h2>
            </div>
            <FaqAccordion faqs={faqs} />
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="sect cta" id="cta">
          <div className="glow"></div>
          <div className="pad cta-in">
            <span className="eyebrow">Get started</span>
            <h2 className="h2">Ready to get started?</h2>
            <p className="lead">Book a free strategy call to discuss your goals and find the right plan for your business.</p>
            <a href={CAL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Book a free call</a>
            <div className="cta-trust">
              <a href="/services/geo">Learn about our GEO services</a>
              <a href="/checklist">Free GEO Checklist</a>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
