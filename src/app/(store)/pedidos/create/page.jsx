import { FormSelect } from '@/app/ui/forms/FormInputs/formInputsServer';
import {
  FormCreate,
  FormInfo,
  ProductSearch,
} from '@/app/ui/forms/RegisterForm';
import { FormId, FormButtons } from '@/app/ui/forms/FormInputs/formInputs';
import ProductSearchList from '@/app/ui/forms/RegisterForm/ProductList/ProductSearchList';
import FormDetail from '@/app/ui/forms/RegisterForm/DetailList/FormDetail';
import { createOrder } from '@/app/lib/actions';

export const metadata = {
  title: 'Crear pedido',
};

export default async function Page(props) {
  const searchParams = await props.searchParams;

  return (
    <FormCreate createRegister={createOrder}>
      <FormId holder="Crear pedido" />

      <FormInfo date="" register="orders">
        <FormSelect value="" name="Id_cliente" label="Cliente" />
      </FormInfo>

      <ProductSearch open={true}>
        <ProductSearchList searchParams={searchParams} inventario={false} />
      </ProductSearch>

      <FormDetail />

      <FormButtons link={'/pedidos?query=debe'} />
    </FormCreate>
  );
}
