export const dynamic = 'force-dynamic';

import { RegisterForm } from '@/components/forms/RegisterForm';
import ProductSearchList from '@/components/forms/RegisterForm/ProductList/ProductSearchList';
import { getOrderById, getOrderDetailById } from '@/fetch-data/data';
import { getClientsSelect } from '@/fetch-data/data';

export async function generateMetadata(props) {
  const { id } = await props.params;
  return {
    title: `Pedido ${id}`,
  };
}

export default async function Page(props) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const orderId = params.id;
  const order = await getOrderById(orderId);
  const orderdetail = await getOrderDetailById(orderId);
  const selectData = await getClientsSelect();

  return (
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
  );
}
