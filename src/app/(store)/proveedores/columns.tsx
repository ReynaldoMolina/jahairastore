'use client';

import { DefaultCell } from '@/components/table/default-cell';
import { EditCell } from '@/components/table/edit-cell';
import { IdCell } from '@/components/table/id-cell';
import { ProveedorTableType } from '@/types/types';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<ProveedorTableType>[] = [
  {
    id: 'edit',
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
    accessorKey: 'nombre',
    header: 'Nombre',
    cell: DefaultCell,
  },
  {
    accessorKey: 'telefono',
    header: 'Teléfono',
    cell: DefaultCell,
    size: 200,
  },
];
