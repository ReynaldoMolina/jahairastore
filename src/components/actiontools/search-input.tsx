'use client';

import { Search, X } from 'lucide-react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '../ui/input-group';

export function SearchButton() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('query');

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          <Search />
          {queryParam ? (
            <span className="text-muted-foreground text-xs">1</span>
          ) : null}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <SearchInput />
      </PopoverContent>
    </Popover>
  );
}

export function SearchInput() {
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
    <InputGroup className="max-w-60 h-8">
      <InputGroupInput
        type="search"
        placeholder="Buscar"
        autoComplete="off"
        className="h-8 w-full max-w-20 sm:max-w-30 font-normal"
        value={searchValue}
        onChange={(event) => {
          const term = event.target.value;
          setSearchValue(term);
          handleSearch(term);
        }}
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
