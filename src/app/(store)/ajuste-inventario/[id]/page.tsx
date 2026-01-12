import { checkAuthorization } from '@/authorization/check-authorization';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/header/site-header';
import { PageProps } from '@/types/types';
import { EditForm } from '@/components/forms/ajuste-inventario/edit';
import { getAjusteInventarioById } from '@/fetch-data/ajustes';
import { getProductsSearchList } from '@/fetch-data/product';

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  return {
    title: `Ajuste ${id}`,
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  await checkAuthorization();

  const { id } = await params;
  const ajuste = await getAjusteInventarioById(id);
  const productData = await getProductsSearchList(
    await searchParams,
    ajuste.idUbicacion
  );

  return (
    <>
      <SiteHeader title={`Ajuste ${id}`} />
      <PageWrapper>
        <EditForm ajuste={ajuste} productData={productData} />
      </PageWrapper>
    </>
  );
}
