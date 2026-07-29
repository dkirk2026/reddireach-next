import ServiceLayout from '@/components/ServiceLayout';
import { advertising } from '@/data/services';

export const metadata = {
  title: advertising.meta.title,
  description: advertising.meta.description,
  alternates: { canonical: '/services/advertising' },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Reddit Advertising',
  description: advertising.meta.description,
  serviceType: 'Reddit Advertising',
  provider: { '@type': 'Organization', name: 'ReddiReach', url: 'https://www.reddireach.com' },
  areaServed: { '@type': 'Place', name: 'Worldwide' },
  url: 'https://www.reddireach.com/services/advertising',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: advertising.faqs.map((f) => ({
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
      <ServiceLayout {...advertising} split />
    </>
  );
}
