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
        <div className="stat"><div className="big">79%</div><div className="lbl">Of consumers now use AI for product research</div></div>
        <div className="stat"><div className="big">#1</div><div className="lbl"><Fav domain="reddit.com" className="fav-sm" />Reddit is the top source AI models cite</div></div>
        <div className="stat"><div className="big">3x</div><div className="lbl">Higher conversion from AI referrals vs. traditional search</div></div>
      </div>
    </section>
  );
}
