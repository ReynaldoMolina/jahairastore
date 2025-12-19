import { checkAuthorization } from '@/authorization/check-authorization';
import { CreateReceiptForm } from '@/components/forms/receipt/create';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/site-header';
import { getReceiptClientById } from '@/fetch-data/receipts';
import { getSettingsCambioDolar } from '@/fetch-data/settings';
import { PageProps } from '@/types/types';

export const metadata = {
  title: 'Crear recibo',
};

export default async function Page({ searchParams }: PageProps) {
  await checkAuthorization();

  const { cliente } = await searchParams;
  const client = await getReceiptClientById(cliente);
  const cambioDolar = await getSettingsCambioDolar();

  return (
    <>
      <SiteHeader title="Crear recibo" />
      <PageWrapper>
        <CreateReceiptForm
          searchParams={await searchParams}
          nombreCliente={client.nombreCliente}
          cambioDolar={cambioDolar}
        />
      </PageWrapper>
    </>
  );
}
