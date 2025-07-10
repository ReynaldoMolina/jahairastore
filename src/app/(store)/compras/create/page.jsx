export const dynamic = 'force-dynamic';

import { RegisterForm } from '@/app/ui/forms/RegisterForm';
import ProductSearchList from '@/app/ui/forms/RegisterForm/ProductList/ProductSearchList';
import { getProvidersSelect } from '@/app/lib/data';

export const metadata = {
  title: 'Crear compra',
};

export default async function Page(props) {
  const searchParams = await props.searchParams;
  const selectData = await getProvidersSelect();

  return (
    <RegisterForm
      isNew={true}
      convert={true}
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
