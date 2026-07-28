import ServiceLayout from '@/components/ServiceLayout';
import { geo } from '@/data/services';

export const metadata = {
  title: geo.meta.title,
  description: geo.meta.description,
  alternates: { canonical: '/services/geo' },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'GEO / AI Search Optimization',
  alternateName: 'Generative Engine Optimization',
  description: geo.meta.description,
  serviceType: 'Generative Engine Optimization',
  provider: { '@type': 'Organization', name: 'ReddiReach', url: 'https://www.reddireach.com' },
  areaServed: { '@type': 'Place', name: 'Worldwide' },
  url: 'https://www.reddireach.com/services/geo',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: geo.faqs.map((f) => ({
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
      <ServiceLayout {...geo} split />
    </>
  );
}
