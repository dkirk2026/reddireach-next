import { formatDate } from '@/lib/sanity';

// Presentational only: the caller fetches with getRelatedPosts() from
// lib/sanity.js and passes the result in. Markup and class names deliberately
// mirror the cards on the blog index (app/blog/page.jsx) so this reuses the
// existing .blog-grid / .blog-card styles instead of adding a new card style.
export default function RelatedPosts({ posts }) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="sect related-sect" aria-labelledby="related-posts-heading">
      <div className="pad">
        <div className="sect-head" style={{ marginBottom: '0' }}>
          <span className="eyebrow">Keep reading</span>
          <h2 className="h2" id="related-posts-heading">Related posts.</h2>
        </div>
        <div className="blog-grid">
          {posts.map((p) => (
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
  );
}
