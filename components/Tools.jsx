const s2 = (d) => `https://www.google.com/s2/favicons?domain=${d}&sz=64`;

const tools = [
  // Row 1
  { name: 'Reddit', icon: s2('reddit.com'), tag: 'Reddit marketing and GEO' },
  { name: 'Google Analytics', icon: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons@main/png/google-analytics.png', tag: 'SEO and content marketing' },
  { name: 'Google Search Console', icon: 'https://brandlogos.net/wp-content/uploads/2025/07/google_search_console_icon-vector_brandlogos.net_hxtfr-512x512.png', tag: 'SEO and content marketing' },
  { name: 'AI Peekaboo', icon: s2('aipeekaboo.com'), tag: 'AI visibility monitoring' },
  // Row 2
  { name: 'Subreddit Signals', icon: s2('subredditsignals.com'), tag: 'Reddit research and signals' },
  { name: 'Apollo.io', icon: s2('apollo.io'), tag: 'Link building' },
  { name: 'Claude', icon: s2('claude.ai'), tag: 'Internal workflows and AI agents' },
  { name: 'Ahrefs', icon: s2('ahrefs.com'), tag: 'SEO research' },
];

export default function Tools() {
  return (
    <section className="sect dots" id="tools">
      <div className="pad">
        <div className="sect-head">
          <span className="eyebrow">Our stack</span>
          <h2 className="h2">The tools we use.</h2>
          <p className="lead">The platforms behind every campaign, from finding the Reddit conversations that matter to tracking where AI starts recommending you.</p>
        </div>
        <div className="tools-grid">
          {tools.map((t, idx) => (
            <div className="tool" key={idx}>
              <div className="tool-ico"><img src={t.icon} alt="" loading="lazy" /></div>
              <div className="tool-name">{t.name}</div>
              <div className="tool-tag">{t.tag}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
