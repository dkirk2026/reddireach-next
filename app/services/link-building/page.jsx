import ServiceLayout from '@/components/ServiceLayout';
import { linkBuilding } from '@/data/services';

export const metadata = {
  title: linkBuilding.meta.title,
  description: linkBuilding.meta.description,
  alternates: { canonical: '/services/link-building' },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Link Building',
  description: linkBuilding.meta.description,
  serviceType: 'Link Building',
  provider: { '@type': 'Organization', name: 'ReddiReach', url: 'https://www.reddireach.com' },
  areaServed: { '@type': 'Place', name: 'Worldwide' },
  url: 'https://www.reddireach.com/services/link-building',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: linkBuilding.faqs.map((f) => ({
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
      <ServiceLayout {...linkBuilding} split />
    </>
  );
}
