import React, { Dispatch, SetStateAction } from 'react';
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
import { SearchInput } from '../filters/search-input';
import { HeaderFilter } from '../filters/header-filter';
import { Spinner } from '../ui/spinner';
import { StockLocationFilter } from '../filters/stock-location';

interface ProductSearch {
  children: React.ReactNode;
  handleAddProducts: () => void;
  disableAddButton: boolean;
  isPending: boolean;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  disableLocationFilter?: boolean;
  idUbicacion: number;
}

export function ProductSearch({
  children,
  handleAddProducts,
  disableAddButton,
  isPending,
  open,
  setOpen,
  disableLocationFilter = false,
  idUbicacion,
}: ProductSearch) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full" asChild>
        <Button className="w-full md:w-fit" type="button" variant="outline">
          <Plus />
          Agregar producto
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:min-w-[80dvw] max-h-[95dvh] overflow-y-auto px-3 md:px-6 pb-3 md:pb-6 gap-2">
        <DialogHeader>
          <DialogTitle>Agregar productos</DialogTitle>
          <DialogDescription>
            Selecciona los productos y luego da click en agregar.
          </DialogDescription>
        </DialogHeader>
        <div className="inline-flex gap-1">
          <SearchInput />
          <StockLocationFilter
            disabled={disableLocationFilter}
            idUbicacion={idUbicacion}
          />
          <HeaderFilter listName="inventario" />
        </div>
        <div className="flex flex-col max-h-[50dvh] md:max-h-[55dvh] overflow-y-auto gap-2 w-full pb-1">
          {children}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancelar</Button>
          </DialogClose>
          <Button
            type="button"
            className="min-w-20"
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
