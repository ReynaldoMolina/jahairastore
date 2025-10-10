'use client';

import DateCell from '@/components/table/date-cell';
import { DefaultCell } from '@/components/table/default-cell';
import { EditCell } from '@/components/table/edit-cell';
import { IdCell } from '@/components/table/id-cell';
import { NumberFloatCell } from '@/components/table/number-cell';
import { CompraTableType } from '@/types/types';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<CompraTableType>[] = [
  {
    id: 'edit',
    header: 'Editar',
    cell: ({ row }) => <EditCell href={`/compras/${row.original.id}`} />,
    size: 40,
  },
  {
    accessorKey: 'id',
    header: 'Id',
    cell: IdCell,
    size: 50,
  },
  {
    accessorKey: 'proveedor_nombre',
    header: 'Nombre empresa',
    cell: DefaultCell,
  },
  {
    accessorKey: 'fecha',
    header: 'Fecha',
    cell: DateCell,
    size: 120,
  },
  {
    accessorKey: 'total_compra',
    header: 'Compra',
    cell: NumberFloatCell,
    size: 100,
  },
  {
    accessorKey: 'total_gasto',
    header: 'Gastos',
    cell: NumberFloatCell,
    size: 100,
  },
  {
    accessorKey: 'total',
    header: 'Total',
    cell: NumberFloatCell,
    size: 100,
  },
];
