import { describe, it, expect } from 'vitest';
import { ringNeighbourSlug, selectRelated, orderSlugsForRing } from './related.js';

const card = (slug) => ({ slug, title: slug });
const lookup = (slugs) => new Map(slugs.map((s) => [s, card(s)]));

describe('ringNeighbourSlug', () => {
  it('returns the next slug in order', () => {
    expect(ringNeighbourSlug(['a', 'b', 'c'], 'a')).toBe('b');
    expect(ringNeighbourSlug(['a', 'b', 'c'], 'b')).toBe('c');
  });

  it('wraps around at the end so the cycle closes', () => {
    expect(ringNeighbourSlug(['a', 'b', 'c'], 'c')).toBe('a');
  });

  it('handles degenerate input without throwing', () => {
    expect(ringNeighbourSlug(['a'], 'a')).toBe(null);
    expect(ringNeighbourSlug([], 'a')).toBe(null);
    expect(ringNeighbourSlug(['a', 'b'], 'zzz')).toBe(null);
    expect(ringNeighbourSlug(null, 'a')).toBe(null);
  });
});

describe('orderSlugsForRing', () => {
  it('orders by publish date, then slug for ties', () => {
    const posts = [
      { slug: 'c', publishedAt: '2026-03-01' },
      { slug: 'a', publishedAt: '2026-01-01' },
      { slug: 'b', publishedAt: '2026-01-01' },
    ];
    expect(orderSlugsForRing(posts)).toEqual(['a', 'b', 'c']);
  });

  it('is deterministic regardless of input order, so builds are reproducible', () => {
    const posts = [
      { slug: 'x', publishedAt: '2026-02-01' },
      { slug: 'y', publishedAt: '2026-01-01' },
      { slug: 'z', publishedAt: '2026-03-01' },
    ];
    const first = orderSlugsForRing(posts);
    const second = orderSlugsForRing(posts.slice().reverse());
    expect(first).toEqual(second);
  });

  it('drops entries without a usable slug', () => {
    const posts = [{ slug: 'a', publishedAt: '1' }, { slug: '' }, null, { publishedAt: '2' }];
    expect(orderSlugsForRing(posts)).toEqual(['a']);
  });
});

describe('selectRelated', () => {
  const slugs = ['a', 'b', 'c', 'd', 'e'];
  const cards = lookup(slugs);

  it('always includes the ring neighbour', () => {
    const out = selectRelated({
      currentSlug: 'a',
      orderedSlugs: slugs,
      categoryMatches: [card('c'), card('d'), card('e')],
      cardsBySlug: cards,
      limit: 3,
    });
    expect(out.map((p) => p.slug)).toContain('b');
  });

  it('keeps the ring neighbour even when category matches could fill every slot', () => {
    // The regression that caused the bug: popular posts crowding everything out.
    const out = selectRelated({
      currentSlug: 'a',
      orderedSlugs: slugs,
      categoryMatches: [card('c'), card('d'), card('e')],
      cardsBySlug: cards,
      limit: 3,
    });
    expect(out).toHaveLength(3);
    expect(out[0].slug).toBe('b');
    expect(out.map((p) => p.slug)).toEqual(['b', 'c', 'd']);
  });

  it('never includes the current post', () => {
    const out = selectRelated({
      currentSlug: 'a',
      orderedSlugs: slugs,
      categoryMatches: [card('a'), card('c')],
      cardsBySlug: cards,
      limit: 3,
    });
    expect(out.map((p) => p.slug)).not.toContain('a');
  });

  it('does not duplicate a post that is both ring neighbour and category match', () => {
    const out = selectRelated({
      currentSlug: 'a',
      orderedSlugs: slugs,
      categoryMatches: [card('b'), card('c')],
      cardsBySlug: cards,
      limit: 3,
    });
    expect(out.map((p) => p.slug)).toEqual(['b', 'c']);
  });

  it('tops up from the fallback pool when category matches run short', () => {
    const out = selectRelated({
      currentSlug: 'a',
      orderedSlugs: slugs,
      categoryMatches: [],
      fallback: [card('d'), card('e')],
      cardsBySlug: cards,
      limit: 3,
    });
    expect(out.map((p) => p.slug)).toEqual(['b', 'd', 'e']);
  });

  it('respects the limit', () => {
    const out = selectRelated({
      currentSlug: 'a',
      orderedSlugs: slugs,
      categoryMatches: [card('c'), card('d'), card('e')],
      cardsBySlug: cards,
      limit: 2,
    });
    expect(out).toHaveLength(2);
  });

  it('returns an empty list rather than throwing on missing input', () => {
    expect(selectRelated({})).toEqual([]);
    expect(selectRelated()).toEqual([]);
  });
});

describe('coverage guarantee (the whole point of the fix)', () => {
  it('gives every post at least one inbound link across the whole site', () => {
    // Model the real site: 62 posts, and a category system where a few posts
    // dominate every match — exactly the condition that orphaned 22 posts.
    const slugs = Array.from({ length: 62 }, (_, i) => `post-${String(i).padStart(2, '0')}`);
    const cards = lookup(slugs);
    const hogs = [card('post-00'), card('post-01'), card('post-02')];

    const inbound = new Map(slugs.map((s) => [s, 0]));
    for (const slug of slugs) {
      const related = selectRelated({
        currentSlug: slug,
        orderedSlugs: slugs,
        categoryMatches: hogs,
        cardsBySlug: cards,
        limit: 3,
      });
      for (const post of related) inbound.set(post.slug, inbound.get(post.slug) + 1);
    }

    const orphans = slugs.filter((s) => inbound.get(s) === 0);
    expect(orphans).toEqual([]);
    // A cycle visits every node exactly once, so each post is someone's
    // neighbour precisely one time.
    for (const slug of slugs) expect(inbound.get(slug)).toBeGreaterThanOrEqual(1);
  });

  it('the old category-only approach fails this same test', () => {
    // Guard against someone "simplifying" the ring back out again.
    const slugs = Array.from({ length: 62 }, (_, i) => `post-${String(i).padStart(2, '0')}`);
    const hogs = ['post-00', 'post-01', 'post-02'];
    const inbound = new Map(slugs.map((s) => [s, 0]));
    for (const slug of slugs) {
      for (const pick of hogs.filter((h) => h !== slug).slice(0, 3)) {
        inbound.set(pick, inbound.get(pick) + 1);
      }
    }
    const orphans = slugs.filter((s) => inbound.get(s) === 0);
    expect(orphans.length).toBe(59);
  });
});
