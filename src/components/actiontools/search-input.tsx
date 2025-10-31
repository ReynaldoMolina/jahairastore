'use client';

import { Search, X } from 'lucide-react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { DebouncedState, useDebouncedCallback } from 'use-debounce';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '../ui/input-group';
import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';

export function SearchButton() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const queryParam = searchParams.get('query') || '';
  const [searchValue, setSearchValue] = useState(queryParam);

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, 400);

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
        <InputGroup>
          <InputGroupInput
            type="search"
            placeholder="Buscar"
            autoComplete="off"
            className="h-9"
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
      </PopoverContent>
    </Popover>
  );
}
