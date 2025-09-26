export const dynamic = 'force-dynamic';

import { Home } from '@/components/home';
import { getBusinessInfo } from '@/fetch-data/data';

export default async function Page() {
  const businessInfo = await getBusinessInfo();
  return <Home businessInfo={businessInfo} />;
}
