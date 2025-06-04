import { FormSelectProveedor } from "@/app/ui/forms/formInputs";
import { PurchaseCreate, PurchaseFormButtons, PurchaseInfo, ProductSearch } from "@/app/ui/forms/PurchaseForm";
import ProductSearchList from "@/app/ui/purchaseForm/ProductSearchList";
import PurchaseDetail from "@/app/ui/purchaseForm/PurchaseDetail";

export const metadata = {
  title: 'Crear compra'
}
 
export default async function Page(props) {
  const searchParams = await props.searchParams;

  return (
    <section className="flex grow overflow-y-scroll h-0">
      <PurchaseCreate>
        <PurchaseInfo date="">
          <FormSelectProveedor />
        </PurchaseInfo>

        <ProductSearch open={true}>
          <ProductSearchList searchParams={searchParams} />
        </ProductSearch>

        <PurchaseDetail />

        <PurchaseFormButtons link={'/purchases'} label={'Crear'} />
      </PurchaseCreate>
    </section>
  );
}