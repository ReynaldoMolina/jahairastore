import { checkAuthorization } from '@/authorization/check-authorization';
import { Home } from '@/components/home';
import { PageWrapper } from '@/components/page-wrapper';
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
      <PageWrapper>
        <Home businessInfo={businessInfo} />
      </PageWrapper>
    </>
  );
}
