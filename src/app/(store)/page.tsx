import { Home } from '@/components/home';
import { getBusinessInfo } from '@/fetch-data/data';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const businessInfo = await getBusinessInfo();
  return <Home businessInfo={businessInfo} />;
}
