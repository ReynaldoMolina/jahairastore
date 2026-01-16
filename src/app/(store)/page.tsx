import { checkAuthorization } from '@/authorization/check-authorization';
import { PageWrapper } from '@/components/page-wrapper';
import { Dashboard } from '@/components/dashboard/dashboard';
import { SiteHeader } from '@/components/header/site-header';
import { PageProps } from '@/types/types';
import { getBusinessInfo, getBusinessName } from '@/fetch-data/settings';
import { Suspense } from 'react';
import Loading from '@/components/loading';

export async function generateMetadata() {
  const businessName = await getBusinessName();

  return {
    title: businessName.nombreEmpresa || 'Tienda',
  };
}

export default async function Page({ searchParams }: PageProps) {
  await checkAuthorization();
  const businessInfo = await getBusinessInfo();

  return (
    <>
      <SiteHeader title={businessInfo.nombreEmpresa} hideBackButton />
      <PageWrapper>
        <Suspense fallback={<Loading />}>
          <Dashboard searchParams={await searchParams} />
        </Suspense>
      </PageWrapper>
    </>
  );
}
