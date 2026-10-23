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

describe('findChains', () => {
  it('flags a redirect that lands on another redirect source', () => {
    const list = [
      { source: '/a', destination: '/b', permanent: true },
      { source: '/b', destination: '/c', permanent: true },
    ];
    expect(findChains(list)).toEqual([list[0]]);
  });
});
