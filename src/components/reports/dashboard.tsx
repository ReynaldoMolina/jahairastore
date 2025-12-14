'use client';

import { SalesOnlyReport, OrdersOnlyReport } from './reports';
import { DashboardData, SearchParamsProps } from '@/types/types';
import { DateRangeButtons } from './date-range-buttons';
import { formatDate } from '@/lib/formatters';

interface Dashboard {
  data: DashboardData;
  searchParams: SearchParamsProps;
}

export function Dashboard({ data, searchParams }: Dashboard) {
  const startParam = searchParams?.start;
  const endParam = searchParams?.end;

  return (
    <main className="flex flex-col flex-1 w-full max-w-xl gap-3 mx-auto">
      <DateRangeButtons searchParams={searchParams} />
      <span className="text-xs text-muted-foreground">
        Desde el {formatDate(startParam)} al {formatDate(endParam)}.
      </span>
      <SalesOnlyReport data={data} />
      <OrdersOnlyReport data={data} />
    </main>
  );
}
