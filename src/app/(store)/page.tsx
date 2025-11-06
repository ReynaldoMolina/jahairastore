export const dynamic = 'force-dynamic';

import { checkAuthorization } from '@/authorization/check-authorization';
import { Home } from '@/components/home';
import { SiteHeader } from '@/components/site-header';
import { getBusinessInfo } from '@/fetch-data/settings';

export const metadata = {
  title: 'Inicio',
};

export default async function Page() {
  await checkAuthorization();

  const businessInfo = await getBusinessInfo();
  return (
    <>
      <SiteHeader title="Inicio" hideBackButton />
      <Home businessInfo={businessInfo} />
    </>
  );
}
