import { checkAuthorization } from '@/authorization/check-authorization';
import { CreateClientForm } from '@/components/form/client/create';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/header/site-header';

export const metadata = {
  title: 'Crear categoría',
};

export default async function Page() {
  await checkAuthorization();

  return (
    <>
      <SiteHeader title="Crear categoría" />
      <PageWrapper>
        <CreateClientForm />
      </PageWrapper>
    </>
  );
}
