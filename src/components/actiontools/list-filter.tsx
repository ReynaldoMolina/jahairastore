'use client';

import { useState } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { Filter } from 'lucide-react';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';

const ITEMS_PER_PAGE = 20;

interface ListFilter {
  showState?: boolean;
  stateLabel?: string;
  searchParams?: any;
}

export function ListFilter({
  showState = false,
  stateLabel,
  searchParams,
}: ListFilter) {
  const limitParam = searchParams?.limit;
  const stateParam = searchParams?.state;
  const [filter, setFilter] = useState({
    limit: Number(limitParam) || ITEMS_PER_PAGE,
    state: Boolean(stateParam) || false,
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Filter />
          Filtrar
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {showState && (
          <DropdownMenuItem>
            <FilterState
              filter={filter}
              setFilter={setFilter}
              stateLabel={stateLabel}
            />
          </DropdownMenuItem>
        )}
        <FilterLimit setFilter={setFilter} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function useSearchUtils() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const updateURL = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === false || value === ITEMS_PER_PAGE || value === null) {
      params.delete(key);
    } else {
      params.set(key, value);
      params.set('page', '1');
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return { updateURL };
}

function FilterLimit({ setFilter }) {
  const { updateURL } = useSearchUtils();
  const options = [20, 50, 100, 1];

  function handleChange(newLimit: number) {
    setFilter((prev) => ({ ...prev, limit: newLimit }));
    updateURL('limit', newLimit === ITEMS_PER_PAGE ? null : newLimit);
  }

  return (
    <>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>Mostrar</DropdownMenuSubTrigger>
        <DropdownMenuPortal>
          <DropdownMenuSubContent>
            {options.map((value) => (
              <DropdownMenuItem key={value} onClick={() => handleChange(value)}>
                {value === 1 ? 'Todo' : value}
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuPortal>
      </DropdownMenuSub>
    </>
  );
}

function FilterState({ filter, setFilter, stateLabel = 'Con saldo' }) {
  const { updateURL } = useSearchUtils();

  function handleChange() {
    const newState = !filter.state;
    setFilter((prev) => ({ ...prev, state: newState }));
    updateURL('state', newState || null);
  }

  return (
    <div className="inline-flex gap-3">
      <Label htmlFor="filter-state">{stateLabel}</Label>
      <Switch id="filter-state" checked={filter.state} onClick={handleChange} />
    </div>
  );
}
