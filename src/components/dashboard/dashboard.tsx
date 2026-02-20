import { SalesOnlyReport, OrdersOnlyReport } from './reports';
import { SearchParamsProps } from '@/types/types';
import { DateRangeButtons } from '../filter/date-range-buttons';
import { getTotalsDashboard } from '@/fetch-data/dashboard';

interface Dashboard {
  searchParams: SearchParamsProps;
}

export async function Dashboard({ searchParams }: Dashboard) {
  const data = await getTotalsDashboard(searchParams);

  return (
    <main className="flex flex-col flex-1 w-full gap-2 mx-auto">
      <DateRangeButtons searchParams={searchParams} hideAllButton />
      <SalesOnlyReport data={data} />
      <OrdersOnlyReport data={data} />
    </main>
  );
}
