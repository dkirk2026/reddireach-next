import Fav from '@/components/Fav';

export default function Services() {
  return (
    <section className="sect" id="services">
      <div className="pad" style={{ paddingBottom: '0' }}>
        <div className="sect-head">
          <span className="eyebrow">Services</span>
          <h2 className="h2">Everything that makes AI cite your brand.</h2>
          <p className="lead">Reddit marketing, link building, SEO and content marketing, delivered as one connected service. We do not just chase rankings, we build the credible, AI-cited presence that gets your brand recommended, and that single focus is what makes us different.</p>
        </div>
      </div>
      <div className="grid-2" style={{ marginTop: '48px' }}>
        <div className="cell">
          <div className="ico"><Fav domain="reddit.com" /></div>
          <h3>Reddit Marketing</h3>
          <p>Get your brand mentioned in the communities and sources that AI models pull from. Strategic, expert-led engagement in the communities and sources that shape AI recommendations.</p>
        </div>
        <div className="cell">
          <div className="ico">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 007.07 0l1.41-1.41a5 5 0 00-7.07-7.07L10 6" /><path d="M14 11a5 5 0 00-7.07 0l-1.41 1.41a5 5 0 007.07 7.07L14 18" /></svg>
          </div>
          <h3>Link Building</h3>
          <p>Earn high-authority backlinks from the sites AI trusts. More credible links means more citations and more AI recommendations.</p>
        </div>
        <div className="cell">
          <div className="ico">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16v16H4z" /><path d="M8 9h8M8 13h6" /></svg>
          </div>
          <h3>Content Marketing</h3>
          <p>Content designed to be cited by AI systems, placed where it matters, so your brand becomes the answer instead of a footnote.</p>
        </div>
        <div className="cell">
          <div className="ico">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
          </div>
          <h3>SEO/GEO</h3>
          <p>Semantic markup, structured data, and Generative Engine Optimization that help AI models understand, trust, and recommend your brand.</p>
        </div>
      </div>
    </section>
  );
}
