import { checkAuthorization } from '@/authorization/check-authorization';
import { ListFilter } from '@/components/actiontools/list-filter';
import { Inventory } from '@/components/lists/inventory';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/site-header';
import { getInventory } from '@/fetch-data/inventory';
import { PageProps } from '@/types/types';

export const metadata = {
  title: 'Inventario',
};

export default async function Page({ searchParams }: PageProps) {
  await checkAuthorization();

  const { data, query, totalPages } = await getInventory(await searchParams);

  return (
    <>
      <SiteHeader title="Inventario" showActionBar hideNewButton hideBackButton>
        <ListFilter listName="inventario" />
      </SiteHeader>
      <PageWrapper>
        <Inventory data={data} query={query} totalPages={totalPages} />
      </PageWrapper>
    </>
  );
}
