import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Fav from '@/components/Fav';
import FaqAccordion from '@/components/FaqAccordion';

export const metadata = {
  title: 'About ReddiReach · The Reddit marketing and AI search team',
  description:
    'Meet the ReddiReach team. For 8+ years we have helped brands, startups and enterprises get recommended by AI through authentic Reddit marketing and AI search optimization.',
};

const PROPOSALS = 'https://filipelinsduarte.github.io/proposals';

const team = [
  {
    name: 'Danny Kirk',
    role: 'COO & Advisory',
    img: `${PROPOSALS}/danny-kirk.jpeg`,
    linkedin: 'https://www.linkedin.com/in/danielpkirk/',
    bio: 'Leads Reddit and community strategy, living in the subreddits and making sure every post lands naturally, never as spam.',
    history: [
      { domain: 'reddit.com', name: 'ReddiReach', role: 'Founder' },
      { domain: 'goaheadventures.com', name: 'GoAhead Ventures', role: 'Venture Scout' },
      { domain: 'energentmedia.com', name: 'Energent Media', role: 'COO' },
    ],
  },
  {
    name: 'John Rice',
    role: 'Co-Founder & CTO',
    img: `${PROPOSALS}/john.jpeg`,
    linkedin: 'https://www.linkedin.com/in/johnwilliamrice/',
    bio: 'Leads product and engineering. He built the AI Peekaboo visibility platform and studies how AI search picks its sources.',
    history: [
      { domain: 'aipeekaboo.com', name: 'AI Peekaboo', role: 'Co-Founder & CTO' },
      { domain: 'subredditsignals.com', name: 'Subreddit Signals', role: 'Founder' },
      { domain: 'magiclinks.com', name: 'MagicLinks', role: 'Senior Software Engineer' },
    ],
  },
  {
    name: 'Filipe Lins Duarte',
    role: 'Co-Founder & CEO',
    img: `${PROPOSALS}/filipe.jpeg`,
    linkedin: 'https://www.linkedin.com/in/filipelinsduarte',
    bio: 'Leads go-to-market strategy and client relationships, drawing on years building SaaS revenue teams across Europe and the US.',
    history: [
      { domain: 'aipeekaboo.com', name: 'AI Peekaboo', role: 'Co-Founder & CEO' },
      { domain: 'uber.com', name: 'Uber for Business', role: 'Mid-Market AE' },
      { domain: 'meistertask.com', name: 'Meister', role: '#1 AE 2023' },
    ],
  },
];

const different = [
  {
    title: 'Reddit-native specialists',
    body: 'Reddit is all we do. We know the culture, the moderators and the unwritten rules, so we show up as real community members, never as marketers parachuting in.',
  },
  {
    title: 'We optimize for AI recommendations',
    body: 'We do not chase vanity rankings. We build the credible, cited presence that makes ChatGPT, Perplexity, Gemini and Google AI recommend your brand by name.',
  },
  {
    title: 'Senior team, full ownership',
    body: 'No junior hand-offs. The same people who plan your strategy write the comments, track the citations and own the result end to end.',
  },
];

const values = [
  { title: 'Authentic over automated', body: 'No bots, no spam, ever. Trust is the entire strategy, and we protect it on every account.' },
  { title: 'Cut the fluff, move fast', body: 'We ship real work, not status decks. Fewer meetings, more visible movement for clients.' },
  { title: 'Own it end to end', body: 'Everyone owns outcomes, not tasks. If it moves recommendations, it is our job.' },
  { title: '100% remote, flexible hours', body: 'We hire the best people wherever they are and trust them to do their best work on their own schedule.' },
  { title: 'Always be upskilling', body: 'AI search changes monthly. We learn in public, share what works and keep getting sharper.' },
  { title: 'Good people, no egos', body: 'Direct feedback, zero politics. We are kind, we are honest, and we are in it together.' },
];

const faqs = [
  { q: 'Is ReddiReach fully remote?', a: 'Yes. We are 100% remote and always have been. The team works across multiple time zones, with flexible hours and an async-first culture so people can do focused work without sitting in meetings all day.' },
  { q: 'What is the team and culture like?', a: 'Small, senior and low-ego. We move fast, give direct feedback and care about the craft. There is no bureaucracy to wade through, so the work you do is visible and it matters from day one.' },
  { q: 'What kind of people do you hire?', a: 'People who are genuinely good at heart, take ownership, and are obsessed with getting better. Reddit-native instincts, strong writing and a bias for action go a long way. We care more about how you think than your exact background.' },
  { q: 'Do you work with freelancers and contractors?', a: 'Yes. Alongside our core team we work with a trusted bench of Reddit-native writers and specialists. If that sounds like you, reach out, we are usually open to the right people.' },
  { q: 'What does the hiring process look like?', a: 'Short and respectful of your time: an intro chat, a practical exercise close to the real work, and a conversation with the founders. We move quickly and give you a clear answer either way.' },
];

