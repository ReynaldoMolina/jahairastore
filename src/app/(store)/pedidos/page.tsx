import { checkAuthorization } from '@/authorization/check-authorization';
import { ListFilter } from '@/components/actiontools/list-filter';
import { SearchInput } from '@/components/actiontools/search-input';
import { Orders } from '@/components/lists/orders';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/site-header';
import { getOrders } from '@/fetch-data/orders';
import { PageProps } from '@/types/types';

export const metadata = {
  title: 'Pedidos',
};

export default async function Page({ searchParams }: PageProps) {
  await checkAuthorization();

  const { data, query, totalPages } = await getOrders(await searchParams);

  return (
    <>
      <SiteHeader title="Pedidos" showActionBar hideBackButton>
        <ListFilter listName="pedidos" />
      </SiteHeader>
      <PageWrapper>
        <SearchInput />
        <Orders data={data} query={query} totalPages={totalPages} />
      </PageWrapper>
    </>
  );
}
