import { describe, it, expect } from 'vitest';
import { redirects } from './redirects.mjs';

// Every redirect whose destination is itself a redirect source. Google follows
// a few hops, but each hop costs crawl budget and link equity, so the list must
// always point straight at the final URL.
function findChains(list) {
  const sources = new Set(list.map((r) => r.source));
  return list.filter((r) => sources.has(r.destination));
}

function find(source) {
  return redirects.find((r) => r.source === source);
}

describe('redirects', () => {
  it('retires the off-topic SEO-expert post to the SEO service page, permanently', () => {
    expect(find('/blog/how-to-vet-an-seo-expert-in-2026')).toEqual({
      source: '/blog/how-to-vet-an-seo-expert-in-2026',
      destination: '/services/seo',
      permanent: true,
    });
  });

  it('has no chains: no destination is also a redirect source', () => {
    expect(findChains(redirects)).toEqual([]);
  });

  it('lists each source once, so no rule is silently shadowed by an earlier one', () => {
    const sources = redirects.map((r) => r.source);
    expect(new Set(sources).size).toBe(sources.length);
  });

  it('only uses permanent redirects', () => {
    expect(redirects.filter((r) => r.permanent !== true)).toEqual([]);
  });
});

// Wave 1 of the blog plan: each merged post (left) 301s to its survivor (right).
// Source: content-workflow-pilot/reddireach-wave1-2026-10-23/wave-map.json, every
// post listed under a survivor whose own slug differs from the survivor's.
const WAVE1_MERGES = [
  ['reddit-marketing-agencies-and-what-top-lists-get-wrong', 'best-reddit-marketing-agencies'],
  ['soar-agency-alternatives-for-reddit-marketing-in-2026', 'best-reddit-marketing-agencies'],
  ['2026-update-reddit-marketing-agency-for-saas-ecommerce-strategy-execution-and-measurable-roi', 'how-to-choose-a-reddit-marketing-agency'],
  ['reddit-marketing-agency-guide-for-2026', 'how-to-choose-a-reddit-marketing-agency'],
  ['underpaid-overworked-in-2026-when-to-hire-a-reddit-growth-partner', 'how-to-choose-a-reddit-marketing-agency'],
  ['reddit-marketing-deliverables-checklist-for-2026', 'how-to-choose-a-reddit-marketing-agency'],
  ['how-to-market-on-reddit-without-getting-banned', 'reddit-marketing-strategy'],
  ['reddit-promotion-without-being-salesy-in-2026-post-templates', 'reddit-marketing-strategy'],
  ['improve-brand-visibility-on-reddit-without-getting-downvoted', 'reddit-marketing-strategy'],
  ['reddit-marketing-in-2026-without-creator-energy', 'reddit-marketing-strategy'],
  ['lurkers-everywhere-fix-engagement-drop-off-in-2026-communities', 'reddit-marketing-strategy'],
  ['engagement-collapse-in-2026-fix-they-watch-don-t-comment', 'reddit-marketing-strategy'],
];

describe('wave 1 merge redirects (do not ship before the wave 1 survivors publish)', () => {
  it.each(WAVE1_MERGES)('/blog/%s goes permanently to /blog/%s', (merged, survivor) => {
    expect(find(`/blog/${merged}`)).toEqual({
      source: `/blog/${merged}`,
      destination: `/blog/${survivor}`,
      permanent: true,
    });
  });

  it('repoints the legacy WordPress URL straight to the strategy pillar, not via a merged post', () => {
    expect(find('/how-to-avoid-common-mistakes-when-marketing-on-reddit').destination).toBe(
      '/blog/reddit-marketing-strategy'
    );
  });
});

describe('findChains', () => {
  it('flags a redirect that lands on another redirect source', () => {
    const list = [
      { source: '/a', destination: '/b', permanent: true },
      { source: '/b', destination: '/c', permanent: true },
    ];
    expect(findChains(list)).toEqual([list[0]]);
  });
});
