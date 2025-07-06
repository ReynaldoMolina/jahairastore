import { FormSelect } from '@/app/ui/forms/FormInputs/formInputsServer';
import { FormId, FormButtons } from '@/app/ui/forms/FormInputs/formInputs';
import {
  FormCreate,
  FormInfo,
  ProductSearch,
} from '@/app/ui/forms/RegisterForm';
import ProductSearchList from '@/app/ui/forms/RegisterForm/ProductList/ProductSearchList';
import FormDetail from '@/app/ui/forms/RegisterForm/DetailList/FormDetail';
import { createSale } from '@/app/lib/actions';
import { SalePayment } from '@/app/ui/forms/SaleForm/SalePayment';

export const metadata = {
  title: 'Crear venta',
};

export default async function Page(props) {
  const searchParams = await props.searchParams;

  return (
    <FormCreate createRegister={createSale}>
      <FormId holder="Crear venta" />
      <FormInfo date="" register="sales">
        <FormSelect value={0} name="Id_cliente" />
      </FormInfo>

      <SalePayment />

      <ProductSearch open={true}>
        <ProductSearchList searchParams={searchParams} inventario={true} />
      </ProductSearch>

      <FormDetail
        convert={true}
        price="venta"
        showLeft={true}
        overrideLeft={false}
      />

      <FormButtons link={'/ventas'} isNew={true} />
    </FormCreate>
  );
}
