import { checkAuthorization } from '@/authorization/check-authorization';
import { PageWrapper } from '@/components/page-wrapper';
import { Dashboard } from '@/components/reports/dashboard';
import { SiteHeader } from '@/components/site-header';
import { getTotalsDashboard } from '@/fetch-data/data';

export const metadata = {
  title: 'Dashboard',
};

export default async function Page(props) {
  await checkAuthorization();

  const searchParams = await props.searchParams;
  const startParam = searchParams?.start;
  const endParam = searchParams?.end;
  const data = await getTotalsDashboard(startParam, endParam);

  return (
    <>
      <SiteHeader title="Dashboard" dontShowBackButton />
      <PageWrapper>
        <Dashboard searchParams={searchParams} data={data} />
      </PageWrapper>
    </>
  );
}
