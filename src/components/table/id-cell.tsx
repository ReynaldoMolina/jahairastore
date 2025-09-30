import { CellContext } from '@tanstack/react-table';
import { Badge } from '../ui/badge';

export function IdCell<TData, TValue>({
  getValue,
}: CellContext<TData, TValue>) {
  const value = getValue();

  return (
    <Badge className="w-full bg-brand-sky text-black" variant="secondary">
      {value !== null && value !== undefined ? String(value) : ''}
    </Badge>
  );
}
