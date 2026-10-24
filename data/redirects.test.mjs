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

// Waves 2 to 4 of the blog plan: each merged or moved post (left) 301s to its
// survivor (right). Source: content-workflow-pilot/reddireach-wave1-2026-10-23/
// wave-map.json, every post listed under a wave 2 to 4 survivor whose slug
// differs from the survivor's.
const WAVES_2_4_MERGES = [
  ['reddit-marketing-tool-guide-for-saas-founders-2026', 'best-reddit-marketing-tools-for-2025-2026-plus-the-exact-moments-to-hire-an-agency-instead'],
  ['reddit-lead-generation-tools-2026-how-to-choose-best-options-for-saas-ecom', 'best-reddit-marketing-tools-for-2025-2026-plus-the-exact-moments-to-hire-an-agency-instead'],
  ['ai-powered-reddit-engagement-without-sounding-like-a-bot', 'automated-reddit-marketing-tools-what-to-automate-and-avoid'],
  ['ai-powered-reddit-engagement-for-saas-automate-vs-human-vs-roi', 'automated-reddit-marketing-tools-what-to-automate-and-avoid'],
  ['reddit-first-demand-signals-in-2026', 'how-to-set-up-reddit-keyword-monitoring-for-saas-and-ecommerce'],
  ['reddit-marketing-roi-in-2026', 'reddit-analytics-metrics-that-matter-for-saas-and-growth-teams'],
  ['reddit-ai-search-optimization-2026-the-definitive-playbook-to-earn-mentions-in-ai-answers-rank-in-google', 'reddit-ai-search-optimization'],
  ['answer-engine-optimization-for-reddit-in-2026', 'reddit-ai-search-optimization'],
  ['reddit-and-quora-distribution-system-for-ai-search-in-2026', 'reddit-ai-search-optimization'],
  ['reddit-ai-seo-strategies-for-2026', 'reddit-seo'],
  ['reddit-seo-strategies-for-ranking-threads-in-google-and-ai-answers', 'reddit-seo'],
  ['reddit-marketing-vs-seo-for-ai-recommendations', 'reddit-seo'],
  ['reddit-seo-intelligence-for-saas-evaluate-subreddits-and-threads', 'reddit-seo'],
  ['why-chatgpt-recommends-your-competitors', 'how-to-get-chatgpt-to-mention-your-brand-via-reddit-marketing'],
  ['why-brand-mentions-matter-for-ai-search-optimization', 'how-to-get-chatgpt-to-mention-your-brand-via-reddit-marketing'],
  ['stop-vague-ai-visibility-advice-with-a-2026-ai-search-test-checklist', 'generative-engine-optimization-for-brands'],
  ['ai-seo-case-study-more-ai-citations-and-qualified-leads-in-60-days', 'generative-engine-optimization-for-brands'],
  ['reddit-marketing-in-2026-for-saas-founders', 'reddit-marketing-for-saas'],
  ['b2b-reddit-marketing-playbook-for-pipeline-without-brand-account-blowback', 'reddit-marketing-for-saas'],
  ['nobody-cares-about-your-startup-reddit-positioning-that-converts', 'reddit-marketing-for-saas'],
  ['how-to-market-your-ecommerce-brand-with-reddit', 'reddit-marketing-for-ecommerce'],
  ['reddit-strategies-for-7-9-figure-ecommerce-brands', 'reddit-marketing-for-ecommerce'],
  ['how-to-find-customers-on-reddit-for-saas-and-ecommerce', 'reddit-lead-generation'],
  ['reddit-lead-generation-playbook-for-saas-ecommerce-2026', 'reddit-lead-generation'],
  ['reddit-comment-to-lead-funnel-for-saas-founders-2026', 'reddit-lead-generation'],
  ['steal-competitors-angry-customers-on-reddit-no-spam-2026', 'reddit-lead-generation'],
  ['scared-of-cold-calling-use-reddit-as-warm-outbound-in-2026', 'reddit-lead-generation'],
  ['first-3-clients-with-0-in-2026-using-direct-outreach', 'reddit-lead-generation'],
  ['first-paying-customer-fast-in-2026-with-a-reddit-launch-checklist', 'reddit-lead-generation'],
  ['first-customer-on-reddit-in-2026-offer-and-post-playbook', 'reddit-lead-generation'],
  ['1-paying-customer-from-the-wild-to-10-with-reddit-in-2026', 'reddit-lead-generation'],
  ['solo-saas-launch-in-2026-with-reddit-demand-validation', 'reddit-lead-generation'],
  ['linkedin-not-converting-in-2026-validate-demand-with-reddit-ai-search', 'reddit-lead-generation'],
  ['grow-saas-without-ads-in-2026-using-reddit-and-ai-search', 'reddit-lead-generation'],
  ['reddit-marketing-case-studies-7-campaign-breakdowns', 'reddit-marketing-case-studies'],
  ['reddit-marketing-case-studies-2026', 'reddit-marketing-case-studies'],
];

describe('waves 2 to 4 merge redirects (ship with the 21 survivors, never before)', () => {
  it.each(WAVES_2_4_MERGES)('/blog/%s goes permanently to /blog/%s', (merged, survivor) => {
    expect(find(`/blog/${merged}`)).toEqual({
      source: `/blog/${merged}`,
      destination: `/blog/${survivor}`,
      permanent: true,
    });
  });

  it('repoints the two legacy lead-generation URLs straight to the new lead generation guide', () => {
    for (const source of ['/quality-leads-on-reddit', '/how-to-generate-quality-leads-on-reddit-the-authentic-approach-guide']) {
      expect(find(source).destination).toBe('/blog/reddit-lead-generation');
    }
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
