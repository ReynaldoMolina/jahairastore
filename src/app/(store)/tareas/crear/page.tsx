import { checkAuthorization } from '@/authorization/check-authorization';
import { CreateTareaForm } from '@/components/form/tareas/create';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/header/site-header';

export const metadata = {
  title: 'Crear tarea',
};

export default async function Page() {
  await checkAuthorization();

  return (
    <>
      <SiteHeader title="Crear tarea" />
      <PageWrapper>
        <CreateTareaForm />
      </PageWrapper>
    </>
  );
}
