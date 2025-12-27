import { checkAuthorization } from '@/authorization/check-authorization';
import { Home } from '@/components/home';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/site-header';
import { getBusinessInfo, getBusinessName } from '@/fetch-data/settings';

export async function generateMetadata() {
  const businessName = await getBusinessName();

  return {
    title: businessName.nombreEmpresa || 'Tienda',
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
