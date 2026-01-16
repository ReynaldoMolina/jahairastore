import { SearchParamsProps } from '@/types/types';
import { getOrders } from '@/fetch-data/order';
import { Orders } from '../order';

interface WrapperProps {
  searchParams: SearchParamsProps;
}

export async function Wrapper({ searchParams }: WrapperProps) {
  const { data, query, totalPages } = await getOrders(searchParams);

  return <Orders data={data} query={query} totalPages={totalPages} />;
}
