export const dynamic = 'force-dynamic';

import { checkAuthorization } from '@/authorization/check-authorization';
import { CreateExpenseForm } from '@/components/form/expense/create';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/header/site-header';
import { getExpenseProviderById } from '@/fetch-data/expense';
import { getSettingsCambioDolar } from '@/fetch-data/settings';
import { PageProps } from '@/types/types';

export const metadata = {
  title: 'Crear gasto',
};

export default async function Page({ searchParams }: PageProps) {
  await checkAuthorization();

  const { proveedor } = await searchParams;
  const empresa = await getExpenseProviderById(proveedor);
  const cambioDolar = await getSettingsCambioDolar();

  return (
    <>
      <SiteHeader title="Crear gasto" />
      <PageWrapper>
        <CreateExpenseForm
          searchParams={await searchParams}
          nombreEmpresa={empresa.nombreEmpresa}
          cambioDolar={cambioDolar}
        />
      </PageWrapper>
    </>
  );
}
