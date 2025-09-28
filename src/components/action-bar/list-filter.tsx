'use client';

import { useState } from 'react';
import { bgColors } from '../bgcolors';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { SearchParamsProps } from '@/types/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
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
  stateLabel: string;
  searchParams: SearchParamsProps;
}

export function ListFilter({
  showState = false,
  stateLabel,
  searchParams,
}: ListFilterProps) {
  const limitParam = searchParams?.limit;
  const stateParam = searchParams?.state;
  const [filter, setFilter] = useState({
    limit: Number(limitParam) || ITEMS_PER_PAGE,
    state: Boolean(stateParam) || false,
  });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Filter />
            Filtrar
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            {showState && (
              <DropdownMenuItem>
                {stateLabel}
                <Switch checked />
              </DropdownMenuItem>
            )}
            <FilterLimit searchParams={searchParams} />
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex justify-end gap-4">
        {showState && (
          <FilterState
            filter={filter}
            setFilter={setFilter}
            stateLabel={stateLabel}
          />
        )}
        {/* <FilterLimit filter={filter} setFilter={setFilter} /> */}
      </div>
    </>
  );
}

export function useUpdateSearchParams() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const updateSearchParams = (
    key: string,
    value: string | number | false | null
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

function FilterState({ filter, setFilter, stateLabel = 'Con saldo' }) {
  const { updateURL } = useSearchUtils();

  function handleChange() {
    const newState = !filter.state;
    setFilter((prev) => ({ ...prev, state: newState }));
    updateURL('state', newState || null);
  }

  return (
    <FilterDiv>
      <label htmlFor="filter-state">{stateLabel}:</label>
      <input
        type="checkbox"
        name="filter-state"
        id="filter-state"
        checked={filter.state}
        onChange={handleChange}
      />
    </FilterDiv>
  );
}

function FilterDiv({ children }) {
  return <div className="flex items-center gap-1 text-xs">{children}</div>;
}
