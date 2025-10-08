'use client';

import { EditCell } from '@/components/table/edit-cell';
import { IdCell } from '@/components/table/id-cell';
import { MunicipioType } from '@/types/types';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<MunicipioType>[] = [
  {
    id: 'edit',
    header: 'Editar',
    cell: ({ row }) => <EditCell href={`/municipios/${row.original.id}`} />,
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
    header: 'Nombre',
  },
];
