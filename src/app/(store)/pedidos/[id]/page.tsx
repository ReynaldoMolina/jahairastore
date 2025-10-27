import { checkAuthorization } from '@/authorization/check-authorization';
import { RegisterForm } from '@/components/forms/register';
import ProductSearchList from '@/components/forms/register-form/product-list/product-search-list';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/site-header';
import {
  getClientsSelect,
  getOrderById,
  getOrderDetailById,
} from '@/fetch-data/data';

export const dynamic = 'force-dynamic';

export async function generateMetadata(props) {
  const { id } = await props.params;
  return {
    title: `Pedido ${id}`,
  };
}

export default async function Page(props) {
  await checkAuthorization();

  const searchParams = await props.searchParams;
  const params = await props.params;
  const orderId = params.id;
  const order = await getOrderById(orderId);
  const orderdetail = await getOrderDetailById(orderId);
  const selectData = await getClientsSelect();

  return (
    <>
      <SiteHeader title={`Pedido ${orderId}`} />
      <PageWrapper>
        <RegisterForm
          isNew={false}
          register={order}
          registerId={orderId}
          detailList={orderdetail}
          abono={order.TotalAbono}
          selectData={selectData}
          formName="pedidos"
        >
          <ProductSearchList searchParams={searchParams} />
        </RegisterForm>
      </PageWrapper>
    </>
  );
}
