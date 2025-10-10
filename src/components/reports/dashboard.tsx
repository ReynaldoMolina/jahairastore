'use client';

import { isDemo } from '@/middleware';
import OverviewIcon from '@/app/ui/icons/overview.svg';
import {
  CashFlowReport,
  AccountingReport,
  OrdersOnlyReport,
  SalesOnlyReport,
} from './reports';
import { DateSelector } from './date-selector';

export function Dashboard({ data, searchParams }) {
  return (
    <main className="flex flex-col gap-4 grow items-center">
      <section className="flex flex-col w-full md:max-w-3xl gap-5">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center w-full gap-5 bg-white dark:bg-neutral-900 p-3 rounded-lg">
          <div className="flex gap-2 items-center">
            <OverviewIcon className="size-5" />
            <h1 className="font-bold text-sm">Rango de fechas</h1>
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
