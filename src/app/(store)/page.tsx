import { checkAuthorization } from '@/authorization/check-authorization';
import { Home } from '@/components/home';
import { SiteHeader } from '@/components/site-header';
import { getBusinessInfo } from '@/fetch-data/settings';

export const metadata = {
  title: 'Jahaira Store',
};

export default async function Page() {
  await checkAuthorization();

  const businessInfo = await getBusinessInfo();

  return (
    <>
      <SiteHeader title="Jahaira Store" hideBackButton />
      <Home businessInfo={businessInfo} />
    </>
  );
}
