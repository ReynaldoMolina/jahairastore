import { checkAuthorization } from '@/authorization/check-authorization';
import { PageWrapper } from '@/components/page-wrapper';
import { Dashboard } from '@/components/reports/dashboard';
import { SiteHeader } from '@/components/site-header';
import { getTotalsDashboard } from '@/fetch-data/data';
import { PageProps } from '@/types/types';

export const metadata = {
  title: 'Dashboard',
};

export default async function Page({ searchParams }: PageProps) {
  await checkAuthorization();

  const data = await getTotalsDashboard(await searchParams);

  return (
    <>
      <SiteHeader title="Dashboard" />
      <PageWrapper>
        <Dashboard searchParams={await searchParams} data={data} />
      </PageWrapper>
    </>
  );
}
