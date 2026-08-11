// Analytics helpers, kept free of React and browser globals at module scope so
// the decision logic can be unit-tested without a DOM.
//
// Why this exists: before this module the site fired no custom GA4 events at
// all. Every session showed up as page_view/scroll/click, so no lead or booked
// call was attributable to a channel. It also tracked the embedded Sanity
// Studio, which put internal CMS usage into the same reports as real visitors.

export const CALENDLY_HOST = 'calendly.com';

// Route prefixes that must never load analytics. /studio is the embedded Sanity
// Studio: authenticated internal usage, not site traffic.
export const EXCLUDED_PREFIXES = ['/studio'];

/**
 * Should analytics load for this pathname?
 *
 * @param {string} pathname Site-relative path, e.g. '/blog/foo'.
 * @returns {boolean} false for excluded routes and unusable input.
 */
export function shouldTrackPath(pathname) {
  if (typeof pathname !== 'string' || pathname === '') return false;
  return !EXCLUDED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix + '/'),
  );
}

/**
 * Is this href a Calendly booking link?
 *
 * Booking a call is the site's primary conversion, and the CTA is a plain
 * external link in ten different components. Matching on the destination in one
 * delegated listener beats editing ten call sites and keeps future CTAs covered
 * automatically.
 *
 * @param {string} href Absolute or relative URL.
 * @returns {boolean}
 */
export function isCalendlyHref(href) {
  if (typeof href !== 'string' || href === '') return false;
  let url;
  try {
    // Base only matters for relative hrefs, which can never be Calendly.
    url = new URL(href, 'https://www.reddireach.com');
  } catch {
    return false;
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return false;
  const host = url.hostname.toLowerCase();
  return host === CALENDLY_HOST || host.endsWith('.' + CALENDLY_HOST);
}

/**
 * Send a GA4 event if the tag is present.
 *
 * Returns a boolean rather than throwing so callers can be tested and so a
 * blocked or not-yet-loaded gtag never breaks a form submit.
 *
 * @param {string} name GA4 event name.
 * @param {object} [params] Event parameters.
 * @returns {boolean} true if handed to gtag.
 */
export function trackEvent(name, params) {
  if (typeof name !== 'string' || name === '') return false;
  if (typeof window === 'undefined') return false;
  if (typeof window.gtag !== 'function') return false;
  window.gtag('event', name, params || {});
  return true;
}
