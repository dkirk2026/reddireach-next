import ServiceLayout from '@/components/ServiceLayout';
import { geo } from '@/data/services';

export const metadata = {
  title: geo.meta.title,
  description: geo.meta.description,
  alternates: { canonical: '/services/geo' },
};

export default function Page() {
  return <ServiceLayout {...geo} split />;
}
