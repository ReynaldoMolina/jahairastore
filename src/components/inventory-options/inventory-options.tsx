import { Download, MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { ExportInventoryToExcel, Product } from './export-to-excel';
import { ExportInventoryToPdf } from './export-to-pdf';
import { SelectOptions } from '@/types/types';

interface Props {
  data: Product[];
  label: string;
  categories: SelectOptions[];
}

export function InventoryOptions({ data, label, categories }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Download />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Descargar</DropdownMenuLabel>
          <ExportInventoryToExcel data={data} label={label} />
          <ExportInventoryToPdf categories={categories} />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
