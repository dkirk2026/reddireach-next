// Shared page-metadata builder.
//
// Why this exists: in the Next.js App Router a child page's `openGraph` object
// REPLACES the root layout's `openGraph` wholesale, it does not merge field by
// field. So any page that set only `openGraph.url` (or only a title) silently
// dropped the site-wide og:image, og:type and og:site_name. Building the whole
// block here keeps every page complete and keeps the canonical URL and og:url
// in sync from one input.

export const SITE = 'https://www.reddireach.com';

// 1200x630 default social card (public/og-default.png). The old fallback was
// icon.png at 180x180, which is below the minimum size for a
// summary_large_image Twitter card.
export const OG_IMAGE = `${SITE}/og-default.png`;
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

// Build the absolute URL for a site path. '/' maps to the bare origin so it
// matches the homepage canonical that is already live.
export function absoluteUrl(path) {
  if (!path || path === '/') return SITE;
  return `${SITE}${path}`;
}

/**
 * Build a complete Next.js metadata object for a static (non-blog) page.
 *
 * @param {object} options
 * @param {string} options.path            Site-relative path, e.g. '/pricing' or '/'.
 * @param {string} options.title           <title> and og:title.
 * @param {string} options.description     Meta description and og:description.
 * @param {string} [options.ogTitle]       Override og:title only.
 * @param {string} [options.ogDescription] Override og:description only.
 * @returns {object} Next.js metadata object.
 */
export function pageMetadata(options) {
  const path = options.path;
  const title = options.title;
  const description = options.description;
  const ogTitle = options.ogTitle || title;
  const ogDescription = options.ogDescription || description;
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      siteName: 'ReddiReach',
      url,
      title: ogTitle,
      description: ogDescription,
      images: [{ url: OG_IMAGE, width: OG_IMAGE_WIDTH, height: OG_IMAGE_HEIGHT }],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      images: [OG_IMAGE],
    },
  };
}

/**
 * Build FAQPage JSON-LD from a [{ q, a }] array. Used by the homepage and the
 * about page so both read from the same source arrays.
 */
export function faqPageSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (faqs || []).map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
