import ServiceLayout from '@/components/ServiceLayout';
import { linkBuilding } from '@/data/services';

export const metadata = {
  title: linkBuilding.meta.title,
  description: linkBuilding.meta.description,
};

export default function Page() {
  return <ServiceLayout {...linkBuilding} split />;
}
