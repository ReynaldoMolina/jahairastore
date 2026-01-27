import { checkAuthorization } from '@/authorization/check-authorization';
import { PageWrapper } from '@/components/page-wrapper';
import { Dashboard } from '@/components/dashboard/dashboard';
import { SiteHeader } from '@/components/header/site-header';
import { PageProps } from '@/types/types';
import { Suspense } from 'react';
import Loading from '@/components/loading';

export const metadata = {
  title: 'Dashboard',
};

export default async function Page({ searchParams }: PageProps) {
  await checkAuthorization();

  return (
    <>
      <SiteHeader title="Dashboard" hideBackButton />
      <PageWrapper>
        <Suspense fallback={<Loading />}>
          <Dashboard searchParams={await searchParams} />
        </Suspense>
      </PageWrapper>
    </>
  );
}
