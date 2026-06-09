import Fav from '@/components/Fav';

export default function WhyUs() {
  return (
    <section className="sect">
      <div className="pad" style={{ paddingBottom: '0' }}>
        <div className="sect-head">
          <span className="eyebrow">Why ReddiReach</span>
          <h2 className="h2">What makes us different.</h2>
        </div>
      </div>
      <div className="grid-3" style={{ marginTop: '48px' }}>
        <div className="cell">
          <div className="ico"><Fav domain="reddit.com" /></div>
          <h3>Reddit marketing experts</h3>
          <p>We specialize in Reddit. Our team understands the culture, the communities, and how Reddit data feeds directly into AI search models.</p>
        </div>
        <div className="cell">
          <div className="ico">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l1.6 5L19 8.5l-5.4 1.5L12 15l-1.6-5L5 8.5 10.4 7z" /></svg>
          </div>
          <h3>GEO &amp; AI strategy</h3>
          <p>We use Generative Engine Optimization to position your brand to be cited and recommended by AI search platforms.</p>
        </div>
        <div className="cell">
          <div className="ico">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3l8 4v6c0 4-3.5 7-8 8-4.5-1-8-4-8-8V7z" /></svg>
          </div>
          <h3>Authentic &amp; organic</h3>
          <p>No bots, no spam. We build real brand presence through genuine community engagement that drives lasting results.</p>
        </div>
      </div>
    </section>
  );
}
