'use client';

import { ITEMS_PER_PAGE, useSearchUtils } from '../actiontools/list-filter';
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
    <Select value={limitParam} onValueChange={handleChange}>
      <SelectTrigger size="sm">
        <SelectValue placeholder="20" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Por página</SelectLabel>
          {options.map((value) => (
            <SelectItem key={value} value={String(value)}>
              {value === 1 ? 'Todo' : value}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
