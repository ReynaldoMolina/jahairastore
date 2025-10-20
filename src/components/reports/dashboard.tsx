'use client';

import { isDemo } from '@/middleware';
import { CalendarDays } from 'lucide-react';
import { DateSelector } from './date-selector';
import {
  SalesOnlyReport,
  OrdersOnlyReport,
  CashFlowReport,
  AccountingReport,
} from './reports';

export function Dashboard({ data, searchParams }) {
  return (
    <main className="flex flex-col gap-3 grow items-center">
      <section className="flex flex-col w-full md:max-w-3xl gap-3">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center w-full gap-5 bg-white dark:bg-neutral-900 p-3 rounded-lg">
          <div className="flex gap-2 items-center">
            <CalendarDays className="size-5" />
            <h1 className="font-bold text-sm">Filtrar por fechas</h1>
          </div>
          <DateSelector searchParams={searchParams} />
        </div>
        {!isDemo && (
          <>
            <SalesOnlyReport data={data} />
            <OrdersOnlyReport data={data} />
            <CashFlowReport data={data} />
          </>
        )}
        {isDemo && <AccountingReport data={data} />}
      </section>
    </main>
  );
}
