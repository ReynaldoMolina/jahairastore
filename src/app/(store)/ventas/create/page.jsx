import { FormSelect, FormId } from "@/app/ui/forms/formInputs";
import { FormCreate, FormButtons, FormInfo, ProductSearch } from "@/app/ui/forms/RegisterForm";
import ProductSearchList from "@/app/ui/registerForm/ProductSearchList";
import FormDetail from "@/app/ui/registerForm/FormDetail";
import { createSale } from "@/app/lib/actions";

export const metadata = {
  title: 'Crear venta'
}
 
export default async function Page(props) {
  const searchParams = await props.searchParams;

  return (
    <section className="flex grow overflow-y-scroll h-0">
      <FormCreate createRegister={createSale}>
        <FormId holder="Crear venta" />
        <FormInfo date="" register="sales">
          <FormSelect value={0} name="Id_cliente" label="Cliente" />
        </FormInfo>

        <ProductSearch open={true}>
          <ProductSearchList searchParams={searchParams} inventario={true} />
        </ProductSearch>

        <FormDetail convert={true} price="venta" showProfit={true} showLeft={true} overrideLeft={false} />

        <FormButtons link={'/ventas'} label={'Crear'} />
      </FormCreate>
    </section>
  );
}