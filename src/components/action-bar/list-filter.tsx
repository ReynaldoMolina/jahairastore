'use client';

import { useState } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { SearchParamsProps } from '@/types/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { Filter } from 'lucide-react';
import { Switch } from '../ui/switch';
import { ITEMS_PER_PAGE } from '@/fetch-data/build-limit-offset';

interface ListFilterProps {
  showState?: boolean;
  stateLabel: 'Con saldo' | 'Disponibles';
  searchParams: SearchParamsProps;
}

export function ListFilter({
  showState = false,
  stateLabel,
  searchParams,
}: ListFilterProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Filter />
          Filtrar
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Filtros</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {showState && (
            <FilterState searchParams={searchParams} stateLabel={stateLabel} />
          )}
          <FilterLimit searchParams={searchParams} />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function useUpdateSearchParams() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const updateSearchParams = (
    key: string,
    value: string | number | boolean | null
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === false || value === ITEMS_PER_PAGE || value === null) {
      params.delete(key);
      params.delete('page');
    } else {
      params.set(key, String(value));
      params.set('page', '1');
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return { updateSearchParams };
}

function FilterLimit({ searchParams }: { searchParams: SearchParamsProps }) {
  const limitParam = searchParams?.limit;
  const [limit, setLimit] = useState(limitParam || String(ITEMS_PER_PAGE));

  const { updateSearchParams } = useUpdateSearchParams();

  const limitOptions = [
    {
      value: '20',
      label: '20',
    },
    {
      value: '50',
      label: '50',
    },
    {
      value: '100',
      label: '100',
    },
    {
      value: '1',
      label: 'Todo',
    },
  ];

  function handleChange(newLimit: string) {
    setLimit(newLimit);
    updateSearchParams(
      'limit',
      newLimit === String(ITEMS_PER_PAGE) ? null : newLimit
    );
  }

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>Mostrar por página</DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuRadioGroup value={limit} onValueChange={handleChange}>
            {limitOptions.map((e) => (
              <DropdownMenuRadioItem key={e.value} value={e.value}>
                {e.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}

function FilterState({
  searchParams,
  stateLabel,
}: {
  searchParams: SearchParamsProps;
  stateLabel: 'Con saldo' | 'Disponibles';
}) {
  const stateParam = searchParams?.state;
  const [state, setState] = useState(Boolean(stateParam) || false);

  const { updateSearchParams } = useUpdateSearchParams();

  function handleChange() {
    const newState = !state;
    setState((prev) => !prev);
    updateSearchParams('state', newState);
  }

  return (
    <DropdownMenuItem>
      <label htmlFor="filter-state">{stateLabel}</label>
      <Switch
        id="filter-state"
        checked={state}
        onCheckedChange={handleChange}
        className="ml-auto"
      />
    </DropdownMenuItem>
  );
}
