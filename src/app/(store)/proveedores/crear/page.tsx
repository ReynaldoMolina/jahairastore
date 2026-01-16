import { checkAuthorization } from '@/authorization/check-authorization';
import { CreateProviderForm } from '@/components/form/provider/create';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/header/site-header';

export const metadata = {
  title: 'Crear proveedor',
};

export default async function Page() {
  await checkAuthorization();

  return (
    <>
      <SiteHeader title="Crear proveedor" />
      <PageWrapper>
        <CreateProviderForm />
      </PageWrapper>
    </>
  );
}
