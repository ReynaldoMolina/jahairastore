'use client';

import DateCell from '@/components/table/date-cell';
import { DefaultCell } from '@/components/table/default-cell';
import { EditCell } from '@/components/table/edit-cell';
import { IdCell } from '@/components/table/id-cell';
import { NumberFloatCell } from '@/components/table/number-cell';
import { PurchaseTableType } from '@/types/types';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<PurchaseTableType>[] = [
  {
    id: 'actions',
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
    accessorKey: 'nombre_empresa',
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
    header: 'Total',
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
    accessorKey: 'ganancia',
    header: 'Ganancia',
    cell: NumberFloatCell,
    size: 100,
  },
];
