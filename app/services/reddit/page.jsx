import ServiceLayout from '@/components/ServiceLayout';
import { reddit } from '@/data/services';

export const metadata = {
  title: reddit.meta.title,
  description: reddit.meta.description,
  alternates: { canonical: '/services/reddit' },
};

export default function Page() {
  return <ServiceLayout {...reddit} split />;
}
