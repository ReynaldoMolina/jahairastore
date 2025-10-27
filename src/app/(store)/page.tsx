import { Home } from '@/components/home';
import { SiteHeader } from '@/components/site-header';
import { getBusinessInfo } from '@/fetch-data/settings';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Inicio',
};

export default async function Page() {
  const businessInfo = await getBusinessInfo();
  return (
    <>
      <SiteHeader title="Inicio" dontShowBackButton />
      <Home businessInfo={businessInfo} />
    </>
  );
}
