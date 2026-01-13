'use client';

import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import * as XLSX from 'xlsx';

interface Product {
  id: number;
  nombre: string;
  codigo: string;
  precioEnCordobas: boolean;
  cambioDolar: number;
  precioCompra: number;
  precioVenta: number;
  gananciaUnidad: number;
  existencias: number;
}

export function exportToExcel(data: Product[]) {
  if (!data || !data.length) return;

  // Map only the fields we want
  const rows = data.map(({ id, nombre, existencias }) => ({
    Id: id,
    Nombre: nombre,
    Existencias: existencias,
  }));

  // Generate worksheet
  const worksheet = XLSX.utils.json_to_sheet(rows);

  // Optional: auto-size columns
  const colWidths = Object.keys(rows[0]).map((key) => ({
    wch: Math.max(key.length, ...rows.map((row) => String(row[key]).length)),
  }));
  worksheet['!cols'] = colWidths;

  // Create workbook and append worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Inventario');

  /* local date & time for filename */
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, '0');

  const fileName = `Inventario ${now.getFullYear()}-${pad(
    now.getMonth() + 1
  )}-${pad(now.getDate())} ${pad(now.getHours())}-${pad(
    now.getMinutes()
  )}.xlsx`;

  // Export file
  XLSX.writeFile(workbook, fileName, { compression: true });
}

interface ExportInventoryProps {
  data: Product[];
}

export function ExportInventory({ data }: ExportInventoryProps) {
  return (
    <Button variant="outline" onClick={() => exportToExcel(data)}>
      <Download />
      <span className="hidden sm:block text-xs">Exportar</span>
    </Button>
  );
}
