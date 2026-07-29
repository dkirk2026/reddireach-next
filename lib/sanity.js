// Read-only Sanity client for the ReddiReach blog. The dataset is public, so no
// token is needed. Uses fetch with Next's ISR cache: pages are statically
// cached and revalidated on an interval, and instantly via on-demand
// revalidation (see app/api/revalidate/route.js). Config comes from env vars
// with the live ReddiReach project as the default.
const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'vj3ex5iz';
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const API_VERSION = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

// Revalidate cached Sanity data every 60s (ISR). On-demand revalidation makes
// new posts appear instantly; this interval is the safety net.
const REVALIDATE_SECONDS = 60;

export async function sanityFetch(query, params = {}) {
  const url = new URL(`https://${PROJECT_ID}.apicdn.sanity.io/v${API_VERSION}/data/query/${DATASET}`);
  url.searchParams.set('query', query);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(`$${key}`, JSON.stringify(value));
  }
  const res = await fetch(url.toString(), {
    next: { revalidate: REVALIDATE_SECONDS, tags: ['sanity'] },
  });
  if (!res.ok) throw new Error(`Sanity fetch failed: ${res.status} ${res.statusText}`);
  const json = await res.json();
  return json.result;
}

// Fields every post card needs. Kept in one place so the blog index and the
// related-posts module stay visually consistent.
const CARD_FIELDS = `
  title,
  "slug": slug.current,
  excerpt,
  "publishedAt": coalesce(publishedAt, _createdAt),
  "img": mainImage.asset->url,
  "author": author->name,
  "cat": categories[0]->title
`;

// Posts sharing at least one category with the current post, best match first.
// `shared` counts overlapping categories so a post matching 3 categories ranks
// above one matching only the near-universal "Reddit Marketing" category.
const RELATED_BY_CATEGORY_QUERY = `*[
  _type == "post"
  && defined(slug.current)
  && slug.current != $slug
  && count((categories[]->title)[@ in $cats]) > 0
]{
  ${CARD_FIELDS},
  "shared": count((categories[]->title)[@ in $cats])
} | order(shared desc, publishedAt desc)[0...$limit]`;

// Fallback pool: most recent posts, excluding the current post and anything
// already picked by the category match.
const RECENT_POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
  && !(slug.current in $exclude)
]{
  ${CARD_FIELDS}
} | order(publishedAt desc)[0...$limit]`;

/**
 * Related posts for a blog post, for the "Related posts" module.
 *
 * Reads only data that already exists in Sanity (categories, title, slug,
 * excerpt, mainImage, author, date). No schema or content changes required.
 *
 * @param {string} slug     Slug of the post currently being viewed.
 * @param {string[]} cats   Category titles of the current post.
 * @param {number} [limit]  How many posts to return (default 3).
 * @returns {Promise<Array>} Post card objects. Never throws: on a Sanity error
 *                           it returns [] so the module simply does not render
 *                           rather than taking the whole article page down.
 */
export async function getRelatedPosts(slug, cats, limit = 3) {
  const categories = Array.isArray(cats) ? cats.filter(Boolean) : [];

  try {
    let related = [];

    if (categories.length > 0) {
      const byCategory = await sanityFetch(RELATED_BY_CATEGORY_QUERY, {
        slug,
        cats: categories,
        limit,
      });
      related = byCategory || [];
    }

    // Too few category matches: top up with the most recent posts.
    if (related.length < limit) {
      const exclude = [slug];
      for (const post of related) {
        exclude.push(post.slug);
      }
      const recent = await sanityFetch(RECENT_POSTS_QUERY, {
        exclude,
        limit: limit - related.length,
      });
      related = related.concat(recent || []);
    }

    return related;
  } catch (err) {
    console.error('getRelatedPosts failed:', err);
    return [];
  }
}

export function formatDate(iso) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch (e) {
    return '';
  }
}
