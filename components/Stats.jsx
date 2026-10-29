import Fav from '@/components/Fav';

export default function Stats() {
  return (
    <section className="sect" id="results">
      <div className="pad" style={{ paddingBottom: '40px' }}>
        <div className="sect-head center" style={{ textAlign: 'center' }}>
          <span className="eyebrow" style={{ display: 'inline-flex' }}>Why this matters</span>
          <h2 className="h2" style={{ marginTop: '18px' }}>Search has moved to AI. Reddit is how AI decides.</h2>
        </div>
      </div>
      <div className="stats">
        <div className="stat"><div className="big">900M+</div><div className="lbl">Weekly ChatGPT users (OpenAI, Feb 2026)</div></div>
        <div className="stat"><div className="big">30</div><div className="lbl"><Fav domain="reddit.com" className="fav-sm" />Reddit contributions a month on our Growth plan</div></div>
        <div className="stat"><div className="big">$2,000</div><div className="lbl">A month to start, with every contribution logged</div></div>
      </div>
    </section>
  );
}
