import { checkAuthorization } from '@/authorization/check-authorization';
import { PageWrapper } from '@/components/page-wrapper';
import { Dashboard } from '@/components/dashboard/dashboard';
import { SiteHeader } from '@/components/header/site-header';
import { getTotalsDashboard } from '@/fetch-data/dashboard';
import { PageProps } from '@/types/types';
import { getBusinessInfo, getBusinessName } from '@/fetch-data/settings';

export async function generateMetadata() {
  const businessName = await getBusinessName();

  return {
    title: businessName.nombreEmpresa || 'Tienda',
  };
}

export default async function Page({ searchParams }: PageProps) {
  await checkAuthorization();

  const data = await getTotalsDashboard(await searchParams);
  const businessInfo = await getBusinessInfo();

  return (
    <>
      <SiteHeader title={businessInfo.nombreEmpresa} hideBackButton />
      <PageWrapper>
        <Dashboard searchParams={await searchParams} data={data} />
      </PageWrapper>
    </>
  );
}
