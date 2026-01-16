import { SearchParamsProps } from '@/types/types';
import { getClients } from '@/fetch-data/client';
import { Clients } from '../client';

interface WrapperProps {
  searchParams: SearchParamsProps;
}

export async function Wrapper({ searchParams }: WrapperProps) {
  const { data, query, totalPages } = await getClients(searchParams);

  return <Clients data={data} query={query} totalPages={totalPages} />;
}
