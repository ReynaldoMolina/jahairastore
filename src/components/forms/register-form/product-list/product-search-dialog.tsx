import { useState } from 'react';
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
import { ActionBar } from '@/components/actiontools/action-bar';

export function ProductSearchDialog({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full" asChild>
        <Button className="w-full my-5" type="button" variant="outline">
          <Plus />
          Agregar productos
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-dvw md:min-w-[80dvw]">
        <DialogHeader>
          <DialogTitle>Agregar productos</DialogTitle>
          <DialogDescription>
            Selecciona los productos y luego cierra este cuadro de diálogo.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col max-h-[80dvh] min-h-[80dvh] overflow-y-auto gap-3 w-full">
          <ActionBar>
            <></>
          </ActionBar>
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}
