'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { useState } from 'react';
import { ActionsBarDetalle } from '../action-bar-detalle/actions-bar-detalle';
import { DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { createPurchaseDetail } from '@/server-actions/purchase-details';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  tableData?: TData[];
  id_compra: number;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function DataTableModal<TData, TValue>({
  columns,
  tableData,
  id_compra,
  setOpen,
}: DataTableProps<TData, TValue>) {
  const [data] = useState(tableData || []);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  const selectedRows = table.getSelectedRowModel().rows.map((r) => r.original);

  async function handleAdd() {
    const newRows = selectedRows.map((row) => {
      return {
        id_compra,
        id_producto: row.id,
        precio_compra: row.precio_compra,
        precio_venta: row.precio_venta,
        cambio_dolar: row.cambio_dolar,
        precio_en_cordobas: row.precio_en_cordobas,
        cantidad: 1,
      };
    });
    console.log(newRows);
    return;
    await createPurchaseDetail(undefined, newRows);
    setOpen(false);
  }

  return (
    <>
      <ActionsBarDetalle table={table} />

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    style={{
                      width:
                        header.getSize() !== 150 ? header.getSize() : undefined,
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          {table.getRowModel().rows.length === 0 ? (
            <TableBody>
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No hay resultados
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={{
                        width:
                          cell.column.getSize() !== 150
                            ? cell.column.getSize()
                            : undefined,
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </div>

      <DialogFooter className="flex-row justify-end">
        <Button
          type="button"
          variant="secondary"
          onClick={() => setOpen(false)}
        >
          Cancelar
        </Button>
        <Button type="button" onClick={handleAdd}>
          Agregar
        </Button>
      </DialogFooter>
    </>
  );
}
