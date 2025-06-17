import { FormId, FormSelect } from "@/app/ui/forms/formInputs";
import { FormCreate, FormButtons, FormInfo, ProductSearch } from "@/app/ui/forms/RegisterForm";
import ProductSearchList from "@/app/ui/registerForm/ProductSearchList";
import FormDetail from "@/app/ui/registerForm/FormDetail";
import { createPurchase } from "@/app/lib/actions";

export const metadata = {
  title: 'Crear compra'
}
 
export default async function Page(props) {
  const searchParams = await props.searchParams;

  return (
    <section className="flex grow overflow-y-scroll h-0">
      <FormCreate createRegister={createPurchase} convert={true}>
        <FormId holder="Crear compra" value="" />
        <FormInfo date="" register="purchases">
          <FormSelect value="" name="Id_proveedor" label="Proveedor" />
        </FormInfo>

        <ProductSearch open={true}>
          <ProductSearchList searchParams={searchParams} inventario={true} price="compra" />
        </ProductSearch>

        <FormDetail convert={true} price="compra" />

        <FormButtons link={'/compras'} label={'Crear'} />
      </FormCreate>
    </section>
  );
}