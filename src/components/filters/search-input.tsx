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
    <InputGroup className={cn('w-full sm:max-w-60 rounded-full', className)}>
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
        autoFocus={false}
      />
      {searchValue && (
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            size="icon-xs"
            className="rounded-full"
            onClick={() => {
              setSearchValue('');
              handleSearch('');
            }}
          >
            <X />
          </InputGroupButton>
        </InputGroupAddon>
      )}
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
    </InputGroup>
  );
}
