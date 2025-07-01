import { FormId, FormSelect } from '@/app/ui/forms/FormInputs/formInputs';
import {
  FormEdit,
  FormButtons,
  FormInfo,
  ProductSearch,
} from '@/app/ui/forms/RegisterForm';
import ProductSearchList from '@/app/ui/forms/RegisterForm/ProductList/ProductSearchList';
import FormDetail from '@/app/ui/forms/RegisterForm/DetailList/FormDetail';
import { getSaleById, getSaleDetailById } from '@/app/lib/data';
import { updateSale } from '@/app/lib/actions';
import { SalePayment } from '@/app/ui/forms/SaleForm/SalePayment';

export async function generateMetadata(props) {
  const { id } = await props.params;
  return {
    title: `Venta ${id}`,
  };
}

export default async function Page(props) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const saleId = params.id;
  const sale = await getSaleById(saleId);
  const saledetail = await getSaleDetailById(saleId);

  return (
    <section className="flex grow overflow-y-scroll h-0">
      <FormEdit
        updateRegister={updateSale}
        registerId={saleId}
        detailList={saledetail}
        convert={true}
        allowEmpty={true}
        abono={sale.Abono}
      >
        <FormId holder="Venta" value={saleId} />
        <FormInfo date={sale.Fecha} register="sales">
          <FormSelect
            value={sale.Id_cliente}
            name="Id_cliente"
            label="Cliente"
          />
        </FormInfo>

        <SalePayment credito={sale.Credito} />

        <ProductSearch open={false}>
          <ProductSearchList searchParams={searchParams} inventario={true} />
        </ProductSearch>

        <FormDetail convert={true} showLeft={true} overrideLeft={false} />

        <FormButtons link={'/ventas'} label={'Guardar'} />
      </FormEdit>
    </section>
  );
}
