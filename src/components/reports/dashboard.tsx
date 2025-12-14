'use client';

import { CalendarDays } from 'lucide-react';
import { DateSelector } from './date-selector';
import { SalesOnlyReport, OrdersOnlyReport } from './reports';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { DashboardData, SearchParamsProps } from '@/types/types';
import { DateRangeButtons } from './date-range-buttons';

interface Dashboard {
  data: DashboardData;
  searchParams: SearchParamsProps;
}

export function Dashboard({ data, searchParams }: Dashboard) {
  return (
    <main className="flex flex-col flex-1 w-full max-w-xl gap-3 mx-auto">
      <DateRangeButtons searchParams={searchParams} />
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="inline-flex items-center flex-row gap-2">
            <CalendarDays className="size-4" />
            Filtrar por fechas
          </CardTitle>
          <CardDescription>
            Selecciona las fechas para generar los informes.
          </CardDescription>
        </CardHeader>
        <CardContent className="inline-flex gap-3 sm:gap-5 w-full">
          <DateSelector searchParams={searchParams} />
        </CardContent>
      </Card>
      <SalesOnlyReport data={data} />
      <OrdersOnlyReport data={data} />
    </main>
  );
}
