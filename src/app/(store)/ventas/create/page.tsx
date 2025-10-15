import { RegisterForm } from '@/components/forms/register';
import ProductSearchList from '@/components/forms/register-form/product-list/product-search-list';
import { getClientsSelect } from '@/fetch-data/data';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Crear venta',
};

export default async function Page(props) {
  const selectData = await getClientsSelect();
  const searchParams = await props.searchParams;

  return (
    <>
      <RegisterForm isNew={true} selectData={selectData} formName="ventas">
        <ProductSearchList searchParams={searchParams} inventario={true} />
      </RegisterForm>
    </>
  );
}
