import { FormId, FormSelect } from "@/app/ui/forms/formInputs";
import { FormEdit, FormButtons, FormInfo, ProductSearch } from "@/app/ui/forms/RegisterForm";
import ProductSearchList from "@/app/ui/registerForm/ProductSearchList";
import FormDetail from "@/app/ui/registerForm/FormDetail";
import { PurchaseOptions } from "@/app/ui/registerForm/PurchaseOptions";
import { getPurchaseById, getPurchaseDetailById } from "@/app/lib/data";
import { updatePurchase } from "@/app/lib/actions";
 
export async function generateMetadata(props) {
  const { id } = await props.params;
  return {
    title: `Compra ${id}`
  }
}

export default async function Page(props) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const purchaseId = params.id;
  const purchase = await getPurchaseById(purchaseId);
  const purchasedetail = await getPurchaseDetailById(purchaseId);

  return (
    <section className="flex grow overflow-y-scroll h-0">
      <FormEdit updateRegister={updatePurchase} registerId={purchaseId} detailList={purchasedetail} convert={true}>
        <FormId holder="Compra" value={purchaseId} />
        <FormInfo date={purchase.Fecha} value={purchase.TotalGasto} register="purchases">
          <FormSelect value={purchase.Id_proveedor} name="Id_proveedor" label="Proveedor" />
        </FormInfo>

        <ProductSearch open={false}>
          <ProductSearchList searchParams={searchParams} inventario={true} />
        </ProductSearch>

        <FormDetail convert={true} price="compra" />

        <PurchaseOptions purchase={purchase} />

        <FormButtons link={'/compras'} label={'Guardar'} />
      </FormEdit>
    </section>
  );
}