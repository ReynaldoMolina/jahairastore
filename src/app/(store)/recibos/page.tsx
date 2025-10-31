import { checkAuthorization } from '@/authorization/check-authorization';
import Receipts from '@/components/lists/receipts';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/site-header';
import { PageProps } from '@/types/types';

export const metadata = {
  title: 'Recibos',
};

export default async function Page({ searchParams }: PageProps) {
  await checkAuthorization();

  return (
    <>
      <SiteHeader title="Recibos" showActionBar />
      <PageWrapper>
        <Receipts searchParams={await searchParams} />
      </PageWrapper>
    </>
  );
}
