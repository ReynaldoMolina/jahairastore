'use client';

import { useState } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Toggle } from '../ui/toggle';
import { PackageCheck, Wallet } from 'lucide-react';

export const ITEMS_PER_PAGE = 20;

type ListName = 'pedidos' | 'ventas' | 'inventario';

interface ListFilter {
  listName: ListName;
}

export function ListFilter({ listName }: ListFilter) {
  return <FilterState listName={listName} />;
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
  listName: ListName;
}

function FilterState({ listName }: FilterState) {
  const searchParams = useSearchParams();
  const stateParam = searchParams.get('state') || '';

  const [listState, setListState] = useState(Boolean(stateParam) || false);
  const { updateURL } = useSearchUtils();

  function handleChange() {
    const newState = !listState;
    setListState(newState);
    updateURL('state', newState || null);
  }

  const labels = {
    pedidos: 'Con saldo',
    ventas: 'Con saldo',
    inventario: 'Disponibles',
  };

  const icons = {
    pedidos: <Wallet />,
    ventas: <Wallet />,
    inventario: <PackageCheck />,
  };

  return (
    <Toggle
      aria-label="Toggle state"
      size="sm"
      variant="outline"
      onPressedChange={handleChange}
      pressed={listState}
      className="bg-background data-[state=on]:bg-ring/30 text-xs shrink-0"
    >
      {icons[listName]}
      <span>{labels[listName]}</span>
    </Toggle>
  );
}
