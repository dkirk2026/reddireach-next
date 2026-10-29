import { sanityFetch } from '@/lib/sanity';
import { publishedPostFilter } from '@/data/blog-migration.mjs';
import { authors } from '@/data/authors';
import { authorPath } from '@/lib/authors';

const SITE = 'https://www.reddireach.com';

// Regenerated hourly (and on-demand when the blog revalidates). Automatically
// includes every static page plus all Sanity blog posts.
export const revalidate = 3600;

export default async function sitemap() {
  const staticRoutes = [
    '', '/about', '/pricing', '/checklist', '/tools/reddit-shadowban-checker',
    '/services/geo', '/services/seo', '/services/reddit', '/services/link-building', '/services/advertising',
    '/privacy', '/terms', '/cookies', '/blog',
    ...authors.map(authorPath),
  ].map((path) => ({ url: `${SITE}${path}`, lastModified: new Date() }));

  let posts = [];
  try {
    const slugs = await sanityFetch(
      `*[${publishedPostFilter}]{ "slug": slug.current, "updated": coalesce(contentUpdatedAt, _updatedAt) }`
    );
    posts = (slugs || []).map((p) => ({
      url: `${SITE}/blog/${p.slug}`,
      lastModified: p.updated ? new Date(p.updated) : new Date(),
    }));
  } catch (e) {
    // If Sanity is unreachable at build, ship the static routes only.
  }

  return [...staticRoutes, ...posts];
}
