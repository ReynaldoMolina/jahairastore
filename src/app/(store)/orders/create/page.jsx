import { FormButtons, FormDate, FormSelectClient } from "@/app/ui/forms/formInputs";
import SearchInput from "@/app/ui/ActionTools/SearchInput";
import ProductSearchList from "@/app/ui/orderForm/ProductSearchList";
import OrderDetail from "@/app/ui/orderForm/OrderDetail";
import { createOrder } from "@/app/lib/actions";
 
export default async function Page(props) {
  const searchParams = await props.searchParams;

  async function handleOrder(formData) {
    'use server';
    createOrder(formData);
  }
  
  return (
    <section className="flex grow overflow-y-scroll h-0">
      <form
        action={handleOrder}
        className="flex flex-col bg-white dark:bg-neutral-800 rounded-xl shadow-md gap-4 mx-auto max-w-170 p-3 w-full h-fit">
        <FormDate name="Fecha_del_pedido" />
        <FormSelectClient value="" />

        <OrderDetail>
          <SearchInput />
          <ProductSearchList searchParams={searchParams} />
        </OrderDetail>

        <FormButtons link={'/orders'} label={'Guardar'} />
      </form>
    </section>
  );
}