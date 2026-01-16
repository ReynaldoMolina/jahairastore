import { SearchParamsProps } from '@/types/types';
import { getAjustesInventario } from '@/fetch-data/ajuste';
import { Ajustes } from '../ajustes-inventario';

interface WrapperProps {
  searchParams: SearchParamsProps;
}

export async function Wrapper({ searchParams }: WrapperProps) {
  const { data, query, totalPages } = await getAjustesInventario(searchParams);

  return <Ajustes data={data} query={query} totalPages={totalPages} />;
}
