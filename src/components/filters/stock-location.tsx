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

interface StockLocationFilterProps {
  disabled?: boolean;
  idUbicacion?: number;
}

export function StockLocationFilter({
  disabled = false,
  idUbicacion,
}: StockLocationFilterProps) {
  const { updateURL } = useSearchUtils();
  const searchParams = useSearchParams();

  const currentUbicacion = idUbicacion
    ? String(idUbicacion)
    : searchParams.get('ubicacion') || '';

  const handleValueChange = (newValue: string) => {
    const valueToUpdate = newValue === '' ? null : newValue;
    updateURL('ubicacion', valueToUpdate);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          disabled={disabled}
          className={
            currentUbicacion
              ? 'border-blue-600 bg-blue-50 dark:border-blue-900 dark:bg-blue-950'
              : ''
          }
        >
          <MapPin className="size-4" />
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
