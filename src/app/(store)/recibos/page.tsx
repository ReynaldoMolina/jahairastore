import { checkAuthorization } from '@/authorization/check-authorization';
import { Receipts } from '@/components/lists/receipts';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/site-header';
import { getReceipts } from '@/fetch-data/receipts';
import { PageProps } from '@/types/types';

export const metadata = {
  title: 'Recibos',
};

export default async function Page({ searchParams }: PageProps) {
  await checkAuthorization();

  const { data, query, totalPages } = await getReceipts(await searchParams);

  return (
    <>
      <SiteHeader
        title="Recibos"
        showSidebarTrigger
        showActionBar
        hideNewButton
        hideBackButton
      />
      <PageWrapper>
        <Receipts data={data} query={query} totalPages={totalPages} />
      </PageWrapper>
    </>
  );
}
