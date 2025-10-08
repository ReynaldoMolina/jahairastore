'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Search, X } from 'lucide-react';
import { Input } from '../ui/input';
import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';

export default function SearchInput() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [term, setTerm] = useState(searchParams.get('search') ?? '');

  useEffect(() => {
    setTerm(searchParams.get('search') ?? '');
  }, [searchParams]);

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');

    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
      params.delete('page');
    }

    replace(`${pathname}?${params.toString()}`);
  }, 400);

  return (
    <search className="inline-flex relative items-center max-w-60">
      <Search className="flex size-4 absolute left-3 text-muted-foreground" />
      <Input
        type="search"
        className="pl-9 pr-1"
        placeholder="Buscar"
        value={term}
        onChange={(e) => {
          setTerm(e.target.value);
          handleSearch(e.target.value);
        }}
      />
      {term && (
        <Button
          variant="secondary"
          size="icon"
          className="flex absolute right-1 size-7"
          onClick={() => {
            setTerm('');
            handleSearch('');
          }}
        >
          <X />
        </Button>
      )}
    </search>
  );
}
