import { checkAuthorization } from '@/authorization/check-authorization';
import { HeaderFilter } from '@/components/header/header-filter';
import { SearchInput } from '@/components/filters/search-input';
import { Products } from '@/components/lists/products';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/header/site-header';
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
      <SiteHeader title="Productos" showHeaderActions hideBackButton>
        <HeaderFilter listName="productos" />
      </SiteHeader>
      <PageWrapper>
        <SearchInput />
        <Products data={data} query={query} totalPages={totalPages} />
      </PageWrapper>
    </>
  );
}
