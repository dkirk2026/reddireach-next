const clients = [
  { name: 'Confluence Retreats', src: '/clients/confluence-retreats.png', h: 34 },
  { name: 'Protoface', src: '/clients/protoface.png', h: 24 },
  { name: 'Knew Health', src: '/clients/knew-health.svg', h: 22 },
  { name: 'Flexzo', src: '/clients/flexzo.svg', h: 24 },
];

export default function Logos() {
  return (
    <section className="sect">
      <div className="pad logos-in" style={{ paddingTop: '48px', paddingBottom: '48px' }}>
        <span className="eyebrow center" style={{ display: 'inline-flex' }}>Join the 500+ companies we have served<span className="logos-ast">*</span></span>
        <div className="client-logos">
          {clients.map((c) => (
            <img key={c.name} src={c.src} alt={c.name} title={c.name} style={{ height: `${c.h}px` }} loading="lazy" />
          ))}
        </div>
        <div className="upwork-badge">
          <a href="https://www.upwork.com/freelancers/~01e2623f6cf939bd66" target="_blank" rel="noopener noreferrer" className="upwork-link" aria-label="View our Upwork profile">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Upwork-logo.svg/1280px-Upwork-logo.svg.png" alt="Upwork" height="38" loading="lazy" />
          </a>
          <span className="upwork-rating">100% success rate</span>
          <span className="upwork-sep" aria-hidden="true">·</span>
          <span className="upwork-meta">8 years in business, est. 2018</span>
        </div>
        <p className="logos-note">* Most of our clients work with us under an NDA, so we only show the brands that have agreed to be named.</p>
      </div>
    </section>
  );
}
