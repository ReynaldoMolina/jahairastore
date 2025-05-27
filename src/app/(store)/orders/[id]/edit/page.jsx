import { FormId, FormSelectClient } from "@/app/ui/forms/formInputs";
import { OrderEdit, OrderFormButtons, OrderInfo, ProductSearch } from "@/app/ui/forms/OrderForm";
import ProductSearchList from "@/app/ui/orderForm/ProductSearchList";
import OrderDetail from "@/app/ui/orderForm/OrderDetail";
import { getOrderById, getOrderDetailById } from "@/app/lib/data";
 
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
        <OrderInfo date={order.Fecha}>
          <FormSelectClient value={order.Id_cliente} />
        </OrderInfo>

        <ProductSearch>
          <ProductSearchList searchParams={searchParams} />
        </ProductSearch>

        <OrderDetail />

        <OrderFormButtons link={'/orders'} label={'Guardar'} />
      </OrderEdit>
    </section>
  );
}