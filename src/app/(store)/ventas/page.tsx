import { checkAuthorization } from '@/authorization/check-authorization';
import { ListFilter } from '@/components/actiontools/list-filter';
import { SearchInput } from '@/components/actiontools/search-input';
import { Sales } from '@/components/lists/sales';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/site-header';
import { getSales } from '@/fetch-data/sales';
import { PageProps } from '@/types/types';

export const metadata = {
  title: 'Ventas',
};

export default async function Page({ searchParams }: PageProps) {
  await checkAuthorization();

  const { data, query, totalPages } = await getSales(await searchParams);

  return (
    <>
      <SiteHeader title="Ventas" showActionBar hideBackButton>
        <ListFilter listName="ventas" />
      </SiteHeader>
      <PageWrapper>
        <SearchInput />
        <Sales data={data} query={query} totalPages={totalPages} />
      </PageWrapper>
    </>
  );
}
