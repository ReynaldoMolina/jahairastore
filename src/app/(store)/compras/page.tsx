import { checkAuthorization } from '@/authorization/check-authorization';
import Purchases from '@/components/lists/purchases';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/site-header';
import { PageProps } from '@/types/types';

export const metadata = {
  title: 'Compras',
};

export default async function Page({ searchParams }: PageProps) {
  await checkAuthorization();

  return (
    <>
      <SiteHeader title="Compras" showActionBar />
      <PageWrapper>
        <Purchases searchParams={await searchParams} />
      </PageWrapper>
    </>
  );
}
