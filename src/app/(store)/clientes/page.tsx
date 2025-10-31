import { checkAuthorization } from '@/authorization/check-authorization';
import Clients from '@/components/lists/clients';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/site-header';
import { PageProps } from '@/types/types';

export const metadata = {
  title: 'Clientes',
};

export default async function Page({ searchParams }: PageProps) {
  await checkAuthorization();

  return (
    <>
      <SiteHeader title="Clientes" showActionBar />
      <PageWrapper>
        <Clients searchParams={await searchParams} />
      </PageWrapper>
    </>
  );
}
