import { FormSelect, FormId } from '@/app/ui/forms/FormInputs/formInputs';
import {
  FormCreate,
  FormButtons,
  FormInfo,
  ProductSearch,
} from '@/app/ui/forms/RegisterForm';
import ProductSearchList from '@/app/ui/forms/RegisterForm/ProductList/ProductSearchList';
import FormDetail from '@/app/ui/forms/RegisterForm/DetailList/FormDetail';
import { createOrder } from '@/app/lib/actions';

export const metadata = {
  title: 'Crear pedido',
};

export default async function Page(props) {
  const searchParams = await props.searchParams;

  return (
    <section className="flex grow overflow-y-scroll h-0">
      <FormCreate createRegister={createOrder}>
        <FormId holder="Crear pedido" />

        <FormInfo date="" register="orders">
          <FormSelect value="" name="Id_cliente" label="Cliente" />
        </FormInfo>

        <ProductSearch open={true}>
          <ProductSearchList searchParams={searchParams} inventario={false} />
        </ProductSearch>

        <FormDetail />

        <FormButtons link={'/pedidos?query=debe'} label={'Crear'} />
      </FormCreate>
    </section>
  );
}
