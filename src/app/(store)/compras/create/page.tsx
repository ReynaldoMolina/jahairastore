export const dynamic = 'force-dynamic';

import { PurchasesForm } from '@/components/forms/purchases';
import { RegisterForm } from '@/components/forms/register';
import ProductSearchList from '@/components/forms/register-form/product-list/product-search-list';
import { getProvidersSelect } from '@/fetch-data/providers';
import { PageProps } from '@/types/types';

export const metadata = {
  title: 'Crear compra',
};

export default async function Page(props: PageProps) {
  const searchParams = await props.searchParams;
  const providers = await getProvidersSelect();

  return (
    <PurchasesForm action="create" providers={providers} />
    // <RegisterForm
    //   isNew={true}
    //   convert={true}
    //   selectData={selectData}
    //   formName="compras"
    // >
    //   <ProductSearchList
    //     searchParams={searchParams}
    //     showAll={true}
    //     inventario={true}
    //     price="compra"
    //   />
    // </RegisterForm>
  );
}
