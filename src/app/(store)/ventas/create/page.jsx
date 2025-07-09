import { getClientsSelect } from '@/app/lib/data';
import { RegisterForm } from '@/app/ui/forms/RegisterForm';
import ProductSearchList from '@/app/ui/forms/RegisterForm/ProductList/ProductSearchList';

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
