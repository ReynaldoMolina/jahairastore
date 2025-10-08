'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import React, { useState } from 'react';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import { DataTableModal } from '../table/data-table-modal';
import { ProductsPurchasesModalTableType } from '@/types/types';
import { columns } from '@/app/(store)/compras/columns-modal';

interface OrdenFormProps {
  products: ProductsPurchasesModalTableType[];
  id_compra: number | undefined;
}

export function AddProduct({ products, id_compra }: OrdenFormProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" size="sm">
          <Plus />
          Agregar productos
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[95%] overflow-y-auto w-full sm:max-w-5xl border-b">
        <DialogHeader>
          <DialogTitle>Agregar productos</DialogTitle>
          <DialogDescription className="inline-flex flex-col text-balance md:text-wrap gap-3">
            Selecciona los productos, haz click en agregar cuando estés listo.
          </DialogDescription>
        </DialogHeader>
        <DataTableModal
          columns={columns}
          tableData={products}
          id_compra={id_compra ?? 0}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
}
