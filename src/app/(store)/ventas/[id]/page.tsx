export const dynamic = 'force-dynamic';

import { checkAuthorization } from '@/authorization/check-authorization';
import { EditSaleForm } from '@/components/forms/venta/edit';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/site-header';
import { getClientsSelect } from '@/fetch-data/clients';
import { getProductsSearchList } from '@/fetch-data/product';
import { getSaleById } from '@/fetch-data/sales';
import { PageProps } from '@/types/types';

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  return {
    title: `Venta ${id}`,
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  await checkAuthorization();

  const { id } = await params;
  const productData = await getProductsSearchList(await searchParams);
  const sale = await getSaleById(id);
  const clients = await getClientsSelect();

  return (
    <>
      <SiteHeader title={`Venta ${id} - ${sale.nombreCliente}`} />
      <PageWrapper>
        <EditSaleForm
          productData={productData}
          sale={sale}
          selectOptions={clients}
        />
      </PageWrapper>
    </>
  );
}
