import { checkAuthorization } from '@/authorization/check-authorization';
import { PageWrapper } from '@/components/page-wrapper';
import { Dashboard } from '@/components/reports/dashboard';
import { SiteHeader } from '@/components/site-header';
import { getTotalsDashboard } from '@/fetch-data/dashboard';
import { formatDate } from '@/lib/formatters';
import { thisMonth } from '@/lib/get-date';
import { PageProps } from '@/types/types';

export const metadata = {
  title: 'Dashboard',
};

export default async function Page({ searchParams }: PageProps) {
  await checkAuthorization();

  const data = await getTotalsDashboard(await searchParams);

  const startParam = (await searchParams).start;
  const endParam = (await searchParams).end;

  const month = thisMonth();
  const startDate = startParam
    ? formatDate(startParam)
    : formatDate(month.start);
  const endDate = endParam ? formatDate(endParam) : formatDate(month.end);

  return (
    <>
      <SiteHeader
        title={`Dashboard - ${startDate} al ${endDate}`}
        hideBackButton
      />
      <PageWrapper>
        <Dashboard searchParams={await searchParams} data={data} />
      </PageWrapper>
    </>
  );
}
