import { checkAuthorization } from '@/authorization/check-authorization';
import { HeaderFilter } from '@/components/filter/header-filter';
import { SearchInput } from '@/components/filter/search-input';
import { Sales } from '@/components/list/sale';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/header/site-header';
import { getSales } from '@/fetch-data/sale';
import { PageProps } from '@/types/types';

export const metadata = {
  title: 'Ventas',
};

export default async function Page({ searchParams }: PageProps) {
  await checkAuthorization();

  const { data, query, totalPages } = await getSales(await searchParams);

  return (
    <>
      <SiteHeader title="Ventas" showHeaderActions hideBackButton>
        <HeaderFilter listName="ventas" />
      </SiteHeader>
      <PageWrapper>
        <SearchInput />
        <Sales data={data} query={query} totalPages={totalPages} />
      </PageWrapper>
    </>
  );
}
