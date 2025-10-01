'use client';

import DateCell from '@/components/table/date-cell';
import { DefaultCell } from '@/components/table/default-cell';
import { EditCell } from '@/components/table/edit-cell';
import { IdCell } from '@/components/table/id-cell';
import { NumberFloatCell } from '@/components/table/number-cell';
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
    accessorKey: 'nombre',
    header: 'Producto',
    cell: DefaultCell,
  },
  {
    accessorKey: 'id_externo',
    header: 'Id externo',
    cell: DefaultCell,
  },
  {
    accessorKey: 'precio_venta',
    header: 'Precio venta',
    cell: NumberFloatCell,
  },
  {
    accessorKey: 'precio_compra',
    header: 'Precio compra',
    cell: NumberFloatCell,
  },
  {
    accessorKey: 'ganancia',
    header: 'Ganancia',
    cell: NumberFloatCell,
  },
];
