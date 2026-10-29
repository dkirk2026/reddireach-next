import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Cta from '@/components/Cta';
import VideoEmbed from '@/components/VideoEmbed';
import CareerIcon from '@/components/CareerIcon';
import { authors } from '@/data/authors';
import { getAuthor, authorPath, authorPersonSchema } from '@/lib/authors';
import { pageMetadata, SITE } from '@/lib/seo';

// Only the three known profiles exist; any other slug is a real 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return authors.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }) {
  const author = getAuthor(params.slug, authors);
  if (!author) return {};
  return pageMetadata({
    path: authorPath(author),
    title: `${author.name}, ${author.role}`,
    description: author.summary,
  });
}

function ExternalLink({ href, className, children, label }) {
  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
      {children}
    </a>
  );
}

function CareerRow({ item }) {
  const mark = item.logo
    ? <img className="au-logo" src={item.logo} alt="" loading="lazy" />
    : <CareerIcon name={item.icon} />;
  const body = (
    <>
      {mark}
      <span className="au-row-text">
        <span className="au-row-org">{item.org}</span>
        <span className="au-row-role">{item.role}</span>
      </span>
      <span className="au-row-period">{item.period}</span>
    </>
  );
  if (!item.url) return <li className="au-row">{body}</li>;
  return (
    <li>
      <ExternalLink className="au-row au-row-link" href={item.url}>{body}</ExternalLink>
    </li>
  );
}

function VideoCard({ video }) {
  return (
    <figure className="au-video">
      <div className="au-video-frame">
        <VideoEmbed video={video} />
      </div>
      <figcaption className="au-video-cap">
        <img className="au-logo-sm" src={video.logo} alt="" loading="lazy" />
        <span className="au-video-show">{video.show}</span>
        <span className="au-video-date">{video.date}</span>
        <span className="au-video-title">{video.title}</span>
      </figcaption>
    </figure>
  );
}

function FeatureCard({ item }) {
  return (
    <ExternalLink className="au-feat" href={item.url}>
      <span className="au-feat-head">
        <img className="au-logo-sm" src={item.logo} alt="" loading="lazy" />
        <span className="au-feat-outlet">{item.outlet}</span>
        <span className="au-feat-kind">{item.kind}</span>
      </span>
      <span className="au-feat-title">{item.title}</span>
      <span className="au-feat-date">{item.date}</span>
    </ExternalLink>
  );
}

export default function AuthorPage({ params }) {
  const author = getAuthor(params.slug, authors);
  if (!author) notFound();

  const firstName = author.name.split(' ')[0];
  const others = authors.filter((a) => a.slug !== author.slug);
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      authorPersonSchema(author, SITE),
      {
        '@type': 'ProfilePage',
        url: `${SITE}${authorPath(author)}`,
        mainEntity: { '@id': `${SITE}${authorPath(author)}#person` },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Nav />
      <div className="frame au-page">

        <section className="sect hero au-hero">
          <div className="hero-glow"></div>
          <div className="pad au-hero-in">
            <div className="au-photo-card">
              <img className="au-photo" src={author.photo} alt={author.name} />
            </div>
            <div className="au-hero-text">
              <a className="post-back" href="/about#team">&larr; The ReddiReach team</a>
              <span className="eyebrow">{author.role}</span>
              <h1 className="display au-name">{author.name}</h1>
              <p className="au-other-role">{author.otherRole}</p>
              <p className="lead au-lead">{author.summary}</p>
              <div className="au-profiles">
                {author.profiles.map((p) => (
                  <ExternalLink key={p.url} className="src au-profile" href={p.url} label={`${author.name} on ${p.label}`}>
                    <img className="fav" src={p.logo} alt="" />
                    {p.label}
                  </ExternalLink>
                ))}
              </div>
            </div>
          </div>
          <div className="pad au-stats-pad">
            <div className="about-stats au-stats">
              {author.highlights.map((h) => (
                <div key={h.label} className="ab-stat">
                  <div className="ab-big">{h.big}</div>
                  <div className="ab-lbl">{h.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="sect">
          <div className="pad au-story-grid">
            <div className="au-story">
              <span className="eyebrow">About {firstName}</span>
              <h2 className="h2 au-h2">{author.storyTitle}</h2>
              {author.story.map((para) => (
                <p key={para.slice(0, 40)}>{para}</p>
              ))}
            </div>
            <aside className="au-career">
              <span className="eyebrow">Career</span>
              <ul className="au-rows">
                {author.career.map((item) => (
                  <CareerRow key={`${item.org}-${item.role}`} item={item} />
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <section className="sect dots">
          <div className="pad" style={{ paddingBottom: '0' }}>
            <div className="sect-head">
              <span className="eyebrow">Expertise</span>
              <h2 className="h2">Where {firstName} helps clients most.</h2>
            </div>
          </div>
          <div className="grid-3" style={{ marginTop: '48px' }}>
            {author.expertise.map((e, i) => (
              <div key={e.title} className="cell">
                <div className={`ico ico-c${i % 6}`}>{String(i + 1).padStart(2, '0')}</div>
                <h3>{e.title}</h3>
                <p>{e.body}</p>
              </div>
            ))}
          </div>
        </section>

        {author.videos.length > 0 && (
          <section className="sect">
            <div className="pad">
              <div className="sect-head">
                <span className="eyebrow">Watch</span>
                <h2 className="h2">Hear {firstName} explain it.</h2>
              </div>
              <div className="au-videos">
                {author.videos.map((v) => (
                  <VideoCard key={v.id} video={v} />
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="sect dots">
          <div className="pad">
            <div className="sect-head">
              <span className="eyebrow">Interviews, writing and coverage</span>
              <h2 className="h2">Where {firstName} has been featured.</h2>
            </div>
            <div className="au-feats">
              {author.features.map((f) => (
                <FeatureCard key={f.url + f.title} item={f} />
              ))}
            </div>
          </div>
        </section>

        <section className="sect">
          <div className="pad">
            <div className="sect-head">
              <span className="eyebrow">The team</span>
              <h2 className="h2">Work with {firstName} and the team.</h2>
            </div>
            <div className="au-others">
              {others.map((o) => (
                <a key={o.slug} className="au-other" href={authorPath(o)}>
                  <img className="au-other-photo" src={o.photo} alt="" loading="lazy" />
                  <span className="au-row-text">
                    <span className="au-row-org">{o.name}</span>
                    <span className="au-row-role">{o.role}</span>
                  </span>
                  <span className="au-other-arrow" aria-hidden="true">&rarr;</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <Cta />
        <Footer />
      </div>
    </>
  );
}
