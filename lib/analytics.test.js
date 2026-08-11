import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { shouldTrackPath, isCalendlyHref, trackEvent } from './analytics.js';

describe('shouldTrackPath', () => {
  it('tracks normal site routes', () => {
    expect(shouldTrackPath('/')).toBe(true);
    expect(shouldTrackPath('/pricing')).toBe(true);
    expect(shouldTrackPath('/blog/reddit-marketing-roi-in-2026')).toBe(true);
    expect(shouldTrackPath('/services/reddit')).toBe(true);
  });

  it('excludes the embedded Sanity Studio', () => {
    expect(shouldTrackPath('/studio')).toBe(false);
    expect(shouldTrackPath('/studio/structure')).toBe(false);
    expect(shouldTrackPath('/studio/desk/post;abc123')).toBe(false);
  });

  it('does not exclude routes that merely start with the same letters', () => {
    // Guard against a naive startsWith('/studio') check.
    expect(shouldTrackPath('/studios')).toBe(true);
    expect(shouldTrackPath('/studio-tour')).toBe(true);
  });

  it('returns false for unusable input rather than throwing', () => {
    expect(shouldTrackPath('')).toBe(false);
    expect(shouldTrackPath(null)).toBe(false);
    expect(shouldTrackPath(undefined)).toBe(false);
  });
});

describe('isCalendlyHref', () => {
  it('matches the real booking links used on the site', () => {
    expect(isCalendlyHref('https://calendly.com/kirkco/chat')).toBe(true);
    expect(isCalendlyHref('https://www.calendly.com/kirkco/chat')).toBe(true);
    expect(isCalendlyHref('http://calendly.com/kirkco/chat')).toBe(true);
    expect(isCalendlyHref('https://calendly.com/kirkco/chat?month=2026-08')).toBe(true);
  });

  it('ignores internal and unrelated links', () => {
    expect(isCalendlyHref('/pricing')).toBe(false);
    expect(isCalendlyHref('https://www.reddireach.com/pricing')).toBe(false);
    expect(isCalendlyHref('mailto:filipe@aipeekaboo.com')).toBe(false);
    expect(isCalendlyHref('https://reddit.com/r/saas')).toBe(false);
  });

  it('is not fooled by lookalike hostnames', () => {
    // The dangerous case: a substring match would treat these as Calendly.
    expect(isCalendlyHref('https://calendly.com.evil.test/x')).toBe(false);
    expect(isCalendlyHref('https://notcalendly.com/x')).toBe(false);
    expect(isCalendlyHref('https://fakecalendly.com/x')).toBe(false);
  });

  it('returns false for unusable input rather than throwing', () => {
    expect(isCalendlyHref('')).toBe(false);
    expect(isCalendlyHref(null)).toBe(false);
    expect(isCalendlyHref('not a url at all ::::')).toBe(false);
  });
});

describe('trackEvent', () => {
  let originalWindow;

  beforeEach(() => {
    originalWindow = globalThis.window;
  });

  afterEach(() => {
    if (originalWindow === undefined) delete globalThis.window;
    else globalThis.window = originalWindow;
  });

  it('forwards the event to gtag', () => {
    const gtag = vi.fn();
    globalThis.window = { gtag };
    expect(trackEvent('generate_lead', { method: 'checker' })).toBe(true);
    expect(gtag).toHaveBeenCalledWith('event', 'generate_lead', { method: 'checker' });
  });

  it('defaults params to an empty object', () => {
    const gtag = vi.fn();
    globalThis.window = { gtag };
    trackEvent('book_call');
    expect(gtag).toHaveBeenCalledWith('event', 'book_call', {});
  });

  it('is a no-op when gtag is absent, so a blocked tag cannot break a form', () => {
    globalThis.window = {};
    expect(trackEvent('generate_lead')).toBe(false);
  });

  it('rejects an empty event name', () => {
    const gtag = vi.fn();
    globalThis.window = { gtag };
    expect(trackEvent('')).toBe(false);
    expect(gtag).not.toHaveBeenCalled();
  });
});
