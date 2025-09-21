export const dynamic = 'force-dynamic';

import { RegisterForm } from '@/components/forms/RegisterForm';
import ProductSearchList from '@/components/forms/RegisterForm/ProductList/ProductSearchList';
import { getClientsSelect } from '@/fetch-data/data';

export const metadata = {
  title: 'Crear pedido',
};

export default async function Page(props) {
  const searchParams = await props.searchParams;
  const selectData = await getClientsSelect();

  return (
    <RegisterForm isNew={true} selectData={selectData} formName="pedidos">
      <ProductSearchList searchParams={searchParams} inventario={false} />
    </RegisterForm>
  );
}
