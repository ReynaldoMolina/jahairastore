'use client';

import {
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '../../ui/dropdown-menu';
import { useSearchParams } from 'next/navigation';
import { useSearchUtils } from '../header-filter';

export function StockLocationFilter() {
  const { updateURL } = useSearchUtils();
  const searchParams = useSearchParams();

  const currentUbicacion = searchParams.get('ubicacion') || '';

  const handleValueChange = (newValue: string) => {
    const valueToUpdate = newValue === '' ? null : newValue;
    updateURL('ubicacion', valueToUpdate);
  };

  return (
    <>
      <DropdownMenuLabel>Ubicación</DropdownMenuLabel>
      <DropdownMenuRadioGroup
        value={currentUbicacion}
        onValueChange={handleValueChange}
      >
        <DropdownMenuRadioItem value="">Todo</DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="1">León</DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="2">Acoyapa</DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </>
  );
}
