export const dynamic = 'force-dynamic';

import { getBusinessInfo } from '../lib/data';
import { Home } from '../ui/home/Home';

export default async function Page() {
  const businessInfo = await getBusinessInfo();
  return <Home businessInfo={businessInfo} />;
}
