import { checkAuthorization } from '@/authorization/check-authorization';
import { HeaderFilter } from '@/components/filters/header-filter';
import { SearchInput } from '@/components/filters/search-input';
import { Products } from '@/components/lists/products';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/header/site-header';
import { getProducts } from '@/fetch-data/product';
import { PageProps } from '@/types/types';
import { StockLocationFilter } from '@/components/filters/stock-location';
import { ExportInventory } from '@/components/export-to-excel';

export async function generateMetadata({ searchParams }: PageProps) {
  const ubicacion = (await searchParams).ubicacion || '';
  const label =
    ubicacion === '' ? 'Total' : ubicacion === '1' ? 'León' : 'Acoyapa';

  return {
    title: `Inventario - ${label}`,
  };
}

export default async function Page({ searchParams }: PageProps) {
  await checkAuthorization();

  const { data, query, totalPages } = await getProducts(await searchParams);
  const ubicacion = (await searchParams).ubicacion || '';
  const label =
    ubicacion === '' ? 'Total' : ubicacion === '1' ? 'León' : 'Acoyapa';

  return (
    <>
      <SiteHeader
        title={`Inventario - ${label}`}
        showHeaderActions
        hideBackButton
      >
        <HeaderFilter listName="inventario" />
      </SiteHeader>
      <PageWrapper>
        <div className="flex gap-1">
          <SearchInput showScanButton />
          <StockLocationFilter />
          <ExportInventory data={data} label={label} />
        </div>
        <Products data={data} query={query} totalPages={totalPages} />
      </PageWrapper>
    </>
  );
}
