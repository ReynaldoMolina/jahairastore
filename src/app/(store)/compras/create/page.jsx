export const dynamic = 'force-dynamic';

import { RegisterForm } from '@/components/forms/RegisterForm';
import ProductSearchList from '@/components/forms/RegisterForm/ProductList/ProductSearchList';
import { getProvidersSelect } from '@/fetch-data/data';

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
        showAll={true}
        inventario={true}
        price="compra"
      />
    </RegisterForm>
  );
}
