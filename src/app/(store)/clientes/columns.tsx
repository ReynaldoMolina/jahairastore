'use client';

import { DefaultCell } from '@/components/table/default-cell';
import { EditCell } from '@/components/table/edit-cell';
import { IdCell } from '@/components/table/id-cell';
import { ClientFormType } from '@/types/types';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<ClientFormType>[] = [
  {
    id: 'actions',
    header: 'Editar',
    cell: ({ row }) => <EditCell href={`/clientes/${row.original.id}`} />,
    size: 40,
  },
  {
    accessorKey: 'id',
    header: 'Id',
    cell: IdCell,
    size: 50,
  },
  {
    id: 'nombre',
    header: 'Nombre',
    cell: ({ row }) => (
      <span>{`${row.original.nombre} ${row.original.apellido}`}</span>
    ),
  },
  {
    accessorKey: 'telefono',
    header: 'Teléfono',
    cell: DefaultCell,
  },
  {
    accessorKey: 'municipio',
    header: 'Municipio',
    cell: DefaultCell,
  },
];
