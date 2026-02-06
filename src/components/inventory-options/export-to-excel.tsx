'use client';

import { Download, ListOrdered } from 'lucide-react';
import * as XLSX from 'xlsx';
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
} from '../ui/alert-dialog';
import { DropdownMenuItem } from '../ui/dropdown-menu';
import { useState } from 'react';

export interface Product {
  id: number;
  nombre: string;
  codigo: string;
  precioEnDolares: boolean;
  cambioDolar: number;
  costo: number;
  precioVenta: number;
  gananciaUnidad: number;
  existencias: number;
}

interface ExportToExcelProps {
  data: Product[];
  label: string;
}

export function exportToExcel({ data, label }: ExportToExcelProps) {
  if (!data || !data.length) return;

  // Map only the fields we want
  const rows = data.map(({ id, nombre, existencias }) => ({
    Id: id,
    Nombre: nombre,
    Existencias: existencias,
    Hay: null,
    Diferencia: 0,
  }));

  // Generate worksheet
  const worksheet = XLSX.utils.json_to_sheet(rows);

  // 2. Aplicamos la lógica: Si Hay (D) está vacío, Diferencia (E) es 0
  rows.forEach((_, index) => {
    const rowIndex = index + 2; // +2 porque la fila 1 son los encabezados
    const cellHay = `D${rowIndex}`;
    const cellExistencias = `C${rowIndex}`;
    const cellDiferencia = `E${rowIndex}`;

    worksheet[cellDiferencia] = {
      t: 'n',
      // Fórmula: SI D(n) está vacío (""), entonces 0, de lo contrario C(n) - D(n)
      f: `IF(ISBLANK(${cellHay}), 0, ${cellExistencias}-${cellHay})`,
    };
  });

  // Optional: auto-size columns
  const colWidths = Object.keys(rows[0]).map((key) => ({
    wch: Math.max(key.length, ...rows.map((row) => String(row[key]).length)),
  }));
  worksheet['!cols'] = colWidths;

  // Create workbook and append worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, label);

  /* local date & time for filename */
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, '0');

  const fileName = `Inventario ${label} ${now.getFullYear()}-${pad(
    now.getMonth() + 1
  )}-${pad(now.getDate())} ${pad(now.getHours())}-${pad(
    now.getMinutes()
  )}.xlsx`;

  // Export file
  XLSX.writeFile(workbook, fileName, { compression: true });
}

interface ExportInventoryProps {
  data: Product[];
  label: string;
}

export function ExportInventoryToExcel({ data, label }: ExportInventoryProps) {
  const isPlural = data.length === 1;
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            setOpen(true);
          }}
        >
          Inventario Excel
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Exportar inventario: {label}</AlertDialogTitle>
          <AlertDialogDescription>
            {`
            Se ${isPlural ? 'van' : 'va'} a exportar ${data.length} ${
              isPlural ? 'productos' : 'producto'
            } a un archivo de Excel.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={() => exportToExcel({ data, label })}>
            Exportar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
