import { Input } from '@/components/ui/input';
import { Table } from '@tanstack/react-table';
import { Search, X } from 'lucide-react';

export function SearchInput<TData>({ table }: { table: Table<TData> }) {
  const column = table.getColumn('nombre_producto');
  const searchText = (column?.getFilterValue() as string) ?? '';

  return (
    <div className="flex items-center relative w-full max-w-60">
      <Search className="absolute left-2 size-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Buscar"
        className="px-8 text-sm"
        value={(column?.getFilterValue() as string) ?? ''}
        onChange={(event) => column?.setFilterValue(event.target.value)}
      />
      {searchText.length > 0 && (
        <X
          className="absolute right-2 size-6 text-muted-foreground p-1 cursor-pointer"
          onClick={() => column?.setFilterValue('')}
        />
      )}
    </div>
  );
}
