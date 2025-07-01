import { FormId, FormSelect } from '@/app/ui/forms/FormInputs/formInputs';
import {
  FormEdit,
  FormButtons,
  FormInfo,
  ProductSearch,
} from '@/app/ui/forms/RegisterForm';
import ProductSearchList from '@/app/ui/forms/RegisterForm/ProductList/ProductSearchList';
import FormDetail from '@/app/ui/forms/RegisterForm/DetailList/FormDetail';
import { getOrderById, getOrderDetailById } from '@/app/lib/data';
import { OrderOptions } from '@/app/ui/forms/Options/OrderOptions';
import { Restante } from '@/app/ui/forms/RegisterForm/Restante';
import { updateOrder } from '@/app/lib/actions';

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

  return (
    <section className="flex grow overflow-y-scroll h-0">
      <FormEdit
        updateRegister={updateOrder}
        registerId={orderId}
        detailList={orderdetail}
      >
        <FormId holder="Pedido" value={orderId} />

        <FormInfo date={order.Fecha} value={order.TotalAbono} register="orders">
          <FormSelect
            value={order.Id_cliente}
            name="Id_cliente"
            label="Cliente"
          />
        </FormInfo>

        <ProductSearch open={false}>
          <ProductSearchList searchParams={searchParams} />
        </ProductSearch>

        <FormDetail />
        <Restante order={order} />
        <OrderOptions order={order} />
        <FormButtons link={'/pedidos?query=debe'} label={'Guardar'} />
      </FormEdit>
    </section>
  );
}
