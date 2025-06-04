import { FormId, FormSelectProveedor } from "@/app/ui/forms/formInputs";
import { PurchaseEdit, PurchaseFormButtons, PurchaseInfo, ProductSearch } from "@/app/ui/forms/PurchaseForm";
import ProductSearchList from "@/app/ui/purchaseForm/ProductSearchList";
import PurchaseDetail from "@/app/ui/purchaseForm/PurchaseDetail";
import { getPurchaseById, getPurchaseDetailById } from "@/app/lib/data";
import { PurchaseOptions } from "@/app/ui/purchaseForm/PurchaseOptions";
 
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
      <PurchaseEdit purchaseId={purchaseId} purchasedetail={purchasedetail}>
        <FormId holder="Compra" value={purchaseId} />
        <PurchaseInfo date={purchase.Fecha} gastos={purchase.TotalGastos}>
          <FormSelectProveedor value={purchase.Id_proveedor} />
        </PurchaseInfo>

        <ProductSearch open={false}>
          <ProductSearchList searchParams={searchParams} />
        </ProductSearch>

        <PurchaseDetail />

        <PurchaseOptions purchase={purchase} />

        <PurchaseFormButtons link={'/purchases'} label={'Guardar'} />
      </PurchaseEdit>
    </section>
  );
}