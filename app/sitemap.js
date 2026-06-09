import { sanityFetch } from '@/lib/sanity';

const SITE = 'https://www.reddireach.com';

// Regenerated hourly (and on-demand when the blog revalidates). Automatically
// includes every static page plus all Sanity blog posts.
export const revalidate = 3600;

export default async function sitemap() {
  const staticRoutes = [
    '', '/about', '/pricing', '/checklist',
    '/services/geo', '/services/seo', '/services/reddit', '/services/link-building',
    '/privacy', '/terms', '/cookies', '/blog',
  ].map((path) => ({ url: `${SITE}${path}`, lastModified: new Date() }));

  let posts = [];
  try {
    const slugs = await sanityFetch(
      `*[_type == "post" && defined(slug.current)]{ "slug": slug.current, "updated": _updatedAt }`
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
