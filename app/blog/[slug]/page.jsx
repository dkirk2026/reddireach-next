import { PortableText } from '@portabletext/react';
import { sanityFetch, formatDate } from '@/lib/sanity';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const revalidate = 60;

const CAL = 'https://calendly.com/kirkco/chat';

const portableTextComponents = {
  types: {
    image: ({ value }) =>
      value?.url ? (
        <figure className="post-fig">
          <img
            src={`${value.url}?w=1400&auto=format`}
            alt={value.alt || ''}
            loading="lazy"
          />
        </figure>
      ) : null,
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href || '#';
      const ext = /^https?:\/\//.test(href) && !href.includes('reddireach.com');
      return (
        <a href={href} {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
          {children}
        </a>
      );
    },
  },
};

const SINGLE_POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  "img": mainImage.asset->url,
  "author": author->name,
  "cats": categories[]->title,
  body[]{ ..., _type == "image" => { "url": asset->url, "alt": alt } }
}`;

export async function generateStaticParams() {
  const slugs = await sanityFetch(
    `*[_type == "post" && defined(slug.current)]{ "slug": slug.current }`
  );
  return (slugs || []).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const post = await sanityFetch(SINGLE_POST_QUERY, { slug: params.slug });
  const url = `https://www.reddireach.com/blog/${params.slug}`;
  const ogImage = post?.img ? `${post.img}?w=1200&h=630&fit=crop&auto=format` : 'https://www.reddireach.com/icon.png';
  return {
    title: post ? `${post.title} · ReddiReach Blog` : 'ReddiReach Blog',
    description: post?.excerpt || '',
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: post?.title,
      description: post?.excerpt || '',
      images: [{ url: ogImage, width: 1200, height: 630 }],
      publishedTime: post?.publishedAt,
    },
    twitter: { card: 'summary_large_image', images: [ogImage] },
  };
}

export default async function BlogPost({ params }) {
  const post = await sanityFetch(SINGLE_POST_QUERY, { slug: params.slug });

  if (!post) {
    return (
      <div className="frame">
        <Nav />
        <section className="sect">
          <div className="pad" style={{ maxWidth: '780px', margin: '0 auto' }}>
            <a className="post-back" href="/blog">&larr; All posts</a>
            <p>Post not found.</p>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  const postUrl = `https://www.reddireach.com/blog/${params.slug}`;
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
    url: postUrl,
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    image: post.img ? `${post.img}?w=1200&h=630&fit=crop&auto=format` : undefined,
    author: post.author ? { '@type': 'Person', name: post.author } : undefined,
    publisher: { '@type': 'Organization', name: 'ReddiReach', logo: { '@type': 'ImageObject', url: 'https://www.reddireach.com/icon.png' } },
  };

  return (
    <div className="frame">
      <Nav />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Article header */}
      <section className="sect post-head">
        <div className="hero-glow"></div>
        <div className="pad" style={{ paddingBottom: '32px', maxWidth: '780px', margin: '0 auto' }}>
          <a className="post-back" href="/blog">&larr; All posts</a>
          <div className="post-cats">
            {(post.cats || []).map((c) => (
              <span className="blog-cat" key={c}>{c}</span>
            ))}
          </div>
          <h1 className="post-title">{post.title}</h1>
          {post.excerpt && <p className="post-lead">{post.excerpt}</p>}
          <div className="post-byline">
            {post.author && <span>{post.author}</span>}
            <span>{formatDate(post.publishedAt)}</span>
          </div>
        </div>
      </section>

      {post.img && (
        <section className="sect post-cover-sect">
          <div className="pad" style={{ paddingTop: '0', paddingBottom: '0', maxWidth: '980px', margin: '0 auto' }}>
            <div className="post-cover">
              <img src={`${post.img}?w=1600&auto=format`} alt={post.title} />
            </div>
          </div>
        </section>
      )}

      {/* Body */}
      <section className="sect">
        <div className="pad post-body">
          <PortableText value={post.body || []} components={portableTextComponents} />
        </div>
      </section>

      {/* CTA */}
      <section className="sect cta" id="cta">
        <div className="glow"></div>
        <div className="pad cta-in">
          <span className="eyebrow">Get started</span>
          <h2 className="h2">Get AI to recommend your brand.</h2>
          <p className="lead">
            Book a free call. We will show you which subreddits and AI models matter for your niche, and where your brand stands today.
          </p>
          <a href={CAL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            Book a call
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
