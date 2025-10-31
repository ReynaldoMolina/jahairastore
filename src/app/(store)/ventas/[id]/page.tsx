import { checkAuthorization } from '@/authorization/check-authorization';
import { RegisterForm } from '@/components/forms/register';
import ProductSearchList from '@/components/forms/register-form/product-list/product-search-list';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/site-header';
import {
  getSaleById,
  getSaleDetailById,
  getSalePdf,
  getClientsSelect,
} from '@/fetch-data/data';
import { PageProps } from '@/types/types';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  return {
    title: `Venta ${id}`,
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  await checkAuthorization();

  const { id } = await params;
  const sale = await getSaleById(id);
  const saledetail = await getSaleDetailById(id);
  const salePdf = await getSalePdf(id);
  const selectData = await getClientsSelect();

  return (
    <>
      <SiteHeader title={`Venta ${id}`} />
      <PageWrapper>
        <RegisterForm
          isNew={false}
          register={sale}
          registerPdf={salePdf}
          registerId={id}
          detailList={saledetail}
          convert={true}
          allowEmpty={true}
          abono={sale.Abono}
          selectData={selectData}
          formName="ventas"
        >
          <ProductSearchList searchParams={searchParams} inventario={true} />
        </RegisterForm>
      </PageWrapper>
    </>
  );
}
