import Fav from '@/components/Fav';

const CAL = 'https://calendly.com/kirkco/chat';

export default function Footer() {
  return (
    <section className="sect" style={{ borderBottom: 'none' }}>
      <div className="pad foot" style={{ paddingTop: '56px', paddingBottom: '32px' }}>
        <div className="foot-brand">
          <img className="foot-logo" src="/logo.webp" alt="ReddiReach" />
          <p className="foot-tag">The leading Reddit marketing and AI search optimization agency for brands, startups and enterprises.</p>
          <a className="foot-social" href="https://www.linkedin.com/company/105312582" target="_blank" rel="noopener noreferrer" aria-label="ReddiReach on LinkedIn">
            <Fav domain="linkedin.com" />
          </a>
        </div>

        <div className="foot-cols">
          <div className="foot-col">
            <span className="foot-col-h">Our Work</span>
            <a href="/#how">Our approach</a>
            <a href="/#results">Results</a>
            <a href="/#faq">FAQ</a>
          </div>
          <div className="foot-col">
            <span className="foot-col-h">Services</span>
            <a href="/services/geo">GEO / AI Search</a>
            <a href="/services/seo">SEO</a>
            <a href="/services/reddit">Reddit Marketing</a>
            <a href="/services/link-building">Link Building</a>
            <a href="/checklist">GEO Checklist</a>
          </div>
          <div className="foot-col">
            <span className="foot-col-h">Company</span>
            <a href="/about">About</a>
            <a href="/pricing">Pricing</a>
            <a href="/blog">Blog</a>
            <a href={CAL} target="_blank" rel="noopener noreferrer">Book a call</a>
          </div>
          <div className="foot-col">
            <span className="foot-col-h">Legal</span>
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="/cookies">Cookie Policy</a>
          </div>
        </div>
      </div>

      <div className="pad foot-bottom">
        <span className="muted">© 2026 ReddiReach. All rights reserved.</span>
        <span className="muted">Made with care for Reddit marketers everywhere</span>
      </div>
    </section>
  );
}
