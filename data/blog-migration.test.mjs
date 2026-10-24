import { expect, it } from 'vitest';
import { retiredBlogSlugs, publishedPostFilter } from './blog-migration.mjs';
import { redirects } from './redirects.mjs';

it('excludes every redirected blog source but never a surviving destination', () => {
  const blogRedirects = redirects.filter(r => r.source.startsWith('/blog/'));
  expect(retiredBlogSlugs).toHaveLength(49);
  expect(retiredBlogSlugs).toEqual(blogRedirects.map(r => r.source.slice('/blog/'.length)));
  for (const r of blogRedirects) {
    expect(retiredBlogSlugs).not.toContain(r.destination.slice('/blog/'.length));
  }
  expect(publishedPostFilter).toContain('!(slug.current in');
  expect(publishedPostFilter).toContain('!(_id in path("drafts.**"))');
});
