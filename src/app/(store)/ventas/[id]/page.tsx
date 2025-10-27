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

export const dynamic = 'force-dynamic';

export async function generateMetadata(props) {
  const { id } = await props.params;
  return {
    title: `Venta ${id}`,
  };
}

export default async function Page(props) {
  await checkAuthorization();

  const searchParams = await props.searchParams;
  const params = await props.params;
  const saleId = params.id;
  const sale = await getSaleById(saleId);
  const saledetail = await getSaleDetailById(saleId);
  const salePdf = await getSalePdf(saleId);
  const selectData = await getClientsSelect();

  return (
    <>
      <SiteHeader title={`Venta ${saleId}`} />
      <PageWrapper>
        <RegisterForm
          isNew={false}
          register={sale}
          registerPdf={salePdf}
          registerId={saleId}
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
