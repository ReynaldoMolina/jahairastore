import { ActionsBarDetalleProps } from '@/types/types';
import { SearchInput } from './search-input';

export function ActionsBarDetalle<TData>({
  table,
}: ActionsBarDetalleProps<TData>) {
  return <SearchInput table={table} />;
}
