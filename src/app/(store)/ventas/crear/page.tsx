export const dynamic = 'force-dynamic';

import { checkAuthorization } from '@/authorization/check-authorization';
import { CreateSaleForm } from '@/components/form/sale/create';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/header/site-header';
import { getClientsSelect } from '@/fetch-data/client';
import { getSettingsCambioDolar } from '@/fetch-data/settings';

export const metadata = {
  title: 'Crear venta',
};

export default async function Page() {
  await checkAuthorization();

  const clients = await getClientsSelect();
  const cambioDolar = await getSettingsCambioDolar();

  return (
    <>
      <SiteHeader title="Crear venta" />
      <PageWrapper>
        <CreateSaleForm selectOptions={clients} cambioDolar={cambioDolar} />
      </PageWrapper>
    </>
  );
}
