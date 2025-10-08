import { formatNumber } from '@/utils/formatters';
import { CellContext } from '@tanstack/react-table';

export function NumberIntegerCell<TData, TValue>({
  getValue,
}: CellContext<TData, TValue>) {
  const rawValue = getValue() as number | null;
  const value = rawValue ?? 0;
  const isZero = value === 0;

  return (
    <span
      className={`${value < 0 && 'text-destructive'} ${
        isZero && 'text-muted-foreground'
      } block w-full text-center`}
    >
      {isZero ? '-' : value}
    </span>
  );
}

export function NumberFloatCell<TData, TValue>({
  getValue,
}: CellContext<TData, TValue>) {
  const rawValue = getValue() as number | null;
  const value = rawValue ?? 0;
  const isZero = value === 0;

  return (
    <span
      className={`${value < 0 && 'text-destructive'} ${
        isZero && 'text-muted-foreground'
      } block w-full text-right`}
    >
      {isZero ? '-' : formatNumber(value)}
    </span>
  );
}

interface MoneyCellProps<TData, TValue> extends CellContext<TData, TValue> {
  precio_en_cordobas?: boolean | null;
}

export function MoneyCell<TData, TValue>({
  getValue,
  precio_en_cordobas = false,
}: MoneyCellProps<TData, TValue>) {
  const rawValue = getValue() as number | null;
  const value = rawValue ?? 0;
  const isZero = value === 0;

  const currencySymbol = precio_en_cordobas ? 'C$' : '$';

  return (
    <span
      className={`${value < 0 && 'text-destructive'} ${
        isZero && 'text-muted-foreground'
      } block w-full text-right`}
    >
      {currencySymbol} {isZero ? '-' : formatNumber(value)}
    </span>
  );
}

export function NumberCellWithValue({
  value,
  type = 'float',
}: {
  value: number;
  type?: 'integer' | 'float';
}) {
  let newValue = value ?? 0;
  if (isNaN(newValue)) {
    newValue = 0;
  }
  const isZero = value === 0;

  const alignments = {
    float: 'text-right',
    integer: 'text-center',
  };

  return (
    <span
      className={`${newValue < 0 && 'text-destructive'} ${alignments[type]} ${
        isZero && 'text-muted-foreground'
      } block w-full px-1 text-muted-foreground`}
    >
      {isZero ? '-' : type === 'float' ? formatNumber(newValue) : newValue}
    </span>
  );
}
