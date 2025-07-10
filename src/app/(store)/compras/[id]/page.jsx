export const dynamic = 'force-dynamic';

import { RegisterForm } from '@/app/ui/forms/RegisterForm';
import ProductSearchList from '@/app/ui/forms/RegisterForm/ProductList/ProductSearchList';
import { getPurchaseById, getPurchaseDetailById } from '@/app/lib/data';
import { getProvidersSelect } from '@/app/lib/data';

export async function generateMetadata(props) {
  const { id } = await props.params;
  return {
    title: `Compra ${id}`,
  };
}

export default async function Page(props) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const purchaseId = params.id;
  const purchase = await getPurchaseById(purchaseId);
  const purchasedetail = await getPurchaseDetailById(purchaseId);
  const selectData = await getProvidersSelect();

  return (
    <RegisterForm
      isNew={false}
      register={purchase}
      registerId={purchaseId}
      detailList={purchasedetail}
      convert={true}
      abono={purchase.TotalGasto}
      selectData={selectData}
      formName="compras"
    >
      <ProductSearchList
        searchParams={searchParams}
        inventario={true}
        price="compra"
      />
    </RegisterForm>
  );
}
