// Reusable "Reddit Partner" section, shown on the homepage, every service page
// and pricing. Copy lives here so every page says the same thing.
const benefits = [
  {
    title: 'A direct line to Reddit',
    body: 'We work with Reddit’s partner team directly, so questions about ads, policy and accounts get answered by Reddit itself.',
  },
  {
    title: 'Faster support when it matters',
    body: 'When an ad sits in review or an account gets restricted, we escalate through partner support instead of a public queue.',
  },
  {
    title: 'Your accounts, backed by the partnership',
    body: 'The brand and ad accounts we run are managed through our Reddit partnership, with partner support behind them.',
  },
  {
    title: 'Built on Reddit’s own playbook',
    body: 'Campaigns and community work follow Reddit’s partner guidance, so they fit how each subreddit actually works.',
  },
];

export default function PartnerBand() {
  return (
    <section className="sect dots" id="reddit-partner">
      <div className="pad" style={{ paddingBottom: '0' }}>
        <div className="sect-head">
          <span className="partner-chip">
            <img src="/clients/reddit.png" alt="Reddit" width="22" height="22" />
            Official Reddit Partner agency
          </span>
          <h2 className="h2">Work with an agency Reddit works with directly.</h2>
          <p className="lead">Your campaigns and accounts get support from Reddit itself, not a help-center form.</p>
        </div>
      </div>
      <div className="grid-4" style={{ marginTop: '48px' }}>
        {benefits.map((b, i) => (
          <div key={b.title} className="cell">
            <div className={`ico ico-c${i % 6}`}>{String(i + 1).padStart(2, '0')}</div>
            <h3>{b.title}</h3>
            <p>{b.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
