import { checkAuthorization } from '@/authorization/check-authorization';
import { RegisterForm } from '@/components/forms/register';
import ProductSearchList from '@/components/forms/register-form/product-list/product-search-list';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/site-header';
import { getClientsSelect } from '@/fetch-data/data';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Crear venta',
};

export default async function Page(props) {
  await checkAuthorization();

  const selectData = await getClientsSelect();
  const searchParams = await props.searchParams;

  return (
    <>
      <SiteHeader title="Crear venta" />
      <PageWrapper>
        <RegisterForm isNew={true} selectData={selectData} formName="ventas">
          <ProductSearchList searchParams={searchParams} inventario={true} />
        </RegisterForm>
      </PageWrapper>
    </>
  );
}
