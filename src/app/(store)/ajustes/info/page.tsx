export const dynamic = 'force-dynamic';

import { getNegocio } from '@/fetch-data/negocio';
import { notFound } from 'next/navigation';
import { isDemo } from '@/middleware';
import { EditNegocioForm } from '@/components/forms/negocio/edit';
import { PageWrapper } from '@/components/page-wrapper';
import { Header } from '@/components/header';

export const metadata = {
  title: 'Ajustes - Información del negocio',
};

export default async function Page() {
  if (isDemo) {
    notFound();
  }

  const negocio = await getNegocio();

  return (
    <>
      <Header title="Información del negocio" />
      <PageWrapper>
        <EditNegocioForm negocio={negocio} />
      </PageWrapper>
    </>
  );
}
