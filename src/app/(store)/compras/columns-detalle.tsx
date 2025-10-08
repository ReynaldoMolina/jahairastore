'use client';

import {
  CheckBoxCell,
  CheckBoxCellHeader,
} from '@/components/table/checkbox-cell';
import { DefaultCell } from '@/components/table/default-cell';
import { IdCell } from '@/components/table/id-cell';
import { MoneyCell, NumberFloatCell } from '@/components/table/number-cell';
import { PurchaseDetailTable } from '@/types/types';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<PurchaseDetailTable>[] = [
  {
    id: 'select',
    header: CheckBoxCellHeader,
    cell: CheckBoxCell,
    size: 30,
  },
  {
    accessorKey: 'id',
    header: 'Id',
    cell: IdCell,
    size: 50,
  },
  {
    accessorKey: 'nombre',
    header: 'Producto',
    cell: DefaultCell,
  },
  {
    accessorKey: 'cantidad',
    header: 'Cant',
    cell: NumberFloatCell,
    size: 50,
  },
  {
    accessorKey: 'precio_compra',
    header: 'Venta',
    cell: (ctx) => (
      <MoneyCell
        {...ctx}
        precio_en_cordobas={ctx.row.original.precio_en_cordobas}
      />
    ),
    size: 100,
  },
];
