'use client';

import { Search, X } from 'lucide-react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '../ui/input-group';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';

export function SearchButton() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('query');

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={
            queryParam
              ? 'border-blue-600 bg-blue-50 hover:bg-blue-50 dark:border-blue-900 dark:bg-blue-950 hover:dark:bg-blue-950'
              : ''
          }
        >
          <Search />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="left" className="w-full p-0 shadow-none border-0">
        <SearchInput />
      </PopoverContent>
    </Popover>
  );
}

interface SearchInput {
  className?: string;
}

export function SearchInput({ className }: SearchInput) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const queryParam = searchParams.get('query') || '';
  const [searchValue, setSearchValue] = useState(queryParam);

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');

    if (term) params.set('query', term);
    else params.delete('query');

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, 400);

  return (
    <InputGroup className={cn('w-full max-w-50', className)}>
      <InputGroupInput
        type="search"
        placeholder="Buscar"
        autoComplete="off"
        className="font-normal"
        value={searchValue}
        onChange={(event) => {
          const term = event.target.value;
          setSearchValue(term);
          handleSearch(term);
        }}
        autoFocus={false}
      />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          size="icon-xs"
          onClick={() => {
            setSearchValue('');
            handleSearch('');
          }}
          disabled={!searchValue}
        >
          <X />
        </InputGroupButton>
      </InputGroupAddon>
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
    </InputGroup>
  );
}
