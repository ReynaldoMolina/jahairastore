import { checkAuthorization } from '@/authorization/check-authorization';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/header/site-header';
import { PageProps } from '@/types/types';
import { getProductsSearchList, getTrasladoById } from '@/fetch-data/traslados';
import { EditTrasladoForm } from '@/components/forms/traslado/edit';

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  return {
    title: `Traslado ${id}`,
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  await checkAuthorization();

  const { id } = await params;
  const traslado = await getTrasladoById(id);
  const productData = await getProductsSearchList(
    await searchParams,
    traslado.idUbicacionOrigen
  );

  return (
    <>
      <SiteHeader
        title={`Traslado ${id} - ${
          traslado.idUbicacionOrigen === 1 ? 'León' : 'Acoyapa'
        } > ${traslado.idUbicacionDestino === 1 ? 'León' : 'Acoyapa'}`}
      />
      <PageWrapper>
        <EditTrasladoForm traslado={traslado} productData={productData} />
      </PageWrapper>
    </>
  );
}
