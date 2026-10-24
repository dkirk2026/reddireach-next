import { describe, it, expect } from 'vitest';
import { postTitleTag, postDescription } from './seo.js';

describe('postTitleTag', () => {
  it('uses the Sanity seoTitle when it is set', () => {
    const post = { title: 'How to Choose a Reddit Marketing Agency', seoTitle: 'Reddit Marketing Agency Checklist (2026): 9 Tests' };
    expect(postTitleTag(post)).toBe('Reddit Marketing Agency Checklist (2026): 9 Tests');
  });

  it('falls back to the post title when seoTitle is missing', () => {
    expect(postTitleTag({ title: 'Nicely Network vs ReddiReach' })).toBe('Nicely Network vs ReddiReach');
    expect(postTitleTag({ title: 'Nicely Network vs ReddiReach', seoTitle: null })).toBe('Nicely Network vs ReddiReach');
  });

  it('falls back to the post title when seoTitle is empty or only whitespace', () => {
    expect(postTitleTag({ title: 'A real title', seoTitle: '' })).toBe('A real title');
    expect(postTitleTag({ title: 'A real title', seoTitle: '   ' })).toBe('A real title');
  });

  it('trims stray whitespace around the seoTitle', () => {
    expect(postTitleTag({ title: 'T', seoTitle: '  Reddit Shadowban Fix [2026] ' })).toBe('Reddit Shadowban Fix [2026]');
  });

  it('never appends the old " · ReddiReach Blog" suffix', () => {
    expect(postTitleTag({ title: 'A real title', seoTitle: 'An SEO title' })).not.toContain('ReddiReach Blog');
    expect(postTitleTag({ title: 'A real title' })).not.toContain('ReddiReach Blog');
  });
});


describe('postDescription', () => {
  it('uses the reviewed meta description instead of the longer card excerpt', () => {
    expect(postDescription({ metaDescription: '  Reviewed description.  ', excerpt: 'Card copy.' })).toBe('Reviewed description.');
  });
  it('retains the excerpt fallback for older articles without a meta description', () => {
    expect(postDescription({ excerpt: 'Existing description.' })).toBe('Existing description.');
    expect(postDescription({ metaDescription: '  ', excerpt: 'Existing description.' })).toBe('Existing description.');
    expect(postDescription({})).toBe('');
  });
});
