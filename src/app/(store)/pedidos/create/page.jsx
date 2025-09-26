export const dynamic = 'force-dynamic';

import { RegisterForm } from '@/app/ui/forms/RegisterForm';
import ProductSearchList from '@/app/ui/forms/RegisterForm/ProductList/ProductSearchList';
import { getClientsSelect } from '@/app/lib/data';

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
