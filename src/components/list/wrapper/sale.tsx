import { SearchParamsProps } from '@/types/types';
import { getSales } from '@/fetch-data/sale';
import { Sales } from '../sale';

interface WrapperProps {
  searchParams: SearchParamsProps;
}

export async function Wrapper({ searchParams }: WrapperProps) {
  const { data, query, totalPages } = await getSales(searchParams);

  return <Sales data={data} query={query} totalPages={totalPages} />;
}
