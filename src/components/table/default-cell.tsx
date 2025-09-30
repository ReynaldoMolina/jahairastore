import { CellContext } from '@tanstack/react-table';

export function DefaultCell<TData, TValue>({
  getValue,
}: CellContext<TData, TValue>) {
  const value = getValue();

  return (
    <span className="whitespace-nowrap cursor-default">
      {value !== null && value !== undefined ? String(value) : ''}
    </span>
  );
}
