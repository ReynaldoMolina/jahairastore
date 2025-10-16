'use client';

import { Search } from 'lucide-react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import NewRegister from './new-register';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '../ui/input-group';
import React from 'react';

interface SearchInput {
  children: React.ReactNode;
  allowNew?: boolean;
}

export default function SearchInput({ children, allowNew }: SearchInput) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 400);

  return (
    <div className="flex gap-2 justify-between items-center w-full">
      <InputGroup className="max-w-60">
        <InputGroupInput
          type="search"
          placeholder="Buscar"
          autoComplete="off"
          defaultValue={searchParams.get('query')?.toString()}
          onChange={(event) => handleSearch(event.target.value)}
        />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </InputGroup>
      <div className="inline-flex gap-2">
        {children}
        <NewRegister allowNew={allowNew} />
      </div>
    </div>
  );
}
