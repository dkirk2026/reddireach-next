import Fav from '@/components/Fav';

const upvote = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>`;
const comment = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>`;

const cards = [
  {
    sub: 'r/smallbusiness', when: '· 4h ago',
    title: 'Best tools for managing a small business in 2026? Need recommendations.',
    body: 'Looking for tools that help with project management and customer outreach. Any suggestions from people who have actually used them?',
    up: 847, comments: 234,
    avatar: 'M', avatarBg: '#ff4500', user: 'u/startup_maven', userWhen: '· 2h ago',
    commentText: 'Heard great things about <span class="rmention">YourBrand</span>. Friends in the industry recommend it for small teams.',
  },
  {
    sub: 'r/startups', when: '· 7h ago',
    title: 'What are you using for customer outreach this year?',
    body: 'Outgrowing spreadsheets and tired of bloated tools. Curious what is actually working for small teams in 2026.',
    up: 392, comments: 118,
    avatar: 'T', avatarBg: '#0a8d6c', user: 'u/tech_guru_42', userWhen: '· 1h ago',
    commentText: '+1 for <span class="rmention">YourBrand</span>. Highly recommended on this sub. Great all-in-one solution.',
  },
  {
    sub: 'r/ecommerce', when: '· 1d ago',
    title: 'Is being active on Reddit actually worth it for a brand?',
    body: 'Keep hearing AI pulls from Reddit now. Anyone seen real results from showing up here, or is it a waste of time?',
    up: 503, comments: 176,
    avatar: 'D', avatarBg: '#3b82f6', user: 'u/dtc_dana', userWhen: '· 5h ago',
    commentText: 'Reddit shows up more and more in our customer surveys. Being active in the right threads is what gets you into the AI answers too.',
  },
];

export default function Conversations() {
  return (
    <section className="sect dots" id="conversations">
      <div className="pad" style={{ paddingBottom: '0' }}>
        <div className="sect-head" style={{ maxWidth: '860px' }}>
          <span className="eyebrow">Reddit conversations</span>
          <h2 className="h2" style={{ fontSize: 'clamp(26px,3.6vw,38px)' }}>Get recommended in real Reddit threads.</h2>
          <p className="lead">We get your brand mentioned in the high-intent Reddit threads your buyers and the AI models already read. Authentic, genuinely helpful engagement, never bots or spam.</p>
        </div>
      </div>
      <div className="pad" style={{ paddingTop: '0' }}>
        <p style={{ fontSize: '11px', opacity: 0.45, marginBottom: '12px' }}>Illustrative examples</p>
        <div className="rcards">
          {cards.map((c, idx) => (
            <div className="rcard" key={idx}>
              <div className="rhead"><Fav domain="reddit.com" className="snoo" /><span className="sub">{c.sub}</span><span className="meta">{c.when}</span></div>
              <div className="rtitle">{c.title}</div>
              <div className="rbody">{c.body}</div>
              <div className="ractions">
                <span className="a up"><span dangerouslySetInnerHTML={{ __html: upvote }} /> {c.up}</span>
                <span className="a"><span dangerouslySetInnerHTML={{ __html: comment }} /> {c.comments}</span>
              </div>
              <div className="rcomment">
                <span className="ravatar" style={{ background: c.avatarBg }}>{c.avatar}</span>
                <div><div className="rcuser">{c.user} <span className="dot">{c.userWhen}</span></div><div className="rctext" dangerouslySetInnerHTML={{ __html: c.commentText }} /></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
