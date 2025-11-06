import React, { Dispatch, SetStateAction, useState } from 'react';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { SearchInput } from '../actiontools/search-input';
import { ListFilter } from '../actiontools/list-filter';
import { Spinner } from '../ui/spinner';

interface ProductSearch {
  children: React.ReactNode;
  handleAddProducts: () => void;
  disableAddButton: boolean;
  isPending: boolean;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function ProductSearch({
  children,
  handleAddProducts,
  disableAddButton,
  isPending,
  open,
  setOpen,
}: ProductSearch) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full" asChild>
        <Button className="w-full md:w-fit" type="button" variant="outline">
          <Plus />
          Agregar productos
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-dvw lg:min-w-[80dvw] max-h-dvh overflow-y-auto px-3 md:px-6">
        <DialogHeader>
          <DialogTitle>Agregar productos</DialogTitle>
          <DialogDescription>
            Selecciona los productos y luego da click en agregar.
          </DialogDescription>
        </DialogHeader>
        <div className="inline-flex justify-between gap-3">
          <SearchInput />
          <ListFilter listName="inventario" />
        </div>
        <div className="flex flex-col max-h-[55dvh] md:max-h-[65dvh] overflow-y-auto gap-3 w-full pb-1">
          {children}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancelar</Button>
          </DialogClose>
          <Button
            type="button"
            onClick={handleAddProducts}
            disabled={disableAddButton || isPending}
          >
            {isPending ? <Spinner /> : 'Agregar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
