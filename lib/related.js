// Selection logic for the "Related posts" module, kept pure so the coverage
// guarantee can be proved in a unit test rather than hoped for.
//
// The problem this solves: related posts were chosen purely by shared-category
// count, ordered by (shared desc, publishedAt desc), and topped up from most
// recent. Both orderings are the SAME for every post on the site, so a handful
// of posts won every slot and 22 of 62 posts were never surfaced anywhere. A
// crawl found those 22 receiving exactly one internal link: the /blog index.
//
// The fix reserves one of the three slots for a "ring" neighbour. Order every
// post into a stable cycle and point each post at the next one. Because a cycle
// visits every node exactly once, EVERY post becomes exactly one other post's
// ring neighbour, so no post can be left with zero inbound editorial links.
// The remaining slots still go to genuine category relevance.

/**
 * The post that follows `currentSlug` in a cyclic ordering.
 *
 * @param {string[]} orderedSlugs Every post slug, in a stable order.
 * @param {string} currentSlug    The post being viewed.
 * @returns {string|null} The next slug, wrapping at the end. null when there is
 *                        no meaningful neighbour (unknown slug, or a site with
 *                        fewer than two posts).
 */
export function ringNeighbourSlug(orderedSlugs, currentSlug) {
  if (!Array.isArray(orderedSlugs) || orderedSlugs.length < 2) return null;
  const index = orderedSlugs.indexOf(currentSlug);
  if (index === -1) return null;
  return orderedSlugs[(index + 1) % orderedSlugs.length];
}

/**
 * Choose the related posts for one article.
 *
 * The ring neighbour is placed FIRST and category matches fill around it, so
 * the coverage guarantee cannot be eroded by a post with many category matches.
 *
 * @param {object} options
 * @param {string} options.currentSlug
 * @param {string[]} options.orderedSlugs      Stable ordering of every slug.
 * @param {object[]} options.categoryMatches   Card objects, best match first.
 * @param {object[]} [options.fallback]        Card objects used to top up.
 * @param {Map<string,object>} options.cardsBySlug Slug to card lookup.
 * @param {number} [options.limit]
 * @returns {object[]} Up to `limit` unique cards, never including the current post.
 */
export function selectRelated(options) {
  const {
    currentSlug,
    orderedSlugs = [],
    categoryMatches = [],
    fallback = [],
    cardsBySlug = new Map(),
    limit = 3,
  } = options || {};

  const picked = [];
  const seen = new Set([currentSlug]);

  function add(card) {
    if (!card || !card.slug) return;
    if (seen.has(card.slug)) return;
    if (picked.length >= limit) return;
    seen.add(card.slug);
    picked.push(card);
  }

  // Slot 1: the guaranteed ring neighbour.
  const neighbour = ringNeighbourSlug(orderedSlugs, currentSlug);
  if (neighbour) add(cardsBySlug.get(neighbour));

  // Remaining slots: real topical relevance, then recency as a last resort.
  for (const card of categoryMatches) add(card);
  for (const card of fallback) add(card);

  return picked;
}

/**
 * Sort posts into the stable cycle used for ring neighbours.
 *
 * Sorted by publish date then slug. Both are stable across builds, which keeps
 * statically rendered pages deterministic: the same input always produces the
 * same page, so a rebuild never silently reshuffles internal links.
 *
 * @param {object[]} posts Card objects with `slug` and `publishedAt`.
 * @returns {string[]} Ordered slugs.
 */
export function orderSlugsForRing(posts) {
  if (!Array.isArray(posts)) return [];
  return posts
    .filter((post) => post && typeof post.slug === 'string' && post.slug !== '')
    .slice()
    .sort((a, b) => {
      const da = String(a.publishedAt || '');
      const db = String(b.publishedAt || '');
      if (da !== db) return da < db ? -1 : 1;
      return a.slug < b.slug ? -1 : 1;
    })
    .map((post) => post.slug);
}
