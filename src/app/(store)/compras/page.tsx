import { checkAuthorization } from '@/authorization/check-authorization';
import { SearchInput } from '@/components/actiontools/search-input';
import { Purchases } from '@/components/lists/purchases';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/site-header';
import { getPurchases } from '@/fetch-data/purchases';
import { PageProps } from '@/types/types';

export const metadata = {
  title: 'Compras',
};

export default async function Page({ searchParams }: PageProps) {
  await checkAuthorization();

  const { data, query, totalPages } = await getPurchases(await searchParams);

  return (
    <>
      <SiteHeader title="Compras" showActionBar hideBackButton />
      <PageWrapper>
        <SearchInput />
        <Purchases data={data} query={query} totalPages={totalPages} />
      </PageWrapper>
    </>
  );
}
