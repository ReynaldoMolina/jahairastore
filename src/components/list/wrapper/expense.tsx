import { SearchParamsProps } from '@/types/types';
import { getExpenses } from '@/fetch-data/expense';
import { Expenses } from '../expense';

interface WrapperProps {
  searchParams: SearchParamsProps;
}

export async function Wrapper({ searchParams }: WrapperProps) {
  const { data, query, totalPages } = await getExpenses(searchParams);

  return <Expenses data={data} query={query} totalPages={totalPages} />;
}
