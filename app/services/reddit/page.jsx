import ServiceLayout from '@/components/ServiceLayout';
import { reddit } from '@/data/services';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  path: '/services/reddit',
  title: reddit.meta.title,
  description: reddit.meta.description,
});

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Reddit Marketing',
  description: reddit.meta.description,
  serviceType: 'Reddit Marketing',
  provider: { '@type': 'Organization', name: 'ReddiReach', url: 'https://www.reddireach.com' },
  areaServed: { '@type': 'Place', name: 'Worldwide' },
  url: 'https://www.reddireach.com/services/reddit',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: reddit.faqs.map((f) => ({
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
      <ServiceLayout {...reddit} split />
    </>
  );
}
