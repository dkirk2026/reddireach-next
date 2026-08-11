'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { shouldTrackPath, isCalendlyHref, trackEvent } from '@/lib/analytics';

// Owns GA4 loading and the site-wide conversion events.
//
// Two jobs:
//   1. Do not load GA4 on /studio, so internal CMS sessions stay out of the
//      reports. Before this, /studio/structure alone was one of the top ten
//      landing pages by session count.
//   2. Fire book_call when a Calendly link is clicked. Booking a call is the
//      primary conversion and the CTA appears in ten components, so this uses
//      one delegated listener on the document instead of ten call sites. New
//      CTAs are covered automatically.
export default function Analytics({ gaId }) {
  const pathname = usePathname();
  const enabled = Boolean(gaId) && shouldTrackPath(pathname);

  useEffect(() => {
    if (!enabled) return undefined;

    function onClick(event) {
      // closest() walks up from the click target, so a click on a <span> or
      // icon inside the CTA still resolves to the anchor.
      const anchor = event.target && event.target.closest && event.target.closest('a[href]');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!isCalendlyHref(href)) return;
      trackEvent('book_call', {
        link_url: href,
        // Where on the site the booking started, for channel attribution.
        page_path: pathname,
      });
    }

    // Capture phase: still records the event if a handler stops propagation.
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [enabled, pathname]);

  if (!enabled) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
      </Script>
    </>
  );
}
