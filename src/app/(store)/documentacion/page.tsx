import { checkAuthorization } from '@/authorization/check-authorization';
import { Documentacion } from '@/components/documentacion/documentacion';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/site-header';

export const metadata = {
  title: 'Documentación',
};

export default async function Page() {
  await checkAuthorization();

  return (
    <>
      <SiteHeader title="Documentación" hideBackButton />
      <PageWrapper>
        <Documentacion />
      </PageWrapper>
    </>
  );
}
