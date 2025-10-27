import { checkAuthorization } from '@/authorization/check-authorization';
import { RegisterForm } from '@/components/forms/register';
import ProductSearchList from '@/components/forms/register-form/product-list/product-search-list';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/site-header';
import {
  getProvidersSelect,
  getPurchaseById,
  getPurchaseDetailById,
} from '@/fetch-data/data';

export const dynamic = 'force-dynamic';

export async function generateMetadata(props) {
  const { id } = await props.params;
  return {
    title: `Compra ${id}`,
  };
}

export default async function Page(props) {
  await checkAuthorization();

  const searchParams = await props.searchParams;
  const params = await props.params;
  const purchaseId = params.id;
  const purchase = await getPurchaseById(purchaseId);
  const purchasedetail = await getPurchaseDetailById(purchaseId);
  const selectData = await getProvidersSelect();

  return (
    <>
      <SiteHeader title={`Compra ${purchaseId}`} />
      <PageWrapper>
        <RegisterForm
          isNew={false}
          register={purchase}
          registerId={purchaseId}
          detailList={purchasedetail}
          convert={true}
          abono={purchase.TotalGasto}
          selectData={selectData}
          formName="compras"
        >
          <ProductSearchList
            searchParams={searchParams}
            showAll={true}
            inventario={true}
            price="compra"
          />
        </RegisterForm>
      </PageWrapper>
    </>
  );
}
