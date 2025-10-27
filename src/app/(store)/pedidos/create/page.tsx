import { checkAuthorization } from '@/authorization/check-authorization';
import { RegisterForm } from '@/components/forms/register';
import ProductSearchList from '@/components/forms/register-form/product-list/product-search-list';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/site-header';
import { getClientsSelect } from '@/fetch-data/data';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Crear pedido',
};

export default async function Page(props) {
  await checkAuthorization();

  const searchParams = await props.searchParams;
  const selectData = await getClientsSelect();

  return (
    <>
      <SiteHeader title="Crear pedido" />
      <PageWrapper>
        <RegisterForm isNew={true} selectData={selectData} formName="pedidos">
          <ProductSearchList searchParams={searchParams} inventario={false} />
        </RegisterForm>
      </PageWrapper>
    </>
  );
}
