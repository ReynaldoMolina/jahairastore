import { SearchParamsProps } from '@/types/types';
import { getProductCategories } from '@/fetch-data/product-category';
import { Categories } from '../product-category';

interface WrapperProps {
  searchParams: SearchParamsProps;
}

export async function Wrapper({ searchParams }: WrapperProps) {
  const { data, query, totalPages } = await getProductCategories(searchParams);

  return <Categories data={data} query={query} totalPages={totalPages} />;
}
