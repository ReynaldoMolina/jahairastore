import { FormId, FormSelectClient } from "@/app/ui/forms/formInputs";
import { OrderEdit, OrderFormButtons, OrderInfo, ProductSearch } from "@/app/ui/forms/OrderForm";
import ProductSearchList from "@/app/ui/orderForm/ProductSearchList";
import OrderDetail from "@/app/ui/orderForm/OrderDetail";
import { getOrderById, getOrderDetailById } from "@/app/lib/data";
import { OrderOptions } from "@/app/ui/orderForm/OrderOptions";
import { OrderRestante } from "@/app/ui/orderForm/OrderRestante";
 
export const metadata = {
  title: 'Editar pedido'
}

export default async function Page(props) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const orderId = params.id;
  const order = await getOrderById(orderId);
  const orderdetail = await getOrderDetailById(orderId);

  return (
    <section className="flex grow overflow-y-scroll h-0">
      <OrderEdit orderId={orderId} orderdetail={orderdetail}>
        <FormId holder="Pedido" value={orderId} />
        <OrderInfo date={order.Fecha} abono={order.TotalAbono}>
          <FormSelectClient value={order.Id_cliente} />
        </OrderInfo>

        <ProductSearch open={false}>
          <ProductSearchList searchParams={searchParams} />
        </ProductSearch>

        <OrderDetail />

        <OrderRestante order={order} />

        <OrderOptions order={order} />

        <OrderFormButtons link={'/orders?query=debe'} label={'Guardar'} />
      </OrderEdit>
    </section>
  );
}