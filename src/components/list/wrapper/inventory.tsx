import { SearchInput } from '@/components/filter/search-input';
import { Products } from '../product';
import { getProducts } from '@/fetch-data/product';
import { SearchParamsProps } from '@/types/types';
import { InventoryFilter } from '@/components/filter/inventory-filter';
import { getProductCategoriesSelect } from '@/fetch-data/product-category';
import { InventoryOptions } from '@/components/inventory-options/inventory-options';

interface WrapperProps {
  searchParams: SearchParamsProps;
  ubicacionLabel: string;
}

export async function Wrapper({ searchParams, ubicacionLabel }: WrapperProps) {
  const { data, query, totalPages } = await getProducts(searchParams);
  const categories = await getProductCategoriesSelect();

  return (
    <>
      <div className="flex gap-1">
        <SearchInput showScanButton />
        <InventoryFilter categories={categories} />
        <InventoryOptions
          data={data}
          label={ubicacionLabel}
          categories={categories}
        />
      </div>
      <Products data={data} query={query} totalPages={totalPages} />
    </>
  );
}
