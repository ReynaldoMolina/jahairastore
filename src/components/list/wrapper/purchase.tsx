import { SearchParamsProps } from '@/types/types';
import { Purchases } from '../purchase';
import { getPurchases } from '@/fetch-data/purchase';

interface WrapperProps {
  searchParams: SearchParamsProps;
}

export async function Wrapper({ searchParams }: WrapperProps) {
  const { data, query, totalPages } = await getPurchases(searchParams);

  return <Purchases data={data} query={query} totalPages={totalPages} />;
}
