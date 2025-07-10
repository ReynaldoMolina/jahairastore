export const dynamic = 'force-dynamic';

import { RegisterForm } from '@/app/ui/forms/RegisterForm';
import ProductSearchList from '@/app/ui/forms/RegisterForm/ProductList/ProductSearchList';
import { getSaleById, getSaleDetailById } from '@/app/lib/data';
import { getClientsSelect } from '@/app/lib/data';

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
  const selectData = await getClientsSelect();

  return (
    <RegisterForm
      isNew={false}
      register={sale}
      registerId={saleId}
      detailList={saledetail}
      convert={true}
      allowEmpty={true}
      abono={sale.Abono}
      selectData={selectData}
      formName="ventas"
    >
      <ProductSearchList searchParams={searchParams} inventario={true} />
    </RegisterForm>
  );
}
