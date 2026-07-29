import ServiceLayout from '@/components/ServiceLayout';
import { seo } from '@/data/services';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  path: '/services/seo',
  title: seo.meta.title,
  description: seo.meta.description,
});

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'SEO that feeds AI search',
  alternateName: 'Search Engine Optimization',
  description: seo.meta.description,
  serviceType: 'Search Engine Optimization',
  provider: { '@type': 'Organization', name: 'ReddiReach', url: 'https://www.reddireach.com' },
  areaServed: { '@type': 'Place', name: 'Worldwide' },
  url: 'https://www.reddireach.com/services/seo',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: seo.faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ServiceLayout {...seo} split />
    </>
  );
}
