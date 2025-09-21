export const dynamic = 'force-dynamic';

import { getBusinessInfo } from '../../fetch-data/data';
import { Home } from '../../components/home/home';

export default async function Page() {
  const businessInfo = await getBusinessInfo();
  return <Home businessInfo={businessInfo} />;
}
