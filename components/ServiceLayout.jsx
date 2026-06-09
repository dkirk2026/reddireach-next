import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import HeroShowcase from '@/components/HeroShowcase';
import Tools from '@/components/Tools';
import Fav from '@/components/Fav';
import FaqAccordion from '@/components/FaqAccordion';

const CAL = 'https://calendly.com/kirkco/chat';
const s2 = (d) => `https://www.google.com/s2/favicons?domain=${d}&sz=64`;

const ENGINES = [
  { domain: 'chatgpt.com', name: 'ChatGPT' },
  { domain: 'perplexity.ai', name: 'Perplexity' },
  { domain: 'google.com', name: 'Google' },
  { domain: 'reddit.com', name: 'Reddit' },
];

const A = 'fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"';
const ICONS = {
  eye: `<svg viewBox="0 0 24 24" ${A}><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg>`,
  document: `<svg viewBox="0 0 24 24" ${A}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h4"/></svg>`,
  code: `<svg viewBox="0 0 24 24" ${A}><path d="M8 3H7a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1"/><path d="M16 3h1a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2 2 2 0 0 0-2 2v4a2 2 0 0 1-2 2h-1"/></svg>`,
  chart: `<svg viewBox="0 0 24 24" ${A}><path d="M3 3v18h18"/><path d="M7 14l4-4 3 3 6-7"/></svg>`,
  gauge: `<svg viewBox="0 0 24 24" ${A}><path d="M12 13l3.5-3.5"/><path d="M4 19a9 9 0 1 1 16 0"/></svg>`,
  target: `<svg viewBox="0 0 24 24" ${A}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2"/></svg>`,
  users: `<svg viewBox="0 0 24 24" ${A}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  pen: `<svg viewBox="0 0 24 24" ${A}><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>`,
  bell: `<svg viewBox="0 0 24 24" ${A}><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
  link: `<svg viewBox="0 0 24 24" ${A}><path d="M10 13a5 5 0 0 0 7.07 0l1.41-1.41a5 5 0 0 0-7.07-7.07L10 6"/><path d="M14 11a5 5 0 0 0-7.07 0L5.5 12.4a5 5 0 0 0 7.07 7.07L14 18"/></svg>`,
  megaphone: `<svg viewBox="0 0 24 24" ${A}><path d="M3 11l18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.2-3"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" ${A}><path d="M12 3l8 4v6c0 4-3.5 7-8 8-4.5-1-8-4-8-8V7z"/></svg>`,
  server: `<svg viewBox="0 0 24 24" ${A}><rect x="2" y="3" width="20" height="8" rx="2"/><rect x="2" y="13" width="20" height="8" rx="2"/><line x1="6" y1="7" x2="6.01" y2="7"/><line x1="6" y1="17" x2="6.01" y2="17"/></svg>`,
  bag: `<svg viewBox="0 0 24 24" ${A}><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
  store: `<svg viewBox="0 0 24 24" ${A}><path d="M3 9l1.5-5h15L21 9"/><path d="M4 9v10a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9"/><path d="M9 20v-6h6v6"/></svg>`,
  grid: `<svg viewBox="0 0 24 24" ${A}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>`,
  briefcase: `<svg viewBox="0 0 24 24" ${A}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" ${A}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  rocket: `<svg viewBox="0 0 24 24" ${A}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 8-10 6 6 0 0 1 5 5 22 22 0 0 1-10 8z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>`,
  trophy: `<svg viewBox="0 0 24 24" ${A}><path d="M7 4h10v5a5 5 0 0 1-10 0V4z"/><path d="M8 21h8M12 17v4"/><path d="M7 4H5v2a3 3 0 0 0 2 2.83M17 4h2v2a3 3 0 0 1-2 2.83"/></svg>`,
  layers: `<svg viewBox="0 0 24 24" ${A}><path d="M12 2l9 5-9 5-9-5 9-5z"/><path d="M3 12l9 5 9-5"/><path d="M3 17l9 5 9-5"/></svg>`,
};

