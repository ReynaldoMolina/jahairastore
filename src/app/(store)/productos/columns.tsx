'use client';

import { DefaultCell } from '@/components/table/default-cell';
import { EditCell } from '@/components/table/edit-cell';
import { IdCell } from '@/components/table/id-cell';
import { MoneyCell } from '@/components/table/number-cell';
import { ProductsTableType } from '@/types/types';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<ProductsTableType>[] = [
  {
    id: 'actions',
    header: 'Editar',
    cell: ({ row }) => <EditCell href={`/productos/${row.original.id}`} />,
    size: 40,
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
    accessorKey: 'precio_venta',
    header: 'Venta',
    cell: (ctx) => (
      <MoneyCell
        {...ctx}
        precio_en_cordobas={ctx.row.original.precio_en_cordobas}
      />
    ),
    size: 100,
  },
  {
    accessorKey: 'precio_compra',
    header: 'Compra',
    cell: (ctx) => (
      <MoneyCell
        {...ctx}
        precio_en_cordobas={ctx.row.original.precio_en_cordobas}
      />
    ),
    size: 100,
  },
  {
    accessorKey: 'ganancia',
    header: 'Ganancia',
    cell: (ctx) => (
      <MoneyCell
        {...ctx}
        precio_en_cordobas={ctx.row.original.precio_en_cordobas}
      />
    ),
    size: 100,
  },
];
