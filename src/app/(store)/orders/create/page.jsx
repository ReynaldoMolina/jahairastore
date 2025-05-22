import { FormSelectClient } from "@/app/ui/forms/formInputs";
import { OrderForm, OrderFormButtons, OrderInfo, ProductSearch } from "@/app/ui/forms/OrderForm";
import ProductSearchList from "@/app/ui/orderForm/ProductSearchList";
import OrderDetail from "@/app/ui/orderForm/OrderDetail";
 
export default async function Page(props) {
  const searchParams = await props.searchParams;

  return (
    <section className="flex grow overflow-y-scroll h-0">
      <OrderForm orderdetail={[]}>
        <OrderInfo date="">
          <FormSelectClient />
        </OrderInfo>

        <ProductSearch>
          <ProductSearchList searchParams={searchParams} />
        </ProductSearch>

        <OrderDetail />
        <OrderFormButtons link={'/orders'} label={'Guardar'} />
      </OrderForm>
    </section>
  );
}