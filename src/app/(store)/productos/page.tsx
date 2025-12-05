import { checkAuthorization } from '@/authorization/check-authorization';
import { ListFilter } from '@/components/actiontools/list-filter';
import { Products } from '@/components/lists/products';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/site-header';
import { getProducts } from '@/fetch-data/product';
import { PageProps } from '@/types/types';

export const metadata = {
  title: 'Productos',
};

export default async function Page({ searchParams }: PageProps) {
  await checkAuthorization();

  const { data, query, totalPages } = await getProducts(await searchParams);

  return (
    <>
      <SiteHeader
        title="Productos"
        showSidebarTrigger
        showActionBar
        hideBackButton
      >
        <ListFilter listName="productos" />
      </SiteHeader>
      <PageWrapper>
        <Products data={data} query={query} totalPages={totalPages} />
      </PageWrapper>
    </>
  );
}