export default function AboutPage() {
  return (
    <>
      <Nav />
      <div className="frame">

        {/* Intro */}
        <section className="sect hero about-hero">
          <div className="hero-glow"></div>
          <div className="pad hero-in" style={{ maxWidth: '840px' }}>
            <span className="eyebrow" style={{ justifyContent: 'center' }}>About us</span>
            <h1 className="display" style={{ margin: '22px 0 20px' }}>
              The team making brands the answer <span className="u" style={{ color: 'var(--brand)' }}>AI recommends</span>.
            </h1>
            <p className="lead" style={{ maxWidth: '680px', margin: '0 auto' }}>
              ReddiReach is a Reddit marketing and AI search optimization agency. For 8+ years, since 2018, we have helped brands, startups and enterprises get recommended in the Reddit conversations and AI answers their buyers actually trust.
            </p>
            <div className="hero-cluster">
              <div className="tc-avatars">
                {team.map((m) => (
                  <img key={m.name} className="tc-av" src={m.img} alt={m.name} loading="lazy" />
                ))}
                <span className="tc-av tc-q" aria-hidden="true">?</span>
              </div>
            </div>
            <div className="about-stats">
              <div className="ab-stat"><div className="ab-big">8+</div><div className="ab-lbl">Years in business</div></div>
              <div className="ab-stat"><div className="ab-big">2018</div><div className="ab-lbl">Founded</div></div>
              <div className="ab-stat"><div className="ab-big">500+</div><div className="ab-lbl">Companies served</div></div>
            </div>
          </div>
        </section>

        {/* Our why */}
        <section className="sect">
          <div className="pad" style={{ textAlign: 'center' }}>
            <div style={{ maxWidth: '820px', margin: '0 auto' }}>
              <span className="eyebrow" style={{ display: 'inline-flex' }}>Our why</span>
              <p className="why-statement">Search has moved to AI, and AI decides what to recommend from the conversations people trust. We exist to make sure that when your buyers ask, your brand is the answer, earned through genuine community presence, never bought, botted or faked.</p>
            </div>
          </div>
        </section>

        {/* What makes us different */}
        <section className="sect dots">
          <div className="pad" style={{ paddingBottom: '0' }}>
            <div className="sect-head">
              <span className="eyebrow">What makes us different</span>
              <h2 className="h2">Built for AI recommendations, not vanity metrics.</h2>
            </div>
          </div>
          <div className="grid-3" style={{ marginTop: '48px' }}>
            {different.map((d, i) => (
              <div key={d.title} className="cell">
                <div className={`ico ico-c${i % 6}`}>{String(i + 1).padStart(2, '0')}</div>
                <h3>{d.title}</h3>
                <p>{d.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="sect">
          <div className="pad" style={{ paddingBottom: '0' }}>
            <div className="sect-head">
              <span className="eyebrow">Our values</span>
              <h2 className="h2">What it is like to work here.</h2>
              <p className="lead">The principles that shape how we hire, how we work and how we treat each other.</p>
            </div>
          </div>
          <div className="val-grid">
            {values.map((v, i) => (
              <div key={v.title} className="cell val-cell">
                <span className={`val-dot val-c${i % 6}`}></span>
                <div className="val-text">
                  <h3>{v.title}</h3>
                  <p>{v.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="sect dots" id="team">
          <div className="pad">
            <div className="sect-head center" style={{ textAlign: 'center', maxWidth: '680px' }}>
              <span className="eyebrow" style={{ display: 'inline-flex' }}>The team</span>
              <h2 className="h2" style={{ marginTop: '18px' }}>Three operators who live in Reddit and AI search.</h2>
              <p className="lead" style={{ marginTop: '14px' }}>Founders and operators who have built the products, communities and revenue teams behind modern Reddit and AI visibility.</p>
            </div>
            <div className="team-grid">
              {team.map((m) => (
                <div key={m.name} className="team-card">
                  <img className="tm-photo" src={m.img} alt={m.name} loading="lazy" />
                  <div className="tm-name-row">
                    <span className="tm-name">{m.name}</span>
                    <a className="tm-li" href={m.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${m.name} on LinkedIn`}>
                      <Fav domain="linkedin.com" className="fav-sm" />
                    </a>
                  </div>
                  <p className="tm-bio">{m.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ: what it's like to work here */}
        <section className="sect dots" id="careers-faq">
          <div className="pad">
            <div className="sect-head" style={{ marginBottom: '32px' }}>
              <span className="eyebrow">Working at ReddiReach</span>
              <h2 className="h2">Questions about working here.</h2>
            </div>
            <FaqAccordion faqs={faqs} />
          </div>
        </section>

        {/* Join us CTA */}
        <section className="sect cta" id="join">
          <div className="glow"></div>
          <div className="pad cta-in">
            <span className="eyebrow">Careers</span>
            <h2 className="h2">Want to join our team?</h2>
            <p className="lead">Apply for open roles. We are always glad to meet Reddit-native writers, strategists and builders who want to shape how AI recommends brands.</p>
            <a href="mailto:filipe@aipeekaboo.com?subject=Joining%20the%20ReddiReach%20team" className="btn btn-primary">Email us</a>
            <div className="cta-trust">
              <span>100% remote</span>
              <span>Flexible hours</span>
              <span>Senior, low-ego team</span>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
