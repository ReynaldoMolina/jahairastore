'use client';

import { Search, X } from 'lucide-react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import NewRegister from './new-register';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '../ui/input-group';
import React, { useState } from 'react';

interface SearchInput {
  children: React.ReactNode;
  allowNew?: boolean;
}

export default function SearchInput({ children, allowNew }: SearchInput) {
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
    <div className="flex gap-1 sm:gap-2 justify-between items-center w-full">
      <InputGroup className="max-w-60 bg-background">
        <InputGroupInput
          type="search"
          placeholder="Buscar"
          autoComplete="off"
          value={searchValue}
          onChange={(event) => {
            const term = event.target.value;
            setSearchValue(term);
            handleSearch(term);
          }}
        />
        {searchValue && (
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
        )}
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </InputGroup>
      <div className="inline-flex gap-1 sm:gap-2">
        {children}
        <NewRegister allowNew={allowNew} />
      </div>
    </div>
  );
}
