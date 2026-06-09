import ServiceLayout from '@/components/ServiceLayout';
import { seo } from '@/data/services';

export const metadata = {
  title: seo.meta.title,
  description: seo.meta.description,
};

export default function Page() {
  return <ServiceLayout {...seo} split />;
}
