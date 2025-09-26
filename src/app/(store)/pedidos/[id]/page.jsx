export const dynamic = 'force-dynamic';

import { RegisterForm } from '@/app/ui/forms/RegisterForm';
import ProductSearchList from '@/app/ui/forms/RegisterForm/ProductList/ProductSearchList';
import { getOrderById, getOrderDetailById } from '@/app/lib/data';
import { getClientsSelect } from '@/app/lib/data';

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
