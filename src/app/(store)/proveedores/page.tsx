import { checkAuthorization } from '@/authorization/check-authorization';
import Providers from '@/components/lists/providers';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/site-header';
import { PageProps } from '@/types/types';

export const metadata = {
  title: 'Proveedores',
};

export default async function Page({ searchParams }: PageProps) {
  await checkAuthorization();

  return (
    <>
      <SiteHeader title="Proveedores" showActionBar />
      <PageWrapper>
        <Providers searchParams={await searchParams} />
      </PageWrapper>
    </>
  );
}
