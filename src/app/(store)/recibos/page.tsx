import { checkAuthorization } from '@/authorization/check-authorization';
import { SearchInput } from '@/components/filters/search-input';
import { Receipts } from '@/components/lists/receipts';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/header/site-header';
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
        showHeaderActions
        hideNewButton
        hideBackButton
      />
      <PageWrapper>
        <SearchInput />
        <Receipts data={data} query={query} totalPages={totalPages} />
      </PageWrapper>
    </>
  );
}
