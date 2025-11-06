export const dynamic = 'force-dynamic';

import { checkAuthorization } from '@/authorization/check-authorization';
import { CreateSaleForm } from '@/components/forms/venta/create';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/site-header';
import { getClientsSelect } from '@/fetch-data/clients';

export const metadata = {
  title: 'Crear venta',
};

export default async function Page() {
  await checkAuthorization();

  const clients = await getClientsSelect();

  return (
    <>
      <SiteHeader title="Crear venta" />
      <PageWrapper>
        <CreateSaleForm selectOptions={clients} />
      </PageWrapper>
    </>
  );
}
