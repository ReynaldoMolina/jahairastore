import { ExportInventory } from '@/components/export-to-excel';
import { SearchInput } from '@/components/filters/search-input';
import { StockLocationFilter } from '@/components/filters/stock-location';
import { Products } from '../product';
import { getProducts } from '@/fetch-data/product';
import { SearchParamsProps } from '@/types/types';

interface InventoryProps {
  searchParams: SearchParamsProps;
  ubicacionLabel: string;
}

export async function Inventory({
  searchParams,
  ubicacionLabel,
}: InventoryProps) {
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
