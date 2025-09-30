'use client';

import { DefaultCell } from '@/components/table/default-cell';
import { EditCell } from '@/components/table/edit-cell';
import { IdCell } from '@/components/table/id-cell';
import { ProviderFormType } from '@/types/types';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<ProviderFormType>[] = [
  {
    id: 'actions',
    header: 'Editar',
    cell: ({ row }) => <EditCell href={`/proveedores/${row.original.id}`} />,
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
