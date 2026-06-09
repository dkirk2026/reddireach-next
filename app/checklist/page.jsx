import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Services from '@/components/Services';
import Tools from '@/components/Tools';
import GeoChecklist from '@/components/GeoChecklist';
import { sections, totalSteps } from '@/data/checklist';

export const metadata = {
  title: `GEO Checklist · ${totalSteps} steps to get recommended by AI search`,
  description: `Free ${totalSteps}-step GEO (Generative Engine Optimization) checklist to get your brand recommended by ChatGPT, Perplexity, Gemini and Google AI: crawler access, schema, content, Reddit presence and tracking.`,
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'GEO Checklist: how to get your brand recommended by AI search',
  description: `A ${totalSteps}-step Generative Engine Optimization checklist to get your brand cited and recommended by ChatGPT, Perplexity, Gemini and Google AI.`,
  step: sections.map((s) => ({
    '@type': 'HowToSection',
    name: s.title,
    itemListElement: s.items.map((it, i) => ({ '@type': 'HowToStep', position: i + 1, name: it.text })),
  })),
};

export default function ChecklistPage() {
  return (
    <>
      <Nav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <div className="frame">

        {/* Hero */}
        <section className="sect hero ck-hero">
          <div className="hero-glow"></div>
          <div className="pad hero-in" style={{ maxWidth: '880px' }}>
            <span className="eyebrow" style={{ justifyContent: 'center' }}>GEO checklist</span>
            <h1 className="display" style={{ margin: '22px 0 18px', fontSize: 'clamp(30px,4.4vw,50px)' }}>
              {totalSteps} steps to get your brand<br /><span className="u" style={{ color: 'var(--brand)' }}>recommended by AI</span>.
            </h1>
            <p className="lead" style={{ maxWidth: '720px', margin: '0 auto 30px' }}>
              The free Generative Engine Optimization (GEO) checklist we run for clients, to get your brand cited and recommended by ChatGPT, Perplexity, Gemini and Google AI. Tick items off as you go; your progress saves on this device.
            </p>
            <div className="hero-cta" style={{ justifyContent: 'center' }}>
              <a href="https://calendly.com/kirkco/chat" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Book a call</a>
              <a href="#checklist" className="btn btn-ghost">Start the checklist</a>
            </div>
          </div>
        </section>

        {/* Interactive checklist */}
        <GeoChecklist />

        {/* Mid CTA: done-for-you */}
        <section className="sect ck-midcta-sect">
          <div className="pad" style={{ paddingTop: '64px', paddingBottom: '64px' }}>
            <div className="ck-midcta">
              <div className="ck-mid-copy">
                <span className="eyebrow">Short on time?</span>
                <h2 className="ck-mid-h">We run all {totalSteps} steps for you.</h2>
                <p className="ck-mid-p">GEO and Reddit are what we do all day. We handle crawler access, schema, the content, the Reddit presence and the tracking, then report the AI recommendations as they start landing. Book a free call and we will show you exactly where your brand stands today.</p>
              </div>
              <div className="ck-mid-action">
                <a href="https://calendly.com/kirkco/chat" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Book a call</a>
                <span className="ck-mid-sub">Free consultation · No commitment</span>
              </div>
            </div>
          </div>
        </section>

        {/* Services (same as homepage) */}
        <Services />

        {/* Tools we use (same as homepage) */}
        <Tools />

        {/* Bottom CTA */}
        <section className="sect cta" id="cta">
          <div className="glow"></div>
          <div className="pad cta-in">
            <span className="eyebrow">Get started</span>
            <h2 className="h2">Get AI to recommend your brand.</h2>
            <p className="lead">Book a free call. We will show you which subreddits and AI models matter for your niche, and where your brand stands today.</p>
            <a href="https://calendly.com/kirkco/chat" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Book a call</a>
            <div className="cta-trust">
              <span>Free consultation</span>
              <span>500+ companies served</span>
              <span>GEO + Reddit experts</span>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
