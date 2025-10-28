'use client';

import { CalendarDays } from 'lucide-react';
import { DateSelector } from './date-selector';
import { SalesOnlyReport, OrdersOnlyReport, CashFlowReport } from './reports';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';

export function Dashboard({ data, searchParams }) {
  return (
    <main className="flex flex-col flex-1 w-full md:max-w-3xl gap-3 mx-auto">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="inline-flex flex-row gap-2">
            <CalendarDays className="size-4" />
            Filtrar por fechas
          </CardTitle>
          <CardDescription>
            Selecciona las fechas para generar los informes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DateSelector searchParams={searchParams} />
        </CardContent>
      </Card>
      <SalesOnlyReport data={data} />
      <OrdersOnlyReport data={data} />
      <CashFlowReport data={data} />
      {/* {isDemo && <AccountingReport data={data} />} */}
    </main>
  );
}
