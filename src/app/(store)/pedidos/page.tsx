import { checkAuthorization } from '@/authorization/check-authorization';
import { HeaderFilter } from '@/components/filter/header-filter';
import { SearchInput } from '@/components/filter/search-input';
import { Orders } from '@/components/list/order';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/header/site-header';
import { getOrders } from '@/fetch-data/order';
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
