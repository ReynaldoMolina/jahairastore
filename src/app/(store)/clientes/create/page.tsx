import { checkAuthorization } from '@/authorization/check-authorization';
import { ClientForm } from '@/components/forms/client';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/site-header';

export const metadata = {
  title: 'Crear cliente',
};

export default async function Page() {
  await checkAuthorization();

  return (
    <>
      <SiteHeader title="Crear cliente" />
      <PageWrapper>
        <ClientForm isNew={true} />
      </PageWrapper>
    </>
  );
}
