import { checkAuthorization } from '@/authorization/check-authorization';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/header/site-header';
import { CreateForm } from '@/components/forms/ajuste-inventario/create';

export const metadata = {
  title: 'Crear ajuste',
};

export default async function Page() {
  await checkAuthorization();

  return (
    <>
      <SiteHeader title="Crear ajuste" />
      <PageWrapper>
        <CreateForm />
      </PageWrapper>
    </>
  );
}
