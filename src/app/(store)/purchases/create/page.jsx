import { FormSelectClient } from "@/app/ui/forms/formInputs";
import { OrderCreate, OrderFormButtons, OrderInfo, ProductSearch } from "@/app/ui/forms/OrderForm";
import ProductSearchList from "@/app/ui/orderForm/ProductSearchList";
import OrderDetail from "@/app/ui/orderForm/OrderDetail";

export const metadata = {
  title: 'Crear pedido'
}
 
export default async function Page(props) {
  const searchParams = await props.searchParams;

  return (
    <section className="flex grow overflow-y-scroll h-0">
      <OrderCreate>
        <OrderInfo date="">
          <FormSelectClient />
        </OrderInfo>

        <ProductSearch open={true}>
          <ProductSearchList searchParams={searchParams} />
        </ProductSearch>

        <OrderDetail />

        <OrderFormButtons link={'/orders?query=debe'} label={'Crear'} />
      </OrderCreate>
    </section>
  );
}