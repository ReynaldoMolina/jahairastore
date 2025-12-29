import { checkAuthorization } from '@/authorization/check-authorization';
import { EditPurchaseForm } from '@/components/forms/purchase/edit';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/header/site-header';
import { getProductsSearchList } from '@/fetch-data/product';
import { getProvidersSelect, getPurchaseById } from '@/fetch-data/purchases';
import { PageProps } from '@/types/types';

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;

  return {
    title: `Compra ${id}`,
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  await checkAuthorization();

  const { id } = await params;
  const productData = await getProductsSearchList(await searchParams);
  const purchase = await getPurchaseById(id);
  const providers = await getProvidersSelect();

  return (
    <>
      <SiteHeader title={`Compra ${id} - ${purchase.nombreEmpresa}`} />
      <PageWrapper>
        <EditPurchaseForm
          productData={productData}
          purchase={purchase}
          selectOptions={providers}
        />
      </PageWrapper>
    </>
  );
}
