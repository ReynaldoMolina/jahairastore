import { ListFilter } from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { StockLocationFilter } from './inventory/stock-location';
import { ProductCategoryFilter } from './inventory/product-category';
import { SelectOptions } from '@/types/types';

interface Props {
  categories: SelectOptions[];
}

export function InventoryFilter({ categories }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <ListFilter />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <StockLocationFilter />
        <DropdownMenuSeparator />
        <ProductCategoryFilter categories={categories} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
