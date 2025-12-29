'use client';

import { ITEMS_PER_PAGE } from '@/lib/items-per-page';
import { useSearchUtils } from '../header/header-filter';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export function FilterLimit({ searchParams }) {
  const limitParam = searchParams?.limit;

  const { updateURL } = useSearchUtils();
  const options = [20, 50, 100, 1];

  function handleChange(newLimit: string) {
    updateURL('limit', Number(newLimit) === ITEMS_PER_PAGE ? null : newLimit);
  }

  return (
    <Select value={limitParam} onValueChange={handleChange} defaultValue="20">
      <SelectTrigger size="sm" className="text-xs">
        <SelectValue placeholder="Seleccionar" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Por página</SelectLabel>
          {options.map((value) => (
            <SelectItem key={value} value={String(value)} className="text-xs">
              {value === 1 ? 'Todo' : value}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
