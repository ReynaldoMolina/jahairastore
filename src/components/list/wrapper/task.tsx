import { SearchParamsProps } from '@/types/types';
import { Tareas } from '../task';
import { getTareas } from '@/fetch-data/task';

interface WrapperProps {
  searchParams: SearchParamsProps;
}

export async function Wrapper({ searchParams }: WrapperProps) {
  const { data, query, totalPages } = await getTareas(searchParams);

  return <Tareas data={data} query={query} totalPages={totalPages} />;
}
