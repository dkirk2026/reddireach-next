import './globals.css';
import Script from 'next/script';
import { SITE, OG_IMAGE, OG_IMAGE_WIDTH, OG_IMAGE_HEIGHT } from '@/lib/seo';

const GA_ID = process.env.NEXT_PUBLIC_GA4_ID ?? 'G-C3W16CY6DX';

export const metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: 'ReddiReach · Get AI to recommend your brand',
    template: '%s',
  },
  description:
    'ReddiReach is the leading Reddit marketing and AI search optimization (GEO) agency. We get your brand cited and recommended by ChatGPT, Perplexity, Gemini and Google AI Overviews through authentic Reddit marketing.',
  icons: { icon: `${SITE}/icon.png` },
  alternates: { canonical: SITE },
  openGraph: {
    type: 'website',
    siteName: 'ReddiReach',
    url: SITE,
    images: [{ url: OG_IMAGE, width: OG_IMAGE_WIDTH, height: OG_IMAGE_HEIGHT }],
  },
  twitter: { card: 'summary_large_image', images: [OG_IMAGE] },
  robots: { index: true, follow: true },
};

const orgSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE}/#organization`,
      name: 'ReddiReach',
      url: SITE,
      logo: `${SITE}/icon.png`,
      description:
        'Reddit marketing and AI search optimization (GEO) agency that gets brands cited and recommended by ChatGPT, Perplexity, Gemini and Google AI Overviews.',
    },
    { '@type': 'WebSite', '@id': `${SITE}/#website`, url: SITE, name: 'ReddiReach', publisher: { '@id': `${SITE}/#organization` } },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800;900&family=Geist+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      </head>
      <body>
        {children}
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
