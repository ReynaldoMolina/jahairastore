'use client';

import { BusinessInfo } from './BusinessInfo';
import { DashBoardHeader } from './DashboardHeader';
import { DateSelector } from './DateSelector';
import { AccountingReport, CashFlowReport } from './Reports';

export function Dashboard({ businessInfo, searchParams, data }) {
  return (
    <main className="flex gap-5 flex-col justify-center">
      <DashBoardHeader businessInfo={businessInfo} />
      <section className="flex flex-col justify-center items-center w-full gap-3 grow">
        <BusinessInfo businessInfo={businessInfo} />
        <section className="flex flex-col w-full md:max-w-3xl gap-5 bg-white dark:bg-neutral-900 rounded-lg p-3">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center w-full gap-5">
            <h1 className="font-bold">Resumen</h1>
            <DateSelector searchParams={searchParams} />
          </div>
          <CashFlowReport data={data} />
          <AccountingReport data={data} />
        </section>
      </section>
    </main>
  );
}
