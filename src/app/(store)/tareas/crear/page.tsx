import { checkAuthorization } from '@/authorization/check-authorization';
import { CreateClientForm } from '@/components/forms/client/create';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/site-header';

export const metadata = {
  title: 'Crear tarea',
};

export default async function Page() {
  await checkAuthorization();

  return (
    <>
      <SiteHeader title="Crear tarea" />
      <PageWrapper>
        <CreateClientForm />
      </PageWrapper>
    </>
  );
}
