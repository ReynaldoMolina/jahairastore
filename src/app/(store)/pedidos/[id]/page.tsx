import { checkAuthorization } from '@/authorization/check-authorization';
import { EditOrderForm } from '@/components/form/order/edit';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/header/site-header';
import { getClientsSelect } from '@/fetch-data/client';
import { getOrderById } from '@/fetch-data/order';
import { getSettingsEnvioPrices } from '@/fetch-data/settings';
import { PageProps } from '@/types/types';

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  return {
    title: `Pedido ${id}`,
  };
}

export default async function Page({ params }: PageProps) {
  await checkAuthorization();

  const { id } = await params;
  const order = await getOrderById(id);
  const clients = await getClientsSelect();
  const envioPrices = await getSettingsEnvioPrices();

  return (
    <>
      <SiteHeader title={`Pedido ${id} - ${order.nombreCliente}`} />
      <PageWrapper>
        <EditOrderForm
          order={order}
          selectOptions={clients}
          envioPrices={envioPrices}
        />
      </PageWrapper>
    </>
  );
}
