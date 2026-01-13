import { checkAuthorization } from '@/authorization/check-authorization';
import { HeaderFilter } from '@/components/filters/header-filter';
import { SearchInput } from '@/components/filters/search-input';
import { Products } from '@/components/lists/products';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/header/site-header';
import { getProducts } from '@/fetch-data/product';
import { PageProps } from '@/types/types';
import { StockLocationFilter } from '@/components/filters/stock-location';
import { ExportInventory } from '@/lib/export-to-excel';

export const metadata = {
  title: 'Inventario',
};

export default async function Page({ searchParams }: PageProps) {
  await checkAuthorization();

  const { data, query, totalPages } = await getProducts(await searchParams);

  return (
    <>
      <SiteHeader title="Inventario" showHeaderActions hideBackButton>
        <HeaderFilter listName="inventario" />
      </SiteHeader>
      <PageWrapper>
        <div className="flex gap-1">
          <SearchInput showScanButton />
          <StockLocationFilter />
          <ExportInventory data={data} />
        </div>
        <Products data={data} query={query} totalPages={totalPages} />
      </PageWrapper>
    </>
  );
}
