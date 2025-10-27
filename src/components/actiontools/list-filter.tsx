'use client';

import { useState } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Toggle } from '../ui/toggle';
import { SearchParamsProps } from '@/types/types';

export const ITEMS_PER_PAGE = 20;

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
  return (
    <>
      {showState && (
        <FilterState searchParams={searchParams} stateLabel={stateLabel} />
      )}
    </>
  );
}

export function useSearchUtils() {
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

interface FilterState {
  searchParams: SearchParamsProps;
  stateLabel?: string;
}

function FilterState({ searchParams, stateLabel = 'Con saldo' }: FilterState) {
  const stateParam = searchParams?.state;
  const [listState, setListState] = useState(Boolean(stateParam) || false);
  const { updateURL } = useSearchUtils();

  function handleChange() {
    const newState = !listState;
    setListState(newState);
    updateURL('state', newState || null);
  }

  return (
    <Toggle
      aria-label="Toggle state"
      variant="outline"
      onPressedChange={handleChange}
      pressed={listState}
      className="bg-background data-[state=on]:bg-ring text-xs sm:text-sm"
    >
      {stateLabel}
    </Toggle>
  );
}
