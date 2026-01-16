import { checkAuthorization } from '@/authorization/check-authorization';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/header/site-header';
import { CreateTrasladoForm } from '@/components/form/traslado/create';

export const metadata = {
  title: 'Crear traslado',
};

export default async function Page() {
  await checkAuthorization();

  return (
    <>
      <SiteHeader title="Crear traslado" />
      <PageWrapper>
        <CreateTrasladoForm />
      </PageWrapper>
    </>
  );
}
