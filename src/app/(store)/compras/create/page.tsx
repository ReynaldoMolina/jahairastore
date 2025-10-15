import { RegisterForm } from '@/components/forms/register';
import ProductSearchList from '@/components/forms/register-form/product-list/product-search-list';
import { getProvidersSelect } from '@/fetch-data/data';

export const dynamic = 'force-dynamic';

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
