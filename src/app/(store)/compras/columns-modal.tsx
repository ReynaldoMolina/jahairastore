'use client';

import {
  CheckBoxCell,
  CheckBoxCellHeader,
} from '@/components/table/checkbox-cell';
import { DefaultCell } from '@/components/table/default-cell';
import { IdCell } from '@/components/table/id-cell';
import { MoneyCell } from '@/components/table/number-cell';
import { ProductsPurchasesModalTableType } from '@/types/types';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<ProductsPurchasesModalTableType>[] = [
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
    accessorKey: 'nombre_producto',
    header: 'Producto',
    cell: DefaultCell,
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
