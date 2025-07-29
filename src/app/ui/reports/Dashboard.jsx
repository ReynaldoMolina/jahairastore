'use client';

import { isDemo } from '@/middleware';
import { DateSelector } from './DateSelector';
import OverviewIcon from '@/app/ui/icons/overview.svg';
import { CashFlowReport, AccountingReport } from './Reports';

export function Dashboard({ data, searchParams }) {
  return (
    <main className="flex flex-col gap-4 grow">
      <section className="flex flex-col w-full md:max-w-3xl gap-5">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center w-full gap-5 bg-white dark:bg-neutral-900 p-3 rounded-lg">
          <div className="flex gap-2 items-center">
            <OverviewIcon className="size-5" />
            <h1 className="font-bold">Informes</h1>
          </div>
          <DateSelector searchParams={searchParams} />
        </div>
        {!isDemo && <CashFlowReport data={data} />}
        <AccountingReport data={data} />
      </section>
    </main>
  );
}
