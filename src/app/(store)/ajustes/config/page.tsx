export const dynamic = 'force-dynamic';

import { notFound } from 'next/navigation';
import { isDemo } from '@/middleware';
import { ConfigForm } from '@/components/forms/config';
import { getConfig } from '@/fetch-data/config';
import { Header } from '@/components/header';
import { PageWrapper } from '@/components/page-wrapper';

export const metadata = {
  title: 'Ajustes - Tasa de cambio y tarifas de envío',
};

export default async function Page() {
  if (isDemo) {
    notFound();
  }

  const config = await getConfig();

  return (
    <>
      <Header title="Tasa de cambio y tarifas de envío" />
      <PageWrapper>
        <ConfigForm config={config} />
      </PageWrapper>
    </>
  );
}
