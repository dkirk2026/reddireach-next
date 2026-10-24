import { redirects } from './redirects.mjs';

// Retain the original CMS documents for recovery, but surface only canonical
// survivors in the index, sitemap, static paths and related-post links.
export const retiredBlogSlugs = redirects
  .filter((rule) => rule.source.startsWith('/blog/'))
  .map((rule) => rule.source.slice('/blog/'.length));

export const publishedPostFilter = `_type == "post" && defined(slug.current)
  && !(_id in path("drafts.**"))
  && !(slug.current in ${JSON.stringify(retiredBlogSlugs)})`;
