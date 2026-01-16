import { SearchParamsProps } from '@/types/types';
import { getReceipts } from '@/fetch-data/receipt';
import { Receipts } from '../receipt';

interface WrapperProps {
  searchParams: SearchParamsProps;
}

export async function Wrapper({ searchParams }: WrapperProps) {
  const { data, query, totalPages } = await getReceipts(searchParams);

  return <Receipts data={data} query={query} totalPages={totalPages} />;
}
