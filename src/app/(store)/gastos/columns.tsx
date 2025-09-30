'use client';

import DateCell from '@/components/table/date-cell';
import { DefaultCell } from '@/components/table/default-cell';
import { EditCell } from '@/components/table/edit-cell';
import { IdCell } from '@/components/table/id-cell';
import { NumberFloatCell } from '@/components/table/number-cell';
import { ExpenseFormType } from '@/types/types';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<ExpenseFormType>[] = [
  {
    id: 'actions',
    header: 'Editar',
    cell: ({ row }) => <EditCell href={`/gastos/${row.original.id}`} />,
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
    accessorKey: 'id_compra',
    header: 'Id compra',
    cell: DefaultCell,
    size: 50,
  },
  {
    accessorKey: 'fecha',
    header: 'Fecha',
    cell: DateCell,
  },
  {
    accessorKey: 'gasto',
    header: 'Gasto',
    cell: NumberFloatCell,
  },
  {
    accessorKey: 'concepto',
    header: 'Concepto',
    cell: DefaultCell,
  },
];
