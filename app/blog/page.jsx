import { sanityFetch, formatDate } from '@/lib/sanity';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const revalidate = 60;

export const metadata = {
  title: 'Blog · Reddit Marketing & AI Search · ReddiReach',
  description:
    'Playbooks and insights on Reddit marketing, Generative Engine Optimization (GEO), SEO and getting your brand recommended by ChatGPT, Perplexity and Google AI.',
};

export default async function BlogIndex() {
  const posts = await sanityFetch(`*[_type == "post" && defined(slug.current)] | order(publishedAt desc){
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  "img": mainImage.asset->url,
  "author": author->name,
  "cat": categories[0]->title
}`);

  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <div className="frame">
      <Nav />

      {/* Hero */}
      <section className="sect hero blog-hero">
        <div className="hero-glow"></div>
        <div className="pad hero-in" style={{ maxWidth: '760px', paddingBottom: '40px' }}>
          <span className="eyebrow" style={{ justifyContent: 'center' }}>Blog</span>
          <h1 className="display" style={{ margin: '20px 0 14px', fontSize: 'clamp(32px,5vw,52px)' }}>
            Reddit marketing and <span className="u" style={{ color: 'var(--brand)' }}>AI search</span> playbooks.
          </h1>
          <p className="lead" style={{ maxWidth: '600px', margin: '0 auto' }}>
            Tactics, teardowns and research on getting your brand recommended by AI, from the team that does it every day.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="sect dots">
        <div className="pad">
          {featured && (
            <a className="blog-feat" href={`/blog/${featured.slug}`}>
              {featured.img && (
                <div className="blog-feat-img">
                  <img
                    src={`${featured.img}?w=1200&h=720&fit=crop&auto=format`}
                    alt={featured.title}
                    loading="lazy"
                  />
                </div>
              )}
              <div className="blog-feat-body">
                {featured.cat && <span className="blog-cat">{featured.cat}</span>}
                <h2 className="blog-feat-title">{featured.title}</h2>
                {featured.excerpt && <p className="blog-feat-ex">{featured.excerpt}</p>}
                <div className="blog-meta">
                  {featured.author && <span>{featured.author}</span>}
                  <span>{formatDate(featured.publishedAt)}</span>
                </div>
              </div>
            </a>
          )}

          <div className="blog-grid">
            {rest.map((p) => (
              <a className="blog-card" href={`/blog/${p.slug}`} key={p.slug}>
                {p.img && (
                  <div className="blog-card-img">
                    <img
                      src={`${p.img}?w=720&h=440&fit=crop&auto=format`}
                      alt={p.title}
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="blog-card-body">
                  {p.cat && <span className="blog-cat">{p.cat}</span>}
                  <h3 className="blog-card-title">{p.title}</h3>
                  {p.excerpt && <p className="blog-card-ex">{p.excerpt}</p>}
                  <div className="blog-meta">
                    {p.author && <span>{p.author}</span>}
                    <span>{formatDate(p.publishedAt)}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
