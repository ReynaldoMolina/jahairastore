'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  checkExistingProducts,
  importProducts,
} from '@/server-actions/purchase-import';
import { Download, FileUp, Import, Waypoints } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as XLSX from 'xlsx';

type ImportSummary = {
  existentes: number;
  nuevos: number;
};

export function ImportPurchase({ purchaseId }: { purchaseId: number }) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [summary, setSummary] = useState<ImportSummary>({
    existentes: 0,
    nuevos: 0,
  });
  const [open, setOpen] = useState(false);

  const seleccionarArchivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const archivo = e.target.files?.[0] ?? null;
    setFile(archivo);
  };

  const seleccionarArchivo2 = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const archivo = e.target.files?.[0] ?? null;
    setFile2(archivo);

    if (!archivo) {
      setSummary({ existentes: 0, nuevos: 0 });
      return;
    }

    const bytes = await archivo.arrayBuffer();
    const workbook = XLSX.read(bytes, { type: 'array' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    const rows = XLSX.utils.sheet_to_json<{
      idProducto: number;
    }>(sheet);

    let existentes = 0;
    let nuevos = 0;

    for (const row of rows) {
      if (row.idProducto) {
        existentes++;
      } else {
        nuevos++;
      }
    }

    setSummary({
      existentes,
      nuevos,
    });
  };

  const procesar = async () => {
    if (!file) return;

    const resultado = await checkExistingProducts(undefined, file);

    if (!resultado) return;

    const worksheet = XLSX.utils.json_to_sheet(resultado);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, 'productos');

    XLSX.writeFile(workbook, 'compra-procesada.xlsx');
  };

  const importar = async () => {
    if (!file2) return;

    const resultado = await importProducts(purchaseId, file2);
    router.refresh();
    setOpen(false);
  };

  const descargarPlantilla = () => {
    const worksheet = XLSX.utils.json_to_sheet([], {
      header: [
        'codigo',
        'cantidad_compra',
        'cantidad_real',
        'nombre',
        'iva',
        'costo',
      ],
    });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'plantilla');

    XLSX.writeFile(workbook, 'plantilla-compra.xlsx');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full md:w-fit">
          <FileUp />
          Importar factura
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Importar factura</DialogTitle>
          <DialogDescription>
            Importa datos de productos desde una factura en Excel
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 w-full md:max-w-xl">
          <Label>1. Primero descarga la plantilla de compra</Label>
          <Button type="button" variant="outline" onClick={descargarPlantilla}>
            <Download />
            Descargar plantilla
          </Button>

          <Label className="mt-7">
            2. Sube la compra con los datos y procesala
          </Label>
          <Field>
            <Input
              id="excel"
              type="file"
              accept=".xlsx"
              onChange={seleccionarArchivo}
            />
          </Field>

          <Button
            type="button"
            variant="outline"
            disabled={!file}
            onClick={procesar}
          >
            <Waypoints />
            Procesar compra
          </Button>

          <Label className="mt-7">
            3. Sube la compra con los datos procesados
          </Label>

          <Field>
            <Input
              id="procesados"
              type="file"
              accept=".xlsx"
              onChange={seleccionarArchivo2}
            />
          </Field>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" disabled={!file2}>
                <Import />
                Importar productos
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                <AlertDialogDescription>
                  Revisa que los datos estén correctos antes de continuar. Se
                  crearán los productos que no existan y luego se agregará todo
                  a la compra.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Productos existentes</span>
                  <span>{summary.existentes}</span>
                </div>

                <div className="flex justify-between">
                  <span>Productos nuevos</span>
                  <span>{summary.nuevos}</span>
                </div>

                <div className="flex justify-between border-t pt-2">
                  <span>Total</span>
                  <span>{summary.existentes + summary.nuevos}</span>
                </div>
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={importar}>
                  Continuar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </DialogContent>
    </Dialog>
  );
}