export default function ServiceLayout(props) {
  const {
    meta,
    eyebrow,
    badge,
    title,
    highlight,
    lead,
    whatTitle,
    whatLead,
    features = [],
    whoTitle,
    audiences = [],
    howTitle,
    steps = [],
    whyTitle,
    why = [],
    faqs = [],
    midCta,
    mid,
    split = false,
  } = props;

  const titleHtml =
    highlight && title.includes(highlight)
      ? title.replace(highlight, `<span class="u" style="color:var(--brand)">${highlight}</span>`)
      : title;

  const faqSchema =
    faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }
      : null;

  return (
    <>
      <Nav />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <div className="frame">

        {/* Hero with animated showcase (centered, or split for v2) */}
        <section className="sect hero svc-hero">
          <div className="hero-glow"></div>
          {split ? (
            <div className="pad">
              <div className="svc-split">
                <div className="svc-split-copy">
                  {badge && (
                    <a className="hero-badge" href={badge.href} target="_blank" rel="noopener noreferrer">
                      <Fav domain={badge.domain} /><span dangerouslySetInnerHTML={{ __html: badge.html }}></span>
                    </a>
                  )}
                  <h1 className="display" dangerouslySetInnerHTML={{ __html: titleHtml }}></h1>
                  <p className="lead">{lead}</p>
                  <div className="hero-cta">
                    <a href={CAL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Book a call</a>
                    <a href="#what" className="btn btn-ghost">What&apos;s included</a>
                  </div>
                  <div className="engines">
                    <span className="cap">Get recommended across</span>
                    <div className="engine-row">
                      {ENGINES.map((c) => (
                        <span key={c.domain} className="engine">
                          <img src={s2(c.domain)} alt={c.name} />{c.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="svc-split-anim">
                  <HeroShowcase inline />
                </div>
              </div>
            </div>
          ) : (
            <div className="pad hero-in" style={{ maxWidth: '900px' }}>
              {badge && (
                <a className="hero-badge" href={badge.href} target="_blank" rel="noopener noreferrer">
                  <Fav domain={badge.domain} /><span dangerouslySetInnerHTML={{ __html: badge.html }}></span>
                </a>
              )}
              <h1 className="display" style={{ margin: '22px 0 18px' }} dangerouslySetInnerHTML={{ __html: titleHtml }}></h1>
              <p className="lead" style={{ maxWidth: '710px', margin: '0 auto 30px' }}>{lead}</p>
              <div className="hero-cta" style={{ justifyContent: 'center' }}>
                <a href={CAL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Book a call</a>
                <a href="#what" className="btn btn-ghost">What&apos;s included</a>
              </div>
              <div className="engines" style={{ marginTop: '30px' }}>
                <span className="cap">Get recommended across</span>
                <div className="engine-row">
                  {ENGINES.map((c) => (
                    <span key={c.domain} className="engine">
                      <img src={s2(c.domain)} alt={c.name} />{c.name}
                    </span>
                  ))}
                </div>
              </div>
              <HeroShowcase />
            </div>
          )}
        </section>

        {/* What's included */}
        <section className="sect dots" id="what">
          <div className="pad">
            <div className="sect-head">
              <span className="eyebrow">{whatTitle}</span>
              {whatLead && <p className="lead" style={{ marginTop: '14px' }}>{whatLead}</p>}
            </div>
            <div className="svc-feats">
              {features.map((f, i) => (
                <div key={i} className="svc-feat-card">
                  <div
                    className={`svc-feat-badge svc-bg${i % 6}`}
                    dangerouslySetInnerHTML={{ __html: ICONS[f.icon] ?? ICONS.target }}
                  ></div>
                  <h3>{f.title}</h3>
                  <p>{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who it's for */}
        {audiences.length > 0 && (
          <section className="sect">
            <div className="pad">
              <div className="sect-head">
                <span className="eyebrow">Who it&apos;s for</span>
                <h2 className="h2">{whoTitle}</h2>
              </div>
              <div className="svc-aud">
                {audiences.map((a, i) => (
                  <div key={i} className="svc-aud-card">
                    <div
                      className={`svc-aud-ic svc-bg${i % 6}`}
                      dangerouslySetInnerHTML={{ __html: ICONS[a.icon] ?? ICONS.users }}
                    ></div>
                    <h3>{a.title}</h3>
                    <p>{a.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* How it works */}
        <section className="sect dots" id="how-svc">
          <div className="pad">
            <div className="sect-head">
              <span className="eyebrow">How it works</span>
              <h2 className="h2">{howTitle}</h2>
            </div>
            <div className="svc-steps">
              {steps.map((s, i) => (
                <div key={i} className="svc-step">
                  <div className="svc-step-n">{String(i + 1).padStart(2, '0')}</div>
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mid-page CTA */}
        {midCta && (
          <section className="sect">
            <div className="pad" style={{ paddingTop: '56px', paddingBottom: '56px' }}>
              <div className="svc-mid">
                <div className="svc-mid-copy">
                  <span className="eyebrow">See where you stand</span>
                  <h2 className="svc-mid-h">{midCta.title}</h2>
                  <p className="svc-mid-p">{midCta.body}</p>
                </div>
                <div className="svc-mid-action">
                  <a href={CAL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Book a call</a>
                  <span className="svc-mid-sub">Free consultation · No commitment</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Why it works */}
        {why.length > 0 && (
          <section className="sect">
            <div className="pad" style={{ paddingBottom: '40px' }}>
              <div className="sect-head center" style={{ textAlign: 'center' }}>
                <span className="eyebrow" style={{ display: 'inline-flex' }}>{whyTitle}</span>
              </div>
            </div>
            <div className="stats">
              {why.map((w, i) => (
                <div key={i} className="stat">
                  <div className="big">{w.k}</div>
                  <div className="lbl">{w.v}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tools we use (reused from the homepage) */}
        <Tools />

        {/* FAQ */}
        {faqs.length > 0 && (
          <section className="sect dots" id="svc-faq">
            <div className="pad">
              <div className="sect-head" style={{ marginBottom: '32px' }}>
                <span className="eyebrow">FAQ</span>
                <h2 className="h2">Frequently asked questions.</h2>
              </div>
              <FaqAccordion faqs={faqs} />
            </div>
          </section>
        )}

        {/* Closing CTA band */}
        <section className="sect">
          <div className="pad" style={{ paddingTop: '64px', paddingBottom: '64px' }}>
            <div className="svc-mid">
              <div className="svc-mid-copy">
                <span className="eyebrow">Ready when you are</span>
                <h2 className="svc-mid-h">{mid.title}</h2>
                <p className="svc-mid-p">{mid.body}</p>
              </div>
              <div className="svc-mid-action">
                <a href={CAL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Book a call</a>
                <span className="svc-mid-sub">Free consultation · No commitment</span>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
