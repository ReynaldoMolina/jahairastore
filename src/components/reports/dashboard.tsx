'use client';

import { SalesOnlyReport, OrdersOnlyReport } from './reports';
import { DashboardData, SearchParamsProps } from '@/types/types';
import { DateRangeButtons } from './date-range-buttons';

interface Dashboard {
  data: DashboardData;
  searchParams: SearchParamsProps;
}

export function Dashboard({ data, searchParams }: Dashboard) {
  return (
    <main className="flex flex-col flex-1 w-full gap-3 mx-auto">
      <DateRangeButtons searchParams={searchParams} />
      <SalesOnlyReport data={data} />
      <OrdersOnlyReport data={data} />
    </main>
  );
}
