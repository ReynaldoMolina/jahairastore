import { checkAuthorization } from '@/authorization/check-authorization';
import { ProviderForm } from '@/components/forms/provider';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/site-header';

export const metadata = {
  title: 'Crear proveedor',
};

export default async function Page() {
  await checkAuthorization();

  return (
    <>
      <SiteHeader title="Crear proveedor" />
      <PageWrapper>
        <ProviderForm isNew={true} />
      </PageWrapper>
    </>
  );
}
