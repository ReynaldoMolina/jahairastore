import { checkAuthorization } from '@/authorization/check-authorization';
import { CreateOrderForm } from '@/components/form/order/create';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/header/site-header';
import { getClientsSelect } from '@/fetch-data/client';
import {
  getSettingsCambioDolar,
  getSettingsEnvioPrices,
} from '@/fetch-data/settings';

export const metadata = {
  title: 'Crear pedido',
};

export default async function Page() {
  await checkAuthorization();

  const clients = await getClientsSelect();
  const cambioDolar = await getSettingsCambioDolar();
  const envioPrices = await getSettingsEnvioPrices();

  return (
    <>
      <SiteHeader title="Crear pedido" />
      <PageWrapper>
        <CreateOrderForm
          selectOptions={clients}
          cambioDolar={cambioDolar}
          envioPrices={envioPrices}
        />
      </PageWrapper>
    </>
  );
}
