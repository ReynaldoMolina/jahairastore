'use client';

import { MapPin } from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { useSearchParams } from 'next/navigation';
import { useSearchUtils } from './header-filter';

export function StockLocationFilter() {
  const { updateURL } = useSearchUtils();
  const searchParams = useSearchParams();

  const currentUbicacion = searchParams.get('ubicacion') || '';

  const handleValueChange = (newValue: string) => {
    const valueToUpdate = newValue === '' ? null : newValue;
    updateURL('ubicacion', valueToUpdate);
  };

  const label = currentUbicacion === '1' ? 'León' : 'Acoyapa';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={
            currentUbicacion
              ? 'border-blue-600 bg-blue-50 dark:border-blue-900 dark:bg-blue-950'
              : ''
          }
        >
          <MapPin className="size-4" />
          {currentUbicacion && <span className="text-xs">{label}</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Ubicación</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={currentUbicacion}
          onValueChange={handleValueChange}
        >
          <DropdownMenuRadioItem value="">Todo</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="1">León</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="2">Acoyapa</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
