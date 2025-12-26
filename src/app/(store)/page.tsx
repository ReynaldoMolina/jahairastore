import { checkAuthorization } from '@/authorization/check-authorization';
import { Home } from '@/components/home';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/site-header';
import { getBusinessInfo } from '@/fetch-data/settings';

export async function generateMetadata() {
  const businessInfo = await getBusinessInfo();

  return {
    title: businessInfo.nombreEmpresa || 'Tienda',
  };
}

export default async function Page() {
  await checkAuthorization();

  const businessInfo = await getBusinessInfo();

  return (
    <>
      <SiteHeader title={businessInfo.nombreEmpresa} hideBackButton />
      <PageWrapper>
        <Home businessInfo={businessInfo} />
      </PageWrapper>
    </>
  );
}
