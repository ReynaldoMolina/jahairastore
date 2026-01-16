import { SearchParamsProps } from '@/types/types';
import { getTraslados } from '@/fetch-data/transfer';
import { Traslados } from '../transfer';

interface WrapperProps {
  searchParams: SearchParamsProps;
}

export async function Wrapper({ searchParams }: WrapperProps) {
  const { data, query, totalPages } = await getTraslados(searchParams);

  return <Traslados data={data} query={query} totalPages={totalPages} />;
}
