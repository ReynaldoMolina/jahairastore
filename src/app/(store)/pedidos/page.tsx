import { checkAuthorization } from '@/authorization/check-authorization';
import { HeaderFilter } from '@/components/filters/header-filter';
import { SearchInput } from '@/components/filters/search-input';
import { Orders } from '@/components/lists/orders';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/header/site-header';
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
      <SiteHeader title="Pedidos" showHeaderActions hideBackButton>
        <HeaderFilter listName="pedidos" />
      </SiteHeader>
      <PageWrapper>
        <SearchInput />
        <Orders data={data} query={query} totalPages={totalPages} />
      </PageWrapper>
    </>
  );
}
