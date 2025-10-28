import { useState } from 'react';
import SearchInput from '@/components/actiontools/search-input';
import { ListFilter } from '@/components/actiontools/list-filter';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export function ProductSearchDialog({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full">
        <Button className="w-full my-5" type="button" variant="outline">
          <Plus />
          Agregar productos
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[90vw] md:max-w-lg">
        <DialogHeader>
          <DialogTitle>Agregar productos</DialogTitle>
          <DialogDescription>
            Selecciona los productos y luego cierra la ventana.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col max-h-[80dvh] min-h-[80dvh] overflow-y-auto gap-3 w-full">
          <SearchInput allowNew={false}>
            <ListFilter />
          </SearchInput>
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}
