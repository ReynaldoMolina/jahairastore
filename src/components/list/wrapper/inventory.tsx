import { ExportInventory } from '@/components/export-to-excel';
import { SearchInput } from '@/components/filter/search-input';
import { StockLocationFilter } from '@/components/filter/stock-location';
import { Products } from '../product';
import { getProducts } from '@/fetch-data/product';
import { SearchParamsProps } from '@/types/types';

interface WrapperProps {
  searchParams: SearchParamsProps;
  ubicacionLabel: string;
}

export async function Wrapper({ searchParams, ubicacionLabel }: WrapperProps) {
  const { data, query, totalPages } = await getProducts(searchParams);

  return (
    <>
      <div className="flex gap-1">
        <SearchInput showScanButton />
        <StockLocationFilter />
        <ExportInventory data={data} label={ubicacionLabel} />
      </div>
      <Products data={data} query={query} totalPages={totalPages} />
    </>
  );
}
