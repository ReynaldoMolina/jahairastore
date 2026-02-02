'use client';

import { FileText } from 'lucide-react';
import { DropdownMenuItem } from '../ui/dropdown-menu';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { SelectOptions } from '@/types/types';
import { ubicaciones } from '@/lib/ubicaciones-options';
import { pdf, PDFDownloadLink } from '@react-pdf/renderer';
import { CatalagoProductos } from './catalogo';
import { Spinner } from '../ui/spinner';

interface ExportInventoryProps {
  categories: SelectOptions[];
}

export function ExportInventoryToPdf({ categories }: ExportInventoryProps) {
  const [open, setOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedUbicacion, setSelectedUbicacion] = useState<number>(undefined);
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const toggleCategory = (id: number, checked: boolean) => {
    setSelectedCategories((prev) =>
      checked ? [...prev, id] : prev.filter((c) => c !== id)
    );
  };

  const toggleUbicacion = (id: number) => {
    setSelectedUbicacion(id);
  };

  const selectAllUbicaciones = () => {
    setSelectedUbicacion(undefined);
  };

  const selectAllCategories = (checked: boolean) => {
    setSelectedCategories(
      checked ? categories.map((u) => Number(u.value)) : []
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            setOpen(true);
          }}
        >
          <FileText />
          Catálogo PDF
        </DropdownMenuItem>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Exportar catálogo</DialogTitle>
          <DialogDescription>
            Selecciona las categorías y ubicación a exportar.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 my-3 max-h-[55dvh] overflow-y-auto px-0.5">
          {/* ───── UBICACIONES ───── */}
          <span className="text-sm font-semibold">Ubicaciones</span>

          <div className="inline-flex gap-3">
            <Checkbox
              id="all"
              checked={selectedUbicacion === undefined}
              onCheckedChange={() => selectAllUbicaciones()}
            />
            <Label htmlFor="all" className="font-normal">
              Todo
            </Label>
          </div>

          {ubicaciones.map((ubicacion) => {
            const id = Number(ubicacion.value);

            return (
              <div key={ubicacion.value} className="inline-flex gap-3">
                <Checkbox
                  id={ubicacion.label}
                  checked={selectedUbicacion === Number(ubicacion.value)}
                  onCheckedChange={() => toggleUbicacion(id)}
                />
                <Label htmlFor={ubicacion.label} className="font-normal">
                  {ubicacion.label}
                </Label>
              </div>
            );
          })}

          {/* ───── CATEGORÍAS ───── */}
          <span className="text-sm font-semibold mt-3">Categorías</span>

          <div className="inline-flex gap-3">
            <Checkbox
              id="all-categories"
              checked={selectedCategories.length === categories.length}
              onCheckedChange={(checked) => selectAllCategories(!!checked)}
            />
            <Label htmlFor="all-categories" className="font-normal">
              Todo
            </Label>
          </div>

          {categories.map((category) => {
            const id = Number(category.value);

            return (
              <div key={category.value} className="inline-flex gap-3">
                <Checkbox
                  id={category.label}
                  checked={selectedCategories.includes(id)}
                  onCheckedChange={(checked) => toggleCategory(id, !!checked)}
                />
                <Label htmlFor={category.label} className="font-normal">
                  {category.label}
                </Label>
              </div>
            );
          })}
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button
            type="button"
            variant="secondary"
            onClick={() => setOpen(false)}
          >
            Cancelar
          </Button>

          <Button
            type="button"
            className="w-full sm:w-25"
            disabled={selectedCategories.length === 0 || isLoading}
            onClick={async () => {
              try {
                setIsLoading(true);

                // 1. Traer productos
                const res = await fetch('/api/inventario-pdf', {
                  method: 'POST',
                  body: JSON.stringify({
                    categorias: selectedCategories,
                    ubicacion: selectedUbicacion,
                  }),
                });

                const data = await res.json();

                // 2. Generar PDF en memoria
                const blob = await pdf(
                  <CatalagoProductos products={data} />
                ).toBlob();

                // 3. Forzar descarga directa
                const url = URL.createObjectURL(blob);

                const a = document.createElement('a');
                a.href = url;
                a.download = 'catalogo-productos.pdf';
                a.click();

                URL.revokeObjectURL(url);

                // opcional
                setOpen(false);
              } finally {
                setIsLoading(false);
              }
            }}
          >
            {isLoading ? <Spinner /> : 'Descargar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
