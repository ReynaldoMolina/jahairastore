import { SearchParamsProps } from '@/types/types';
import { getProveedores } from '@/fetch-data/provider';
import { Providers } from '../provider';

interface WrapperProps {
  searchParams: SearchParamsProps;
}

export async function Wrapper({ searchParams }: WrapperProps) {
  const { data, query, totalPages } = await getProveedores(searchParams);

  return <Providers data={data} query={query} totalPages={totalPages} />;
}
